<script lang="ts" setup>
const { sidebar, toggleSidebar } = useSidebar();
</script>

<template>
  <ClientOnly>
    <aside
      class="fixed bottom-0 left-0 top-12 z-50 flex w-12 flex-col items-center border-r-[1px] border-solid border-gray-200 bg-white pt-4 transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-zinc-900"
      :class="{ 'w-12': !sidebar, 'w-36': sidebar }"
    >
      <button
        class="absolute -right-3 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-slate-50 shadow-md hover:bg-slate-200 md:flex dark:bg-gray-700 dark:hover:bg-gray-800"
        @click="toggleSidebar"
      >
        <UIcon
          :name="
            sidebar ? 'i-heroicons-chevron-left' : 'i-heroicons-chevron-right'
          "
        />
      </button>

      <ul
        class="flex h-full w-full flex-col items-center gap-3 overflow-hidden pb-2 pt-0 sm:pt-4"
      >
        <li class="w-full px-1">
          <UTooltip text="Countries List" :popper="{ placement: 'right' }">
            <UButton
              icon="i-heroicons-home"
              color="gray"
              variant="ghost"
              to="/"
            >
              {{ sidebar ? "Home" : undefined }}
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
              to="/countries/search/"
            >
              {{ sidebar ? "Search" : undefined }}
            </UButton>
          </UTooltip>
        </li>
        <li class="w-full px-1">
          <UTooltip text="Create New Item" :popper="{ placement: 'right' }">
            <UButton
              icon="i-heroicons-plus"
              color="gray"
              variant="ghost"
              to="/new-item/"
            >
              {{ sidebar ? "New Item" : undefined }}
            </UButton>
          </UTooltip>
        </li>
        <div class="spacer mt-auto flex-1" />
        <li class="w-full px-1">
          <UTooltip
            text="Repositório do projeto no Github"
            :popper="{ placement: 'right' }"
          >
            <UButton
              dynamic
              color="gray"
              variant="ghost"
              to="https://github.com/LuigiVanin/country-plus"
              target="_blank"
            >
              <UIcon name="i-ion-logo-github" dynamic class="h-5 w-5" />
              {{ sidebar ? "Github" : undefined }}
            </UButton>
          </UTooltip>
        </li>
      </ul>
    </aside>
  </ClientOnly>
</template>
