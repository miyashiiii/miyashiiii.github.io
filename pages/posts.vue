<template>
  <div class="row justify-center">
    <div style="width: 940px">
      <div v-if="isValidQuery" class="q-mt-md q-ml-md">
        タグ:
        <q-chip
          removable
          class="text-caption"
          :label="route.query.tag"
          @remove="() => $router.push('/posts')"
        />
      </div>
      <!-- PC向け -->
      <div class="q-pa-lg row items-start q-gutter-lg gt-sm">
        <q-card v-for="post in posts" :href="post.url" style="width: 280px">
          <a
            :href="post.url"
            class="row items-center justify-center"
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
          </a>
          <q-card-section>
            <a :href="post.url" class="text-bold text-black no-decoration">
              {{ post.title }}
            </a>
            <div class="q-mt-xs text-grey-8">
              <span class="text-black">{{ post.date }}</span> -
              {{ getServiceNameFromUrl(post.url) }}
            </div>
            <NuxtLink :to="`/posts?tag=${tag}`" v-for="tag in post.tags">
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
        >
          <a :href="post.url">
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
          </a>
          <div class="col">
            <a :href="post.url" class="no-decoration">
              <div class="text-black text-bold">
                {{ post.title }}
              </div>
              <div class="q-mt-xs text-grey-8">
                <span class="text-black">{{ post.date }}</span> -
                {{ getServiceFromUrl(post.url).name }}
              </div>
            </a>
            <NuxtLink :to="`/posts?tag=${tag}`" v-for="tag in post.tags">
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
definePageMeta({
  layout: "default",
});

type Post = {
  title: string;
  date: string;
  url: string;
  tags: string[];
  img?: string;
};
import { is } from "quasar";
// TODO 一旦無視。後でちゃんと対応したい #6
// @ts-ignore
import postsJson from "./assets/posts.json";
const posts: Ref<Post[]> = ref([]);
const isValidQuery = ref(false);
const route = useRoute();

watchEffect(() => {
  posts.value = [];
  if (!route.query.tag) {
    posts.value = postsJson;
    isValidQuery.value = false;
    return;
  }
  for (const post of postsJson) {
    if (post.tags.includes(route.query.tag)) {
      posts.value.push(post);
    }
  }
  if (posts.value.length === 0) {
    posts.value = postsJson;
    isValidQuery.value = false;
  } else {
    isValidQuery.value = true;
  }
});

const getImgPath = (imgName: string): string => {
  return `/posts/${imgName}`;
};

type Service = {
  name: string;
  icon: string;
};
const getServiceFromUrl = (url: string): Service => {
  if (url.includes("hatenablog")) {
    return { name: "はてなブログ", icon: "/sns/hatenablog.svg" };
  } else if (url.includes("qiita")) {
    return { name: "Qiita", icon: "/sns/qiita.png" };
  } else if (url.includes("note")) {
    return { name: "note", icon: "/sns/note.png" };
  } else if (url.includes("zenn")) {
    return { name: "Zenn", icon: "/sns/zenn.png" };
  } else if (url.includes("docswell")) {
    return { name: "Docswell", icon: "/sns/docswell.png" };
  } else if (url.includes("sizu.me")) {
    return { name: "しずかなインターネット", icon: "/sns/sizu.png" };
  } else {
    throw new Error("invalid url");
  }
};
const getServiceNameFromUrl = (url: string): string => {
  return getServiceFromUrl(url).name;
};
const getServiceIconFromUrl = (url: string): string => {
  return getServiceFromUrl(url).icon;
};
</script>
