<template>
  <div class="q-gutter-y-md column">
    <q-field outlined label="가게이름" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">가게 이름이 들어갈거다.</div>
      </template>
    </q-field>
        <q-field outlined label="설명" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">설명충 들어갈거다.</div>
      </template>
    </q-field>
    <div class="desc" v-html="apiRes.desc" />
    <div class="map" v-html="apiRes.map" />
    <br>
    댓글쓰기
    <q-input
      filled
      v-model="name"
      label="작성자"
    />
    <q-input
      v-model="content"
      filled
      type="textarea"
      label="설명"
    />
    <q-rating
        v-model="rating"
        size="3.5em"
        color="blue-5"
        icon="star_border"
        icon-selected="star"
    />
    <div>
      <q-btn v-on:click="submitData" label="Submit" color="primary" />
    </div>
    <div v-for="item in apiRes.comments" :key=item.id >
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          :name="item.commentator.name"
          avatar="../statics/icons/user.png"
          :text="[item.content]"
          sent
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiRes: '',
      name: '',
      commentator: '',
      content: '',
      rating: 0
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
        })
    },
    submitData () {
      this.$axios.post(this.$route.path + '/comment', {
        content: this.content,
        rating: this.rating,
        commentator: {
          'type': 'guest',
          'mid': '',
          'name': this.name
        }
      })
        .then(res => {
          this.apiRes.comments.push(res.data.data)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: '작성 완료'
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
    reset () {
      this.name = ''
      this.content = ''
      this.rating = 0
    }
  }
}
</script>
