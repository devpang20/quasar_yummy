<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded class="bg-grey-3">
      <template v-slot:avatar>
        <img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          style="width: 200px; height: 110px"
        >
      </template>

      간략한 설명
      <template v-slot:action>
        <q-btn flat label="자세히 보기" />
      </template>
    </q-banner>
  </div>
</template>

<script>

export default {
  methods: {
  }
}
</script>

<style>

</style>
