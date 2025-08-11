import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

export class WxIsvMenuService extends WxIsvServiceBase {
  /**
   * 公众号创建自定义菜单
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html
   * @param accessToken 接口调用凭证
   * @param button 菜单数组
   */
  async createMenu(accessToken: string, button: any[]) {
    return await this.request(
      'POST',
      '/cgi-bin/menu/create',
      { button },
      { access_token: accessToken }
    )
  }

  /**
   * 公众号获取自定义菜单
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Querying_Custom_Menus.html
   * @param accessToken 接口调用凭证
   */
  async getCurrentSelfMenuInfo(accessToken: string) {
    return await this.request(
      'GET',
      '/cgi-bin/get_current_selfmenu_info',
      {},
      { access_token: accessToken }
    )
  }
}
