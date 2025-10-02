<template>
  <div class="fixed-center full-width row justify-center items-center">
    <div
      v-if="isLoading"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: white; display: flex; align-items: center; justify-content: center; z-index: 9999"
    >
      <q-spinner
        color="primary"
        size="50px"
      />
    </div>
    
    <div class="col q-gutter-y-lg" :style="{ opacity: isLoading ? 0 : 1 }">
      <div class="row justify-center items-center q-gutter-x-lg">
        <q-img
          :src="imagePath"
          style="height: 300px; width: 300px"
          @load="onImageLoad"
        />
        <div
          class="justify-center q-gutter-sm text-center"
          style="font-size: 1.2rem"
        >
          <div class="text-weight-bold">miyashiiii</div>
          <div>Software engineer</div>
          <div>Saitama, Japan</div>
        </div>
      </div>

      <!-- SNSリンク -->
      <div class="row justify-center">
        <div v-for="(link, index) in links" :key="index" class="q-mx-md">
          <NuxtLink :to="link.url">
            <q-img
              :src="link.icon"
              :width="link.small ? '28px' : '32px'"
              @load="onImageLoad"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

const imagePath = "/miyashiiii.png";
const links = [
  {
    url: "https://twitter.com/miyashiiii_x",
    icon: "/sns/x.png",
    small: true,
  },
  {
    url: "https://miyashiiii.hatenablog.jp/",
    icon: "/sns/hatenablog.png",
  },
  {
    url: "https://qiita.com/miyashiiii",
    icon: "/sns/qiita.png",
  },
  {
    url: "https://github.com/miyashiiii",
    icon: "/sns/github.png",
  },
  {
    url: "https://sizu.me/miyashiiii",
    icon: "/sns/sizu.png",
  },
];

const isLoading = ref(true);
const totalImages = 1 + links.length;
const loadedImages = ref(0);

const onImageLoad = () => {
  loadedImages.value++;
  if (loadedImages.value >= totalImages) {
    isLoading.value = false;
  }
};
</script>
