<template>
  <div class="container ">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <div class="row mb-2 ">
<!--        <label for="username">User name</label>-->
        <div class="col">
          <b-input required v-model="username" id="username" type="text" placeholder="Username"/>
        </div>
      </div>
      <div class="row mb-2">
<!--        <label>Password</label>-->
        <div class="col">
          <b-input required v-model="password" type="password" placeholder="Password"/>
        </div>
      </div>



      <hr/>
      <b-link class="me-2" href="/signup">Sign up</b-link>

      <b-button type="submit">Login</b-button>
    </form>
  </div>
</template>

<script>
import {getDevicesFromGroup} from '@/api/device'
export default {
  name: "SignIn",
  data(){
    return{
      username: '',
      password: ''
    }
  },
  methods:{
    login: function () {
      const { username, password } = this
      this.$store.dispatch('auth/AUTH_REQUEST', { username, password }).then((r) => {
        if(r.data.code ==200){
          // this.$router.push('/')
          getDevicesFromGroup({
            pageSize:6,
            index:1
          }).then(e=>{
            console.log(e)
          })
        }else {
          alert(r.data.msg)
        }

      })
    }
  }
}
</script>

<style scoped>
a{
  color: #000000;
  text-decoration: none;
}
</style>