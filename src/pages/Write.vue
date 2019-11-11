<template>
  <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-radio v-for="item in apiRes" :key="item.slug" :val="item.slug" :label="item.name" v-model="slug" />
      </div>
      <br>
      <div class="q-gutter-y-md column">
        <q-input
          filled
          v-model="name"
          label="가게이름"
        />
      </div>
      <br>
      <q-input
        v-model="desc"
        filled
        type="textarea"
        label="설명"
      />
      <br>
      <div class="q-gutter-y-md column">
        <q-rating
            v-model="rating"
            size="3.5em"
            color="blue-5"
            icon="star_border"
            icon-selected="star"
        />
      </div>
      <br>
      <div class="q-gutter-sm row items-start">
        <q-uploader
            url="http://yummy.taku.kr:5000/upload"
            style="max-width: 300px"
            field-name="files"
            :auto-upload="true"
        />
      </div>
      <br>
      <div>
        <q-btn v-on:click="submitData" label="Submit" color="primary" />
      </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      apiRes: '',
      slug: '',
      name: '',
      rating: 0,
      thumbnailSrc: '',
      categories: [],
      desc: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$axios.get('/')
        .then(res => {
          this.apiRes = res.data.data
        })
    },
    submitData () {
      this.$axios.post('/restaurants', {
        slug: this.slug,
        name: this.name,
        rating: this.rating,
        categories: ['치킨'],
        thumbnailSrc: '/f/1573473932656aW1hZ2VzLnBuZw==.png',
        desc: this.desc
      })
    }
  }
}
</script>
