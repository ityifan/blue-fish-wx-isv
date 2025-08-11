import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvComplainService extends WxIsvServiceBase {
  // 查询投诉单详情 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/complaint.html
  async getDetail(
    accessToken: string,
    complaintOrderId:string
  ) {
    return (await this.request(
      'GET',
      '/wxaapi/minishop/complaintOrderDetail',
      {},
      { complaintOrderId, access_token: accessToken }
    )) as WxIsv.WxIsvComplainResponse
  }
}