<template>
  <q-img
    v-if="!hasError"
    :src="imageSrc"
    :fit="fit"
    :style="imageStyle"
    no-spinner
    @error="hasError = true"
  />
  <q-img
    v-else
    :src="getServiceIconFromUrl(post.url)"
    style="height: 50px; width: 50px"
    no-spinner
  />
</template>

<script setup lang="ts">
import type { Post } from "~/types/post";

interface Props {
  post: Post;
  imageStyle: string;
  fit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  fit: "scale-down",
});

const hasError = ref(false);

const imageSrc = computed(() => {
  if (!props.post.img) {
    return "";
  }
  return `/posts/${props.post.img}`;
});

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

  if (services.find((service) => url.includes(service.pattern))) {
    return services.find((service) => url.includes(service.pattern))!;
  } else {
    throw new Error("invalid url");
  }
};

const getServiceIconFromUrl = (url: string): string =>
  getServiceFromUrl(url).icon;
</script>
