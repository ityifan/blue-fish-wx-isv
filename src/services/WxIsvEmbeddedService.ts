import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

export class WxIsvEmbeddedService extends WxIsvServiceBase {
  /**
   * 添加半屏小程序
   * 详见 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/miniprogram-management/embedded-management/addEmbedded.html
   * @param accessToken 接口调用凭证
   * @param appId 添加的半屏小程序 appid
   * @param applyReason 申请理由，不超过30个字
   */
  async addEmbedded(accessToken: string, appId: string, applyReason: string) {
    return await this.request(
      'POST',
      '/wxaapi/wxaembedded/add_embedded',
      { appid: appId, apply_reason: applyReason },
      { access_token: accessToken }
    )
  }

  /**
   * 删除半屏小程序
   * 详见 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/miniprogram-management/embedded-management/deleteEmbedded.html
   * @param accessToken 接口调用凭证
   * @param appId 添加的半屏小程序 appid
   */
  async deleteEmbedded(accessToken: string, appId: string) {
    return await this.request(
      'POST',
      '/wxaapi/wxaembedded/del_embedded',
      { appid: appId },
      { access_token: accessToken }
    )
  }

  /**
   * 获取半屏小程序调用列表
   * 详见 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/miniprogram-management/embedded-management/getEmbeddedList.html
   * @param accessToken 接口调用凭证
   * @param start query参数，分页起始值，默认值为0
   * @param num query参数，一次拉取最大值，最大1000，默认值为10
   */
  async getEmbeddedList(accessToken: string, start = 0, num = 10) {
    return await this.request(
      'GET',
      '/wxaapi/wxaembedded/get_list',
      { start, num },
      { access_token: accessToken }
    )
  }
}
