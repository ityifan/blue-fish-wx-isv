import { $ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

interface OwnerSetting {
  contact_phone: string
  contact_email: string
  contact_qq?: string
  contact_weixin?: string
  store_expire_timestamp?: string
  ext_file_media_id?: string
  notice_method: string
}

interface SettingItem {
  privacy_key: string
  privacy_text: string
}

interface WxIsvPrivacySettingResponse {
  errcode: number
  errmsg: string
  codeExist: number
  privacyList: string[]
  settingList: {
    privacyKey: string
    privacyText: string
    privacyLabel: string
  }[]
  updateTime: number
  ownerSetting: {
    contactPhone: string
    contactEmail: string
    contactQq: string
    contactWeixin: string
    storeExpireTimestamp: string
    extFileMediaId: string
    noticeMethod: string
  }
  privacyDesc: {
    privacyDescList: {
      privacyKey: string
      privacyDesc: string
    }[]
  }
}

interface WxIsvPrivacyInterfaceResponse {
  errcode: number
  errmsg: string
  interfaceList: {
    apiName: string
    apiChName: string
    apiDesc: string
    status: number
    apiLink: string
    groupName: string
    applyTime?: undefined
    auditId?: undefined
    failReason?: undefined
  }[]
}

interface WxIsvApplyPrivacyInterfaceResponse extends WxIsv.WxIsvResponse {
  auditId: number
}

type PrivacyVersion = 1 | 2

export class WxIsvPrivacyService extends WxIsvServiceBase {
  /**
   * 配置小程序用户隐私保护指引
   * https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/privacy_config/set_privacy_setting.html
   * @param accessToken
   * @param privacy_ver
   * @param owner_setting
   * @param setting_list
   * @returns
   */
  async setPrivacySetting(
    accessToken: string,
    privacy_ver: PrivacyVersion = 2,
    owner_setting: OwnerSetting,
    setting_list: SettingItem[]
  ) {
    const res = await this.request(
      'POST',
      '/cgi-bin/component/setprivacysetting',
      $.snakeCaseKeys({ privacy_ver, owner_setting, setting_list }),
      { access_token: accessToken }
    )
    return res as WxIsv.WxIsvResponse
  }

  /**
   * 查询小程序用户隐私保护指引
   * https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/privacy_config/get_privacy_setting.html
   * @param accessToken
   * @param privacy_ver
   * @returns
   */
  async getPrivacySetting(
    accessToken: string,
    privacy_ver: PrivacyVersion = 2
  ) {
    const res = await this.request(
      'POST',
      '/cgi-bin/component/getprivacysetting',
      { privacy_ver },
      { access_token: accessToken }
    )
    return res as WxIsvPrivacySettingResponse
  }

  /**
   * 获取申请隐私接口列表
   * https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/apply_api/get_privacy_interface.html
   * @param accessToken
   * @returns
   */
  async getPrivacyInterface(
    accessToken: string
  ) {
    const res = await this.request(
      'GET',
      '/wxa/security/get_privacy_interface',
      {},
      { access_token: accessToken }
    )
    return res as WxIsvPrivacyInterfaceResponse
  }

  /**
   * 申请隐私接口
   * https://developers.weixin.qq.com/doc/oplatform/Third-party_Platforms/2.0/api/apply_api/apply_privacy_interface.html
   * @param accessToken
   * @param api_name 申请的api英文名，例如wx.choosePoi，严格区分大小写
   * @param content 申请说原因，不超过300个字符；需要以utf-8编码提交，否则会出现审核失败
   * @param url_list (辅助网页)例如，上传官网网页链接用于辅助审核
   * @param pic_list (辅助图片)填写图片的url，最多10个
   * @param video_list (辅助视频)填写视频的链接，最多支持1个；视频格式只支持mp4格式
   * @returns
   */
  async applyPrivacyInterface(
    accessToken: string,
    api_name: string,
    content: string,
    url_list: string[],
    pic_list: string[],
    video_list: string[]
  ) {
    const res = await this.request(
      'POST',
      '/wxa/security/apply_privacy_interface',
      { api_name, content, url_list, pic_list, video_list },
      { access_token: accessToken }
    )
    return res as WxIsvApplyPrivacyInterfaceResponse
  }
}
