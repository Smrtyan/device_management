<template>
  <div class="container">
    <form class="login" @submit.prevent="login">
      <h1>Sign Up</h1>
      <div class="row mb-2">
        <div class="col input-group">
          <b-input required v-model="phone" type="text" placeholder="手机"/>
          <span class="input-group-text"
                :style="`${timer?'color:white':'background:#a7a7f3;'}`"
                @click="getCode">{{ codeMsg }}</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <b-input required v-model="code" type="text" placeholder="验证码"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <b-input required v-model="username" type="text" placeholder="用户名"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <b-input required v-model="password" type="password" placeholder="密码"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <b-input required v-model="password" type="password" placeholder="再次确认密码"/>
        </div>
      </div>
      <hr/>
      <b-link class="me-2" href="/login">log in</b-link>
      <b-button
          @click="register"
          type="button">Sign up</b-button>
    </form>
  </div>
</template>

<script>
import {register, getRegisterMsg} from '@/api/auth'
export default {
  name: "SignUp",
  data(){
    return{
      phone:'',
      username: '',
      password: '',
      code:'',
      // 按钮上的文字
      codeMsg: '获取验证码',
      timer: null,
// 倒计时秒数
      countdown: 60,
      // 是否禁用按钮
      codeDisabled: false,
    }
  },
  methods:{
    getCode(){
      console.log(this.timer)
      // 验证码60秒倒计时
      if (!this.timer&&this.phone.length === 11) {
        getRegisterMsg({
          phone:this.phone
        }).then(r=>{
          console.log(r)
        });
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--;
            if (this.countdown !== 0) {
              this.codeMsg = "重新发送(" + this.countdown + ")";
            } else {
              clearInterval(this.timer);
              this.codeMsg = "获取验证码";
              this.countdown = 60;
              this.timer = null;
              this.codeDisabled = false;
            }
          }
        }, 1000)
      }
    }
    ,
    register(){
      register({

      }).then(r=>{
        console.log(r)
      })
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #000000;
}
</style>