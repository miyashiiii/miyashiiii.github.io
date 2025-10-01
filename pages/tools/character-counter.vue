<template>
  <div class="row justify-center q-pa-md">
    <div style="max-width: 640px; width: 100%">
      <h4 class="q-mt-none">文字数カウンター</h4>
      <p class="text-grey-8">テキストの文字数や単語数をカウントします。</p>

      <q-card class="q-pa-md">
        <q-input
          v-model="text"
          type="textarea"
          outlined
          label="テキストを入力"
          :rows="10"
          counter
        />

        <div class="q-mt-md">
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>文字数（全体）</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h6">{{ totalChars }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>文字数（スペース除く）</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h6">{{ charsWithoutSpaces }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>単語数</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h6">{{ wordCount }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>行数</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h6">{{ lineCount }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label>バイト数（UTF-8）</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label class="text-h6">{{ byteCount }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

definePageMeta({ layout: "default" });
useHead({ title: "文字数カウンター" });

const text = ref("");

const totalChars = computed(() => text.value.length);

const charsWithoutSpaces = computed(() => text.value.replace(/\s/g, "").length);

const wordCount = computed(() => {
  const trimmed = text.value.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
});

const lineCount = computed(() => {
  if (!text.value) return 0;
  return text.value.split("\n").length;
});

const byteCount = computed(() => new TextEncoder().encode(text.value).length);
</script>
