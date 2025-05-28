<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface Position {
  x: number;
  y: number;
}

interface Props {
  id: string;
  position: Position;
}

const props = defineProps<Props>();
const isHovered = ref(false);
const isDialogOpen = ref(false);

const formatCoordinates = (x: number, y: number) => {
  return `${x.toFixed(4)}, ${y.toFixed(4)}`;
};
</script>

<template>
  <div 
    class="relative group"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- <Dialog v-model:open="isDialogOpen">
      <DialogTrigger asChild>
        <div 
          class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110"
          :class="{ 'ring-2 ring-blue-300': isHovered }"
        >
          <img src="/helmet.png" class="w-6 h-6 " alt="Soldier" />
        </div>
      </DialogTrigger>
      
      <div 
        class="absolute inset-0 w-8 h-8 rounded-full bg-blue-500/20 animate-ping"
        :class="{ 'animate-none': isDialogOpen }"
      ></div>
      <div 
        v-if="isHovered"
        class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap z-50"
      >
        <div class="font-medium text-blue-600">Soldier ID: {{ id }}</div>
        <div class="text-gray-600 text-xs mt-1">Click for details</div>
      </div>

      <DialogContent class="sm:max-w-[425px] z-10">
        <DialogHeader>
          <DialogTitle>Soldier Details</DialogTitle>
          <DialogDescription>
            Information about soldier {{ id }}
          </DialogDescription>
        </DialogHeader>
        
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Status</div>
            <div class="col-span-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Location</div>
            <div class="col-span-3 text-sm text-gray-600">
              {{ formatCoordinates(position.x, position.y) }}
            </div>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Last Update</div>
            <div class="col-span-3 text-sm text-gray-600">
              {{ new Date().toLocaleTimeString() }}
            </div>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Battery</div>
            <div class="col-span-3">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 85%"></div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" @click="isDialogOpen = false">Close</Button>
          <Button type="submit">Send Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> -->
    <Dialog>
    <DialogTrigger as-child>
      <div 
          class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110"
          :class="{ 'ring-2 ring-blue-300': isHovered }"
        >
          <img src="/helmet.png" class="w-6 h-6 " alt="Soldier" />
        </div>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle>Soldier Details</DialogTitle>
          <DialogDescription>
            Information about soldier {{ id }}
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Status</div>
            <div class="col-span-3">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Location</div>
            <div class="col-span-3 text-sm text-gray-600">
              {{ formatCoordinates(position.x, position.y) }}
            </div>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Last Update</div>
            <div class="col-span-3 text-sm text-gray-600">
              {{ new Date().toLocaleTimeString() }}
            </div>
          </div>
          
          <div class="grid grid-cols-4 items-center gap-4">
            <div class="font-medium">Battery</div>
            <div class="col-span-3">
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 85%"></div>
              </div>
            </div>
          </div>
        </div>
    </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped>
.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>