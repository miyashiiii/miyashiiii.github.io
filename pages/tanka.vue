<template>
  <div class="row justify-center">
    <div style="width: 940px">
      <div v-if="isValidQuery" class="q-mt-md q-ml-md">
        タグ:
        <q-chip
          removable
          class="text-caption"
          :label="route.query.tag"
          @remove="() => $router.push('/tanka')"
        />
      </div>
      <!-- PC向け -->
      <div class="q-pa-lg row items-start q-gutter-lg gt-sm">
        <q-card
          v-for="tanka in tankas"
          :href="tanka.postUrl"
          style="width: 280px"
        >
          <q-card-section>
            <a :href="tanka.postUrl" class="text-bold text-black no-decoration">
              {{ tanka.tanka }}
            </a>
            <div class="q-mt-xs text-grey-8">
              <span class="text-black">{{ tanka.postDate }}</span> -
              {{ tanka.postTitle }}
            </div>
            <NuxtLink :to="`/tanka?tag=${tag}`" v-for="tag in tanka.tags">
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
          v-for="tanka in tankas"
        >
          <div class="col">
            <a :href="tanka.postUrl" class="no-decoration">
              <div class="text-black text-bold">
                {{ tanka.tanka }}
              </div>
              <div class="q-mt-xs text-grey-8">
                <span class="text-black">{{ tanka.postDate }}</span> -
                {{ tanka.postTitle }}
              </div>
            </a>
            <NuxtLink :to="`/tanka?tag=${tag}`" v-for="tag in tanka.tags">
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
type Tanka = {
  tanka: string;
  tags: string[];
  postTitle?: string;
  postUrl?: string;
  postDate?: string;
};
type Post = {
  title: string;
  url: string;
  date: string;
  tankas: Tanka[];
};
import { is } from "quasar";
// TODO 一旦無視。後でちゃんと対応したい #6
// @ts-ignore
import tankaPostsJson from "./assets/tankaPosts.json";
const posts: Ref<Post[]> = ref([]);
const tankas: Ref<Tanka[]> = ref([]);
const isValidQuery = ref(false);
const route = useRoute();

watchEffect(() => {
  tankas.value = [];
  const allTankas = [];
  for (const post of tankaPostsJson) {
    for (const tanka of post.tankas) {
      tanka.postTitle = post.title;
      tanka.postUrl = post.url;
      tanka.postDate = post.date;
      allTankas.push(tanka);
    }
  }
  if (!route.query.tag) {
    tankas.value = allTankas;
    isValidQuery.value = false;
    return;
  }
  for (const tanka of allTankas) {
    if (tanka.tags.includes(route.query.tag)) {
      tankas.value.push(tanka);
    }
  }
  if (tankas.value.length === 0) {
    tankas.value = allTankas;
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
