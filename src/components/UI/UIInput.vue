<script setup lang="ts">
import type { Ref } from 'vue';
import {
  defineProps, defineEmits, ref,
} from 'vue';

interface Props {
  name: string;
  placeholder?: string;
  type: string;
  value: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{(e: 'input', value: string): void
}>();

const inputRef: Ref<HTMLInputElement|null> = ref(null);

const onFocus = (event: FocusEvent) => {
  if (props.type === 'date') {
    const input = event.target as HTMLInputElement;

    input.type = 'date';
  }
};

const onBlur = (event: FocusEvent) => {
  if (props.type === 'date') {
    const input = event.target as HTMLInputElement;

    input.type = 'text';
  }
};

const onInput = (event: InputEvent) => {
  const input = event.target as HTMLInputElement;

  emit('input', input.value);

  if (inputRef.value) {
    inputRef.value.value = props.value;
  }
};
</script>

<template>
  <label
    :for="name"
    class="ui_input"
  >
    <input
      :id="name"
      :type="type === 'date' ? 'text' : type"
      :value="value"
      ref="inputRef"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      :placeholder="placeholder ? placeholder : ''"
      class="ui_input__input"
    />
    <div class="ui_input__dsc">
      Пожалуйста, заполните это поле
    </div>
  </label>
</template>

<style scoped lang="scss">
.ui_input {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__input {
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    border: 1px solid $gray-light;
    font-size: 0.75rem;
    width: 100%;
    color: $dark;

    &:hover,
    &:focus {
      border-color: $dark;
    }
  }

  &__dsc {
    font-size: 0.5rem;
    color: $blue;
  }
}
</style>
