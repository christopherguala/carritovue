<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom mb-4">
      <div class="container">
        <a class="navbar-brand" href="#" @click.prevent="go('home')">MiTienda</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="nav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link" href="#" @click.prevent="go('home')">Home</a></li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="go('cart')">Carrito ({{ cartCount }})</a>
            </li>
          </ul>
          <div class="d-flex align-items-center gap-2">
            <span v-if="state.user">Hola, {{ state.user.name || state.user.email }}</span>
            <a v-if="!state.user" class="btn btn-outline-primary btn-sm" href="#" @click.prevent="go('login')">Iniciar sesión</a>
            <button v-else class="btn btn-outline-secondary btn-sm" @click="logout">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="container pb-5">
      <section v-if="state.view === 'home'">
        <h1 class="h4 mb-3">Productos</h1>
        <SearchBox v-model="state.search" placeholder="Buscar por nombre..." class="mb-3" />
        <ProductList />
      </section>

      <section v-else-if="state.view === 'cart'">
        <h1 class="h4 mb-3">Carrito</h1>
        <CartTable />
      </section>

      <section v-else-if="state.view === 'login'">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <LoginForm />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { state, actions } from './state'
import SearchBox from './components/SearchBox.vue'
import ProductList from './components/ProductList.vue'
import CartTable from './components/CartTable.vue'
import LoginForm from './components/LoginForm.vue'

const cartCount = computed(() => state.items.reduce((a, it) => a + it.qty, 0))
const go = actions.go
const logout = actions.logout
</script>
