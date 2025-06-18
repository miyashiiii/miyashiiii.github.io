<template>
  <q-header class="bg-grey-3">
    <q-toolbar class="" >
      <q-space />
      <q-toolbar-title class="flex justify-center">
        <NuxtLink to="/">
          <q-img src="/logo.png" style="width: 128px" no-spinner />
        </NuxtLink>
      </q-toolbar-title>
      <q-space />
      <q-btn
        flat
        round
        icon="fa-brands fa-git-alt"
        color="grey-7"
        href="https://github.com/miyashiiii/miyashiiii.github.io"
        target="_blank"
        size="md"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
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
