import { WxIsv } from '../typings'
import { WxIsvTokenService } from './WxIsvTokenService'
export class WxIsvBasicService extends WxIsvTokenService {
    // 设置订单页 path 信息
    async applySetOrderPathInfo(accessToken: string, batchReq: Record<any, any>) {
        return (await this.request(
            'POST',
            '/wxa/security/applysetorderpathinfo',
            { batch_req: batchReq },
            { component_access_token: await this.getToken() }
        )) as WxIsv.WxIsvNormalResponse
    }

    // 获取订单页 path 信息
    async getOrderPathInfo(accessToken: string, info_type: number) {
        return (await this.request(
            'POST',
            '/wxa/security/getorderpathinfo',
            { info_type },
            { access_token: accessToken }
        )) as WxIsv.WxIsvNormalResponse
    }
}
