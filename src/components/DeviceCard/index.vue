<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>device name</span>
        <el-button style="float: right; padding: 3px 0;color: firebrick" type="text">删除</el-button>
      </div>
      <div align="left">
        <b-dropdown
                    text="operation"
                    variant="outline-primary"
                    offset="30"
        >
          <div class="scrollable-menu">
            <b-dropdown-item>reboot</b-dropdown-item>
            <b-dropdown-item>shutdown</b-dropdown-item>
          </div>


        </b-dropdown>
        <div>id: 00000001</div>
        <div>add time: {{new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') }} </div>
        <div>status: On</div>
        <div>version: v0.0.1</div>


      </div>
    </el-card>
  </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>
.scrollable-menu {
  height: auto;
  max-height: 90px;
  overflow-x: hidden;
}
</style>