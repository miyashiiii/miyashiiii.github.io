<template>
  <header class="site-head">
    <div class="bar">
      <NuxtLink to="/" class="brand">miyashiiii</NuxtLink>
      <nav class="site-nav">
        <NuxtLink to="/" :class="{ on: route.path === '/' }">Top</NuxtLink>
        <NuxtLink to="/posts" :class="{ on: route.path.startsWith('/posts') }">Posts</NuxtLink>
        <NuxtLink to="/works" :class="{ on: route.path === '/works' }">Works</NuxtLink>
        <NuxtLink to="/tools" :class="{ on: route.path.startsWith('/tools') }">Tools</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
