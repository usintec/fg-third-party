import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import BillListVue from '@/components/bill/BillList.vue'
import NotFoundVue from '@/pages/NotFound.vue'
import CreateBillVue from '@/components/bill/create/CreateBill.vue'
import BillInvoicePageVue from '@/pages/Bill/BillInvoicePage.vue'
import EditBillVue from '@/components/bill/create/EditBill.vue'
import PreviewBillVue from '@/components/bill/PreviewBill.vue'
import CustomerListVue from '@/components/customer/CustomerList.vue'
import GeneralSettingsVue from '@/components/settings/GeneralSettings.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
      children: [
        {
          path: '/',
          name: 'dashboard',
          props: { name: 'Dashboard' },
          component: BillListVue
        },
        {
          path: '/bills/create-bill',
          name: 'create new bill',
          component: CreateBillVue
        },
        {
          path: '/bills/:billId/invoices',
          name: 'Bill Invoice page',
          component: BillInvoicePageVue
        },
        {
          path: '/bills/:billId/edit',
          name: 'Bill Edit page',
          component: EditBillVue
        },
        {
          path: '/bills/view-bills',
          name: 'view bill page',
          component: PreviewBillVue
        },
        {
          path: '/customers',
          name: 'customers',
          component: CustomerListVue
        },
        {
          path: '/settings',
          name: '_settings',
          props: { name: 'Organization - settings' },
          component: GeneralSettingsVue
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: NotFoundVue
    }
  ],
  history: createWebHistory()
})

router.beforeEach((to, _, next) => {
  if (to.name !== 'login' && !localStorage.getItem('refreshToken')) next({ name: 'login' })
  next()
})

router.afterEach((to, from, failure) => {
  if (failure) {
    console.log(to, from, failure)
  }
})

export default router
