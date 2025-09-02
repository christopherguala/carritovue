<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    type="search"
    class="form-control"
    :placeholder="placeholder"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: { type: String, default: '' }
})
defineEmits(['update:modelValue'])
</script>
