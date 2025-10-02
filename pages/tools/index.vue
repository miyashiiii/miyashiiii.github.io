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
            <q-chip
              v-for="tag in tool.tags"
              class="text-caption q-ml-none"
              :label="tag"
              :ripple="false"
              :key="tag"
            />
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
    tags: ["テキスト", "文字数"],
  },
  {
    title: "Cron式パーサー",
    subtitle: "Cron式をパースして実行予定を表示",
    url: "/tools/cron",
    tags: ["Cron", "スケジュール"],
  },
];
</script>
