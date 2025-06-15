import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { userLogin, getUser } from '@apis/user'


export const useUserStore = defineStore('user', () => {
  const userInfo = ref({
    username: '',
    nickName: '',
    email: '',
  })

  const setUserInfo = (val) => {
    userInfo.value = val
  }

  const loginIn = async (login) => {
    const res = await userLogin(login)
    console.log('login user:', res);
    setUserInfo(res)
  }

  return {
    userInfo,
    loginIn
  }

})