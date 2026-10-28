import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvComplainService extends WxIsvServiceBase {
  // 查询投诉单详情 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/complaint.html
  async getDetail(accessToken: string, complaintOrderId: string) {
    return (await this.request(
      'GET',
      '/wxaapi/minishop/complaintOrderDetail',
      {},
      { complaintOrderId, access_token: accessToken }
    )) as WxIsv.WxIsvComplainResponse
  }
  // 商家回应投诉
  async respondComplaint(
    accessToken: string,
    data: {
      complaintOrderId: number
      content?: string // 回应内容，与 mediaIdList 二选一
      mediaIdList?: string[] // 图片素材 id 列表，与 content 二选一
      bussiHandle: 1 | 2 // 1：同意和解，2：拒绝和解
    }
  ) {
    return (await this.request(
      'POST',
      '/wxaapi/minishop/bussiRespondComplaint',
      data,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 商家补充凭证
  async supplyProof(
    accessToken: string,
    data: {
      complaintOrderId: number
      content?: string // 回应内容，与 mediaIdList 二选一
      mediaIdList?: string[] // 图片素材 id 列表，与 content 二选一
    }
  ) {
    return (await this.request(
      'POST',
      '/wxaapi/minishop/bussiSupplyProof',
      data,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 商家提交退款凭证
  async submitRefund(
    accessToken: string,
    data: {
      complaintOrderId: number
      content?: string // 回应内容，与 mediaIdList 二选一
      mediaIdList?: string[] // 图片素材 id 列表，与 content 二选一
      acceptReturn?: number // 确认是否收货，退货状态下必填
      returnId?: number // 退货单号，通过查询投诉单详情获取，退货状态下必填
    }
  ) {
    return (await this.request(
      'POST',
      '/wxaapi/minishop/bussiSupplyRefund',
      data,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 商家申诉
  async busiAppeal(
    accessToken: string,
    data: {
      complaintOrderId: number
      content?: string // 回应内容，与 mediaIdList 二选一
      mediaIdList?: string[] // 图片素材 id 列表，与 content 二选一
    }
  ) {
    return (await this.request('POST', '/wxaapi/minishop/busiAppeal', data, {
      access_token: accessToken,
    })) as WxIsv.WxIsvNormalResponse
  }
}
