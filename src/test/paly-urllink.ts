import { WxIsvBin, WxIsvUrllinkService } from '..'

export default async () => {
  const config = {
    appId: 'wxe4fe827fc87f0000',
    appSecret: '04277da11000000000000000ddc25c063',
    appToken: 'B0D791C6AAAAAAAAAAAAAAAA874DFEDEC8',
    wxSmConfig: {
      appId: '',
      secret: '',
    }
  }

  // 初始化Bin实例
  const bin = new WxIsvBin(config)

  // 根据自定义的Bin实例，创建一个域名服务
  const service = new WxIsvUrllinkService(bin)

  const token = 'XXXXXXXXX'

  // 调用服务
  const { urlLink } = await service.generateUnlimited(
    token,
    'activity/szgy/home',
    'activityId=szgy-mao-1&sourceId=sms0820'
  )

  console.log({ urlLink })
}
