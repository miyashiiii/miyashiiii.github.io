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
          <q-card-section>
            <a :href="post.url" class="text-bold text-black no-decoration">
              {{ post.title }}
            </a>
            <div class="q-mt-xs text-grey-8">
              <span class="text-black">{{ post.date }}</span> -
              {{ post.postTitle }}
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
          <div class="col">
            <a :href="post.url" class="no-decoration">
              <div class="text-black text-bold">
                {{ post.title }}
              </div>
              <div class="q-mt-xs text-grey-8">
                <span class="text-black">{{ post.date }}</span> -
                {{ post.postTitle }}
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
  postTitle: string;
  tags: string[];
};
import { is } from "quasar";
// TODO 一旦無視。後でちゃんと対応したい #6
// @ts-ignore
import tankaJson from "./assets/tanka.json";
const posts: Ref<Post[]> = ref([]);
const isValidQuery = ref(false);
const route = useRoute();

watchEffect(() => {
  posts.value = [];
  if (!route.query.tag) {
    posts.value = tankaJson;
    isValidQuery.value = false;
    return;
  }
  for (const tanka of tankaJson) {
    if (tanka.tags.includes(route.query.tag)) {
      posts.value.push(tanka);
    }
  }
  if (posts.value.length === 0) {
    posts.value = tankaJson;
    isValidQuery.value = false;
  } else {
    isValidQuery.value = true;
  }
});

type Service = {
  name: string;
  icon: string;
};
const getPostNameFromUrl = (url: string): Service => {
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
  return getPostNameFromUrl(url).name;
};
</script>
