import { APIRequestContext } from '@playwright/test';

export class BaseAPIClient {
    protected request: APIRequestContext;
    protected baseURL: string;

    constructor(request: APIRequestContext, baseURL: string = '') {
        this.request = request;
        this.baseURL = baseURL;
    }

    async get(endpoint: string) {
        return await this.request.get(`${this.baseURL}${endpoint}`);
    }

    async post(endpoint: string, data: any) {
        return await this.request.post(`${this.baseURL}${endpoint}`, { data });
    }

    async put(endpoint: string, data: any) {
        return await this.request.put(`${this.baseURL}${endpoint}`, { data });
    }

    async delete(endpoint: string) {
        return await this.request.delete(`${this.baseURL}${endpoint}`);
    }
}
