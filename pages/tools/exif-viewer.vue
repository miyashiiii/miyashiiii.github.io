<template>
  <div class="row justify-center q-pa-md">
    <div style="max-width: 640px; width: 100%">
      <h4 class="q-mt-none">EXIFビューア</h4>
      <p class="text-grey-8">画像ファイルのEXIF情報を確認します。</p>

      <q-card class="q-pa-md">
        <q-file
          v-model="selectedFile"
          outlined
          label="画像ファイルを選択"
          accept="image/*"
          @update:model-value="handleFileSelect"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div v-if="error" class="q-mt-md">
          <q-banner class="bg-negative text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white" />
            </template>
            {{ error }}
          </q-banner>
        </div>

        <div v-if="previewSrc" class="q-mt-md text-center">
          <img
            :src="previewSrc"
            style="max-height: 300px; max-width: 100%"
            alt="選択した画像のプレビュー"
          />
        </div>

        <div v-if="items.length" class="q-mt-md">
          <q-markup-table flat bordered>
            <thead>
              <tr>
                <th class="text-left">項目</th>
                <th class="text-left">値</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.key">
                <td class="text-left">{{ item.key }}</td>
                <td class="text-left">{{ item.value }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>

        <div v-else-if="checked" class="q-mt-md text-grey-8">
          EXIF情報が見つかりませんでした。
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { readExif, type ExifEntry } from "~/utils/exifReader";

definePageMeta({ layout: "default" });
useHead({ title: "EXIFビューア" });

const selectedFile = ref<File | null>(null);
const previewSrc = ref("");
const items = ref<ExifEntry[]>([]);
const error = ref("");
const checked = ref(false);

const handleFileSelect = async () => {
  error.value = "";
  items.value = [];
  previewSrc.value = "";
  checked.value = false;

  if (!selectedFile.value) return;

  previewSrc.value = URL.createObjectURL(selectedFile.value);

  try {
    items.value = await readExif(selectedFile.value);
  } catch (e) {
    error.value = "EXIF情報の読み取り中にエラーが発生しました。";
    console.error(e);
  } finally {
    checked.value = true;
  }
};
</script>
