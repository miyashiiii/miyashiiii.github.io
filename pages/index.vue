<template>
  <div class="page-wrap fixed-center full-width row justify-center items-center">
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
        <div class="profile-links-grid q-mt-md">
          <NuxtLink
            v-for="(link, index) in links"
            :key="index"
            :to="link.url"
            class="link-card"
          >
            <q-img
              no-spinner
              :src="link.icon"
              class="sns-icon"
            />
            <span class="link-label">{{ link.label }}</span>
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
    label: "X",
  },
  {
    url: "https://miyashiiii.hatenablog.jp/",
    icon: "/sns/hatenablog.png",
    label: "Hatena Blog",
  },
  {
    url: "https://qiita.com/miyashiiii",
    icon: "/sns/qiita.png",
    label: "Qiita",
  },
  {
    url: "https://github.com/miyashiiii",
    icon: "/sns/github.png",
    label: "GitHub",
  },
  {
    url: "https://sizu.me/miyashiiii",
    icon: "/sns/sizu.png",
    label: "Sizu",
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

.profile-links-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  gap: 0.75rem;
  justify-items: stretch;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  background: #ffffff;
  color: #111111;
  text-decoration: none;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.link-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.sns-icon {
  width: 24px;
  height: 24px;
}

.link-label {
  font-size: 0.95rem;
  font-weight: 600;
}

.profile-image {
  height: 300px;
  width: 300px;
}

/* PC: 横並び（説明左、アイコン右） */
@media (min-width: 1024px) {
  .page-wrap {
    align-items: flex-start;
  }

  .profile-container {
    flex-direction: row-reverse;
    gap: 0rem;
    text-align: left;
    max-width: 90%;
    align-items: flex-start;
  }

  .profile-image {
    align-self: flex-start;
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .profile-text {
    font-size: 1.6rem;
    line-height: 1.35;
  }

  .profile-name {
    font-size: 2.2rem;
  }

  .main-name {
    font-weight: bold;
  }

  .sub-name {
    font-weight: normal;
    font-size: 1.4rem;
    display: block;
    margin-top: -0.2rem;
    margin-bottom: 0.8rem;
  }

  .profile-title {
    font-size: 1.4rem;
  }

  .profile-location {
    justify-content: flex-start;
  }

  .location-icon {
    font-size: 1.4rem;
    margin-left: -4px;
  }

  .location-text {
    font-size: 1.1rem;
  }

  .profile-links-grid {
    grid-template-columns: repeat(2, minmax(180px, 1fr));
    gap: 1rem;
  }

  .sns-icon {
    width: 26px;
    height: 26px;
  }

  .link-label {
    font-size: 1rem;
  }

  .profile-image {
    height: 400px;
    width: 400px;
  }
}
</style>
