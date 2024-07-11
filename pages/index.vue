<template>
  <div class="fixed-center full-width row justify-center items-center">
    <div class="col q-gutter-y-lg">
      <div class="row justify-center items-center q-gutter-x-lg">
        <q-img
          :src="imagePath"
          no-spinner
          style="height: 300px; width: 300px"
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
              no-spinner
              :src="link.icon"
              :width="link.small ? '28px' : '32px'"
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
    url: "https://twitter.com/mysh_iiii",
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
</script>
