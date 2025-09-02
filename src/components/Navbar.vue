
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Mi Tienda</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><router-link to="/" class="nav-link">Inicio</router-link></li>
          <li class="nav-item"><router-link to="/products" class="nav-link">Productos</router-link></li>
          <li class="nav-item"><router-link to="/about" class="nav-link">Nosotros</router-link></li>
          <li class="nav-item"><router-link to="/contact" class="nav-link">Contacto</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
</script>