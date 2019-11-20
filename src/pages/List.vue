<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner v-for="item in apiRes" :key="item.slug" :cal="item.slug" rounded class="bg-grey-3">
      <template v-slot:avatar>
        <img
          :src="`http://yummy.taku.kr:5000${item.thumbnailSrc}`"
          style="width: 200px; height: 110px"
        >
      </template>
      <strong>{{item.name}}</strong>
      <br>
      {{item.desc}}
      <br>
      <q-rating
        v-model="item.score"
        size="1.5em"
        color="blue-5"
        icon="star_border"
        icon-selected="star"
        readonly
      />
      <template v-slot:action>
        <q-btn flat label="자세히 보기" :to="{path: `restaurants/${item.slug}`}"/>
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
      categories: [],
      slug: '',
      name: '',
      desc: '',
      score: '',
      commentators: '',
      thumbnailSrc: ''
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
        })
    }
  }
}
</script>

<style>

</style>
