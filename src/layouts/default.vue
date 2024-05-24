<script lang="ts" setup>
import ScrollTopButton from "~/components/App/ScrollTopButton.vue";

const route = useRoute();

const { sidebar } = useSidebar();
</script>
<template>
  <div class="flex min-h-[100vh] flex-col !px-0">
    <AppHeader />
    <main class="relative w-full px-2 pb-6 pt-16 sm:px-6">
      <AppSidebar />
      <UContainer
        :class="`!pr-0 transition-all duration-200 ${sidebar ? '!pl-36' : '!pl-12'}`"
      >
        <slot />
      </UContainer>
    </main>
    <UNotifications />
    <ScrollTopButton />
  </div>
  <div
    v-if="route.path === '/'"
    class="absolute bottom-0 left-0 right-0 top-12 -z-10 bg-[linear-gradient(to_right,#eef2ff_1px,transparent_1px),linear-gradient(to_bottom,#eef2ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:hidden"
  />
</template>
