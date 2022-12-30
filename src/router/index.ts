import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import RegistrationView from '../views/RegistrationView.vue'
import TimetableView from '../views/TimetableView.vue'
import ModulesView from '../views/ModulesView.vue'
import OtherPeopleView from '../views/OtherPeopleView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'register',
    component: RegistrationView
  },
  {
    path: '/timetable',
    name: 'timetable',
    component: TimetableView
  },
  {
    path: '/modules',
    name: 'modules',
    component: ModulesView
  },
  {
    path: '/otherPeople',
    name: 'otherPeople',
    component: OtherPeopleView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
