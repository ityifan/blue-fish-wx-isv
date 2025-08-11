import { WxIsvBin } from '../libs/WxIsvBin'
import { WxIsv } from '../typings'

export class WxIsvServiceBase {
  protected readonly bin: WxIsvBin
  protected readonly config: WxIsv.WxIsvConfig
  protected readonly customErrorMessage: WxIsv.customErrorMessage = {}

  constructor(bin: WxIsvBin) {
    this.bin = bin
    this.config = bin.config
  }

  async request(
    method: WxIsv.AxiosMethod,
    url: string,
    data: Record<string, any>,
    params: Record<string, any>,
    ignoreError: WxIsv.IgnoreError = []
  ) {
    return await this.bin.request(
      { method, url, params, data },
      this.customErrorMessage,
      this.customErrorHandler,
      ignoreError
    )
  }

  async requestStream(
    method: WxIsv.AxiosMethod,
    url: string,
    data: Record<string, any>,
    params: Record<string, any>,
    ignoreError: WxIsv.IgnoreError = []
  ) {
    return await this.bin.request(
      { method, url, params, data, responseType: 'stream' },
      this.customErrorMessage,
      this.customErrorHandler,
      ignoreError
    )
  }

  async requestTransformResponse(
    method: WxIsv.AxiosMethod,
    url: string,
    data: Record<string, any>,
    params: Record<string, any>,
    transformResponseFunction: WxIsv.AxiosTransformer,
    ignoreError: WxIsv.IgnoreError = [],
  ) {
    return await this.bin.requestTransformResponse(
      { method, url, params, data },
      this.customErrorMessage,
      this.customErrorHandler,
      ignoreError,
      transformResponseFunction
    )
  }

  async requestBuffer(
    method: WxIsv.AxiosMethod,
    url: string,
    buffer: Buffer,
    headers: Record<string, string> = {},
    params: Record<string, any> = {},
    ignoreError: WxIsv.IgnoreError = []
  ) {
    return await this.bin.request(
      {
        method,
        url,
        params,
        data: buffer,
        headers,
      },
      this.customErrorMessage,
      this.customErrorHandler,
      ignoreError
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected customErrorHandler(res: WxIsv.AxiosResponse) {
    // handle custom error
  }

}
