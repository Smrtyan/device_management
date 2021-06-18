<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign Up</h1>
      <label>User name</label>
      <input required v-model="username" type="text" placeholder="username"/>
      <label>Password</label>
      <input required v-model="password" type="password" placeholder="Password"/>
      <label>Confirmed Password</label>
      <input required v-model="password" type="password" placeholder="Confirmed password"/>
      <hr/>
      <router-link to="/login">log in</router-link>
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data(){
    return{
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>

</style>