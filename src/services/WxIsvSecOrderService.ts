import { $ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'

// 小程序发货信息管理服务/发货信息录入接口
// https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/business-capabilities/order-shipping/order-shipping.html#%E4%B8%80%E3%80%81%E5%8F%91%E8%B4%A7%E4%BF%A1%E6%81%AF%E5%BD%95%E5%85%A5%E6%8E%A5%E5%8F%A3
export class WxIsvSecOrderService extends WxIsvServiceBase {
    async uploadShippingInfo(accessToken: string, data: { orderKey: Record<any, any>, deliveryMode: number, logisticsType: number, shippingList: Array<Record<any, any>>, uploadTime: string, payer: Record<any, any> }) {
        const param = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/sec/order/upload_shipping_info',
            param,
            { access_token: accessToken }
        )) as WxIsv.WxIsvNormalResponse
    }
}
