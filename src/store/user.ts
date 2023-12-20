import type { User } from '@/types/User';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export default defineStore('user', () => {
  const users: Ref<User[]> = ref([]);

  async function updateUsers(user: User) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        users.value.push(user);
        resolve(true);
      }, 1000);
    });
  }

  function setLocalUsers(): void {
    localStorage.setItem('users', JSON.stringify(users.value));
  }

  function getLocalUsers(): void {
    const localUsersString = localStorage.getItem('users');

    if (localUsersString) {
      users.value = JSON.parse(localUsersString);
    }
  }

  watch(users, () => {
    setLocalUsers();
  }, {
    deep: true,
  });

  return {
    users,
    getLocalUsers,
    updateUsers,
  };
});
