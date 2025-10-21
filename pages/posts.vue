<template>
  <div class="row justify-center">
    <div style="width: 940px">
      <div v-if="isValidQuery" class="q-mt-md q-ml-md">
        タグ:
        <q-chip
          removable
          class="text-caption"
          :label="route.query.tag?.toString()"
          @remove="() => $router.push('/posts')"
        />
      </div>
      <!-- PC向け -->
      <div class="q-pa-lg row items-stretch q-gutter-lg gt-sm">
        <q-card
          v-for="post in posts"
          :href="post.url"
          style="width: 280px"
          :key="post.title"
        >
          <NuxtLink
            :to="post.url"
            class="row items-center justify-center bg-grey-3"
            style="height: 120px"
          >
            <q-img
              v-if="post.img"
              :src="getImgPath(post.img)"
              fit="scale-down"
              style="height: 120px"
              no-spinner
            />
            <q-img
              v-else
              :src="getServiceIconFromUrl(post.url)"
              style="height: 50px; width: 50px"
              no-spinner
            />
          </NuxtLink>
          <q-card-section>
            <NuxtLink :to="post.url" class="text-bold text-black no-decoration">
              {{ post.title }}
            </NuxtLink>
            <div class="q-mt-xs text-grey-8">
              <span class="text-black">{{ post.date }}</span> -
              {{ getServiceNameFromUrl(post.url) }}
            </div>
            <NuxtLink
              :to="`/posts?tag=${tag}`"
              v-for="tag in post.tags"
              :key="tag"
            >
              <q-chip class="text-caption q-ml-none" :label="tag" />
            </NuxtLink>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- スマホ向け -->
    <div class="q-mt-sm lt-md">
      <q-list separator>
        <q-item
          class="q-gutter-x-md items-center bg-white"
          v-for="post in posts"
          :key="post.title"
        >
          <NuxtLink :to="post.url">
            <div
              style="width: 120px; height: 80px"
              class="row justify-center items-center bg-grey-3"
            >
              <q-img
                v-if="post.img"
                :src="getImgPath(post.img)"
                fit="scale-down"
                style="height: 80px"
                no-spinner
              />
              <q-img
                v-else
                :src="getServiceFromUrl(post.url).icon"
                style="height: 50px; width: 50px"
                no-spinner
              />
            </div>
          </NuxtLink>
          <div class="col">
            <NuxtLink :to="post.url" class="no-decoration">
              <div class="text-black text-bold">
                {{ post.title }}
              </div>
              <div class="q-mt-xs text-grey-8">
                <span class="text-black">{{ post.date }}</span> -
                {{ getServiceFromUrl(post.url).name }}
              </div>
            </NuxtLink>
            <NuxtLink
              :to="`/posts?tag=${tag}`"
              v-for="tag in post.tags"
              :key="tag"
            >
              <q-chip class="text-caption q-ml-none" :label="tag" />
            </NuxtLink>
          </div>
        </q-item>
        <q-separator color="grey-4" />
      </q-list>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
useHead({ title: "Posts" });

import type { Post } from "~/types/post";

const route = useRoute();
const router = useRouter();

const tag = computed(() => route.query.tag?.toString());

const { data: posts, refresh } = await useFetch<Post[]>("/api/posts", {
  query: computed(() => ({ tag: tag.value })),
});

const isValidQuery = computed(() => {
  return !!tag.value && posts.value && posts.value.length > 0;
});

watch(tag, () => {
  refresh();
});

const getImgPath = (imgName: string): string => {
  return `/posts/${imgName}`;
};

type Service = {
  name: string;
  icon: string;
};
const getServiceFromUrl = (url: string): Service => {
  const services = [
    {
      name: "はてなブログ",
      icon: "/sns/hatenablog.svg",
      pattern: "hatenablog",
    },
    { name: "Qiita", icon: "/sns/qiita.png", pattern: "qiita" },
    { name: "note", icon: "/sns/note.png", pattern: "note" },
    { name: "Zenn", icon: "/sns/zenn.png", pattern: "zenn" },
    { name: "Docswell", icon: "/sns/docswell.png", pattern: "docswell" },
    {
      name: "しずかなインターネット",
      icon: "/sns/sizu.png",
      pattern: "sizu.me",
    },
  ];

  const service = services.find((service) => url.includes(service.pattern));
  if (service) {
    return { name: service.name, icon: service.icon };
  } else {
    throw new Error("invalid url");
  }
};
const getServiceNameFromUrl = (url: string): string =>
  getServiceFromUrl(url).name;
const getServiceIconFromUrl = (url: string): string =>
  getServiceFromUrl(url).icon;
</script>
