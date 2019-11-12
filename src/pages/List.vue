<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner v-for="item in apiRes" :key="item.slug" :cal="item.slug" rounded class="bg-grey-3">
      <template v-slot:avatar>
        <img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          style="width: 200px; height: 110px"
        >
      </template>
      <strong>{{item.name}}</strong>
      <br>
      {{item.desc}}
      <br>
      <q-rating
        v-model="item.rating"
        size="1.5em"
        color="blue-5"
        icon="star_border"
        icon-selected="star"
        readonly
      />
      <template v-slot:action>
        <q-btn flat label="자세히 보기" />
      </template>
    </q-banner>
  </div>
</template>

<script>

export default {
  data () {
    return {
      apiRes: '',
      id: '',
      categories: '',
      slug: '',
      name: '',
      desc: '',
      rating: '',
      thumbnailSrc: ''
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
          console.log(res.data.data)
        })
    }
  }
}
</script>

<style>

</style>
