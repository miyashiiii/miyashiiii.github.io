<template>
  <div class="row justify-center">
    <div style="max-width: 940px">
      <div
        class="q-pt-lg row items-start q-gutter-lg"
        :class="$q.screen.lt.md ? 'justify-around' : 'justify-between'"
      >
        <q-card
          v-for="tool in tools"
          :style="$q.screen.lt.md ? 'width:75%' : 'width: 280px;'"
          :key="tool.title"
        >
          <q-card-section>
            <NuxtLink :to="tool.url" class="text-bold text-black no-decoration">
              {{ tool.title }}
            </NuxtLink>
            <div class="q-mt-xs text-grey-8">{{ tool.subtitle }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "default" });
useHead({ title: "Tools" });

const tools = [
  {
    title: "文字数カウンター",
    subtitle: "テキストの文字数をカウント",
    url: "/tools/character-counter",
  },
  {
    title: "HEIC to PNG 変換",
    subtitle: "HEIC形式の画像をPNG形式に変換",
    url: "/tools/heic-to-png",
  },
];
</script>
