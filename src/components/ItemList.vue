<template>
  <q-banner cal= "item.slug" rounded class="bg-grey-3">
    <template v-slot:avatar>
      <img
        :src="`/${item.thumbnailSrc}`"
        style="width: 200px; height: 110px"
      >
    </template>
    <strong>{{item.name}}</strong>
    <br>
    {{item.desc}}
    <br>
    평가자 수 : {{item.raters}}
    <br>
    추천점수
    <q-rating
      v-model="divide"
      size="1.5em"
      color="blue-5"
      icon="star_border"
      icon-selected="star"
      readonly
    />
    (평균 {{divide}} 점)
    <template v-slot:action>
      <q-btn flat label="자세히 보기" :to="{path: `restaurants/${item.slug}`}"/>
    </template>
  </q-banner>
</template>

<script>
export default {
  name: 'ItemList',
  props: {
    item: {
      type: Object,
      default () {
        return {
          id: '',
          categories: [],
          slug: '',
          name: '',
          desc: '',
          score: 0,
          raters: '',
          thumbnailSrc: ''
        }
      }
    }
  },
  computed: {
    divide: function () {
      return (Math.round(this.item.score / this.item.raters))
    }
  }
}
</script>
