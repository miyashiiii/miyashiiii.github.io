<template>
  <div class="fixed-center full-width row justify-center items-center">
    <div class="profile-container">
      <!-- アイコン画像 -->
      <q-img
        :src="imagePath"
        no-spinner
        style="height: 300px; width: 300px"
        class="profile-image"
      />

      <!-- 説明 & リンク群 -->
      <div class="profile-info">
        <div class="q-gutter-sm" style="font-size: 1.2rem">
          <div class="text-weight-bold">miyashiiii</div>
          <div>Software Engineer</div>
          <div class="row items-center q-gutter-x-xs justify-center">
            <q-icon name="place" size="1.2rem" />
            <div style="font-size: 0.9rem">Saitama, Japan</div>
          </div>
        </div>

        <!-- SNSリンク -->
        <div class="row justify-center q-mt-md">
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
</script>

<style scoped>
/* スマホ: 縦並び（デフォルト） */
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

/* PC: 横並び（説明左、アイコン右） */
@media (min-width: 1024px) {
  .profile-container {
    flex-direction: row-reverse;
    gap: 3rem;
    text-align: left;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
