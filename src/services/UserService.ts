import { BaseService } from './BaseService'
import type { IChangePassword, RootAPIResponse } from './types'
class UserService extends BaseService {
  constructor() {
    super('users')
  }

  readonly changePassword = async (data: Partial<IChangePassword>) => {
    const url = this.getUrl('change-password')
    const response = await this.doRequest<RootAPIResponse<{}>>({
        url,
        method: 'POST',
        body: this.uniqueRequestGUID(data)
    })
    return response
  }
}

export default new UserService()
