import { WxIsvServiceBase } from '../libs/WxIsvServiceBase'

export class WxIsvUserService extends WxIsvServiceBase {
  /**
   * 获取用户列表
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/User_Management/Getting_a_User_List.html
   * @param accessToken 接口调用凭证
   * @param nextOpenId 上一批列表的最后一个OPENID，不填默认从头开始拉取
   */
  async getUserList(accessToken: string, nextOpenId = '') {
    return await this.request('GET', 'cgi-bin/user/get', {  }, { access_token: accessToken, next_openid: nextOpenId });
  }

  /**
   * 批量获取用户基本信息
   * 详见 https://developers.weixin.qq.com/doc/offiaccount/User_Management/Get_users_basic_information_UnionID.html#UinonId
   * @param accessToken 接口调用凭证
   * @param userList 用户的标识，对当前公众号唯一
   */
  async batchGetUserInfo(accessToken: string, userList: any[]) {
    return await this.request('POST', 'cgi-bin/user/info/batchget', { user_list: userList }, { access_token: accessToken });
  }
}
