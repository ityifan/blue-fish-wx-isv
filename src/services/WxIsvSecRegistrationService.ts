import { $ } from 'blue-fish-helper';
import { WxIsvTokenService } from './WxIsvTokenService';


export class WxIsvSecRegistrationService extends WxIsvTokenService {

    // https://developers.weixin.qq.com/doc/oplatform/openApi/OpenApiDoc/miniprogram-management/basic-info-management/getAccountBasicInfo.html

    async registerMiniprogram(data: { name: string, code: string, codeType: number, legalPersonaWechat: string, legalPersonaName: string, componentPhone?: string, }) {
        data = $.snakeCaseKeys(data)
        const res = await this.request('POST', '/cgi-bin/component/fastregisterweapp', data, {
            action: 'create',
            component_access_token: await this.getToken()
        })
        return res
    }
    async registerMiniprogramSearch(data: { name: string, legalPersonaWechat: string, legalPersonaName: string }) {
        data = $.snakeCaseKeys(data)
        const res = await this.request('POST', '/cgi-bin/component/fastregisterweapp', data, {
            action: 'search',
            component_access_token: await this.getToken()
        })
        return res
    }
    async checkWxVerifyNickname(accessToken: string, nickName: string) {
        return (await this.request(
            'POST',
            '/cgi-bin/wxverify/checkwxverifynickname',
            { nick_name: nickName },
            { access_token: accessToken }
        ))
    }
    async setNickname(accessToken: string, nickName: string, license: string, namingOthers: Record<string, any>) {
        return (await this.request(
            'POST',
            '/wxa/setnickname',
            { nick_name: nickName, license, ...namingOthers },
            { access_token: accessToken }
        ))
    }
    async setSignature(accessToken: string, signature: string) {
        return (await this.request(
            'POST',
            '/cgi-bin/account/modifysignature',
            { signature },
            { access_token: accessToken }
        ))
    }
    async setHeadImage(accessToken: string, headImgMediaId: string, x1: string, y1: string, x2: string, y2: string) {
        return (await this.request(
            'POST',
            '/cgi-bin/account/modifyheadimage',
            { head_img_media_id: headImgMediaId, x1, y1, x2, y2 },
            { access_token: accessToken }
        ))

    }
    async getAllCategories(accessToken: string) {
        return (await this.request(
            'GET',
            '/cgi-bin/wxopen/getallcategories',
            {},
            { access_token: accessToken }
        ))
    }
    async addCategory(accessToken: string, categories: { first: string, second: string }[]) {
        return (await this.request(
            'POST',
            '/cgi-bin/wxopen/addcategory',
            { categories },
            { access_token: accessToken }
        ))
    }
    async submitAuthAndIcp(accessToken: string, authData: Record<string, any>, icpSubject: Record<string, any>, icpApplets: Record<string, any>, icpMaterials: Record<string, any>) {
        const body = {
            auth_data: authData,
            icp_subject: icpSubject,
            icp_applets: icpApplets,
            icp_materials: icpMaterials,
        }
        return (await this.request(
            'POST',
            '/wxa/sec/submit_auth_and_icp',
            body,
            { access_token: accessToken }
        ))
    }
    async createIcpVerifyTask(accessToken: string) {
        return (await this.request(
            'POST',
            '/wxa/icp/create_icp_verifytask',
            { along_with_auth: true },
            { access_token: accessToken }
        ))
    }
    async queryIcpVerifyTask(accessToken: string, taskId: string) {
        return (await this.request(
            'POST',
            '/wxa/icp/query_icp_verifytask',
            { task_id: taskId },
            { access_token: accessToken }
        ))
    }
    async queryAuthAndIcp(accessToken: string, procedureId: string) {
        return (await this.request(
            'POST',
            '/wxa/sec/query_auth_and_icp',
            { procedure_id: procedureId },
            { access_token: accessToken }
        ))
    }
    async queryIcpServiceContentTypes(accessToken: string) {
        return (await this.request(
            'GET',
            '/wxa/icp/query_icp_service_content_types',
            {},
            { access_token: accessToken }
        ))
    }
    async queryIcpCertificateTypes(accessToken: string) {
        return (await this.request(
            'GET',
            '/wxa/icp/query_icp_certificate_types',
            {},
            { access_token: accessToken }
        ))
    }
    async queryIcpSubjectTypes(accessToken: string) {
        return (await this.request(
            'GET',
            '/wxa/icp/query_icp_subject_types',
            {},
            { access_token: accessToken }
        ))
    }
    async queryIcpDistrictCode(accessToken: string) {
        return (await this.request(
            'GET',
            'wxa/icp/query_icp_district_code',
            {},
            { access_token: accessToken }
        ))
    }
    async queryIcpNrlxTypes(accessToken: string) {
        return (await this.request(
            'GET',
            '/wxa/icp/query_icp_nrlx_types',
            {},
            { access_token: accessToken }
        ))
    }
    async getIcpEntranceInfo(accessToken: string) {
        return (await this.request(
            'GET',
            '/wxa/icp/get_icp_entrance_info',
            {},
            { access_token: accessToken }
        ))
    }
    async uploadIcpMedia(accessToken: string, buffer: Buffer, filename: string, fields: Record<string, string> = {}) {
        const { body, boundary } = await this.buildMultipartForm({ buffer, filename, fields })
        const headers = {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': body.length.toString(),
        }

        return await this.requestBuffer(
            'POST',
            '/wxa/icp/upload_icp_media',
            body,
            headers,
            { access_token: accessToken }
        )
    }
    private async buildMultipartForm(data: {
        buffer: Buffer;
        filename: string;
        fields?: Record<string, string>;
    }) {
        const boundary = '----WebKitFormBoundary' + Math.random().toString(16).slice(2);
        const parts: Buffer[] = [];

        // 添加额外字段
        if (data.fields) {
            for (const [key, value] of Object.entries(data.fields)) {
                parts.push(Buffer.from(
                    `--${boundary}\r\n` +
                    `Content-Disposition: form-data; name="${key}"\r\n\r\n` +
                    `${value}\r\n`
                ));
            }
        }

        // 添加文件字段
        const contentDisposition = `Content-Disposition: form-data; name="media"; filename="${data.filename}"`;
        const contentType = 'Content-Type: image/jpeg'; // 如有需要可动态判断
        const fileHead = Buffer.from(
            `--${boundary}\r\n${contentDisposition}\r\n${contentType}\r\n\r\n`
        );
        const fileTail = Buffer.from(`\r\n--${boundary}--\r\n`);

        // 拼接整体 body
        const body = Buffer.concat([...parts, fileHead, data.buffer, fileTail]);

        return { body, boundary };
    }
}

