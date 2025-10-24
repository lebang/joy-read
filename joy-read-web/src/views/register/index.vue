<script setup>
  import { ref, reactive } from 'vue'
  import { useUserStore } from '@store/index'
  import { emiter } from '@utils/emiter'

  defineOptions({
    name: 'Register',
  })

  const registerForm = ref(null)
  const registerFormData = reactive({
    username: 'admin',
    email:'xx@yy.com',
    password: '123456',
    captchaKey: '',
    captchaText: ''
  })
  const captchaData = ref('');

  const checkUsername = (rule, value, callback) => {
    console.log('check:', rule, value, )
    if (!value.length) {
      return callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  }

  const rules = reactive({
    username: [{ validator: checkUsername, trigger: 'blur' }],
    email: [{ validator: checkUsername, trigger: 'blur' }],
    password: [{ validator: checkUsername, trigger: 'blur' }],
  })
  const userStore = useUserStore()

  const submitForm = async () => {
    await registerForm.value.validate(async (v) => {
      if (!v) {
        // 未通过前端静态验证
        console.log('login: ', v)
        return false
      }
      const flag = await userStore.register(registerFormData)
      if(!flag) return
      emiter.emit('router:admin')
    })
  }

  const fetchCaptcha = () => {
    userStore.fetchCaptcha((res) => {
      registerFormData.captchaKey = res.captchaKey
      captchaData.value = res.captchaData
    })
  } 
  fetchCaptcha();
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
            v-model="registerFormData.captchaText"
            size="large"
            placeholder="请输入验证码"
          />
        </el-col>
        <el-col :span="4">
          <div v-html="captchaData" @click="fetchCaptcha" v-tooltip="'点击刷新验证码'"></div>
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
