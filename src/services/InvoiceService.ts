import { BaseService } from './BaseService'
import type { RootAPIResponse, PriceAdjustmentModel } from './types'

class InvoiceService extends BaseService {
  constructor() {
    super('invoices')
  }
  readonly addPriceIncrement = async (
    invoiceId: string,
    data: PriceAdjustmentModel
  ): Promise<{
    subTotal: number
    total: number
  } | void> => {
    const url = this.getUrl(`${invoiceId}`)
    const response = await this.doRequest<RootAPIResponse<void>>({
      url,
      method: 'PATCH',
      body: this.uniqueRequestGUID(data)
    })
    return response.value
  }
}

export default new InvoiceService()
