<script lang="ts" setup>
const { sidebar } = useSidebar();
</script>
<template>
  <div class="flex min-h-[100vh] flex-col !px-0">
    <AppHeader />
    <main class="w-full p-6 pt-16">
      <AppSidebar />
      <UContainer
        :class="`!pr-0 transition-all duration-200 ${sidebar ? '!pl-36' : '!pl-12'}`"
      >
        <slot />
      </UContainer>
    </main>
    <UNotifications />
  </div>
</template>
