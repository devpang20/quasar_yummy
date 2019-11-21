import axios from 'axios'

const appAxios = axios.create({
  baseURL: 'http://yummy.taku.kr:5000/'
  // baseURL: 'http://10.100.101.81:5000/'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = appAxios
}
