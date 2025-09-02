<template>
  <div>
    <div v-if="state.loadingProducts" class="alert alert-info">Cargando...</div>
    <div v-else-if="state.productsError" class="alert alert-danger">{{ state.productsError }}</div>
    <div v-else class="row g-3">
      <div v-for="p in filtered" :key="p.id" class="col-sm-6 col-lg-4">
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { state, actions } from '../state'
import ProductCard from './ProductCard.vue'

onMounted(() => actions.loadProducts())

const filtered = computed(() =>
  state.products.filter(p => p.name.toLowerCase().includes(state.search.toLowerCase()))
)
</script>
