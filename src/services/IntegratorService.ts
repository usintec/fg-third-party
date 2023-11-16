import { BaseService } from './BaseService'
import type { IIntegrator, IKey, RootAPIResponse } from './types'
type ItemType = IIntegrator
type Key = IKey

class IntegratorService extends BaseService {
  constructor() {
    super('integrators')
  }

  readonly getOne = async (id: string): Promise<ItemType> => {
    const url = this.getUrl(id)
    const res = await this.doRequest<RootAPIResponse<ItemType>>({
      url
    })
    return res.value
  }

  readonly getKey = async (id: string): Promise<Key[]> => {
    const url = this.getUrl(`${id}/apiKeys`)
    const res = await this.doRequest<RootAPIResponse<Key[]>>({
      url
    })
    return res.value
  }
}

export default new IntegratorService()
