import { $ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

const customErrorMessage: WxIsv.customErrorMessage = {
  '85074': '小程序未发布, 小程序必须先发布代码才可以发布二维码跳转规则',
  '85075': '个人类型小程序无法设置二维码规则',
}

export class WxIsvQrService extends WxIsvServiceBase {
  customErrorMessage = customErrorMessage

  // 获取体验小程序的体验二维码
  async getCommitQrImage(accessToken: string, path: string) {
    path = encodeURIComponent(path)
    return await this.requestStream(
      'GET',
      '/wxa/get_qrcode',
      {},
      { access_token: accessToken, path }
    )
  }

  // 获取小程序码（无数量限制）
  async getWxaImageUnlimited(
    accessToken: string,
    data: { scene: string; page: string; is_hyaline: boolean }
  ) {
    return await this.requestStream(
      'POST',
      '/wxa/getwxacodeunlimit',
      { width: 1280, auto_color: false, ...data },
      { access_token: accessToken }
    )
  }

  // 获取小程序码（有数量限制）
  async getWxaCodeLimited(
    accessToken: string,
    data: { path: string; is_hyaline: boolean }
  ) {
    return await this.requestStream(
      'POST',
      '/wxa/getwxacode',
      { width: 1280, auto_color: false, ...data },
      { access_token: accessToken }
    )
  }

  // 获取小程序的二维码（有数量限制）
  async getWxaQrCodeLimited(accessToken: string, data: { path: string }) {
    return await this.requestStream(
      'POST',
      '/cgi-bin/wxaapp/createwxaqrcode',
      { width: 1280, ...data },
      { access_token: accessToken }
    )
  }

  // 获取已设置的二维码规则
  async list(accessToken: string) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/qrcodejumpget',
      {},
      { access_token: accessToken }
    )
  }

  // 增加二维码规则
  async add(
    accessToken: string,
    data: {
      prefix: string
      path: string
      permitSubRule: 1 | 2
      openVersion: 1 | 2 | 3
      debugUrl: string[]
    }
  ) {
    data = $.snakeCaseKeys({ ...data, isEdit: 0 })
    return await this.request('POST', '/cgi-bin/wxopen/qrcodejumpadd', data, {
      access_token: accessToken,
    })
  }

  // 修改二维码规则
  async edit(
    accessToken: string,
    data: {
      prefix: string
      path: string
      permitSubRule: 1 | 2
      openVersion: 1 | 2 | 3
      debugUrl: string[]
    }
  ) {
    data = $.snakeCaseKeys({ ...data, isEdit: 1 })
    return await this.request('POST', '/cgi-bin/wxopen/qrcodejumpadd', data, {
      access_token: accessToken,
    })
  }

  // 发布二维码规则
  async publish(accessToken: string, data: { prefix: string }) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/qrcodejumppublish',
      data,
      { access_token: accessToken }
    )
  }

  // 删除二维码规则
  async delete(accessToken: string, data: { prefix: string }) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/qrcodejumpdelete',
      data,
      { access_token: accessToken }
    )
  }

  // 获取校验文件名称及内容
  async getFile(accessToken: string) {
    return await this.request(
      'POST',
      '/cgi-bin/wxopen/qrcodejumpdownload',
      {},
      { access_token: accessToken }
    )
  }

  // 将一条长链接转成短链接
  async shortUrl(accessToken: string, longUrl: string) {
    return (await this.request(
      'POST',
      '/cgi-bin/shorturl',
      { action: 'long2short', long_url: longUrl },
      { access_token: accessToken }
    )) as { shortUrl: string }
  }

  /**
   * 生成带参数的二维码（创建永久二维码ticket）
   * https://developers.weixin.qq.com/doc/offiaccount/Account_Management/Generating_a_Parametric_QR_Code.html
   * @param accessToken 接口调用凭证
   * @param scene_str 场景值ID（字符串形式的ID），字符串类型，长度限制为1到64
   */
  async getMpTicket(accessToken: string, scene_str: string) {
    return (await this.request(
      'POST',
      '/cgi-bin/qrcode/create',
      { action_name: 'QR_LIMIT_STR_SCENE', action_info: { scene: { scene_str } } },
      { access_token: accessToken }
    )) as { ticket: string; url: string }
  }
  /**
   * 生成带参数的二维码（通过ticket换取二维码）
   * @param ticket 二维码ticket
   */
  async getMpQrCode(ticket: string) {
    ticket = encodeURIComponent(ticket)
    return await this.requestStream(
      'GET',
      'https://mp.weixin.qq.com/cgi-bin/showqrcode',
      {},
      { ticket }
    )
  }
}
