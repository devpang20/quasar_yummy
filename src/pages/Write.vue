<template>
  <div class="q-pa-md">
      <div class="q-gutter-md">
        <q-checkbox v-for="item in apiRes" :key="item.slug" :val="item.slug" :label="item.name" v-model="categories" />
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
      <div class="q-gutter-y-md column">
        <q-input
          filled
          v-model="slug"
          label="slug (index로 쓸 영어 이름 ex)김밥천국의 경우 : kbHeaven)"
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
            @uploaded="uploaded"
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
        categories: this.categories,
        thumbnailSrc: this.data.data[0].thumbnailSrc,
        desc: this.desc
      })
        .then(res => {
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: '저장 완료'
          })
          this.reset()
        })
        .catch(() => {
          this.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: '모든 내용을 기입해주세요.'
          })
        })
    },
    uploaded (info) {
      const xhr = info.xhr
      const data = JSON.parse(xhr.response)
      this.data = data
    },
    reset () {
      this.slug = ''
      this.name = ''
      this.rating = 0
      this.categories = []
      this.thumbnailSrc = ''
      this.desc = ''
      // 파일 삭제 밑 빈칸 방지 alert 창 수정
    }
  }
}
</script>
