<template>
  <q-img
    v-if="!hasError"
    :src="imageSrc"
    :fit="fit"
    :style="imageStyle"
    no-spinner
    @error="handleError"
  />
  <q-img
    v-else
    :src="fallbackIcon"
    style="height: 50px; width: 50px"
    no-spinner
  />
</template>

<script setup lang="ts">
import type { Post } from "~/types/post";

interface Props {
  post: Post;
  height: string;
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

const imageStyle = computed(() => {
  return `height: ${props.height}`;
});

const fallbackIcon = computed(() => {
  return getServiceIconFromUrl(props.post.url);
});

const handleError = () => {
  hasError.value = true;
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

const getServiceIconFromUrl = (url: string): string =>
  getServiceFromUrl(url).icon;
</script>
