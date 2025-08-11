import { _ } from 'blue-fish-helper'
import { die } from 'coa-error'
import { WxIsvTokenService } from '../services/WxIsvTokenService'
import { WxIsv } from '../typings'

const wxImage = new (class {
  encode(uri = '') {
    return _.toString(uri)
      .replace(/https?:\/\//, 'bs_wx/')
      .replace(/\/\d{1,3}$/, '')
      .replace(/\/$/, '')
  }

  decode(uri = '') {
    uri = _.toString(uri)
      .replace(/^bs_wx\//, '')
      .replace(/\/\d{1,3}$/, '')
      .replace(/\/$/, '')
    return 'https://' + uri + '/0'
  }
})()

export class WxIsvAuthService extends WxIsvTokenService {
  // 获取授权跳转链接
  async createRedirectUrl(redirectUri: string, authType: 1 | 2 | 3, plantform: 'pc' | 'mobile') {
    redirectUri = encodeURIComponent(redirectUri)
    const pre_auth_code = await this.createPreAuthCode()

    const pc = `https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=${this.config.appId}&pre_auth_code=${pre_auth_code}&redirect_uri=${redirectUri}&auth_type=${authType}`
    const mobile = `https://mp.weixin.qq.com/safe/bindcomponent?action=bindcomponent&no_scan=1&component_appid=${this.config.appId}&pre_auth_code=${pre_auth_code}&redirect_uri=${redirectUri}&auth_type=${authType}#wechat_redirect`

    return plantform === 'pc' ? pc : mobile
  }

  // 使用授权码换取公众号或小程序的接口调用凭据和授权信息
  async getAuthInfoByCode(authorization_code: string) {
    const body = { component_appid: this.config.appId, authorization_code }
    const result = await this.request(
      'POST',
      '/cgi-bin/component/api_query_auth',
      body,
      { component_access_token: await this.getToken() }
    )
    return (
      (result.authorizationInfo as WxIsv.WxIsvAuthInfo) ||
      die.hint('authorizationInfo缺失')
    )
  }

  // 获取授权小程序的基本信息
  async getAppInfo(appWxaId: string) {
    const body = {
      component_appid: this.config.appId,
      authorizer_appid: appWxaId,
    }
    const result = await this.request(
      'POST',
      '/cgi-bin/component/api_get_authorizer_info',
      body,
      { component_access_token: await this.getToken() }
    )
    const appInfo =
      (result.authorizerInfo as WxIsv.WxIsvAuthAppInfo) ||
      die.hint('authorizerInfo缺失')

    appInfo.nickname = appInfo.nickName
    delete (appInfo as any).nickName
    appInfo.headImg = wxImage.encode(appInfo.headImg)
    appInfo.qrcodeUrl = wxImage.encode(appInfo.qrcodeUrl)
    return appInfo
  }

  // 获取授权小程序账号的基本信息
  async getAccountBasicInfo(accessToken: string) {
    return (await this.request(
      'GET',
      '/cgi-bin/account/getaccountbasicinfo',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvAuthAccountInfo
  }

  // 刷新小程序的接口调用凭据（令牌）
  async refreshAppTokenInfo(appWxaId: string, refresh_token: string) {
    const body = {
      component_appid: this.config.appId,
      authorizer_appid: appWxaId,
      authorizer_refresh_token: refresh_token,
    }
    return (await this.request(
      'POST',
      '/cgi-bin/component/api_authorizer_token',
      body,
      {
        component_access_token: await this.getToken(),
      }
    )) as WxIsv.WxIsvAuthRefreshInfo
  }

  // 小程序登录
  async jscode2session(appId: string, js_code: string) {
    const component_access_token = await this.getToken()
    const component_appid = this.config.appId
    return (await this.request(
      'GET',
      '/sns/component/jscode2session',
      {},
      {
        appid: appId,
        js_code,
        grant_type: 'grant_type',
        component_access_token,
        component_appid,
      }
    )) as { openid: string; sessionKey: string; unionid?: string }
  }

  // 获取预授权码pre_auth_code
  private async createPreAuthCode() {
    const body = { component_appid: this.config.appId }
    const result = await this.request(
      'POST',
      '/cgi-bin/component/api_create_preauthcode',
      body,
      { component_access_token: await this.getToken() }
    )
    return (result.preAuthCode as string) || ''
  }
}
