import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvMpService extends WxIsvServiceBase {
  /**
   * 获取展示的公众号信息
   * 使用本接口可以获取扫码关注组件所展示的公众号信息
   * 详见 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/subscribe_component/getshowwxaitem.html
   * @param accessToken 小程序接口调用令牌
   */
  async getShowItem(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/getshowwxaitem',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvMpShowItem
  }

  /**
   * 获取可以用来设置的公众号列表
   * 通过本接口可以获取扫码关注组件允许展示的公众号列表
   * 详见 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/subscribe_component/getwxamplinkforshow.html
   * @param accessToken 小程序接口调用令牌
   * @param page 页码，从 0 开始
   * @param num 每页记录数，最大为 20
   */
  async getShowItemList(accessToken: string, page = 0, num = 20) {
    return (await this.request(
      'GET',
      '/wxa/getwxamplinkforshow',
      {},
      { page, num, access_token: accessToken }
    )) as WxIsv.WxIsvMpShowItemList
  }

  /**
   * 设置展示的公众号信息
   * 使用本接口可以设置扫码关注组件所展示的公众号信息
   * 详见 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/subscribe_component/updateshowwxaitem.html
   * @param accessToken
   * @param mpAppId 新的公众号 appid
   * @param subscribe 是否打开扫码关注组件，0 关闭，1 开启，默认为1
   */
  async updateShowItem(accessToken: string, mpAppId: string, subscribe = 1) {
    return (await this.request(
      'POST',
      '/wxa/updateshowwxaitem',
      { appid: mpAppId, wxa_subscribe_biz_flag: subscribe },
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  /**
   * 获取公众号关联的小程序
   * 详见 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/officalaccount-management/link-miniprogram/getLinkMiniprogram.html
   * @param accessToken 接口调用凭证
   */
  async getLinkMiniprogram(accessToken: string) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/wxamplinkget',
      {},
      { access_token: accessToken }
    )
  }

  /**
   * 公众号关联小程序
   * 详见 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/officalaccount-management/link-miniprogram/linkMiniprogram.html
   * @param accessToken 接口调用凭证
   * @param appWxaId 小程序appid
   */
  async linkMiniprogram(accessToken: string, appWxaId: string) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/wxamplink',
      { appid: appWxaId, notify_users: 0, show_profile: 0 },
      { access_token: accessToken }
    )
  }

  /**
   * 公众号解除关联小程序
   * 详见 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/officalaccount-management/link-miniprogram/unlinkMiniprogram.html
   * @param accessToken 接口调用凭证
   * @param appWxaId 小程序appid
   */
  async unlinkMiniprogram(accessToken: string, appWxaId: string) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/wxampunlink',
      { appid: appWxaId },
      { access_token: accessToken }
    )
  }


}
