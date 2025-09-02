<template>
  <div class="modal fade" id="cartModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Carrito de Compras</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <div v-if="cart.length === 0" class="text-center">
            <p>Tu carrito está vacío.</p>
          </div>
          <ul v-else class="list-group">
            <li v-for="(item, index) in cart" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{{ item.titulo }}</strong> <br />
                <small>{{ item.precio }}</small>
              </div>
              <button class="btn btn-danger btn-sm" @click="removeFromCart(index)">Eliminar</button>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" :disabled="cart.length === 0">Finalizar compra</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartModal",
  props: {
    cart: { type: Array, required: true },
  },
  methods: {
    removeFromCart(index) {
      this.$emit("remove-from-cart", index);
    },
  },
};
</script>