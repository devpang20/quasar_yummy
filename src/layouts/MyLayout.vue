<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          Yummy App
        </q-toolbar-title>

        <div>Yummy v 0.6</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>바로가기</q-item-label>
        <q-expansion-item
          expand-separator
          icon="menu"
          label="메인"
          caption="메뉴 고르기"
        >
          <menu-item v-for="item in apiRes" :key="item.slug" :item="item" />
        </q-expansion-item>
        <menu-write />
        <menu-push />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import MenuItem from 'components/MenuItem.vue'
import MenuWrite from 'components/MenuWrite.vue'
import MenuPush from 'components/MenuPush.vue'

export default {
  name: 'MyLayout',
  components: { MenuItem, MenuWrite, MenuPush },
  data () {
    return {
      leftDrawerOpen: false,
      apiRes: ''
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
    }
  }
}
</script>
