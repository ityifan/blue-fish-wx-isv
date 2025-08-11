import { die } from 'coa-error'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvDomainService extends WxIsvServiceBase {
  // 获取小程序服务器域名
  async get(accessToken: string) {
    return (await this.request(
      'POST',
      '/wxa/modify_domain',
      { action: 'get' },
      { access_token: accessToken }
    )) as WxIsv.WxIsvDomainModify
  }

  // 设置小程序服务器域名
  async update(
    accessToken: string,
    domian: {
      requestDomain: string[]
      wsRequestDomain: string[]
      uploadDomain: string[]
      downloadDomain: string[]
    },
    action: 'set' | 'add',
    ignoreError: WxIsv.IgnoreError = []
  ) {
    const body = {
      action,
      requestdomain: domian.requestDomain,
      wsrequestdomain: domian.wsRequestDomain,
      uploaddomain: domian.uploadDomain,
      downloaddomain: domian.downloadDomain,
    }
    return (await this.request(
      'POST',
      '/wxa/modify_domain',
      body,
      { access_token: accessToken },
      ignoreError
    )) as WxIsv.WxIsvDomainModify
  }

  // 获取小程序业务域名
  async getBiz(accessToken: string) {
    return await this.request(
      'POST',
      '/wxa/setwebviewdomain',
      { action: 'get' },
      { access_token: accessToken }
    )
  }

  // 设置小程序业务域名
  async setBiz(
    accessToken: string,
    domian: { webviewDomain: string[] },
    principalName: string,
    action = 'set',
    ignoreError: WxIsv.IgnoreError = []
  ) {
    principalName === '个人' && die.hint('个人小程序不支持设置业务域名')
    const body = {
      action,
      webviewdomain: domian.webviewDomain,
    }
    return (await this.request(
      'POST',
      '/wxa/setwebviewdomain',
      body,
      { access_token: accessToken },
      ignoreError
    )) as WxIsv.WxIsvNormalResponse
  }
}
