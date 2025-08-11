import { $, _ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvReleaseService extends WxIsvServiceBase {
  // 上传小程序代码
  async commit(
    accessToken: string,
    template_id: string,
    extAppId: string,
    extInfo: any,
    version: string,
    description: string
  ): Promise<any> {
    _.defaults(extInfo, { extAppid: extAppId, ext: {}, extPages: {} })
    const body = {
      template_id,
      ext_json: JSON.stringify(extInfo),
      user_version: version || 'V1.0',
      user_desc: description || 'V1.0首次提交',
    }
    return (await this.request('POST', '/wxa/commit', body, {
      access_token: accessToken,
    })) as WxIsv.WxIsvNormalResponse
  }

  // 获取小程序代码的页面配置
  async getPage(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/get_page',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvReleasePageList
  }

  // 查询服务商的当月提审限额（quota）和加急次数
  async queryQuota(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/queryquota',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvReleaseQuota
  }

  // 将代码包提交审核
  async submitAudit(accessToken: string, item_list: any[], order_path: string, privacy_api_not_use: boolean) {
    item_list = $.snakeCaseKeys(item_list)
    const { auditid: auditId = '' } = (await this.request(
      'POST',
      '/wxa/submit_audit',
      { item_list, order_path, privacy_api_not_use },
      { access_token: accessToken },
    )) as WxIsv.WxIsvReleaseAuditSubmit
    return auditId as string
  }

  // 审核撤回
  async undoSubmitAudit(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/undocodeaudit',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 审核加急
  async speedAudit(accessToken: string, auditid: string) {
    return (await this.request(
      'POST',
      '/wxa/speedupaudit',
      { auditid },
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 查询最新一次提交的审核状态
  async getLatestAuditStatus(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/get_latest_auditstatus',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvReleaseLatestAudit
  }

  // 发布已通过审核的小程序
  async release(accessToken: string) {
    return (await this.request(
      'POST',
      '/wxa/release',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 版本回退
  async revertCodeRelease(accessToken: string) {
    return (await this.request(
      'GET',
      '/wxa/revertcoderelease',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 设置小程序线上代码的可见状态
  async setVisitStatus(accessToken: string, action: 'open' | 'close') {
    return (await this.request(
      'POST',
      '/wxa/change_visitstatus',
      { action },
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 查询当前设置的最低基础库版本及各版本用户占比
  async getSupportVersion(accessToken: string) {
    return (await this.request(
      'POST',
      '/cgi-bin/wxopen/getweappsupportversion',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvReleaseSupportVersion
  }

  // 设置最低基础库版本
  async setSupportVersion(accessToken: string, version: string) {
    return (await this.request(
      'POST',
      '/cgi-bin/wxopen/setweappsupportversion',
      { version },
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }
}
