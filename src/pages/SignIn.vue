<template>
  <div class="container ">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <div class="row mb-2 ">
        <div class="col">
          <div class="error" v-if="!$v.username.required">Name is required</div>
          <div class="error" v-if="!$v.username.minLength">Name must have at least {{$v.username.$params.minLength.min}} letters.</div>
          <b-input required v-model="username" id="username" type="text" placeholder="Username"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <div class="error" v-if="!$v.password.required">Password is required</div>
          <div class="error" v-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} letters.</div>
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
import { required, minLength} from 'vuelidate/lib/validators'
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
      if(!this.$v.$invalid) {
        const {username, password} = this
        this.$store.dispatch('auth/AUTH_REQUEST', {username, password}).then((r) => {
          if (r.data.code == 200) {
            this.$router.push('/')
          } else {
            alert(r.data.msg)
          }

        })
      }
    }
  },validations: {
    username: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(4)
    }
  }
}
</script>

<style scoped>
a{
  color: #000000;
  text-decoration: none;
}
.error{
  color: #f79086;
}
</style>