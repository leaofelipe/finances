const routes = {}

export function addRoute(path, component) {
  routes[path] = component
}

export function navigateTo(path) {
  window.history.pushState({}, path, window.location.origin + path)
  renderRoute()
}

export function renderRoute() {
  const path = window.location.pathname
  const component = routes[path] || routes['/404']
  document.getElementById('app').innerHTML = component()
}

window.addEventListener('popstate', renderRoute)
