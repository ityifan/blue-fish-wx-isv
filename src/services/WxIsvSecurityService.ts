import { echo } from 'coa-echo'
import { die } from 'coa-error'
import { xml } from 'coa-xml'
import * as crypto from 'crypto'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

export class WxIsvSecurityService extends WxIsvServiceBase {
  // 解密
  async decrypt(encryptedData: string) {
    const key = this.config.appToken
    const iv = key.substr(0, 16)
    let result = {} as any

    try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      let decoded = decipher.update(encryptedData, 'base64', 'utf8')
      try {
        decoded += decipher.final('utf8')
      } catch (e) {
        // do nothing
      }
      decoded = decoded.replace(/[\s\S]*(<xml>[\s\S]*<\/xml>)[\s\S]*/, '$1')
      result = await xml.decode(decoded)
    } catch (e) {
      die.error('微信解密失败')
    }
    return result
  }

  // 解密
  decryptData(encryptedData: string, iv: string, sessionKey: string): any {
    // base64 decode
    const bSessionKey = Buffer.from(sessionKey, 'base64')
    const bEncryptedData = Buffer.from(encryptedData, 'base64')
    const bIv = Buffer.from(iv, 'base64')

    try {
      const decipher = crypto.createDecipheriv('aes-128-cbc', bSessionKey, bIv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      let decoded = decipher.update(bEncryptedData, undefined, 'utf8')
      decoded += decipher.final('utf8')
      decoded = JSON.parse(decoded)

      return decoded
    } catch (err) {
      echo.error(err)
      die.hint('解密错误')
    }
  }

  /**
   * 文本内容安全识别
   * 详见 https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html
   */
  async msgSecCheck(
    accessToken: string,
    content: string,
    version = 2,
    scene: number, //1 资料；2 评论；3 论坛；4 社交日志
    openid: string,
    title?: string,
    nickname?: string,
    signature?: string
  ) {
    return await this.request('POST', '/wxa/msg_sec_check', {
      content,
      version,
      scene,
      openid,
      title,
      nickname,
      signature
    }, {
      access_token: accessToken
    })
  }

  /**
   * 多媒体内容安全识别
   * 详见 https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/mediaCheckAsync.html
   */
  async mediaCheckAsync(
    accessToken: string,
    media_url: string,
    media_type: 1|2, // 1: 图片, 2: 音频
    version = 2,
    scene: number, //1 资料；2 评论；3 论坛；4 社交日志
    openid: string,
  ) {
    return await this.request('POST', '/wxa/media_check_async', {
      media_url,
      media_type,
      version,
      scene,
      openid,
    }, {
      access_token: accessToken
    })
  }
}
