import { BaseService } from './BaseService'
import type { ICustomer, RootAPIResponse, PaginatedResult, ICustomerRead } from './types'
type CustomerType = ICustomer
class CustomerService extends BaseService {
  constructor() {
    super('customers')
  }

  readonly create = async (data: Partial<CustomerType>) => {
    const response = await this.doRequest<RootAPIResponse<CustomerType>>({
      method: 'POST',
      body: this.uniqueRequestGUID(data)
    })
    return response
  }

  readonly getAll = async (): Promise<ICustomer[]> => {
    const response = await this.doRequest<RootAPIResponse<PaginatedResult<ICustomer>>>()
    return response.value.result
  }

  readonly search = async (searchString: string): Promise<ICustomerRead[]> => {
    const url = this.getUrl('search')
    const response = await this.doRequest<RootAPIResponse<ICustomerRead[]>>({
      url,
      method: 'POST',
      body: { searchString }
    })
    return response.value
  }
}

export default new CustomerService()
