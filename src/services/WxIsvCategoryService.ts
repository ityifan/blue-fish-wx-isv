import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvCategoryService extends WxIsvServiceBase {
  // 获取授权小程序帐号的可选类目
  async getCategory(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/get_category',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvCategoryAudit
  }
}
