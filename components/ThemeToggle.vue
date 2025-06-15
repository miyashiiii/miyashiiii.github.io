<template>
  <q-btn
    :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
    :color="$q.dark.isActive ? 'amber' : 'grey-7'"
    round
    flat
    @click="toggleTheme"
    size="md"
  >
    <q-tooltip>{{ $q.dark.isActive ? 'ライトモード' : 'ダークモード' }}</q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

const toggleTheme = () => {
  $q.dark.toggle()
  // ローカルストレージに設定を保存
  localStorage.setItem('theme', $q.dark.isActive ? 'dark' : 'light')
}

// 初期化時にローカルストレージから設定を読み込み
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    $q.dark.set(savedTheme === 'dark')
  } else {
    // システム設定に基づいて初期テーマを設定
    $q.dark.set('auto')
  }
})
</script>