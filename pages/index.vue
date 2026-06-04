<template>
  <main class="wrap home-wrap">
    <section class="hero">
      <div class="ill">
        <img src="/miyashiiii.png" alt="Miyashita Yosuke" />
      </div>
      <h1 class="name">Miyashita Yosuke</h1>
      <span class="handle">@miyashiiii</span>
      <div class="role">Software Engineer · Saitama, Japan</div>
      <p class="bio">
        Python や TypeScript での Web システム開発をしています。個人ではブログを書いたりしています。1児の父。
      </p>
      <div class="sns">
        <a
          v-for="link in snsLinks"
          :key="link.label"
          :href="link.url"
          target="_blank"
          rel="noopener"
          :aria-label="link.label"
        >
          <img :src="link.icon" :alt="link.label" />
        </a>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });

const snsLinks = [
  { label: "X", url: "https://twitter.com/miyashiiii_x", icon: "/sns/x.png" },
  { label: "Hatena", url: "https://miyashiiii.hatenablog.jp/", icon: "/sns/hatenablog.png" },
  { label: "Qiita", url: "https://qiita.com/miyashiiii", icon: "/sns/qiita.png" },
  { label: "GitHub", url: "https://github.com/miyashiiii", icon: "/sns/github.png" },
  { label: "sizu.me", url: "https://sizu.me/miyashiiii", icon: "/sns/sizu.png" },
];
</script>
