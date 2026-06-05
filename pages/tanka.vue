<template>
  <div class="row justify-center">
    <div style="width: 500px">
      <div v-if="isValidQuery" class="q-mt-md q-ml-md">
        タグ:
        <q-chip
          removable
          class="text-caption"
          :label="route.query.tag"
          @remove="() => $router.push('/tanka')"
        />
      </div>

      <div class="q-mt-sm">
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
                <div class="q-mt-xs text-grey-8 text-right">
                  <span class="text-black">{{ tanka.postDate }}</span> -
                  {{ tanka.postTitle }}
                </div>
                <div class="row justify-end">
                  <NuxtLink :to="`/tanka?tag=${tag}`" v-for="tag in tanka.tags">
                    <q-chip class="text-caption q-ml-none" :label="tag" />
                  </NuxtLink>
                </div>
              </a>
            </div>
          </q-item>
          <q-separator color="grey-4" />
        </q-list>
      </div>
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
// TODO 一旦無視。後でちゃんと対応したい #6
// @ts-ignore
import tankaPostsJson from "./assets/tankaPosts.json";
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
</script>
