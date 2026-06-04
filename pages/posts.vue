<template>
  <main class="wrap" style="padding-bottom: 80px">
    <div class="page-head">
      <h1>Posts</h1>
    </div>

    <div class="filter">
      <span class="flabel">Tags</span>
      <button
        class="chip"
        :class="{ active: !activeTag }"
        @click="setTag(null)"
      >All</button>
      <button
        v-for="tag in allTags"
        :key="tag"
        class="chip"
        :class="{ active: activeTag === tag }"
        @click="setTag(tag)"
      >
        {{ tag }}<span v-if="activeTag === tag" class="x">×</span>
      </button>
    </div>

    <div v-if="posts.length === 0" class="empty">該当する記事がありません。</div>
    <div v-else class="grid">
      <a
        v-for="post in posts"
        :key="post.title"
        :href="post.url"
        target="_blank"
        rel="noopener"
        class="card"
      >
        <div class="thumb">
          <img
            v-if="post.img"
            :src="`/posts/${post.img}`"
            :alt="post.title"
            class="cover"
            loading="lazy"
          />
          <img
            v-else
            :src="serviceOf(post.url).icon"
            :alt="serviceOf(post.url).name"
            class="svc"
          />
        </div>
        <div class="body">
          <div class="title">{{ post.title }}</div>
          <div class="meta">
            <span class="date">{{ post.date }}</span>
            <span class="dotsep"></span>
            <span>{{ serviceOf(post.url).name }}</span>
          </div>
          <div class="tags">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="tag"
              @click.prevent="setTag(tag)"
            >{{ tag }}</span>
          </div>
        </div>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
useHead({ title: "Posts" });

import type { Post } from "~/types/post";

const route = useRoute();
const router = useRouter();

const { data: allPosts } = await useFetch<Post[]>("/api/posts");

const activeTag = computed(() => route.query.tag?.toString() ?? null);

const allTags = computed(() =>
  [...new Set((allPosts.value ?? []).flatMap((p) => p.tags))]
);

const posts = computed(() => {
  const list = allPosts.value ?? [];
  if (!activeTag.value) return list;
  return list.filter((p) => p.tags.includes(activeTag.value!));
});

const setTag = (tag: string | null) => {
  router.replace({ query: tag ? { tag } : {} });
};

type Service = { name: string; icon: string };
const SERVICES: (Service & { pattern: string })[] = [
  { name: "はてなブログ", icon: "/sns/hatenablog.svg", pattern: "hatenablog" },
  { name: "Qiita", icon: "/sns/qiita.png", pattern: "qiita" },
  { name: "note", icon: "/sns/note.png", pattern: "note" },
  { name: "Zenn", icon: "/sns/zenn.png", pattern: "zenn" },
  { name: "Docswell", icon: "/sns/docswell.png", pattern: "docswell" },
  { name: "しずかなインターネット", icon: "/sns/sizu.png", pattern: "sizu.me" },
];

const serviceOf = (url: string): Service =>
  SERVICES.find((s) => url.includes(s.pattern)) ?? { name: "Web", icon: "/sns/github.png" };
</script>
