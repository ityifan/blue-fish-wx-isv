import { $ } from 'blue-fish-helper'
import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'
import { WxIsv } from '../typings'
// https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/plugin-management/managePlugin.html
// 插件管理

export class WxIsvPluginManagementService extends WxIsvServiceBase {
    async plugin(accessToken: string, data: { action: string, pluginAppid: string, reason?: string, userVersion?: string }) {
        const param = $.snakeCaseKeys(data)
        return (await this.request(
            'POST',
            '/wxa/plugin',
            param,
            { access_token: accessToken }
        )) as WxIsv.WxIsvPluginManagementResponse
    }
}
