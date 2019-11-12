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
            readonly
        />
      </div>
      <br>
      <div class="q-gutter-sm row items-start">
        <img
          :src="`http://yummy.taku.kr:5000${item.thumbnailSrc}`"
          style="width: 300px; height: 210px"
        >
      </div>
      <br>
      <div>
        <q-btn v-on:click="submitData" label="Submit" color="primary" />
      </div>
  </div>
</template>

<script>
export default {

}
</script>
