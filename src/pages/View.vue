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
    <div>
      {{apiRes.comment}}
    </div>
    <br>
    댓글쓰기
    <q-input
      filled
      v-model="name"
      label="작성자"
    />
    <q-input
      v-model="comment"
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
    <div style="width: 100%; max-width: 400px">
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['hey, how are you?']"
        sent
        stamp="7 minutes ago"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="[`doing fine, how r you?`]"
        stamp="4 minutes ago"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiRes: '',
      name: '',
      actor: '',
      comment: '',
      rating: ''
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
      console.log(1)
    }
  }
}
</script>
