<template>
  <q-layout view="hHh lpr fFf">
    <AppHeader />
    <q-page-container class="">
      <q-page>
        <slot />
      </q-page>
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title ? `${title} | miyashiiii portfolio` : "miyashiiii portfolio",
});
</script>
