import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { userLogin, getUser, postRegister, getCaptcha } from '@apis/user'

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
    const { user } = res;
    // const { user } = await getUser({ id: res.userId })
    console.log('user res:', res)
    setUserInfo(user)
    return true
  }

  const register = async (data) => {
    const res = await postRegister(data);
    console.log('res: 27', res);
    const { user } = res
    setUserInfo(user)
    return true
  }

  const fetchCaptcha = async (callback) => {
    const res = await getCaptcha();
    callback && callback(res)
  }

  return {
    userInfo,
    loginIn,
    register,
    fetchCaptcha
  }
})
