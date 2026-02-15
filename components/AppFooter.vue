<template>
  <footer class="app-footer">
    <nav class="footer-nav">
      <NuxtLink to="/" class="footer-item" :class="{ active: isActive('/') }">
        <q-icon name="home" size="sm" />
        <span>Top</span>
      </NuxtLink>
      <NuxtLink to="/posts" class="footer-item" :class="{ active: isActive('/posts') }">
        <q-icon name="description" size="sm" />
        <span>Posts</span>
      </NuxtLink>
      <NuxtLink to="/works" class="footer-item" :class="{ active: isActive('/works') }">
        <q-icon name="palette" size="sm" />
        <span>Works</span>
      </NuxtLink>
      <NuxtLink to="/tools" class="footer-item" :class="{ active: isActive('/tools') }">
        <q-icon name="build" size="sm" />
        <span>Tools</span>
      </NuxtLink>
      <NuxtLink
        to="https://github.com/miyashiiii/miyashiiii.github.io"
        class="footer-item"
        target="_blank"
      >
        <q-icon name="fa-brands fa-git-alt" size="sm" />
        <span>Source <q-icon name="open_in_new" size="xs" /></span>
      </NuxtLink>
    </nav>
  </footer>
</template>

<script setup lang="ts">
const route = useRoute();

const isActive = (path: string) => {
  if (path === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(path);
};
</script>

<style scoped>
.app-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #5694b3;
  color: white;
  z-index: 1000;
}

.footer-nav {
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 0;
  margin: 0;
  min-height: 56px;
}

.footer-item {
  flex: 1;
  max-width: 19%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 6px 4px 8px 4px;
  color: white;
  text-decoration: none;
  position: relative;
  transition: opacity 0.2s;
}

.footer-item:hover {
  opacity: 0.8;
}

.footer-item span {
  font-size: 0.75rem;
  text-align: center;
  display: flex;
  align-items: flex-end;
  gap: 2px;
}

/* アクティブな項目の上に白いバーを表示 */
.footer-item.active::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: white;
}

/* PC表示の場合は幅を制限 */
@media (min-width: 1024px) {
  .footer-nav {
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>
