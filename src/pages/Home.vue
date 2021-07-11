<template>
  <div>
    <h2>Welcome home!</h2>
    <div class="btn-group mb-4" role="group" aria-label="Basic example">
      <button
        type="button"
        @click="chooseGroup(null)"
        :class="`btn ${
          selectedGroup == null ? 'btn-primary' : 'btn-outline-secondary'
        } me-2`"
      >
        All
      </button>

      <template v-for="(grp, index) in grps">
        <button
          type="button"
          :key="`grp.${index}`"
          @click="chooseGroup(grp)"
          :class="`btn ${
            selectedGroup === grp ? 'btn-primary' : 'btn-outline-secondary'
          }`"
        >
          {{ grp.name }}
        </button>
      </template>
      <b-icon icon="plus" font-scale="2"></b-icon>
    </div>
    <div class="">
      <b-form-group label="" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          id="checkbox-group-2"
          class="row mb-2"
          v-model="$store.state.home.groupOperationType"
          :aria-describedby="ariaDescribedby"
          name="flavour-2"
        >
          <span class="col-2">批量操作:</span>
          <b-form-radio class="col-2" value="all"
            >全部（需要管理员）</b-form-radio
          >
          <b-form-radio class="col-2" value="group">分组</b-form-radio>
          <b-form-radio class="col-2" value="selected">选中</b-form-radio>
          <div class="col-2">
            <b-form-select
              class="c"
              v-model="type"
              :options="options"
            ></b-form-select>
          </div>

          <!-- <b-dropdown
            class="col-2"
            text="operation"
            variant="outline-primary"
            offset="30"
          > -->
          <!-- <div class="scrollable-menu">
              <b-dropdown-item>update</b-dropdown-item>
              <b-dropdown-item>delete</b-dropdown-item>
              <b-dropdown-item>reboot</b-dropdown-item>
              <b-dropdown-item>shutdown</b-dropdown-item>
              <b-dropdown-item>update status</b-dropdown-item>
            </div> -->
          <!-- </b-dropdown> -->
        </b-form-radio-group>
      </b-form-group>
    </div>
    <div v-if="$store.state.home.groupOperationType === 'group'" class="mb-2">
      <b-form-select v-model="checkedGroup" :options="groups"></b-form-select>
    </div>

    <div class="container mb-2">
      <div class="row">
        <template v-for="i in itemsPerPage">
          <DeviceCard
            @changeDevice="updateDevice"
            class="col-12 col-md-6 col-lg-3 mb-2"
            :key="`item.${i - 1}`"
            v-if="i - 1 < devices.length"
            :device="i - 1 < devices.length ? devices[i - 1].device : ''"
          >
          </DeviceCard>
        </template>
      </div>
    </div>
    <div class="mb-4" style="margin-top: 5em">
      <div class="btn-group me-2" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="updatePage(1)"
          :disabled="currentPage === 1"
        >
          fist
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          prev
        </button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="Basic example">
        <template v-for="i in Math.min(DISPLAY_PAGE, totalPage)">
          <button
            type="button"
            :class="`btn ${
              currentPage === pageStart + i - 1
                ? 'btn-primary'
                : 'btn-outline-secondary'
            }`"
            :key="`current_page.${i}`"
            @click="updatePage(pageStart + i - 1)"
          >
            {{ pageStart + i - 1 }}
          </button>
        </template>
      </div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-outline-secondary"
          :disabled="currentPage == totalPage"
          @click="nextPage"
        >
          next
        </button>
        <button
          type="button"
          :disabled="currentPage == totalPage"
          @click="updatePage(totalPage)"
          class="btn btn-outline-secondary"
        >
          last
        </button>
      </div>
    </div>
    <div>
      <b-button @click="isShow()" variant="primary" style="margin-left: 48%"
        >发送指令</b-button
      >
      <b-modal
        size="lg"
        v-model="show"
        title="填写参数"
        centered
        style="width: 600px"
      >
        <b-container fluid>
          <div v-if="this.type == 'update'">
            <!-- <b-form-group
              label-cols-sm="3"
              label-cols-lg="3"
              label="更新文件URL："
            >
              <b-form-input v-model="fileUrl"></b-form-input>
            </b-form-group> -->

            <b-form-group
              label-cols="auto"
              label-align-sm="right"
              label="选择版本："
            >
              <b-form-select
                v-model="version"
                :options="sysVersion"
              ></b-form-select>
            </b-form-group>
            <!-- <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="MD5："
            >
              <b-form-input type="text" v-model="md5" />
            </b-form-group> -->
          </div>
          <div v-if="this.type == 'delete'">
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="删除文件的地址："
            >
              <b-form-input type="text" v-model="deleteFilePath" />
            </b-form-group>
          </div>
          <div v-if="this.type == 'upload'">
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="文件的URL："
            >
              <b-form-input type="text" v-model="uploadFileUrl" />
            </b-form-group>
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="上传到服务器中的位置："
            >
              <b-form-input type="text" v-model="uploadPath" />
            </b-form-group>
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="MD5："
            >
              <b-form-input type="text" v-model="uploadMd5Code" />
            </b-form-group>
          </div>
          <div v-if="this.type == 'focus'">
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="左上角X值"
            >
              <b-form-input type="text" v-model="leftTOpX" />
            </b-form-group>
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="左上角Y值"
            >
              <b-form-input type="text" v-model="leftTOpY" />
            </b-form-group>
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="右下角X值"
            >
              <b-form-input type="text" v-model="rightTbottomX" />
            </b-form-group>
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="右下角Y值"
            >
              <b-form-input type="text" v-model="rightBottomY" />
            </b-form-group>
          </div>
          <div v-if="this.type == 'updateprorerties'">
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="value:"
            >
              <b-form-input type="text" v-model="key" />
            </b-form-group>
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="key:"
            >
              <b-form-input type="text" v-model="value" />
            </b-form-group>
          </div>
          <div v-if="this.type == 'cmd'">
            <b-form-group
              label-cols="auto"
              label-cols-sm="15"
              label-cols-lg="15"
              label-align-sm="right"
              label="CMD:"
            >
              <b-form-input type="text" v-model="cmd" />
            </b-form-group>
          </div>
        </b-container>
        <template v-slot:modal-footer="{ cancel }">
          <!-- Emulate built in modal footer ok and cancel button actions -->
          <b-button size="sm" variant="success" @click="sendCommand()">
            发送指令
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            取消
          </b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import DeviceCard from "@/components/DeviceCard";
import { getAllGroups } from "@/api/group";
import { getDevicesFromGroup, getAllDevice } from "@/api/device";
import { command } from "@/api/command.js";
import { allVersion } from "@/api/version.js";
export default {
  name: "Home",
  components: {
    DeviceCard: DeviceCard,
  },
  computed: {
    getDevices() {
      return this.devices;
    },
  },
  mounted() {
    getAllGroups({
      index: 1,
      pageSize: 100,
    }).then((r) => {
      this.grps = r.data.data.rows;
      let groupsOption = this.grps.map((g) => {
        return { value: g.id, text: g.name };
      });
      groupsOption = [{ value: null, text: "请选择小组" }, ...groupsOption];
      this.groups = groupsOption;
    });
    this.getDeviceList();
    this.timer = setInterval(this.getDeviceList, 200000);
    this.getSysVersion();
  },
  data() {
    return {
      DISPLAY_PAGE: 10, //十页
      groups: [{ value: null, text: "请选择小组" }],
      checkedGroup: null, // 批量操作选中的小组
      devices: [],
      fileUrl: null,
      version: null,
      md5: null,
      deleteFilePath: null,
      uploadFileUrl: null,
      uploadPath: null,
      uploadMd5Code: null,
      leftTOpX: null,
      leftTOpY: null,
      rightTbottomX: null,
      rightBottomY: null,
      key: null,
      value: null,
      devicesId: [],
      type: "update",
      selectedGroup: null,
      currentPage: 1,
      itemsPerPage: 8,
      sysVersion: "",
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
      // 分页起点
      pageStart: 1,
      totalPage: 6,
      show: false,
      //todo get groups
      grps: [{ name: "loading" }, { name: "loading" }, { name: "loading" }],
    };
  },
  methods: {
    updateDevice() {
      this.getDeviceList();
    },
    async getSysVersion() {
      let res = await allVersion();
      let tmp = [{value: null, text: '请选择更新到的版本'}];
      res.data.data.forEach((item) => {
        tmp.push({ value: item.id, text: item.version });
      });
      this.sysVersion = tmp;
      console.log(this.sysVersion);
    },
    isShow() {
      if (
        this.type == "update" ||
        this.type == "delete" ||
        this.type == "upload" ||
        this.type == "focus" ||
        this.type == "updateprorerties"
      ) {
        this.show = true;
      } else {
        this.sendCommand();
      }
    },
    previousPage: function () {
      this.updatePage(Math.max(this.currentPage - 1, 0));
    },
    nextPage: function () {
      this.updatePage(Math.min(this.currentPage + 1, this.totalPage));
    },
    updatePage: function (n) {
      // set page start
      getDevicesFromGroup({
        gid: this.selectedGroup?.id,
        index: n,
        pageSize: this.itemsPerPage,
      }).then((r) => {
        const devices = r.data.data.rows.map((o) => {
          return {
            device: o,
          };
        });
        // console.log(r);
        this.totalPage = r.data.data.pages;
        this.devices = devices;
        // console.log(this.devices);
      });
      this.currentPage = n;
      this.getDeviceList();
    },
    chooseGroup(g) {
      this.selectedGroup = g;
      this.currentPage = 1;
      this.getDeviceList();
    },
    async sendCommand() {
      let devRes = await getAllDevice();
      this.devicesId = [];
      devRes.data.data.forEach((element) => {
        // console.log(element.deviceId);
        this.devicesId.push(element.deviceId);
      });
      let rect = [
        this.leftTOpX,
        this.leftTOpY,
        this.rightTbottomX,
        this.rightBottomY,
      ];
      switch (this.type) {
        case "status":
          // console.log(devRes.data.data.deviceId);
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "reboot":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });

          break;
        case "openMonitor":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "closeMonitor":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "photo":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "captureCloseDoor":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "openAdjust":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "closeAdjust":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "start":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "close":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
          });
          break;
        case "updateprorerties":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
            key: this.key,
            value: this.value,
          });
          break;
        case "upload":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
            fileUrl: this.uploadFileUrl,
            filePath: this.uploadPath,
            md5Code: this.uploadMd5Code,
          });
          break;
        case "focus":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
            position: rect,
          });
          break;
        case "update":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
            // fileUrl: this.fileUrl,
            versionId: this.version,
            // md5Code: this.md5,
          });
          break;
        case "delete":
          await command({
            type: this.type,
            isPushAll: false,
            devicesId: this.devicesId,
            filePath: this.deleteFilePath,
          });
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.getDeviceList();
      }, 3000);
      // if (this.type == "status") {
      //   // setTimeout(this.updateDevice(),5000);
      // } else if (this.type == "reboot") {
      // } else if (this.type == "openMonitor") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });

      //   console.log(res);
      //   setTimeout(() => {
      //     this.getDeviceList();
      //   }, 2000);
      // } else if (this.type == "closeMonitor") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      //   setTimeout(() => {
      //     this.getDeviceList();
      //   }, 2000);
      // } else if (this.type == "photo") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      // } else if (this.type == "captureCloseDoor") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      // } else if (this.type == "openAdjust") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      //   setTimeout(() => {
      //     this.getDeviceList();
      //   }, 2000);
      // } else if (this.type == "closeAdjust") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      //   setTimeout(() => {
      //     this.getDeviceList();
      //   }, 2000);
      // } else if (this.type == "start") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      // } else if (this.type == "close") {
      //   let devRes = await getAllDevice();
      //   this.devicesId = [];
      //   devRes.data.data.forEach((element) => {
      //     // console.log(element.deviceId);
      //     this.devicesId.push(element.deviceId);
      //   });
      //   let res = await command({
      //     type: this.type,
      //     isPushAll: false,
      //     devicesId: this.devicesId,
      //   });
      //   console.log(res);
      //   setTimeout(() => {
      //     this.getDeviceList();
      //   }, 3000);
      // }
      this.show = false;
    },
    // 获取全部的设备
    getDeviceList() {
      // 获取
      getDevicesFromGroup({
        gid: this.selectedGroup?.id,
        index: this.currentPage,
        pageSize: this.itemsPerPage,
      }).then((r) => {
        const devices = r.data.data.rows.map((o) => {
          return {
            device: o,
          };
        });
        // console.log(r);
        this.totalPage = r.data.data.pages;
        this.devices = devices;
        
        // console.log("device");
        // console.log(this.devices);
        // this.devicesId=[];
        // this.devices.forEach(element => {
        //   console.log(element.device.deviceId);
        //   this.devicesId.push(element.device.deviceId)
        // });
        // console.log(this.devicesId);
        // console.log(this.devices);
      });
    },
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
};
</script>

<style scoped>
</style>