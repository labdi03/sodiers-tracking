<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Feature, Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import { Point } from 'ol/geom'
import { Overlay } from 'ol'
import AppSidebar from './AppSidebar.vue'
import Soldier from './Soldier.vue'
import { createApp } from 'vue'

const center = ref([3.0588, 36.7538])
const projection = ref('EPSG:4326')
const zoom = ref(12)
const rotation = ref(0)
const map = ref(null)

const soldiers = ref([])
const soldierLayer = ref(null)
const movementInterval = ref(null)
const soldierOverlays = ref([])
const showCameraVideo = ref(false)
const cameraOverlayRef = ref(null)
const cameraStreamUrl = 'http://192.168.159.123:81/stream'

const randomName = () => {
  const noms = ['MIKAKDA', 'FADEL', 'HADAD', 'labdi', 'BATACHE']
  const prenoms = ['AISSA', 'ALI', 'RABEH', 'MOHAMED', 'ABDALLAH']
  const grades = ['COLONEL', 'COMMANDANT', 'Lieutenant', 'CAPITEN']
  const unites = ['ENPEI', 'DAT', 'TACTIQUE', 'SPACIAL_FORCE', 'AVIATION']
  const status = ['mort', 'vivant', 'vivant', 'vivant', 'mort']
  return {
    nom: noms[Math.floor(Math.random() * noms.length)],
    prenom: prenoms[Math.floor(Math.random() * prenoms.length)],
    grade: grades[Math.floor(Math.random() * grades.length)],
    unite: unites[Math.floor(Math.random() * unites.length)],
    status: status[Math.floor(Math.random() * status.length)],
  }
}
const createSoldierOverlay = (coordinates, info, soldierId, isReal = false, showCameraVideo = ref(false)) => {
  const element = document.createElement('div')
  const soldierComponent = createApp(Soldier, {
    id: soldierId,
    position: { x: coordinates[0], y: coordinates[1] },
    nom: info.nom,
    prenom: info.prenom,
    grade: info.grade,
    unite: info.unite,
    status: info.status,
    isReal,
    showCameraVideo, // ✅ لمشاركة نفس المتغير
  })
  soldierComponent.mount(element)

  const overlay = new Overlay({
    element,
    position: coordinates,
    positioning: 'center-center'
  })

  return { overlay, component: soldierComponent, id: soldierId }
}



const addRandomSoldier = () => {
 const  reghayaCenter = [3.3452, 36.7359] // Longitude, Latitude

  const radius = 0.001
  const angle = Math.random() * 2 * Math.PI
  const distance = Math.random() * radius
  const x =reghayaCenter[0] + distance * Math.cos(angle)
  const y = reghayaCenter[1] + distance * Math.sin(angle)

  const info = randomName()
  const soldierId = `SOL-${soldiers.value.length + 1}`
  const soldierOverlay = createSoldierOverlay([x, y], info, soldierId)
  map.value.addOverlay(soldierOverlay.overlay)
  soldierOverlays.value.push(soldierOverlay)

  const soldier = new Feature({
    geometry: new Point([x, y]),
    properties: {
      id: soldierOverlay.id,
      ...info
    }
  })
  soldiers.value.push(soldier)
}

const moveSoldier = (soldier) => {
  const  reghayaCenter = [3.3452, 36.7359] // Longitude, Latitude

  const currentCoords = soldier.getGeometry().getCoordinates()
  const movementRange = 0.0005
  let newX = currentCoords[0] + (Math.random() - 0.5) * movementRange
  let newY = currentCoords[1] + (Math.random() - 0.5) * movementRange

  const newDistance = Math.sqrt(
    Math.pow(newX - reghayaCenter[0], 2) +
    Math.pow(newY - reghayaCenter[1], 2)
  )
  if (newDistance > 0.015) {
    const angle = Math.atan2(reghayaCenter[1] - currentCoords[1], reghayaCenter[0] - currentCoords[0])
    newX = currentCoords[0] + Math.cos(angle) * movementRange
    newY = currentCoords[1] + Math.sin(angle) * movementRange
  }

  const duration = 500
  const startTime = Date.now()
  const startCoords = currentCoords

  const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2
    const currentX = startCoords[0] + (newX - startCoords[0]) * easedProgress
    const currentY = startCoords[1] + (newY - startCoords[1]) * easedProgress
    soldier.getGeometry().setCoordinates([currentX, currentY])
    const overlay = soldierOverlays.value.find(o => o.id === soldier.get('properties').id)
    if (overlay) overlay.overlay.setPosition([currentX, currentY])
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}
//ajouter le real soldat
const addRealSoldier = async () => {
  const data = await $fetch('http://127.0.0.1:8000/api/last-gps')
  const x = data.lon
  const y = data.lat
  const info = randomName()
  const soldierId = `SOL-${soldiers.value.length + 1}`

  // ✅ مرر isReal و showCameraVideo إلى overlay
  const soldierOverlay = createSoldierOverlay([x, y], info, soldierId, true, showCameraVideo)

  map.value.addOverlay(soldierOverlay.overlay)
  soldierOverlays.value.push(soldierOverlay)

  const soldier = new Feature({
    geometry: new Point([x, y]),
    properties: {
      id: soldierOverlay.id,
      isReal: true, // ✅ ضروري حتى لا يتحرك هذا الجندي
      ...info
    }
  })

  soldiers.value.push(soldier)
}

