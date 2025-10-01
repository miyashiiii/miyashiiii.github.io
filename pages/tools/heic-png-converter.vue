<template>
  <div class="row justify-center q-pa-md">
    <div style="max-width: 640px; width: 100%">
      <h4 class="q-mt-none">HEIC-PNG変換</h4>
      <p class="text-grey-8">HEIC形式の画像をPNG形式に変換します。</p>

      <q-card class="q-pa-md">
        <q-file
          v-model="selectedFile"
          label="HEICファイルを選択"
          accept=".heic,.heif"
          outlined
          clearable
          @update:model-value="onFileSelected"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <div v-if="converting" class="q-mt-md text-center">
          <q-spinner color="primary" size="3em" />
          <div class="q-mt-sm">変換中...</div>
        </div>

        <div v-if="convertedBlob && !converting" class="q-mt-md">
          <div class="text-positive q-mb-sm">
            <q-icon name="check_circle" /> 変換完了
          </div>
          <q-btn
            color="primary"
            icon="download"
            label="PNGをダウンロード"
            @click="downloadConverted"
          />
        </div>

        <div v-if="error" class="q-mt-md text-negative">
          <q-icon name="error" /> {{ error }}
        </div>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({ layout: "default" });
useHead({ title: "HEIC-PNG変換" });

const selectedFile = ref<File | null>(null);
const convertedBlob = ref<Blob | null>(null);
const converting = ref(false);
const error = ref("");

const onFileSelected = async (file: File | null) => {
  if (!file) {
    convertedBlob.value = null;
    error.value = "";
    return;
  }

  error.value = "";
  converting.value = true;
  convertedBlob.value = null;

  try {
    const heic2any = (await import("heic2any")).default;
    
    const result = await heic2any({
      blob: file,
      toType: "image/png",
      quality: 1,
    });

    convertedBlob.value = Array.isArray(result) ? result[0] : result;
  } catch (e) {
    error.value = "変換に失敗しました。ファイルが正しいHEIC形式か確認してください。";
    console.error(e);
  } finally {
    converting.value = false;
  }
};

const downloadConverted = () => {
  if (!convertedBlob.value || !selectedFile.value) return;

  const url = URL.createObjectURL(convertedBlob.value);
  const link = document.createElement("a");
  link.href = url;
  
  const originalName = selectedFile.value.name;
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
  link.download = `${nameWithoutExt}.png`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
</script>
