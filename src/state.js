import { reactive } from 'vue'
import * as Auth from './api/auth'
import { fetchProducts } from './api/products'

export const state = reactive({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  items: JSON.parse(localStorage.getItem('cart') || '[]'), // [{id,name,price,image,qty}]
  products: [],
  loadingProducts: false,
  productsError: null,
  search: '',
  view: 'home', // 'home' | 'cart' | 'login'
  authError: null,
  authLoading: false,
})

export const actions = {
  go(view) {
    state.view = view
  },
  async loadProducts() {
    if (state.products.length) return
    try {
      state.loadingProducts = true
      state.productsError = null
      state.products = await fetchProducts()
    } catch (e) {
      state.productsError = e.message || 'Error cargando productos'
    } finally {
      state.loadingProducts = false
    }
  },
  addToCart(product, qty = 1) {
    const found = state.items.find(it => it.id === product.id)
    if (found) found.qty += qty
    else state.items.push({ ...product, qty })
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  removeFromCart(id) {
    state.items = state.items.filter(it => it.id !== id)
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  updateQty(id, qty) {
    const it = state.items.find(i => i.id === id)
    if (it) {
      it.qty = qty
      if (it.qty <= 0) actions.removeFromCart(id)
      else localStorage.setItem('cart', JSON.stringify(state.items))
    }
  },
  clearCart() {
    state.items = []
    localStorage.setItem('cart', JSON.stringify(state.items))
  },
  async login({ email, password, name }) {
    try {
      state.authLoading = true
      state.authError = null
      const user = await Auth.login({ email, password })
      if (name) user.name = name
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
      state.view = 'home'
    } catch (e) {
      state.authError = e.message || 'Error al iniciar sesión'
      throw e
    } finally {
      state.authLoading = false
    }
  },
  async logout() {
    await Auth.logout()
    state.user = null
    localStorage.removeItem('user')
    state.view = 'home'
  }
}
