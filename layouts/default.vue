<template>
  <div class="l-wrap">
    <AppHeader />
    <div class="l-main">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title ? `${title} | miyashiiii portfolio` : "miyashiiii portfolio",
});
</script>
