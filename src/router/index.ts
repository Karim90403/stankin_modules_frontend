import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'
import TimetableView from '../views/TimetableView.vue'
import ModulesView from '../views/ModulesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'register',
    component: RegistrationView
  },
  {
    path: '/',
    name: 'timetable',
    component: TimetableView
  },
  {
    path: '/modules',
    name: 'modules',
    component: ModulesView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
