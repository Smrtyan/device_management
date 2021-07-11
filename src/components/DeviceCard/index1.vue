<template>
  <div>
    <el-card class="box-card" style="height: 100%; margin-top: 2em">
      <div slot="header" class="clearfix">
        <b-checkbox
          id="checkbox-1"
          inline
          v-model="status"
          name="checkbox-1"
          value="accepted"
          unchecked-value="not_accepted"
          v-if="$store.state.home.groupOperationType === 'selected'"
        >
          <span> {{ device.name ? device.name : "device name" }}</span>
        </b-checkbox>
        <span v-else> {{ device.name ? device.name : "device name" }}</span>

        <!--        <el-button style="float: right; padding: 3px 0;color: firebrick" type="text">删除</el-button>-->
      </div>
      <div v-if="isLoading" style="margin-top: 2em">
        <br /><br /><br />
        <br />
        <div class="spinner-border" align="center" role="status">
          <span class="sr-only"></span>
        </div>
        <br /><br /><br />
        <br />
      </div>
      <div align="left" v-else>
        指令：<b-form-select v-model="type" :options="options"></b-form-select>
        <!-- <b-dropdown
                    text="operation"
                    variant="outline-primary"
                    offset="30"
        >
          <div class="scrollable-menu">
            <b-dropdown-item>update</b-dropdown-item>
            <b-dropdown-item>delete</b-dropdown-item>
            <b-dropdown-item>reboot</b-dropdown-item>
            <b-dropdown-item>shutdown</b-dropdown-item>
            <b-dropdown-item>getStatus</b-dropdown-item>
          </div>
        </b-dropdown> -->
        <div style="margin=3px;">设备号：{{ getDevice.id }}</div>
        <div>地区： {{ device.groupId }}</div>
        <div>
          电车检测服务：<span v-if="device.status == 0">关闭</span
          ><span v-if="device.status == 1">开启</span
          ><span v-if="device.status == -1">未激活</span>
        </div>
        <div>
          实时监控服务：<span v-if="device.live == 0">关闭</span
          ><span v-if="device.live == 1">开启</span
          ><span v-if="device.live == -1">未激活</span>
        </div>
        <div>软件版本：{{ device.version }}</div>
        <div>更新时间：{{ device.updateTime }}</div>
        <div style="margin-top: 1em" align="center">
          <b-button
            variant="outline-primary"
            size="sm"
            style="padding-left: 2em; padding-right: 2em"
            @click="sendCommand"
            >发送指令</b-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { command } from "@/api/command.js";
// import { getDeviceById } from "@/api/device.js";
export default {
  name: "index",
  props: ["device"],
  data() {
    return {
      isLoading: false,
      type: "status",
      tempDevice: this.device,
      options: [
        { value: "status", text: "获取设备状态" },
        { value: "start", text: "开启电梯监控服务" },
        { value: "close", text: "关闭电梯监控服务" },
        { value: "update", text: "系统更新" },
        { value: "delete", text: "删除文件" },
        { value: "reboot", text: "重启设备" },
        { value: "updateprorerties", text: "修改设备参数" },
        { value: "openMonitor", text: "打开实时监控" },
        { value: "closeMonitor", text: "关闭实时监控" },
        { value: "openAdjust", text: "打开调节模式" },
        { value: "closeAdjust", text: "关闭调节模式" },
        { value: "upload", text: "上传文件" },
        { value: "focus", text: "调整方框位置" },
        { value: "photo", text: "抓拍" },
        { value: "captureCloseDoor", text: "截取关闭门的图片" },
      ],
    };
  },
  computed: {
    getDevice() {
      return this.tempDevice;
    },
  },
  // watch: {
  //   device: {
  //     changeDev(newValue, oldValue) {
  //       console.log(newValue);
  //       console.log("-------");
  //       console.log(oldValue);
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    async sendCommand() {
      if (this.type == "status") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
        setTimeout(() => {
          this.updateDevice();
        }, 2000);
        // setTimeout(this.updateDevice(),5000);
      } else if (this.type == "reboot") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
      } else if (this.type == "openMonitor") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
        setTimeout(() => {
          this.updateDevice();
        }, 2000);
      } else if (this.type == "closeMonitor") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
        setTimeout(() => {
          this.updateDevice();
        }, 2000);
      } else if (this.type == "photo") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
      } else if (this.type == "captureCloseDoor") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
      } else if (this.type == "openAdjust") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
        setTimeout(() => {
          this.updateDevice();
        }, 2000);
      } else if (this.type == "closeAdjust") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
        setTimeout(() => {
          this.updateDevice();
        }, 2000);
        setTimeout(() => {
          this.updateDevice();
        }, 2000);
      } else if (this.type == "start") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);
        setTimeout(() => {
          this.updateDevice();
        }, 3000);
      } else if (this.type == "close") {
        let res = await command({
          type: this.type,
          isPushAll: false,
          devicesId: [this.device.deviceId],
        });
        console.log(res);

        setTimeout(() => {
          this.updateDevice();
        }, 3000);
      }
    },
    updateDevice() {
      this.$emit("changeDevice", 1);
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>

<style scoped>
.scrollable-menu {
  height: auto;
  max-height: 150px;
  overflow-x: hidden;
}
</style>