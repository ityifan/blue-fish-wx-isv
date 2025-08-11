import { _ } from 'blue-fish-helper'
import { WxIsvTokenService } from '../services/WxIsvTokenService'
import { WxIsv } from '../typings'

export class WxIsvTemplateService extends WxIsvTokenService {
  // 获取代码草稿列表
  async draftList(): Promise<WxIsv.WxIsvTemplateItem[]> {
    const result = await this.request(
      'GET',
      '/wxa/gettemplatedraftlist',
      {},
      { component_access_token: await this.getToken() }
    )
    const list = (result.draftList as any[]) || []
    _.forEach(list, (v) => (v.createAt = _.toInteger(v.createTime) * 1000))
    return _.sortBy(list, 'createAt') as WxIsv.WxIsvTemplateItem[]
  }

  // 将草稿添加到代码模板库
  async addToTemplate(draft_id: string): Promise<any> {
    return await this.request(
      'POST',
      '/wxa/addtotemplate',
      { draft_id },
      { component_access_token: await this.getToken() }
    )
  }

  // 获取代码模板列表
  async list(): Promise<WxIsv.WxIsvTemplateDraft[]> {
    const result = await this.request(
      'GET',
      '/wxa/gettemplatelist',
      {},
      { component_access_token: await this.getToken() }
    )
    const list = (result.templateList as any[]) || []
    _.forEach(list, (v) => (v.createAt = _.toInteger(v.createTime) * 1000))
    return _.sortBy(list, 'createAt') as WxIsv.WxIsvTemplateDraft[]
  }

  // 删除指定代码模版
  async deleteTemplate(template_id: string) {
    return await this.request(
      'POST',
      '/wxa/deletetemplate',
      { template_id },
      { component_access_token: await this.getToken() }
    )
  }
}
