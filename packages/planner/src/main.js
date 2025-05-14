import './style/base.scss'
import { addRoute, navigateTo, renderRoute } from './router/router'
import HomePage from './pages/HomePage'
import ProjectionsPage from './pages/ProjectionsPage'
import NotFoundPage from './pages/NotFoundPage'

addRoute('/', HomePage)
addRoute('/projections', ProjectionsPage)
addRoute('/404', NotFoundPage)

window.navigateTo = navigateTo

renderRoute()

const navLinks = `
  <nav>
    <a href="/" onclick="event.preventDefault(); navigateTo('/')">Orçamento</a>
    <a href="/projections" onclick="event.preventDefault(); navigateTo('/projections')">Projeção</a>
  </nav>
`

document.body.insertAdjacentHTML('afterbegin', navLinks)
