import type { IMenu } from './types'
export const menuItems: IMenu[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    link: '/'
  },
  {
    label: 'Payable Items',
    icon: 'checklist',
    link: '/payable-items',
    counter: 20,
    subMenu: ['Details', 'All bills', 'Settings'],
    showSubMenuOnClick: true
  },
  {
    label: 'Organization',
    icon: 'work',
    link: '/organizations',
    subMenu: ['Details', 'Admins', 'Sub Organizations', 'Settings'],
    showSubMenuOnClick: false
  },
  {
    label: 'Invoicing',
    icon: 'description',
    link: '/invoicing'
  },
  {
    label: 'Customers',
    icon: 'person',
    link: '/customers'
  },
  {
    label: 'Rebates',
    icon: 'chat_bubble',
    link: '/rebates'
  },
  {
    label: 'Bills',
    icon: 'payments',
    link: '/bills'
  }
]

export const sendMenus: IMenu[] = [
  {
    label: 'Reports & Statements',
    icon: 'contract',
    link: '/reports'
  },
  {
    label: 'Users',
    icon: 'group',
    link: '/users'
  },
  {
    label: 'Settings',
    icon: 'settings',
    link: '/settings'
  }
]

export const logout: IMenu = {
  label: 'Logout',
  icon: 'logout',
  link: '/'
}
