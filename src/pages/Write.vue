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
      <div class="q-gutter-sm row items-start">
        <q-uploader
            ref="uploader"
            url="http://yummy.taku.kr:5000/upload"
            style="max-width: 300px"
            field-name="files"
            :auto-upload="true"
            @uploaded="uploaded"
        />
      </div>
      <br>
      <p>지도</p>
       <q-input
        v-model="mapTag"
        filled
        type="textarea"
        label="지도 api 호출 테그"
      />
      <br>
      <p>상세설명</p>
      <q-editor v-model="descTag" min-height="5rem" />
      <br>
      <p>댓글쓰기<p>
      <q-input
        filled
        v-model="commentator"
        label="작성자"
      />
      <br>
      <q-input
        v-model="content"
        filled
        type="textarea"
        label="설명"
      />
      <div class="q-gutter-y-md column">
        <q-rating
            v-model="score"
            size="3.5em"
            color="blue-5"
            icon="star_border"
            icon-selected="star"
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
      score: 0,
      thumbnailSrc: '',
      categories: [],
      desc: '',
      mapTag: '',
      descTag: '',
      commentator: '',
      content: ''
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
        restaurant: {
          slug: this.slug,
          name: this.name,
          categories: this.categories,
          desc: this.desc,
          thumbnailSrc: (this.data) ? this.data.data[0].thumbnailSrc : null
        },
        detail: {
          map: this.mapTag,
          desc: this.descTag
        },
        comment: {
          score: this.score,
          content: this.content,
          commentator: {
            'type': 'guest',
            'mid': '',
            'name': this.commentator
          }
        }
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
      this.score = 0
      this.categories = []
      this.thumbnailSrc = ''
      this.desc = ''
      this.descTag = ''
      this.mapTag = ''
      this.$refs.uploader.removeUploadedFiles()
    }
  }
}
</script>
