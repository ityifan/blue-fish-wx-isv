
import { $, } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'


export class WxIsvInsuranceFreightService extends WxIsvServiceBase {
    // 运费险开通 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async open(
        accessToken: string,
    ) {
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/open',
            {},
            { access_token: accessToken }
        )) as WxIsv.WxIsvNormalResponse
    }

    // 运费险申请充值订单号 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async createchargeid(
        accessToken: string,
        quota: number
    ) {
        return (await this.requestTransformResponse(
            'POST',
            '/wxa/business/insurance_freight/createchargeid',
            { quota },
            { access_token: accessToken },
            (data: any) => { return JSON.parse(data.replace(/"(\w+)":(\d{0,})([,}])/g, '"$1":"$2"$3')) }
        )) as WxIsv.WxIsvCreatechargeidResponse
    }

    // 运费险申请支付 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async applypay(
        accessToken: string,
        orderId: string
    ) {
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/applypay',
            { order_id: orderId },
            { access_token: accessToken }
        )) as WxIsv.WxIsvApplypayResponse
    }

    // 拉取充值订单信息 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async getpayorderlist(
        accessToken: string,
        data: {
            statusList: number[]
            offset: number
            limit: number
        }
    ) {
        const params = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/getpayorderlist',
            { ...params },
            { access_token: accessToken }
        )) as WxIsv.WxIsvGetpayorderlistResponse
    }

    // 退款接口 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async refund(
        accessToken: string,
    ) {
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/refund',
            {},
            { access_token: accessToken }
        )) as WxIsv.WxIsvNormalResponse
    }

    // 拉取摘要 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async getsummary(
        accessToken: string,
        data: {
            beginTime: number,
            endTime: number
        }
    ) {
        const params = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/getsummary',
            { ...params },
            { access_token: accessToken }
        )) as WxIsv.WxIsvGetsummaryResponse
    }

    // 拉取保单摘要 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async getorderlist(
        accessToken: string,
        data: {
            statusList: number[]
            offset: number
            limit: number
            openid?: string
            orderNo?: string
            policyNo?: string
            reportNo?: string
            deliverNo?: string
            refundDeliveryNo?: string
            beginTime?: string
            endTime?: string
        }
    ) {
        const params = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/getorderlist',
            { ...params },
            { access_token: accessToken }
        )) as WxIsv.WxIsvGetorderlistResponse
    }

    // 投保 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async createorder(
        accessToken: string,
        data: {
            openid: string,
            orderNo: string,
            payAmount: number,
            payTime: number,
            deliveryPlace: Record<string, any>,
            receiptPlace: Record<string, any>,
            deliveryNo: string
        }
    ) {
        const params = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/createorder',
            { ...params },
            { access_token: accessToken }
        )) as WxIsv.WxIsvCreateorderResponse
    }

    // 理赔 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/industry/express/business/freight_insurance.html#%E7%90%86%E8%B5%94%E6%8E%A5%E5%8F%A3
    async claim(
        accessToken: string,
        data: {
            openid: string,
            orderNo: string,
            refundDeliveryNo: string,
            refundCompany: string
        }
    ) {
        const params = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/business/insurance_freight/claim',
            { ...params },
            { access_token: accessToken }
        )) as WxIsv.WxIsvCreateorderResponse
    }
}