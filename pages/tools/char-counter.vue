<template>
  <div class="row justify-center">
    <div style="max-width: 940px">
      <div class="col">
        <h1 class="text-h1">文字数チェッカー</h1>
        <div class="col">
          <div class="row justify-center">
            <q-input
              v-model="input"
              type="textarea"
              counter
              outlined
              class="full-width"
              autogrow
            />
          </div>
        </div>
        <h1 class="text-h2">このツールについて</h1>
        <div class="row justify-center">
          <div class="col">
            <ul>
              <li>テキストボックスに入力された文字数を表示します。</li>
              <li>空白、スペースも文字数に含まれます。</li>
              <li>入力した内容は、サーバーへの送信や保存は行いません。</li>
              <li>
                文字数の算出には、UIフレームワークQuasarの<a
                  href="https://quasar.dev/vue-components/input/"
                  >q-input</a
                >クラスの機能を使用しています。
              </li>
              <li>
                ソースコード:
                <a
                  href="https://github.com/miyashiiii/miyashiiii.github.io/blob/main/pages/tools/char-counter.vue"
                  >GitHub</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

import { ref } from "vue";

const input = ref("");
</script>
