const routes = {}

export function addRoute(path, component) {
  routes[path] = component
}

export function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path)
  renderRoute()
}

export async function renderRoute() {
  const path = window.location.pathname
  const component = routes[path] || routes['/404']

  // Verifica se o componente é uma função assíncrona
  const content =
    typeof component === 'function' ? await component() : component

  document.getElementById('app').innerHTML = content
}

window.addEventListener('popstate', renderRoute)
