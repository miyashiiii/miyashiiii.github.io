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
          <q-card-section>
            <a :href="post.url" class="text-bold text-black no-decoration">
              {{ post.title }}
            </a>
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
definePageMeta({
  layout: "default",
});

const works = [
  {
    title: "文字数チェッカー",
    url: "/tools/char-counter",
  },
];
</script>
