<script setup lang="ts">
import userStore from '@/store/user';
import { storeToRefs } from 'pinia';

interface Header {
  name: string;
  label: string;
}

const store = userStore();

const {
  users,
} = storeToRefs(store);

const headers: Header[] = [
  {
    name: 'name',
    label: 'ФИО',
  },
  {
    name: 'date',
    label: 'Дата рождения',
  },
  {
    name: 'phone',
    label: 'Номер телефона',
  },
  {
    name: 'email',
    label: 'Электронная почта',
  },
];
</script>

<template>
<div
  class="user-table-view"
>
  <table
    class="user-table-view__table"
  >
    <tr>
      <th
        v-for="header in headers"
        :key="header.name"
      >
        {{ header.label }}
      </th>
    </tr>
    <tr
      v-for="user in users"
      :key="user.id"
    >
      <td
        v-for="header in headers"
        :key="header.name"
      >
        {{ user[header.name] }}
      </td>
    </tr>
  </table>
</div>
</template>

<style scoped lang="scss">
.user-table-view {
  width: 100%;
  height: max-content;

  &__table {
    width: 100%;
    word-break: break-all;
    border-collapse: collapse;

    & td,
    th {
      box-shadow: inset $gray-light -1px -1px 1.6px;
      padding: 0.25rem;
    }

    & th {
      background-color: $gray-light-secondary;
    }

    & td {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
}
</style>
