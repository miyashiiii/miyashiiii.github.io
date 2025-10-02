<template>
  <div class="row justify-center q-pa-md">
    <div style="max-width: 640px; width: 100%">
      <h4 class="q-mt-none">HEIC to PNG 変換</h4>
      <p class="text-grey-8">HEIC形式の画像をPNG形式に変換します。</p>

      <q-card class="q-pa-md">
        <q-file
          v-model="selectedFile"
          outlined
          label="HEICファイルを選択"
          accept=".heic,.heif"
          @update:model-value="handleFileSelect"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div v-if="selectedFile" class="q-mt-md">
          <q-btn
            color="primary"
            label="PNGに変換"
            :loading="converting"
            :disable="converting"
            @click="convertToPng"
            class="full-width"
          />
        </div>

        <div v-if="error" class="q-mt-md">
          <q-banner class="bg-negative text-white">
            <template v-slot:avatar>
              <q-icon name="error" color="white" />
            </template>
            {{ error }}
          </q-banner>
        </div>

        <div v-if="convertedBlob" class="q-mt-md">
          <q-banner class="bg-positive text-white">
            <template v-slot:avatar>
              <q-icon name="check_circle" color="white" />
            </template>
            変換が完了しました
          </q-banner>
          <q-btn
            color="primary"
            label="PNGをダウンロード"
            icon="download"
            @click="downloadPng"
            class="full-width q-mt-md"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { convertHeicToPng } from "~/utils/heicConverter";

definePageMeta({ layout: "default" });
useHead({ title: "HEIC to PNG 変換" });

const selectedFile = ref<File | null>(null);
const converting = ref(false);
const error = ref("");
const convertedBlob = ref<Blob | null>(null);
const originalFileName = ref("");

const handleFileSelect = () => {
  error.value = "";
  convertedBlob.value = null;
  if (selectedFile.value) {
    originalFileName.value = selectedFile.value.name.replace(/\.(heic|heif)$/i, "");
  }
};

const convertToPng = async () => {
  if (!selectedFile.value) return;

  converting.value = true;
  error.value = "";
  convertedBlob.value = null;

  try {
    convertedBlob.value = await convertHeicToPng(selectedFile.value, 1);
  } catch (e) {
    error.value = "変換中にエラーが発生しました。ファイル形式を確認してください。";
    console.error(e);
  } finally {
    converting.value = false;
  }
};

const downloadPng = () => {
  if (!convertedBlob.value) return;

  const url = URL.createObjectURL(convertedBlob.value);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${originalFileName.value}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>
