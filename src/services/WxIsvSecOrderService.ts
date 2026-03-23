import { $ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

// 小程序发货信息管理服务
// https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html

export class WxIsvSecOrderService extends WxIsvServiceBase {
  // 一、发货信息录入接口
  async uploadShippingInfo(
    accessToken: string,
    data: {
      orderKey: Record<any, any>
      deliveryMode: number
      logisticsType: number
      shippingList: Array<Record<any, any>>
      uploadTime: string
      payer: Record<any, any>
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/upload_shipping_info',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 二、发货信息合单录入接口
  async uploadCombinedShippingInfo(
    accessToken: string,
    data: {
      orderKey: Record<any, any>
      subOrders: Array<Record<any, any>>
      uploadTime: string
      payer: Record<any, any>
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/upload_combined_shipping_info',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 三、查询订单发货状态
  async getOrder(
    accessToken: string,
    data: {
      transactionId?: string
      merchantId?: string
      subMerchantId?: string
      merchantTradeNo?: string
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/get_order',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse & { order?: Record<string, any> }
  }

  // 四、查询订单列表
  async getOrderList(
    accessToken: string,
    data?: {
      payTimeRange?: { beginTime?: number; endTime?: number }
      orderState?: number
      openid?: string
      lastIndex?: string
      pageSize?: number
    }
  ) {
    const param = data ? $.snakeCaseKeys(data) : {}
    return (await this.request(
      'POST',
      '/wxa/sec/order/get_order_list',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse & {
      orderList?: Array<Record<string, any>>
      lastIndex?: string
      hasMore?: boolean
    }
  }

  // 五、确认收货提醒接口
  async notifyConfirmReceive(
    accessToken: string,
    data: {
      transactionId?: string
      merchantId?: string
      subMerchantId?: string
      merchantTradeNo?: string
      receivedTime: number
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/notify_confirm_receive',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 六、消息跳转路径设置接口
  async setMsgJumpPath(accessToken: string, data: { path: string }) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/set_msg_jump_path',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 七、查询小程序是否已开通发货信息管理服务
  async isTradeManaged(accessToken: string, data: { appid: string }) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/is_trade_managed',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse & { isTradeManaged?: boolean }
  }

  // 八、查询小程序是否已完成交易结算管理确认
  async isTradeManagementConfirmationCompleted(
    accessToken: string,
    data: { appid: string }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/is_trade_management_confirmation_completed',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse & { completed?: boolean }
  }

  // 十、特殊发货报备
  async opSpecialOrder(
    accessToken: string,
    data: { orderId: string; type: number; delayTo?: number }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/wxa/sec/order/opspecialorder',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }
}
