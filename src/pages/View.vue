<template>
  <div class="q-gutter-y-md column">
    <br>
    <q-field outlined label="가게이름" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">{{apiRes.restaurant.name}}</div>
      </template>
    </q-field>
    <q-field outlined label="설명" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">{{apiRes.restaurant.desc}}</div>
      </template>
    </q-field>
    <q-field outlined label="평점" stack-label>
      <q-rating
        v-model="apiRes.restaurant.score"
        size="1.5em"
        color="blue-5"
        icon="star_border"
        icon-selected="star"
        readonly
      />
    </q-field>
    <div class="desc" v-html="apiRes.detail.desc" />
    <div class="map" v-html="apiRes.detail.map" />
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
        v-model="score"
        size="3.5em"
        color="blue-5"
        icon="star_border"
        icon-selected="star"
    />
    <div>
      <q-btn v-on:click="submitData" label="Submit" color="primary" />
    </div>
    <div v-for="item in apiRes.detail.comments" :key=item.id >
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          :name="item.commentator.name"
          avatar="../statics/icons/user.png"
          :text="[item.content]"
          sent
        />
        <q-rating
          v-model="item.score"
          size="1.5em"
          color="blue-5"
          icon="star_border"
          icon-selected="star"
          readonly
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiRes: {
        restaurant: {
          score: 0,
          name: '',
          desc: ''
        },
        detail: {
          desc: '',
          map: '',
          comments: []
        }
      },
      name: '',
      commentator: '',
      content: '',
      score: 0
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
    },
    submitData () {
      this.$axios.post('restaurants/' + this.apiRes.detail.id + '/comment', {
        content: this.content,
        score: this.score,
        commentator: {
          'type': 'guest',
          'mid': '',
          'name': this.name
        }
      })
        .then(res => {
          this.apiRes.detail.comments.push(res.data.data)
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
      this.score = 0
    }
  }
}
</script>
