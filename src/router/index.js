import Vue from 'vue'
import VueRouter from 'vue-router'
import Money from '@/views/Money.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import ReportForm from '@/views/ReportForm.vue'

Vue.use(VueRouter)

const routes= [
  {
    path: '/',
    redirect: '/statistics',
    component: Statistics
  },
  {
    path: '/money',
    component: Money
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '/reportForm',
    component: ReportForm
  },
  {
    path: '*',
    component: () => import('@/components/NotFind.vue')
    //函数方式使用
  }
]

const router = new VueRouter({
  routes
})

export default router
