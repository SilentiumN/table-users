<script setup lang="ts">
import type { User } from '@/types/User';
import type { Ref } from 'vue';
import userStore from '@/store/user';
import { computed, ref } from 'vue';
import UIInput from '@/components/UI/UIInput.vue';
import UIButton from '@/components/UI/UIButton.vue';
import { getMoment } from '@/helpers';
import { v4 as uuidv4 } from 'uuid';

const user: Ref<User> = ref({
  name: '',
  phone: '',
  date: '',
  email: '',
});

const store = userStore();
const isLoadingSendingUser: Ref<boolean> = ref(false);

const clearLocalUser = () => {
  user.value = {
    name: '',
    phone: '',
    date: '',
    email: '',
  };
};

const updateUsers = async () => {
  isLoadingSendingUser.value = true;

  await store.updateUsers({
    date: getMoment('L', user.value.date),
    id: uuidv4(),
    name: user.value.name.trim(),
    phone: user.value.phone.trim(),
    email: user.value.email.trim(),
  });

  clearLocalUser();

  isLoadingSendingUser.value = false;
};

const getPlaceholderInput = (name: string) => {
  switch (name) {
    case 'name':
      return 'Введите имя';
    case 'phone':
      return 'Введите номер телефона';
    case 'date':
      return 'Введите дату рождения';
    case 'email':
      return 'Введите электронную почту';
    default:
      return '';
  }
};

const getTypeInput = (name: string) => {
  switch (name) {
    case 'name':
      return 'text';
    case 'phone':
      return 'tel';
    case 'date':
      return 'date';
    case 'email':
      return 'text';
    default:
      return '';
  }
};

const updateUserField = (name: string, value: string) => {
  if (name === 'phone') {
    user.value[name] = `+${value.replace(/[^\d]/g, '').slice(0, 11)}`;
    return;
  }

  if (name === 'name' || name === 'email' || name === 'date') {
    user.value[name] = value;
  }
};

const isValidUser = computed(() => {
  // eslint-disable-next-line prefer-regex-literals
  const regExpEmail = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g');
  const isValidDate = getMoment('X', user.value.date) < getMoment('X');
  const phoneNumber = user.value.phone.replace(/[^\d]/g, '');
  const isValidPhoneNumber = phoneNumber[0] === '7' && phoneNumber.length === 11;

  return user.value.name.trim().split(' ').length === 3
    && isValidPhoneNumber
    && isValidDate
    && regExpEmail.test(user.value.email);
});
</script>

<template>
  <div class="user-edit-view">
    <UIInput
      v-for="userField in Object.keys(user)"
      :key="userField"
      :name="userField"
      :value="user[userField]"
      :placeholder="getPlaceholderInput(userField)"
      :type="getTypeInput(userField)"
      @input="value => updateUserField(userField, value)"
    />
    <UIButton
      :is-loading="isLoadingSendingUser"
      :is-disabled="!isValidUser"
      @click="updateUsers"
      label="Отправить"
    />
  </div>
</template>

<style scoped lang="scss">
  .user-edit-view {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    flex-direction: column;
  }
</style>
