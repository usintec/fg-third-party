import { BaseService } from './BaseService'
import type { IKey, RootAPIResponse } from './types'
type Key = IKey

class ApiKeyService extends BaseService {
  constructor() {
    super('apiKeys')
  }

  readonly regenerate = async (id: string): Promise<Key> => {
    const url = this.getUrl(`${id}/regenerate`)
    const res = await this.doRequest<RootAPIResponse<Key>>({
      method: 'POST',
      url
    })
    return res.value
  }
}

export default new ApiKeyService()
