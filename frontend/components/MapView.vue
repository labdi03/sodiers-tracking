<template>
  <div>
    <ol-map :view.sync="view" style="height: 100vh">
      <ol-view :center="[0, 0]" :zoom="2" />
      <ol-layer-vector>
        <ol-source-vector>
          <ol-feature
            v-for="[id, soldier] in soldiers"
            :key="id"
            :geometry="point(soldier.location.lng, soldier.location.lat)"
            @pointerenter="hoveredSoldier = soldier"
            @click="selectedSoldier = soldier"
          >
            <ol-style>
              <ol-style-circle :radius="6">
                <ol-style-fill color="green" />
              </ol-style-circle>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-layer-vector>
    </ol-map>

    <SoldierModal v-if="selectedSoldier" :soldier="selectedSoldier" @close="selectedSoldier = null" />
  </div>
</template>

<script setup>
import { point } from "vue3-openlayers";
import { useSocket } from "@/composables/useSocket";
import SoldierModal from "@/components/SoldierModal.vue";

const { soldiers } = useSocket();
const view = ref({ center: [0, 0], zoom: 3 });
const selectedSoldier = ref(null);
const hoveredSoldier = ref(null);
</script>
