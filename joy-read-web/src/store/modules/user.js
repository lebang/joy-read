import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { userLogin, getUser, postRegister, getCaptcha } from '@apis/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({
      username: '',
      nickName: '',
      email: '',
    })

    const setUserInfo = (val) => {
      userInfo.value = val
    }

    const loginIn = async (login) => {
      const { response, loading }= await userLogin(login)
      const { user } = response
      // const { user } = await getUser({ id: response.userId })
      console.log('user response:', response)
      setUserInfo(user)
      return true
    }

    const register = async (data) => {
      const { response, loading } = await postRegister(data)
      console.log('res: 27', response)
      const { user } = response
      setUserInfo(user)
      return true
    }

    const fetchCaptcha = async (callback) => {
      const { response } = await getCaptcha()
      callback && callback(response)
    }

    return {
      userInfo,
      loginIn,
      register,
      fetchCaptcha,
    }
  },
  {
    persist: true,
  },
)
