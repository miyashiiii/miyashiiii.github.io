<template>
  <main class="wrap" style="padding-bottom: 80px">
    <div class="page-head">
      <h1>Works</h1>
    </div>

    <div class="works-grid">
      <a
        v-for="work in works"
        :key="work.title"
        :href="work.url"
        class="work"
        v-bind="work.url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}"
      >
        <div class="thumb">
          <img :src="work.thumbnail" :alt="work.title" />
        </div>
        <div class="body">
          <div class="title">{{ work.title }}</div>
          <div class="sub">{{ work.subtitle }}</div>
          <div class="tags">
            <span v-for="tag in work.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="ext">{{ work.url.startsWith("http") ? "View ↗" : "Open →" }}</div>
        </div>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
useHead({ title: "Works" });

const works = [
  {
    title: "ポートフォリオ",
    subtitle: "このサイト",
    thumbnail: "/works/portfolio.png",
    url: "/",
    tags: ["Nuxt", "Quasar", "Cloudflare Pages"],
  },
  {
    title: "数読",
    subtitle: "Androidアプリ",
    thumbnail: "/works/sudoku.png",
    url: "https://play.google.com/store/apps/details?id=com.miyashiiii.sudoku",
    tags: ["Android", "Flutter", "Dart"],
  },
  {
    title: "TapNum",
    subtitle: "Androidアプリ",
    thumbnail: "/works/tapnum.png",
    url: "https://play.google.com/store/apps/details?id=com.miyashiiii.tapnum",
    tags: ["Android", "Unity", "C#"],
  },
];
</script>
