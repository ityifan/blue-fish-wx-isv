import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

export class WxIsvIcpService extends WxIsvServiceBase {
  // 获取小程序备案状态及驳回原因 https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/miniprogram-management/record/getIcpEntranceInfo.html
  async getIcpEntranceInfo(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/icp/get_icp_entrance_info',
      {},
      { access_token: accessToken }
    ))
  }
}
