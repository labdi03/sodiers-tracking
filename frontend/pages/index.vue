<template>
  <div class="h-screen w-screen relative">
    <!-- Map -->
    <olMap class="h-full w-full" :loadTilesWhileAnimating="true">
      <ol-view :center="center" :zoom="zoom" />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <!-- Soldiers on map -->
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature
            v-for="soldier in fakeSoldiers"
            :key="soldier.id"
          >
            <ol-geom-point :coordinates="[soldier.lng, soldier.lat]" />
            <ol-style>
              <ol-style-circle :radius="8">
                <ol-style-fill color="green" />
                <ol-style-stroke color="black" :width="1" />
              </ol-style-circle>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </olMap>

    <!-- Tooltip -->
    <div
      v-if="hoveredSoldier"
      class="absolute bg-white text-sm p-2 rounded shadow top-4 left-4"
    >
      <p><strong>{{ hoveredSoldier.name }}</strong></p>
      <p>❤️ {{ hoveredSoldier.heartRate }}</p>
      <p>🔫 {{ hoveredSoldier.ammo }}</p>
    </div>

    <!-- Modal -->
    <AlertDialog :open="selectedSoldier !== null" @openChange="closeModal">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Soldier Details
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div v-if="selectedSoldierData">
          <p>Name: {{ selectedSoldierData.name }}</p>
          <p>Age: {{ selectedSoldierData.age }}</p>
          <p>Grade: {{ selectedSoldierData.grade }}</p>
          <p>Blood Group: {{ selectedSoldierData.bloodGroup }}</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup>
import "vue3-openlayers/styles.css";
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";
import { fromLonLat } from "ol/proj";
const center = ref(fromLonLat([3.05, 36.75]));// Center over Algeria
const zoom = ref(6);
const soldiers = ref([]);
const hoveredSoldier = ref(null);
const selectedSoldier = ref(null);
const selectedSoldierData = ref(null);

const soldierMap = ref({});

const fakeSoldiers = ref([
  { id: "s1", name: "Ali B.", age: 26, grade: "Sergeant", bloodGroup: "O+" },
  { id: "s2", name: "Mokhtar Z.", age: 31, grade: "Captain", bloodGroup: "A-" },
  { id: "s3", name: "Yacine M.", age: 23, grade: "Corporal", bloodGroup: "B+" },
  { id: "s4", name: "Sami T.", age: 28, grade: "Lieutenant", bloodGroup: "AB+" },
  { id: "s5", name: "Walid K.", age: 30, grade: "Major", bloodGroup: "O-" },
]);

fakeSoldiers.value.forEach((soldier) => {
  const lat = 36.75 + Math.random() * 0.2 - 0.1;
  const lng = 3.05 + Math.random() * 0.2 - 0.1;
  const [x, y] = fromLonLat([lng, lat]);

  soldier.lat = y;
  soldier.lng = x;
  soldier.heartRate = Math.floor(Math.random() * 50) + 60;
  soldier.ammo = Math.floor(Math.random() * 100);
  soldier.orientation = Math.random() * 360;
  soldierMap.value[soldier.id] = { ...soldier };
});
// soldiers.value = Object.values(soldierMap.value);

// Update fake positions every second
onNuxtReady(()=>{

    setInterval(() => {
        fakeSoldiers.value.forEach((s) => {
            // const lat = s.lat + (Math.random() - 0.5) *0.005
            // const lng = s.lng + (Math.random() - 0.5) * 0.005
            // const [x, y] = fromLonLat([lng, lat]);
            s.lat += (Math.random() - 0.5) * 0.005;
            s.lng += (Math.random() - 0.5) * 0.005;
            
            s.heartRate = Math.floor(Math.random() * 50) + 50;
            s.ammo = Math.max(0, s.ammo - Math.floor(Math.random() * 3));
            s.orientation = (s.orientation + Math.random() * 10 - 5) % 360;
            
            // if (s.heartRate < 70) {
            //     toast.warning(`⚠️ ${s.name} has a low heart rate`, {
            //         description: `Current: ${s.heartRate} bpm`,
            //     });
            // }
            
            soldierMap.value[s.id] = { ...s };
        });
        
        soldiers.value = Object.values(soldierMap.value);
    }, 500);
    
})
//     function closeModal() {
//         selectedSoldier.value = null;
//         selectedSoldierData.value = null;
//     }

// function onSoldierClick(id) {
//   selectedSoldier.value = id;
//   selectedSoldierData.value = soldierMap.value[id];
// }
</script>