const startSoldierMovement = () => {
  if (movementInterval.value) clearInterval(movementInterval.value);
  movementInterval.value = setInterval(() => {
    soldiers.value.forEach(soldier => {
      // ❗ لا تحرك الجنود الحقيقيين (الذين في روَيبة)
      if (soldier.get('properties')?.isReal) return;
      moveSoldier(soldier);
    });
  }, 1000);
};


const stopSoldierMovement = () => {
  if (movementInterval.value) {
    clearInterval(movementInterval.value)
    movementInterval.value = null
  }
}



const addCameraIconToMap = () => {
  const cameraCoords = [3.061, 36.753]
  const cameraIcon = document.createElement('div')
  cameraIcon.innerHTML = `
    <img src="/camera-icon.png" alt="Caméra" style="width: 32px; height: 32px; cursor: pointer;" />
  `
  cameraIcon.onclick = () => {
    showCameraVideo.value = !showCameraVideo.value
  }
  const overlay = new Overlay({
    element: cameraIcon,
    positioning: 'center-center',
    stopEvent: true,
    offset: [0, 0],
  })
  overlay.setPosition(cameraCoords)
  map.value.addOverlay(overlay)
  cameraOverlayRef.value = overlay
}
 const updateRealSoldierPosition = async () => {
  try {
    const data = await $fetch('http://127.0.0.1:8000/api/last-gps');
    const x = data.lon;
    const y = data.lat;

    // ابحث عن الجندي الحقيقي
    const realSoldier = soldiers.value.find(s => s.get('properties')?.isReal);

    if (realSoldier) {
      realSoldier.getGeometry().setCoordinates([x, y]);

      const overlay = soldierOverlays.value.find(o => o.id === realSoldier.get('properties').id);
      if (overlay) overlay.overlay.setPosition([x, y]);
    }
  } catch (error) {
    console.error('Erreur de mise à jour GPS:', error);
  }
};

onMounted(() => {
  map.value = new Map({
    target: 'map',
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: center.value,
      projection: projection.value,
      zoom: zoom.value,
      rotation: rotation.value
    })
  })

  for (let i = 0; i < 5; i++) addRandomSoldier()
  startSoldierMovement()
 // addCameraIconToMap() // إظهار الكاميرا
})
onUnmounted(() => {
  stopSoldierMovement()
  soldierOverlays.value.forEach(overlay => overlay.component.unmount())
  soldierOverlays.value = []
})
</script>

<template>
  <SidebarProvider class="h-screen w-screen">
    <AppSidebar class="absolute z-10" />
    <div id="map" class="h-screen relative w-full">
      <!-- زر الكاميرا في أعلى اليمين -->
<!--<button @click="showCameraVideo = !showCameraVideo"class="absolute top-5 right-5 z-50 bg-white text-black border border-gray-300 rounded-full shadow p-2 hover:bg-gray-200" title="Afficher la caméra">
  <img src="/camera-icon.png" alt="Caméra" style="width: 24px; height: 24px;" />
</button>

<!-- نافذة الفيديو في أعلى اليمين -->
<!--<div
  v-if="showCameraVideo"
  class="absolute top-16 right-5 w-[300px] h-[200px] bg-black border-2 border-white rounded-lg shadow-lg z-50 overflow-hidden"
>
  <img
    :src="cameraStreamUrl"
    alt="Caméra ESP32"
    class="w-full h-full object-cover"
/>
</div>-->

      

      <SidebarTrigger class="absolute top-2 left-10 z-10" />

      <div class="absolute bottom-4 left-4 flex gap-2 z-10">
        <button @click="addRandomSoldier" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors">
          Add Soldier
        </button>
        <button @click="startSoldierMovement" class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors">
          Start Movement
        </button>
        <button @click="stopSoldierMovement" class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors">
          Stop Movement
        </button>
      </div>

      <div class="absolute bottom-4 right-4 z-10">
        <button @click="addRealSoldier" class="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600 transition-colors">
          Add Real Soldier
        </button>
        

      </div>
    </div>
  </SidebarProvider>
</template>
