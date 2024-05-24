<script lang="ts" setup>
onMounted(() => {
  if (process.env.NODE_ENV === "development") {
    console.info("Starting the app...");
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
