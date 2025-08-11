// @ts-nocheck

import { WxIsvAuthService, WxIsvBin, WxIsvDomainService } from '..'

// 服务商配置
const config = {
  appId: 'wxe4fe827fc87f0000',
  appSecret: '04277da11000000000000000ddc25c063',
  appToken: 'B0D791C6AAAAAAAAAAAAAAAA874DFEDEC8',
}

// 初始化Bin实例
const bin = new WxIsvBin(config)

// 根据bin初始化一个授权类的服务
const authService = new WxIsvAuthService(bin)

// 调用服务
await authService.getAuthInfoByCode('code')

// 自定义bin实例
class MyWxIsvBin extends WxIsvBin {
  // 自定义请求异常的事件
  onRequestError(error, res) {
    // 在这里记录错误
    console.log(error)
    console.log(res)
  }
}

// 初始化自定义的Bin实例
const myBin = new MyWxIsvBin(config)

// 根据自定义的Bin实例，创建一个域名服务
const domainService = new WxIsvDomainService(myBin)

// 调用服务
await domainService.setBiz('accessToken', 'domian')

// 错误地调用服务
await domainService.setBiz('', '') // onRequestError 会记录这条错误信息
