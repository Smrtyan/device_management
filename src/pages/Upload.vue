<template>
  <b-container>
    <h2>新增版本</h2>

    <b-row class="my-1">
      <b-col   class="mb-2">
        <b-form-input id="input-small" size="sm" placeholder="Enter  version"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col  class="mb-2">

        <b-form-file id="file" ref="file" v-on:change="handleFileUpload()" plain />
      </b-col>
    </b-row>
    <b-row>
      <b-col  class="mb-2">
        <b-button v-on:click="submitFile()">Submit</b-button>
      </b-col>
    </b-row>
  </b-container>

</template>
<script>
export default {
  name: "Upload",
  data(){
    return {
      file: null,
      MAX_SIZE: 100, //文件大小限制 MAX_SIZE MB
    }
  },
  mounted() {

  },
  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      if(this.file) {
        // get extension
        let extension = this.file.name.split('.').pop().toLowerCase()
        if (extension !== 'jar') {
          this.$refs.file.value = null
          this.file = null
          alert("暂时只支持JAR文件！")
        }
        if (this.file.size > this.MAX_SIZE * 1024 * 1024) {
          this.$refs.file.value = null
          this.file = null
          alert("文件不大于" + this.MAX_SIZE + 'M')
        }
      }
    },
    submitFile(){
      // todo

      let formData = new FormData();
      formData.append('file', this.file);
    }
  }
}
</script>

<style scoped>

</style>