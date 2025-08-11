import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvTesterService extends WxIsvServiceBase {
  // 绑定体验者
  async bind(accessToken: string, wechatid: string) {
    return (await this.request(
      'POST',
      '/wxa/bind_tester',
      { wechatid },
      { access_token: accessToken }
    )) as WxIsv.WxIsvTesterBind
  }

  // 取消绑定体验者
  async unbind(accessToken: string, wechatid: string, userstr?: string) {
    return (await this.request(
      'POST',
      '/wxa/unbind_tester',
      wechatid ? { wechatid } : { userstr },
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 体验者列表
  async getList(accessToken: string) {
    return (await this.request(
      'POST',
      '/wxa/memberauth',
      { action: 'get_experiencer' },
      { access_token: accessToken }
    )) as WxIsv.WxIsvTesterList
  }
}
