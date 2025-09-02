<template>
  <div>
    <div v-if="state.items.length === 0" class="alert alert-secondary">Tu carrito está vacío.</div>
    <div v-else class="table-responsive">
      <table class="table align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th style="width:140px">Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="it in state.items" :key="it.id">
            <td class="d-flex align-items-center gap-2">
              <img :src="it.image" alt="" width="48" height="32" class="rounded border" />
              {{ it.name }}
            </td>
            <td>
              <input type="number" min="1" class="form-control" v-model.number="it.qty" @change="actions.updateQty(it.id, it.qty)" />
            </td>
            <td>${{ it.price.toLocaleString('es-CL') }}</td>
            <td>${{ (it.price * it.qty).toLocaleString('es-CL') }}</td>
            <td><button class="btn btn-sm btn-outline-danger" @click="actions.removeFromCart(it.id)">Eliminar</button></td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-end gap-2">
        <div class="fs-5 fw-semibold">Total: ${{ total.toLocaleString('es-CL') }}</div>
        <button class="btn btn-outline-secondary" @click="actions.clearCart()">Vaciar</button>
        <button class="btn btn-success" disabled>Comprar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { state, actions } from '../state'

const total = computed(() => state.items.reduce((a, it) => a + it.price * it.qty, 0))
</script>
