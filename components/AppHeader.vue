<template>
  <q-header :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-3'">
    <q-toolbar class="" >
      <q-toolbar-title class="text-center">
        <NuxtLink to="/">
          <q-img src="/logo.png" style="width: 128px" no-spinner />
        </NuxtLink>
      </q-toolbar-title>
      
      <q-space />
      
      <ThemeToggle />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()
const tab = ref("works");
const route = useRoute();

watchEffect(() => {
  if (route.path === "/") {
    tab.value = "index";
  } else if (route.path.startsWith("/posts")) {
    tab.value = "posts";
  } else if (route.path === "/works") {
    tab.value = "works";
  }
});
</script>
