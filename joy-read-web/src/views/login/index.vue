<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-main>
        <el-form
          ref="loginForm"
          class="login-form"
          :model="loginFormData"
          :rules="rules"
          :validate-on-rule-change="false"
          @keyup.enter="submitForm"
        >
          <el-form-item prop="login">
            <el-input
              v-model="loginFormData.login"
              size="large"
              placeholder="请输入用户名"
              suffix-icon="user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginFormData.password"
              show-password
              size="large"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click="submitForm"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer></el-footer>
    </el-container>

  </div>
</template>
<script setup>
  // import HelloWorld from '@components/HelloWorld.vue'
  import { reactive, ref } from 'vue'
  import { useUserStore } from '@store/index'

  defineOptions({
    name: 'Login',
  })

  const loginForm = ref(null)
  const loginFormData = reactive({
    login: 'admin',
    password: '123456',
  })

  const checkUsername = (rule, value, callback) => {
    if (value.length < 5) {
      return callback(new Error('请输入正确的用户名'))
    } else {
      callback()
    }
  }
  const checkPassword = (rule, value, callback) => {
    if (value.length < 6) {
      return callback(new Error('请输入正确的密码'))
    } else {
      callback()
    }
  }

  const rules = reactive({
    login: [{ validator: checkUsername, trigger: 'blur' }],
    password: [{ validator: checkPassword, trigger: 'blur' }],
    captcha: [
      {
        message: '验证码格式不正确',
        trigger: 'blur'
      }
    ]
  })

  const userStore = useUserStore()
  const login = async () => {
    return await userStore.loginIn(loginFormData)
  }

  const submitForm = async () => {
    await loginForm.value.validate(async (v) => {
      if (!v) {
        // 未通过前端静态验证
        console.log('login: ', v)
        return false
      }

      // 通过验证，请求登陆
      const flag = await await userStore.loginIn(loginFormData)


      // 登陆成功
      return true
    })
  }

</script>

<style lang="less" scoped>
  .login-form {
    margin-top: 20%;
    margin-left: 50%;
    transform: translate(-50%, -50%);
  }
</style>