import axios from 'axios'

const appAxios = axios.create({
  baseURL: 'http://yummy.taku.kr:5000/'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = appAxios
}
