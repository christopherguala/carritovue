
<template>
  <article class="tc-productCard p-2 m-2 col item">
    <div class="tc-productCard__img-wrapper p-2">
      <img :src="producto.imagen" :alt="producto.titulo" class="tc-productCard__img" />
      <span class="tc-productCard__discount position-absolute top-0 end-0">
        {{ producto.descuento }}
      </span>
    </div>

    <div class="tc-productCard__body flex-column pt-0 px-4 pb-4 d-flex">
      <h2 class="tc-productCard__body--title mb-1">{{ producto.titulo }}</h2>
      <div class="tc-productCard__subtitle-wrapper pt-1 pb-3 d-flex justify-content-between">
        <p class="tc-productCard__subtitle">{{ producto.idProducto }} •</p>
        <p class="tc-productCard__subtitle">
          {{ producto.stock > 1 ? producto.stock + ' Unid' : producto.stock === 1 ? 'Última!!' : 'Agotado :C' }}
        </p>
      </div>

      <div class="tc-productCard__prices mb-4">
        <span class="tc-productCard__price">{{ producto.precio }}</span>
        <span
          v-if="producto.precioAntiguo"
          class="tc-productCard__price-old me-2 text-muted text-decoration-line-through"
        >
          {{ producto.precioAntiguo }}
        </span>
      </div>

      <div class="tc-btn-wrapper mt-auto">
        <button class="tc-btn__primary w-100" :disabled="producto.stock === 0">
          <span class="material-symbols-outlined p-1">add_shopping_cart</span>
          Agregar al carro
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  producto: {
    type: Object,
    required: true
  }
})
</script>