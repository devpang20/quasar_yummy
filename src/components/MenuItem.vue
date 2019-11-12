<template>
  <q-item :to="{path: `/${item.slug}`}">
    <q-item-section avatar />
    <q-item-section>
      <q-item-label>{{item.name}}</q-item-label>
      <q-item-label caption>바로가기</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default () {
        return {
          slug: '',
          name: ''
        }
      }
    }
  }
}
</script>
