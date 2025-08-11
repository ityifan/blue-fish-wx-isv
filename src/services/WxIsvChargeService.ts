import { _ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

interface WxSmAccessToken {
  token: string
  expireOn: number
}

export class WxIsvChargeService extends WxIsvServiceBase {
  async getAccessToken() {
    const cacheName = `WxSmAccessToken:${this.bin.config.wxSmConfig.appId}`

    const result = (await this.bin.storage.get<WxSmAccessToken>(cacheName)) ?? { token: '', expireOn: 0 }
    if (!result.token) {
      const { appId, secret } = this.bin.config.wxSmConfig
      const data = await this.request('GET', '/cgi-bin/token', {}, { grant_type: 'client_credential', appid: appId, secret })

      const ms = _.toInteger(data.expiresIn) * 1e3 - 10 * 1e3
      result.expireOn = _.now() + ms
      result.token = data.accessToken || ''

      await this.bin.storage.set(cacheName, result, ms)
    }

    return result.token
  }

  /**
   * 查询购买资源包的用量情况
   * 小程序可通过本接口查询已购买资源包的用量情况
   * 详见 https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/charge/api/charge_get_usage_detail.html
   * @param access_token 接口调用凭证，该参数为 URL 参数，非 Body 参数
   * @param spuId 商品SPU ID，小程序音视频通话：10000058，手机号快速验证组件：10000077，手机号实时验证组件：10000086，地图个性化样式组件：10000092
   * @param offset 分页偏移量，从0开始
   * @param limit 每页个数，最大20
   */
  async getUsageDetail(access_token: string, spuId = '10000077', offset = 0, limit = 20) {
    return await this.request(
      'GET',
      '/wxa/charge/usage/get',
      {},
      { access_token, spuId, offset, limit }
    )
  }

  /**
   * 查询订单列表
   * 服务商可通过本接口查询已购买商品的订单列表
   * 详见 https://developers.weixin.qq.com/doc/oplatform/service_market/charge/api/charge_sp_query_order_list.html
   * @param spuId 商品SPU ID，集采-手机号快速验证组件：10000117，集采-手机号实时验证组件：10000120
   * @param offset 分页偏移量，从0开始
   * @param limit 每页个数，最大20
   */
  async queryOrderList(spuId = '10000117', offset = 0, limit = 20): Promise<any> {
    return await this.request(
      'POST',
      '/wxa/charge/service-provider/order/query_list',
      { spuId, offset, limit },
      { access_token: await this.getAccessToken() }
    )
  }

  /**
   * 查询可分配的sku列表
   * 服务商采购商品后，可通过本接口查询已购买资源包可分配的sku列表
   * 详见 https://developers.weixin.qq.com/doc/oplatform/service_market/charge/api/charge_sp_get_convertible_skus.html
   * @param spSpuId 服务商采购的批发商品SPU ID
   * @param spSkuId 服务商采购的批发商品SKU ID
   */
  async getConvertibleSkus(spSpuId: string, spSkuId: string): Promise<any> {
    return await this.request(
      'GET',
      '/wxa/charge/service-provider/package/get_convertible_skus',
      {},
      { access_token: await this.getAccessToken(), spSpuId, spSkuId }
    )
  }

  /**
   * 服务商分配资源包
   * 服务商在购买商品后，可通过本接口为指定的小程序分配资源包
   * 详见 https://developers.weixin.qq.com/doc/oplatform/service_market/charge/api/charge_sp_assign_package.html
   * @param orderId 要分配的服务商订单ID，如 DD2970445798112968704
   * @param skuId 期望分配给小程序的商品SKU ID
   * @param receiverAppId 要分配的小程序AppID
   * @param requestId 唯一请求ID，同一次分配请求需唯一，同一订单号同一requestId多次请求等同一次。requestId应为10-64位长的字符串
   */
  async assignPackage(orderId: string, skuId: string, receiverAppId: string, requestId: string): Promise<any> {
    return await this.request(
      'POST',
      '/wxa/charge/service-provider/package/assign',
      { orderId, skuId, receiverAppId, requestId },
      { access_token: await this.getAccessToken() }
    )
  }
}
