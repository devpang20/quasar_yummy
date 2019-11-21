<template>
  <div class="q-pa-md q-gutter-sm">
    <item-list v-for="item in apiRes" :key="item.slug" :item="item" />
  </div>
</template>

<script>

import ItemList from 'components/ItemList.vue'

export default {
  components: { ItemList },

  data () {
    return {
      apiRes: ''
    }
  },
  created () {
    this.fetchData(this.$route.path)
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchData(to.path)
    next()
  },
  methods: {
    fetchData (path) {
      this.$axios.get(path)
        .then(res => {
          this.apiRes = res.data.data
          console.log(res.data.data)
        })
    }
  }
}
</script>

<style>

</style>
