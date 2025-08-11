import { _ } from 'blue-fish-helper'
import { CoaError } from 'coa-error'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

interface UrllinkGenerateResult {
  urlLink: string
}

interface ShortUrllinkGenerateResult {
  link: string
}

export class WxIsvUrllinkService extends WxIsvServiceBase {
  /**
   * 生成永久的URL LINK
   * 详见 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-link/urllink.generate.html
   */
  async generateForever(
    accessToken: string,
    path: string,
    query: string
  ): Promise<UrllinkGenerateResult> {
    return await this.request(
      'POST',
      '/wxa/generate_urllink',
      _.pickBy({ path, query }),
      { access_token: accessToken }
    )
  }

  /**
   * 生成30天内的URL LINK
   * 详见 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/url-link/urllink.generate.html
   */
  async generateUnlimited(
    accessToken: string,
    path: string,
    query: string,
    expireDay = 30,
    envVersion = 'release'
  ): Promise<UrllinkGenerateResult> {
    if (expireDay > 31)
      CoaError.message(
        'WxISvUrllinkService.ExpireDayError',
        '有效期不能超过31天'
      )
    const data = _.pickBy({
      path,
      query,
      is_expire: true,
      expire_type: 1,
      expire_interval: expireDay,
      env_version: envVersion,
    })
    return await this.request('POST', '/wxa/generate_urllink', data, {
      access_token: accessToken,
    })
  }

  /**
   * 获取小程序 Short Link，适用于微信内拉起小程序的业务场景
   * 详见 https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/short-link/generateShortLink.html
   */
  async generateShortLink(
    accessToken: string,
    page_url: string,
    page_title = '',
    is_permanent = true
  ): Promise<ShortUrllinkGenerateResult> {
    return await this.request(
      'POST',
      '/wxa/genwxashortlink',
      { page_url, page_title, is_permanent },
      { access_token: accessToken }
    )
  }

}
