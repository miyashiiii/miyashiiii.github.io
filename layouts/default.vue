<template>
  <q-layout view="hHh lpr fFf">
    <Transition name="fade">
      <div
        v-show="isLoading && isIndexPage"
        class="fixed-full z-max bg-white items-center flex justify-center"
      >
        <q-spinner-oval color="primary" size="lg" />
      </div>
    </Transition>
    <AppHeader />
    <q-page-container>
      <q-page>
        <slot />
      </q-page>
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<script setup lang="ts">
import { useLoading } from "/composables/loading";
import { useRoute } from "vue-router";
import { computed } from "vue";

useHead({
  titleTemplate: (title) =>
    title ? `${title} | miyashiiii portfolio` : "miyashiiii portfolio",
});
const { isLoading } = useLoading();
const route = useRoute();
const isIndexPage = computed(() => route.name === "index");
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  opacity: 0;
}
</style>
