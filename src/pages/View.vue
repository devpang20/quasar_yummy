<template>
  <div>
    View
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiRes: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$axios.get(this.$route.path)
        .then(res => {
          this.apiRes = res.data.data
          console.log(res.data)
        })
    }
  }
}
</script>
