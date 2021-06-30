<template>
  <div class="container">
    <form class="login" @submit.prevent="login">
      <h1>Sign Up</h1>
      <div class="row mb-2">
        <div class="error" v-if="!$v.phone.required">Phone is required</div>
        <div class="error" v-if="!$v.phone.minLength">Phone must be exactly {{$v.phone.$params.minLength.min}} letters.</div>
        <div class="col input-group">
          <b-input required v-model="phone" type="text" placeholder="手机"/>
          <span class="input-group-text"
                :style="`${timer?'color:white':'background:#a7a7f3;'}`"
                @click="getCode">{{ codeMsg }}</span>
        </div>
      </div>
      <div class="row mb-2">
        <div class="error" v-if="!$v.code.required">code is required</div>
        <div class="error" v-if="!$v.code.minLength">code must be exactly {{$v.code.$params.minLength.min}} letters.</div>

        <div class="col">
          <b-input required v-model="code" type="text" placeholder="验证码"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="error" v-if="!$v.username.required">username is required</div>
        <div class="error" v-if="!$v.username.minLength">username must be exactly {{$v.username.$params.minLength.min}} letters.</div>

        <div class="col">
          <b-input required v-model="username" type="text" placeholder="用户名"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="error" v-if="!$v.password.required">password is required</div>
        <div class="error" v-if="!$v.password.minLength">password must be exactly {{$v.password.$params.minLength.min}} letters.</div>
        <div class="col">
          <b-input required v-model="password" type="password" placeholder="密码"/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col">
          <div class="error" v-if="$v.repeatPassword.$invalid">repeatPassword should be the same as password</div>

          <b-input required v-model="repeatPassword" type="password" placeholder="再次确认密码"/>
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
import {sameAs,required, minLength, maxLength} from 'vuelidate/lib/validators'
export default {
  name: "SignUp",
  data(){
    return{
      phone:'',
      username: '',
      password: '',
      repeatPassword:'',
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
      if (!this.timer&&!this.$v.phone.$invalid) {
        getRegisterMsg({
          phone:this.phone
        }).then(r=>{
          console.log(r)
          if(r.data.code!=200){
            alert(r.data.msg)
          }else {
            alert("发送成功")
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
        });
      }else {
        alert("号码不合法！")
      }
    }
    ,
    register() {
      if (!this.$v.$invalid) {
        const {phone, username, password, code} = this
        register({
          phone, username, password, code
        }).then(r => {
          // console.log(r.data)
          alert(r.data.msg)
        })
      }
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(4)
    },
    phone: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11)
    },
    password: {
      required,
      minLength: minLength(4)
    },
    repeatPassword: {
      sameAsPassword:sameAs('password')
    },code: {
      required,
      minLength: minLength(4)

    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
  color: #000000;
}
.error{
  color: #f79086;
}
</style>