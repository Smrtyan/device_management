<template>
  <div >
    <el-card class="box-card" style="height: 100%">
      <div slot="header" class="clearfix">
        <b-checkbox
            id="checkbox-1"
            inline
            v-model="status"
            name="checkbox-1"
            value="accepted"
            unchecked-value="not_accepted"
            v-if="$store.state.home.groupOperationType==='selected'"
        >
          <span> {{device.name?device.name:'device name'}}</span>
        </b-checkbox>
        <span v-else> {{device.name?device.name:'device name'}}</span>

        <!--        <el-button style="float: right; padding: 3px 0;color: firebrick" type="text">删除</el-button>-->
      </div>

      <div v-if="isLoading">
        <br/><br/><br/> <br/>
        <div class="spinner-border" align="center" role="status">
          <span class="sr-only"></span>
        </div>
        <br/><br/><br/> <br/>
      </div>
      <div align="left"
           v-else
      >
        <b-dropdown
                    text="operation"
                    variant="outline-primary"
                    offset="30"
        >
          <div class="scrollable-menu">
            <b-dropdown-item>update</b-dropdown-item>
            <b-dropdown-item>delete</b-dropdown-item>
            <b-dropdown-item>reboot</b-dropdown-item>
            <b-dropdown-item>shutdown</b-dropdown-item>
            <b-dropdown-item>update status</b-dropdown-item>
          </div>


        </b-dropdown>
        <div>id: {{ device.deviceid }}</div>
        <div>group: {{device.grouppid}} </div>
        <div>status: {{ device.status }}</div>
        <div>version: {{ device.version }}</div>

        <br/><br/><br/>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: "index",
  props: ['device'],
  data(){
    return{
      isLoading: false
    }
  }

}
</script>

<style scoped>
.scrollable-menu {
  height: auto;
  max-height: 150px;
  overflow-x: hidden;
}
</style>