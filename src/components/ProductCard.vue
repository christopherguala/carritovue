<template>
  <div class="card h-100">
    <img :src="product.image" :alt="product.name" class="card-img-top" />
    <div class="card-body d-flex flex-column">
      <h2 class="h6 card-title">{{ product.name }}</h2>
      <p class="card-text mb-2">${{ product.price.toLocaleString('es-CL') }}</p>
      <div class="mt-auto d-flex align-items-center gap-2">
        <input v-model.number="qty" type="number" min="1" class="form-control" style="width: 90px" />
        <button class="btn btn-primary flex-grow-1" @click="add">Agregar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { actions } from '../state'

const props = defineProps({ product: { type: Object, required: true } })
const qty = ref(1)

function add() {
  actions.addToCart(props.product, qty.value)
  qty.value = 1
}
</script>
