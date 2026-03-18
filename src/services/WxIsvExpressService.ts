import { $, _ } from 'blue-fish-helper'
import { CoaError } from 'coa-error'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

export class WxIsvExpressService extends WxIsvServiceBase {
  // 批量获取运单数据 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.batchGetOrder.html
  async batchGetOrder(
    accessToken: string,
    orderList: WxIsv.WxIsvExpressBatchGetOrder[]
  ) {
    const order_list = $.snakeCaseKeys(orderList)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/order/batchget',
      { order_list },
      { access_token: accessToken }
    )) as WxIsv.WxIsvExpressBatchGetOrderResponse
  }

  // 生成运单 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.addOrder.html
  async addOrder(accessToken: string, order: WxIsv.WxIsvAddOrderParam) {
    const orderData = $.snakeCaseKeys(order)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/order/add',
      orderData,
      { access_token: accessToken }
    )) as WxIsv.WxIsvAddOrderResponse
  }

  // 绑定、解绑物流账号 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.bindAccount.html
  async bindAccount(
    accessToken: string,
    data: {
      type: string
      bizId: string
      deliveryId: string
      password: string
      remarkContent: string
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/account/bind',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 取消运单 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.cancelOrder.html
  async cancelOrder(
    accessToken: string,
    data: {
      orderId: string
      openid: string
      deliveryId: string
      waybillId: string
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/order/cancel',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvCancelOrderResponse
  }

  // 获取所有绑定的物流账号 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getAllAccount.html
  async getAllAccount(accessToken: string) {
    return (await this.request(
      'GET',
      '/cgi-bin/express/business/account/getall',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvGetAllAccountResponse
  }

  // 获取支持的快递公司列表 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getAllDelivery.html
  async getAllDelivery(accessToken: string) {
    return (await this.request(
      'GET',
      '/cgi-bin/express/business/delivery/getall',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvGetAllAccountDelivery
  }

  // 获取运单数据 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getOrder.html
  async getOrder(
    accessToken: string,
    data: {
      orderId: string
      openid: string
      deliveryId: string
      waybillId: string
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/order/get',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvGetOrderResponse
  }

  // 查询运单轨迹 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getPath.html
  async getPath(
    accessToken: string,
    data: {
      orderId: string
      openid: string
      deliveryId: string
      waybillId: string
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/path/get',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvGetPathResponse
  }

  // 获取打印员。若需要使用微信打单 PC 软件，才需要调用。 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getPrinter.html
  async getPrinter(accessToken: string) {
    return (await this.request(
      'GET',
      '/cgi-bin/express/business/printer/getall',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvGetAllPrinterResponse
  }

  // 获取电子面单余额。仅在使用加盟类快递公司时，才可以调用。 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.getQuota.html
  async getQuota(
    accessToken: string,
    data: { deliveryId: string; bizId: string }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/quota/get',
      param,
      { access_token: accessToken },
    )) as WxIsv.WxIsvGetQuoatResponse
  }

  // 模拟快递公司更新订单状态, 该接口只能用户测试 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.testUpdateOrder.html
  async testUpdateOrder(
    accessToken: string,
    data: {
      bizId: string
      orderId: string
      deliveryId: string
      waybillId: string
      actionTime: number
      actionType: number
      actionMsg: string
    }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/test_update_order',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 配置面单打印员，可以设置多个，若需要使用微信打单 PC 软件，才需要调用。 https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/express/by-business/logistics.updatePrinter.html
  async updatePrinter(
    accessToken: string,
    data: { openid: string; updateType: string; tagidList: string }
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/business/printer/update',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  // 传运单。商户向微信提供某交易单号对应的运单号，微信后台会跟踪运单状态。 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/delivery/open_msg.html#传运单接口
  async traceWaybill(
    accessToken: string,
    data: WxIsv.WxIsvOpenMsgTraceWaybillParam
  ) {
    const param = $.snakeCaseKeys(data) as Record<string, any>
    return (await this.request(
      'POST',
      '/cgi-bin/express/delivery/open_msg/trace_waybill',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvOpenMsgTraceWaybillResponse
  }

  // 查询运单。在调用 trace_waybill 后，可使用本接口查询对应运单详情。 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/delivery/open_msg.html#查询运单接口
  async queryTrace(
    accessToken: string,
    data: WxIsv.WxIsvOpenMsgQueryTraceParam
  ) {
    const param = $.snakeCaseKeys(data)
    return (await this.request(
      'POST',
      '/cgi-bin/express/delivery/open_msg/query_trace',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvOpenMsgQueryTraceResponse
  }

  // 获取运力 id 列表。 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/delivery/open_msg.html#获取运力id列表
  async getDeliveryList(accessToken: string) {
    return (await this.request(
      'POST',
      '/cgi-bin/express/delivery/open_msg/get_delivery_list',
      {},
      { access_token: accessToken }
    )) as WxIsv.WxIsvOpenMsgGetDeliveryListResponse
  }

  // 更新物品信息。 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/delivery/open_msg.html#更新物流信息接口
  async updateWaybillGoods(
    accessToken: string,
    data: WxIsv.WxIsvOpenMsgUpdateWaybillGoodsParam
  ) {
    const param = $.snakeCaseKeys(data) as Record<string, any>
    return (await this.request(
      'POST',
      '/cgi-bin/express/delivery/open_msg/update_waybill_goods',
      param,
      { access_token: accessToken }
    )) as WxIsv.WxIsvNormalResponse
  }

  protected customErrorHandler(res: WxIsv.AxiosResponse) {
    const data = res.data || {}
    const errorCode = _.toNumber(data.errcode) || 0
    // 快递公司系统错误，其他错误则执行默认操作
    if (errorCode === 9300501) {
      const code = data.delivery_resultcode || ''
      const message = data.delivery_resultmsg || '快递公司未知错误'
      CoaError.throw('WxIsvExpress.ExpressReturnError.' + code, message)
    }
  }
}
