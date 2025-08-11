import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

export class WxIsvMaterialService extends WxIsvServiceBase {
  /**
     * 新增临时素材
     * 详见  https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/New_temporary_materials.html
     * @param accessToken 接口调用凭证
     * @param buffer 文件buffer
     * @param filename 文件name
     */
  async uploadImage(accessToken: string, buffer: Buffer, filename: string) {
    const { body, boundary } = await this.buildMultipartForm({ buffer, filename })
    const headers = {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': body.length.toString(),
    }

    return await this.requestBuffer(
      'POST',
      '/cgi-bin/media/upload',
      body,
      headers,
      { access_token: accessToken, type: 'image' }
    )
  }

  async buildMultipartForm(data: { buffer: Buffer, filename: string, }) {
    const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2)
    const contentDisposition = `Content-Disposition: form-data; name="media"; filename="${data.filename}"`
    const contentType = 'Content-Type: image/jpeg' // 根据需要可动态设置

    const head = Buffer.from(
      `--${boundary}\r\n${contentDisposition}\r\n${contentType}\r\n\r\n`
    )
    const tail = Buffer.from(`\r\n--${boundary}--\r\n`)

    const body = Buffer.concat([head, data.buffer, tail])
    return { body, boundary }
  }

  /**
   * 公众号获取永久素材
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_materials_list.html
   * @param accessToken 接口调用凭证
   * @param mediaId 要获取的素材的media_id
   */
  async getMaterial(accessToken: string, mediaId: string) {
    return await this.request(
      'POST',
      '/cgi-bin/material/get_material',
      { media_id: mediaId },
      { access_token: accessToken }
    )
  }

  /**
   * 公众号获取素材列表
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/Asset_Management/Get_materials_list.html
   * @param accessToken 接口调用凭证
   * @param type 素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）
   * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
   * @param count 返回素材的数量，取值在1到20之间
   */
  async getMaterialList(accessToken: string, type: string, offset: number, count: number) {
    return await this.request(
      'POST',
      '/cgi-bin/material/batchget_material',
      { type, offset, count },
      { access_token: accessToken }
    )
  }

  /**
   * 公众号通过 article_id 获取已发布文章
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/Publish/Get_article_from_id.html
   * @param accessToken 接口调用凭证
   * @param articleId 要获取的草稿的article_id
   */
  async getArticle(accessToken: string, articleId: string) {
    return await this.request(
      'POST',
      '/cgi-bin/freepublish/getarticle',
      { article_id: articleId },
      { access_token: accessToken }
    )
  }

  /**
   * 公众号获取成功发布列表
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/Publish/Get_publication_records.html
   * @param accessToken 接口调用凭证
   * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材返回
   * @param count 返回素材的数量，取值在1到20之间
   * @param noContent 1 表示不返回 content 字段，0 表示正常返回，默认为 0
   */
  async getFreePublishList(accessToken: string, offset: number, count: number, noContent: number) {
    return await this.request(
      'POST',
      '/cgi-bin/freepublish/batchget',
      { offset, count, no_content: noContent },
      { access_token: accessToken }
    )
  }
}
