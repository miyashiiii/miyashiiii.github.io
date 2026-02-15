<template>
  <div class="fixed-center full-width row justify-center items-center">
    <div class="profile-container">
      <!-- アイコン画像 -->
      <q-img
        :src="imagePath"
        no-spinner
        class="profile-image"
      />

      <!-- 説明 & リンク群 -->
      <div class="profile-info">
        <div class="q-gutter-sm profile-text">
          <div class="profile-name">
            <span class="main-name">Miyashita Yosuke</span>
            <span class="sub-name">(miyashiiii)</span>
          </div>
          <div class="profile-title">Software Engineer</div>
          <div class="row items-center q-gutter-x-xs profile-location">
            <q-icon name="place" class="location-icon" />
            <div class="location-text">Saitama, Japan</div>
          </div>
        </div>

        <!-- SNSリンク -->
        <div class="row profile-links q-mt-md">
          <div v-for="(link, index) in links" :key="index" class="link-item">
            <NuxtLink :to="link.url">
              <q-img
                no-spinner
                :src="link.icon"
                class="sns-icon"
                :class="{ 'sns-icon-small': link.small }"
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

.profile-text {
  font-size: 1.2rem;
}

.profile-name {
  font-size: 1.2rem;
}

.main-name {
  font-weight: bold;
}

.sub-name {
  font-weight: normal;
  font-size: 1rem;
  margin-left: 0.3rem;
}

.profile-title {
  font-size: 1.2rem;
}

.profile-location {
  justify-content: center;
}

.location-icon {
  font-size: 1.2rem;
}

.location-text {
  font-size: 0.9rem;
}

.profile-links {
  justify-content: center;
}

.link-item {
  margin: 0 0.75rem;
}

.sns-icon {
  width: 32px;
}

.sns-icon-small {
  width: 28px;
}

.profile-image {
  height: 300px;
  width: 300px;
}

/* PC: 横並び（説明左、アイコン右） */
@media (min-width: 1024px) {
  .profile-container {
    flex-direction: row-reverse;
    gap: 0rem;
    text-align: left;
    max-width: 90%;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile-text {
    font-size: 2rem;
  }

  .profile-name {
    font-size: 2.8rem;
  }

  .main-name {
    font-weight: bold;
  }

  .sub-name {
    font-weight: normal;
    font-size: 1.8rem;
    display: block;
    margin-top: -0.5rem;
    margin-bottom: 2rem;
  }

  .profile-title {
    font-size: 1.8rem;
  }

  .profile-location {
    justify-content: flex-start;
  }

  .location-icon {
    font-size: 1.8rem;
    margin-left: -4px;
  }

  .location-text {
    font-size: 1.4rem;
  }

  .profile-links {
    justify-content: flex-start;
  }

  .link-item {
    margin-right: 1.5rem;
  }

  .link-item:first-child {
    margin-left: 0;
  }

  .sns-icon {
    width: 40px;
  }

  .sns-icon-small {
    width: 36px;
  }

  .profile-image {
    height: 400px;
    width: 400px;
  }
}
</style>
