<template>
  <div class="card">
    <div class="card-body">
      <h1 class="h5 mb-3">Iniciar sesión</h1>
      <form @submit.prevent="onSubmit" class="vstack gap-3">
        <div>
          <label class="form-label">Nombre (opcional)</label>
          <input v-model="name" type="text" class="form-control" placeholder="Tu nombre" />
        </div>
        <div>
          <label class="form-label">Correo</label>
          <input v-model="email" type="email" class="form-control" required placeholder="usuario1@mitienda.com" />
        </div>
        <div>
          <label class="form-label">Contraseña</label>
          <input v-model="password" type="password" class="form-control" required placeholder="password" />
        </div>
        <div v-if="state.authError" class="alert alert-danger" v-text="state.authError"></div>
        <button class="btn btn-primary" :disabled="state.authLoading">
          <span v-if="state.authLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { state, actions } from '../state'

const name = ref('')
const email = ref('')
const password = ref('')

async function onSubmit() {
  try {
    await actions.login({ email: email.value, password: password.value, name: name.value })
  } catch (e) {}
}
</script>
