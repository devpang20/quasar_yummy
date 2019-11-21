import axios from 'axios'

const appAxios = axios.create({
  baseURL: '/api'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = appAxios
}
