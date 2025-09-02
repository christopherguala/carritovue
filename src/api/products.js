const MOCK_PRODUCTS = [
  { id: 1, name: 'Polera básica', price: 9990, image: 'https://picsum.photos/seed/p1/300/200' },
  { id: 2, name: 'Pantalón jeans', price: 19990, image: 'https://picsum.photos/seed/p2/300/200' },
  { id: 3, name: 'Zapatillas', price: 29990, image: 'https://picsum.photos/seed/p3/300/200' },
  { id: 4, name: 'Polerón', price: 24990, image: 'https://picsum.photos/seed/p4/300/200' },
  { id: 5, name: 'Gorro', price: 5990, image: 'https://picsum.photos/seed/p5/300/200' },
]

export function fetchProducts() {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_PRODUCTS), 500))
}
