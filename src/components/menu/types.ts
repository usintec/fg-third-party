export interface IMenu {
  label: string
  icon: string
  link: string
  onClick?: () => void
  counter?: number
  subMenu?: string[]
  showSubMenuOnClick?: boolean
}
