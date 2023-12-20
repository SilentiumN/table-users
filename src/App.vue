<script setup lang="ts">
import { onBeforeMount } from 'vue';
import userStore from '@/store/user';

const store = userStore();

interface NavbarItem {
  label: string;
  name: string;
}

const navbarItems:NavbarItem[] = [
  {
    label: 'Форма',
    name: 'form',
  },
  {
    label: 'Данные',
    name: 'table',
  },
];

onBeforeMount(() => {
  store.getLocalUsers();
});
</script>

<template>
  <div class="main-layout">
    <nav class="main-layout__navbar">
      <router-link
        v-for="navbarItem in navbarItems"
        :key="navbarItem.name"
        :to="{ name:  navbarItem.name}"
        class="main-layout__navbar-item"
        active-class="main-layout__navbar-item_active"
      >
        {{ navbarItem.label }}
      </router-link>
    </nav>
    <div
      class="main-layout__content"
    >
      <router-view/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: max-content 1fr;

  &__navbar {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    align-items: baseline;
    word-break: break-all;
    padding: 0.25rem 1rem;

    &-item {
      padding: 0.25rem 1rem;
      text-decoration: none;
      color: rgb(143, 143, 143);
      border-bottom: 1px solid;

      &_active,
      &:hover {
        border-bottom-width: 2px;
        border-bottom-color: rgb(95, 181, 87);
        color: rgb(29, 29, 29);
      }
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 1.5rem 1rem;
  }
}
</style>
