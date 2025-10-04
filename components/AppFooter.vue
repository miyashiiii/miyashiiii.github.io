<template>
  <q-footer class="text-white" style="background-color: #5694b3">
    <q-toolbar class="row justify-center q-px-md">
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
        <NuxtLink to="/tools" class="no-decoration text-white">
          <q-tab name="tools" class="q-py-xs footer-tab">
            <q-icon name="build" size="sm" />
            Tools
          </q-tab>
        </NuxtLink>
        <NuxtLink
          to="https://github.com/miyashiiii/miyashiiii.github.io"
          class="no-decoration text-white"
          target="_blank"
        >
          <div class="col q-py-xs footer-tab">
            <div class="row justify-center">
              <q-icon name="fa-brands fa-git-alt" size="sm" />
            </div>
            <div class="text-center">Source <q-icon name="open_in_new" /></div>
          </div>
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
  } else if (route.path.startsWith("/tools")) {
    tab.value = "tools";
  }
});
</script>
