<template>
  <div>
    <h2>Welcome home!</h2>
    <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
    >

      <grid-item v-for="item in layout"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 :key="item.i">
        <DeviceCard>

        </DeviceCard>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
import DeviceCard from '@/components/DeviceCard'
export default {
  name: "Home",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    DeviceCard: DeviceCard
  },
  data(){
    return {
      layout: [
        {"x": 0, "y": 0, "w": 3, "h": 6, "i": "0"},
        {"x": 2, "y": 0, "w": 3, "h": 6, "i": "1"},
        {"x": 4, "y": 0, "w": 3, "h": 6, "i": "2"},
      ]
    }
  },
}
</script>

<style scoped>

</style>