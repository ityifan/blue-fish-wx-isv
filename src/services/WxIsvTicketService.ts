import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvTicketService extends WxIsvServiceBase {
  // 获取小程序jsapi_ticket
  async getJsApiTicket(accessToken: string) {
    return (await this.request(
      'GET',
      '/cgi-bin/ticket/getticket',
      {},
      { access_token: accessToken, type: 'jsapi' }
    )) as WxIsv.WxIsvTicket
  }
}
