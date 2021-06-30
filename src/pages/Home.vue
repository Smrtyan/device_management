<template>
  <div>
    <h2>Welcome home!</h2>
    <div class="btn-group mb-4" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-success me-2">Refresh</button>
      <button type="button"
              @click="chooseGroup(null)"
              :class="`btn ${selectedGroup==null?'btn-primary':'btn-outline-secondary'} me-2`">All</button>

      <template v-for="(grp, index) in grps">
        <button type="button"
                :key="`grp.${index}`"
                @click="chooseGroup(grp)"
                :class="`btn ${selectedGroup===grp?'btn-primary':'btn-outline-secondary'}`">{{ grp.name }}</button>
      </template>
      <b-icon icon="plus"
              font-scale="2"
      ></b-icon>

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
          <b-form-radio class="col-2 " value="all">全部（需要管理员）</b-form-radio>
          <b-form-radio class="col-2" value="group">分组</b-form-radio>
          <b-form-radio class="col-2" value="selected">选中</b-form-radio>
          <b-dropdown
              class="col-2"
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
        </b-form-radio-group>

      </b-form-group>
    </div>
    <div v-if="$store.state.home.groupOperationType === 'group'" class="mb-2">
      <b-form-select v-model="checkedGroup" :options="groups"></b-form-select>
    </div>

    <div class="container mb-2">
      <div class="row" >
        <template
            v-for="i in itemsPerPage"
        >
          <DeviceCard class="col-12 col-md-6 col-lg-3 mb-2"
                      :key="`item.${i-1}`"
                      v-if="i-1 < devices.length"
                      :device="i-1 < devices.length? devices[i-1].device:''">
          </DeviceCard>
        </template>
      </div>
    </div>
    <div class="mb-4">
      <div class="btn-group me-2" role="group" aria-label="Basic example">
        <button type="button"
                class="btn btn-outline-secondary"
                @click="updatePage(1)"
                :disabled="currentPage===1">fist</button>
        <button type="button"
                class="btn btn-outline-secondary"
                :disabled="currentPage===1"
                @click="previousPage">prev</button>
      </div>
      <div class="btn-group me-2" role="group" aria-label="Basic example">
        <template v-for="i in Math.min(DISPLAY_PAGE,totalPage)">
          <button type="button"
                  :class="`btn ${currentPage === pageStart+i-1 ? 'btn-primary':'btn-outline-secondary'}`"
                  :key="`current_page.${i}`"
                  @click="updatePage(pageStart+i-1)"
          >{{pageStart+i-1}}</button>

        </template>
      </div>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button"
                class="btn btn-outline-secondary"
                :disabled="currentPage==totalPage"
                @click="nextPage">next</button>
        <button type="button"
                :disabled="currentPage==totalPage"
                @click="updatePage(totalPage)"

                class="btn btn-outline-secondary">last</button>
      </div>

    </div>




  </div>
</template>

<script>
import DeviceCard from '@/components/DeviceCard'
import {getAllGroups} from '@/api/group'
import {getDevicesFromGroup} from '@/api/device'
export default {
  name: "Home",
  components: {
    DeviceCard: DeviceCard
  },
  mounted() {
    getAllGroups()
    .then(r=>{
      this.grps = r.data.data.rows;

      let groupsOption = this.grps.map(g=> {
            return {'value': g.id, 'text': g.name}
          }
      )
      groupsOption = [
        {value:null,text:"请选择小组"},
          ...groupsOption
      ]
      this.groups = groupsOption

    })
    this.getDeviceList()
  },
  data(){
    return {
      DISPLAY_PAGE: 10,//十页
      groups:[{value:null,text:"请选择小组"}],
      checkedGroup:null,// 批量操作选中的小组
      devices: [
        { device:{}},
        { device:{}},
        { device:{}},
        { device:{}},
        { device:{}},
        { device:{}},
        { device:{}},
        { device:{}},
      ],
      selectedGroup: null,
      currentPage: 1,
      itemsPerPage: 8,
      // 分页起点
      pageStart: 1,
      totalPage: 6,
      //todo get groups
      grps:[{name:'loading'}, {name:'loading'},{name:'loading'}]
    }
  },
  methods:{
    previousPage:function (){
      this.updatePage(Math.max(this.currentPage - 1,0))
    },
    nextPage: function (){
      this.updatePage(Math.min(this.currentPage + 1,this.totalPage))
    },
    updatePage: function (n){
      // set page start
      if(n + this.DISPLAY_PAGE < this.totalPage){
        this.pageStart = n < this.pageStart + this.totalPage-1  ? this.pageStart : n
        this.pageStart = this.pageStart > n ? n: this.pageStart
      }
      this.currentPage = n
      this.getDeviceList()
    },
    chooseGroup(g){
      this.selectedGroup = g
      this.currentPage = 1
      this.getDeviceList()

    },
    getDeviceList(){
      getDevicesFromGroup(
          {
            gid: this.selectedGroup?.id,
            index: this.currentPage,
            pageSize: this.totalPage
          }
      ).then(r=>{
        console.log(r)
        const devices = r.data.data.rows.map(o=>{
          return{
            device:o
          }
        })
        this.totalPage = r.data.data.pages
        this.devices = devices
      })
    }
  }
}
</script>

<style scoped>

</style>