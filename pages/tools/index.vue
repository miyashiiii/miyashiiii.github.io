<template>
  <main class="wrap" style="padding-bottom: 80px">
    <div class="page-head">
      <h1>Tools</h1>
    </div>

    <div class="works-grid">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.title"
        :to="tool.url"
        class="work"
      >
        <div class="body">
          <div class="title">{{ tool.title }}</div>
          <div class="sub">{{ tool.subtitle }}</div>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
useHead({ title: "Tools" });

const tools = [
  {
    title: "文字数カウンター",
    subtitle: "テキストの文字数をカウント",
    url: "/tools/character-counter",
  },
  {
    title: "HEIC to PNG 変換",
    subtitle: "HEIC形式の画像をPNG形式に変換",
    url: "/tools/heic-to-png",
  },
  {
    title: "EXIFビューア",
    subtitle: "画像ファイルのEXIF情報を確認",
    url: "/tools/exif-viewer",
  },
];
</script>
