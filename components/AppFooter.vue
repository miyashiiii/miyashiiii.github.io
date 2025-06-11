<template>
  <q-footer class="text-white" style="background-color: #5694b3">
    <q-toolbar class="row justify-center">
      <q-tabs
        no-caps
        indicator-color="white"
        class="text-white"
        v-model="tab"
        switch-indicator
      >
        <NuxtLink to="/" class="no-decoration text-white">
          <q-tab name="index" class="q-py-xs footer-tab">
            <q-icon name="home" size="sm" />
            Top
          </q-tab>
        </NuxtLink>
        <NuxtLink to="/posts" class="no-decoration text-white">
          <q-tab name="posts" class="q-py-xs footer-tab">
            <q-icon name="description" size="sm" />
            Posts
          </q-tab>
        </NuxtLink>
        <NuxtLink to="/works" class="no-decoration text-white">
          <q-tab name="works" class="q-py-xs footer-tab">
            <q-icon name="palette" size="sm" />
            Works
          </q-tab>
        </NuxtLink>
      </q-tabs>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
