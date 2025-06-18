<script setup>
  import { ref, reactive } from 'vue'
  import { getCaptcha } from '@apis/user'
  defineOptions({
    name: 'Register',
  })

  const registerForm = ref(null)
  const registerFormData = reactive({
    username: 'admin',
    email:'xx@yy.com',
    password: '123456',
    captchaKey: '',
  })

  const captcha = reactive({
    captchaKey: '',
    captchaData: ''
  })
  const rules = reactive({})

  const submitForm = async () => {

  }

  const fetchCaptcha = async () => {
    const res = await getCaptcha();
    console.log('captcha:', res);
    captcha.captchaKey = res.captchaKey
    captcha.captchaData = res.captchaData
  }
  fetchCaptcha()
  console.log('captcha:', captcha);
</script>
<template>
  <div class="container">
    <el-form
      ref="registerForm"
      class="register-form"
      :model="registerFormData"
      :rules="rules"
      :validate-on-rule-change="false"
      @keyup.enter="submitForm"
    >
      <el-form-item prop="username">
        <el-input
          v-model="registerFormData.username"
          size="large"
          placeholder="请输入用户名"
          suffix-icon="user"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="registerFormData.email"
          size="large"
          placeholder="请输入用户名"
          suffix-icon="email"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="registerFormData.password"
          show-password
          size="large"
          type="password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item prop="captchaKey">
        <el-col :span="20">
          <el-input
            v-model="registerFormData.captchaKey"
            show-password
            size="large"
            type="text"
            placeholder="请输入验证码"
          />
        </el-col>
        <el-col :span="2">
          <div v-html="captcha.captchaData" @click="fetchCaptcha" title="点击刷新验证码"></div>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          @click="submitForm"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped>
  .register-form {
    margin-top: 60px;
  }
</style>
