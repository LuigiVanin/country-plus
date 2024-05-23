<script lang="ts" setup>
const { sidebar, toggleSidebar } = useSidebar();
</script>

<template>
  <ClientOnly>
    <aside
      class="fixed bottom-0 left-0 top-12 z-50 flex w-12 flex-col items-center border-r-[1px] border-solid border-gray-200 pt-4 transition-all duration-300 ease-in-out dark:border-gray-700"
      :class="{ 'w-12': !sidebar, 'w-36': sidebar }"
    >
      <button
        class="absolute -right-3 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 shadow-md hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-700"
        @click="toggleSidebar"
      >
        <UIcon
          :name="
            sidebar ? 'i-heroicons-chevron-left' : 'i-heroicons-chevron-right'
          "
        />
      </button>

      <ul class="flex w-full flex-col items-center gap-3 pt-4">
        <li class="w-full px-1">
          <UTooltip text="Countries List" :popper="{ placement: 'right' }">
            <UButton icon="i-heroicons-home" color="gray" variant="ghost">
              {{ sidebar ? "Home" : undefined }}
            </UButton>
          </UTooltip>
        </li>
        <li class="w-full px-1">
          <UTooltip text="Create New Item" :popper="{ placement: 'right' }">
            <UButton icon="i-heroicons-plus" color="gray" variant="ghost">
              {{ sidebar ? "New Item" : undefined }}
            </UButton>
          </UTooltip>
        </li>
        <li class="w-full px-1">
          <UTooltip
            text="Search country by name"
            :popper="{ placement: 'right' }"
          >
            <UButton
              icon="i-heroicons-magnifying-glass"
              color="gray"
              variant="ghost"
            >
              {{ sidebar ? "Search" : undefined }}
            </UButton>
          </UTooltip>
        </li>
        <!-- <li class="w-full px-1">
          <UButton icon="i-ion-logo-github" color="gray" variant="ghost">
            {{ sidebar ? "Github" : undefined }}
          </UButton>
        </li> -->
      </ul>
    </aside>
  </ClientOnly>
</template>
