import { _ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

const ISV_ACCESS_TOKEN = 'isvAccessToken'
const ISV_VERIFY_TICKET = 'isvVerifyTicket'
interface IsvAccessToken {
  token: string
  expire: number
}
interface IsvVerifyTicket {
  ticket: string
  expire: number
}

export class WxIsvTokenService extends WxIsvServiceBase {
  // 获取accessToken
  async getToken() {
    const result = (await this.bin.storage.get<IsvAccessToken>(
      ISV_ACCESS_TOKEN
    )) ?? { token: '', expire: 0 }
    if (!result.token) {
      const param = {
        component_appid: this.config.appId,
        component_appsecret: this.config.appSecret,
        component_verify_ticket: await this.getTicket(),
      }
      const data = await this.request(
        'POST',
        '/cgi-bin/component/api_component_token',
        param,
        {}
      )
      const ms = _.toInteger(data.expiresIn) * 1e3 - 3 * 60 * 1e3
      result.expire = _.now() + ms
      result.token = (data.componentAccessToken as string) || ''
      await this.bin.storage.set(ISV_ACCESS_TOKEN, result, ms)
    }

    return result.token
  }

  // 获取ticket
  async getTicket() {
    const result = (await this.bin.storage.get<IsvVerifyTicket>(
      ISV_VERIFY_TICKET
    )) ?? { ticket: '', expire: 1 }
    return result.ticket
  }

  // 设置ticket
  async setTicket(ticket: string) {
    const ms = 24 * 3600 * 1e3
    const expire = _.now() + ms
    return await this.bin.storage.set(ISV_VERIFY_TICKET, { ticket, expire }, ms)
  }
}
