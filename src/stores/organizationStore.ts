import { defineStore } from 'pinia'
import type { IOrganization } from '@/services/types'

interface IState {
  organization?: IOrganization
  fg_id?: string
}

export const useOrganizationStore = defineStore('organization', {
  state: () =>
    ({
      organization: undefined,
      fg_id: undefined
    } as IState),
  actions: {
    setOrganization(organization: IOrganization) {
      this.fg_id = organization?.organizationId
      this.organization = organization
    },
    clearOrganization() {
      this.organization = undefined
    },
    getId() {
      return this.organization?.organizationId ?? ''
    },
    setFgId(id: string) {
      this.fg_id = id
    }
  }
})
