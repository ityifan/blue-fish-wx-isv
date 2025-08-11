import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvSubscribeService extends WxIsvServiceBase {
  // 获取模板标题下的关键词库 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Mini_Programs/subscribe_template/library_get.html
  async getPubTemplateKeywords(accessToken: string, tid: string) {
    return (await this.request(
      'GET',
      '/wxaapi/newtmpl/getpubtemplatekeywords',
      {},
      { access_token: accessToken, tid }
    )) as WxIsv.WxIsvTmplKeywordResponse
  }

  // 组合模板并添加到个人模板库 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Mini_Programs/subscribe_template/add_template.html
  async addTemplate(
    accessToken: string,
    tid: string | number,
    kidList: number[],
    sceneDesc: string
  ) {
    return (await this.request(
      'POST',
      '/wxaapi/newtmpl/addtemplate',
      { tid, kidList, sceneDesc },
      { access_token: accessToken }
    )) as WxIsv.WxIsvAddTemplateResponse
  }

  // 删除帐号下的某个模板 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Mini_Programs/subscribe_template/del_template.html
  async delTemplate(accessToken: string, priTmplId: string) {
    return (await this.request(
      'POST',
      '/wxaapi/newtmpl/deltemplate',
      { priTmplId },
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 发送订阅消息 https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/Mini_Programs/subscribe_template/subscribeMessage.send.html
  async send(
    accessToken: string,
    {
      openId,
      templateId,
      data,
      miniProgramState,
      page,
    }: {
      openId: string
      templateId: string
      data: Record<string, any>
      miniProgramState: 'developer' | 'trial' | 'formal'
      page: string
    }
  ) {
    const params = {
      touser: openId,
      template_id: templateId,
      page,
      miniprogram_state: miniProgramState,
      data,
      lang: 'zh_CN',
    }
    return (await this.request(
      'POST',
      '/cgi-bin/message/subscribe/send',
      params,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }
}
