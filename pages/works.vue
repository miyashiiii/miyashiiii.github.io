<template>
  <div class="row justify-center">
    <div style="max-width: 940px">
      <div
        class="q-pt-lg row items-start q-gutter-lg"
        :class="$q.screen.lt.md ? 'justify-around' : 'justify-between'"
      >
        <q-card
          v-for="post in works"
          :href="post.url"
          :style="$q.screen.lt.md ? 'width:75%' : 'width: 280px;'"
          class=""
        >
          <NuxtLink
            :to="post.url"
            class="row items-center justify-center bg-grey-2"
          >
            <q-img
              :src="post.thumbnail"
              fit="scale-down"
              style="height: 150px"
              no-spinner
            />
          </NuxtLink>
          <q-card-section>
            <NuxtLink :to="post.url" class="text-bold text-black no-decoration">
              {{ post.title }}
            </NuxtLink>
            <div class="q-mt-xs text-grey-8">{{ post.subtitle }}</div>
            <q-chip
              v-for="tag in post.tags"
              class="text-caption q-ml-none"
              :label="tag"
              :ripple="false"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
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
    tags: ["Nuxt", "Quasar", "GitHub Pages"],
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
