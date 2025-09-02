export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'usuario1@mitienda.com' && password === 'password') {
        resolve({ id: 1, email, name: '' })
      } else {
        reject(new Error('Credenciales inválidas'))
      }
    }, 500)
  })
}

export function logout() {
  return Promise.resolve(true)
}
