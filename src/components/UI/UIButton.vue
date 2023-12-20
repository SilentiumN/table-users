<script setup lang="ts">
import { defineProps } from 'vue';
import IconSet from '@/components/UI/IconSet.vue';

interface Props {
  label: string;
  isLoading: boolean;
  isDisabled: boolean;
}

const props = defineProps<Props>();
</script>

<template>
<button
  class="ui-button"
  :disabled="isLoading || isDisabled"
>
  <IconSet
    v-if="isLoading"
    size="0.8rem"
    name="loading"
  />
  <span v-else>
    {{ label }}
  </span>
</button>
</template>

<style scoped lang="scss">
.ui-button {
  background-color: $green-light;
  color: $dark;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: $green;
    color: $white;
  }

  &:active {
    background-color: $primary;
    color: $white;
  }

  &:disabled {
    background-color: $gray-light;
    color: $gray;
    cursor: default;
  }
}
</style>
