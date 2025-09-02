
<template>
  <section class="container my-4">
    <!-- FILTROS -->
    <div class="row mb-3">
      <div class="col-md-3">
        <h5>Tiendas</h5>
        <div v-for="t in ['sb','bu','ec']" :key="t">
          <input type="checkbox" :value="t" v-model="filtros.tiendas" /> {{ t }}
        </div>

        <h5 class="mt-3">Marcas</h5>
        <div v-for="m in ['asus','dell','hp','lenovo']" :key="m">
          <input type="checkbox" :value="m" v-model="filtros.marcas" /> {{ m }}
        </div>

        <h5 class="mt-3">Tipos</h5>
        <div v-for="tp in ['noot','tab','desk','acc']" :key="tp">
          <input type="checkbox" :value="tp" v-model="filtros.tipos" /> {{ tp }}
        </div>

        <h5 class="mt-3">Precio</h5>
        <input type="range" v-model.number="minRango" :min="0" :max="maxRango" />
        <label>Mín: {{ formatCurrency(minRango) }}</label>
        <input type="range" v-model.number="maxRango" :min="0" :max="4000000" />
        <label>Máx: {{ formatCurrency(maxRango) }}</label>
      </div>

      <!-- PRODUCTOS -->
      <div class="col-md-9">
        <select v-model="ordenSeleccionado" class="form-select mb-3 w-50">
          <option value="">Ordenar...</option>
          <option value="1">Precio: Menor a mayor</option>
          <option value="2">Precio: Mayor a menor</option>
        </select>

        <div id="product-gallery" class="row">
          <div v-for="p in productosMostrados" :key="p.id" class="col-md-4">
            <article class="tc-productCard p-2 m-2 item">
              <div class="tc-productCard__img-wrapper p-2">
                <img :src="p.imagen" :alt="p.titulo" class="tc-productCard__img" />
                <span class="tc-productCard__discount position-absolute top-0 end-0">{{ p.descuento }}</span>
              </div>
              <div class="tc-productCard__body flex-column pt-0 px-4 pb-4 d-flex">
                <h2 class="tc-productCard__body--title mb-1">{{ p.titulo }}</h2>
                <div class="tc-productCard__subtitle-wrapper pt-1 pb-3 d-flex justify-content-between">
                  <p class="tc-productCard__subtitle">{{ p.idProducto }} •</p>
                  <p class="tc-productCard__subtitle">
                    {{ stockText(p.stock) }}
                  </p>
                </div>
                <div class="tc-productCard__prices mb-4">
                  <span class="tc-productCard__price">{{ p.precio }}</span>
                  <span class="tc-productCard__price-old me-2 text-muted text-decoration-line-through">
                    {{ p.precioAntiguo }}
                  </span>
                </div>
                <div class="tc-btn-wrapper mt-auto">
                  <button class="tc-btn__primary w-100" :disabled="p.stock === 0" @click="$emit('add-to-cart', p)">
                    <span class="material-symbols-outlined p-1">add_shopping_cart</span>
                    Agregar al carro
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- BOTÓN CARGAR MÁS -->
        <div class="text-center mt-3" v-if="productosFiltrados.length > mostrados">
          <button id="load-more" class="btn btn-primary" @click="cargarMas">Cargar más</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      productos: [],
      productosFiltrados: [],
      productosMostrados: [],
      mostrados: 0,
      porCarga: 12,
      filtros: { tiendas: [], marcas: [], tipos: [] },
      minRango: 0,
      maxRango: 4000000,
      ordenSeleccionado: "",
    };
  },
  mounted() {
    this.cargarProductos();
  },
  watch: {
    filtros: { handler: "aplicarFiltros", deep: true },
    minRango: "aplicarFiltros",
    maxRango: "aplicarFiltros",
    ordenSeleccionado: "aplicarFiltros",
  },
  methods: {
    async cargarProductos() {
      try {
        const res = await fetch("https://68a8eeb4b115e67576ea102a.mockapi.io/productos");
        const data = await res.json();
        this.productos = data;
        this.aplicarFiltros();
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    },
    aplicarFiltros() {
      this.productosFiltrados = this.productos.filter((p) => {
        const precioNum = this.parsePrecio(p.precio);
        const tiendaOK =
          this.filtros.tiendas.length === 0 || this.filtros.tiendas.some((t) => p[t]);
        const marcaOK =
          this.filtros.marcas.length === 0 || this.filtros.marcas.includes(p.marca);
        const tipoOK =
          this.filtros.tipos.length === 0 || this.filtros.tipos.includes(p.tipe);
        const precioOK = precioNum >= this.minRango && precioNum <= this.maxRango;
        return tiendaOK && marcaOK && tipoOK && precioOK;
      });

      if (this.ordenSeleccionado === "1") {
        this.productosFiltrados.sort((a, b) => this.parsePrecio(a.precio) - this.parsePrecio(b.precio));
      } else if (this.ordenSeleccionado === "2") {
        this.productosFiltrados.sort((a, b) => this.parsePrecio(b.precio) - this.parsePrecio(a.precio));
      }

      this.mostrados = 0;
      this.productosMostrados = [];
      this.cargarMas();
    },
    cargarMas() {
      const siguienteLote = this.productosFiltrados.slice(this.mostrados, this.mostrados + this.porCarga);
      this.productosMostrados.push(...siguienteLote);
      this.mostrados += siguienteLote.length;
    },
    parsePrecio(precioStr) {
      return parseInt(precioStr.replace(/\./g, "").replace("$", ""));
    },
    stockText(stock) {
      if (stock === 0) return "Agotado :(";
      if (stock === 1) return "¡Última unidad!";
      return `${stock} Unid`;
    },
    formatCurrency(value) {
      return `$${value.toLocaleString("es-CO")}`;
    },
  },
};
</script>