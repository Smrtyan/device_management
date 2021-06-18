<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder=""/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <hr/>
      <router-link to="/signup">Sign up</router-link>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
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
      this.$store.dispatch('AUTH_REQUEST', { username, password }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>

</style>