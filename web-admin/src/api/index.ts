import axios, { AxiosInstance } from 'axios';

const endpoint = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

class APIBase {
  
  public axios: AxiosInstance;
  private filesEndpoint: string;
  private headers: any = {};
  
  constructor(endpoint: string, headers: any = {}) {
    this.filesEndpoint = `${endpoint}/files`;
    this.axios = axios.create({
      baseURL: endpoint,
      headers: { ...defaultHeaders, ...headers },
      // timeout: 10000,
    });
  }
  
  public getFileAckEndpoint(): string {
    return this.filesEndpoint + '/xlsx';
  }
  
  public getFilesEndpoint(): string {
    return this.filesEndpoint;
  }
  
  public post(url: string, body: object): Promise<any> {
    return this.send('post', `/${url}`, body);
  }
  
  public put(url: string, body: object): Promise<any> {
    return this.send('put', `/${url}`, body);
  }
  
  public delete(url: string, body: object): Promise<any> {
    return this.send('delete', `/${url}`, body);
  }
  
  public get(url: string, params?: any): Promise<any> {
    return this.send('get', `/${url}`, params);
  }
  
  public send(method: string, url: string, data?: any): Promise<any> {
    
    // join array fields with ',' in query
    const param = method === 'get' ? data : null;
    if (param) {
      Object.keys(param).forEach(key => {
        if (param[key] instanceof Array) {
          param[key] = param[key].join(',');
        }
      });
    }
    
    return this.axios.request({
      data: method !== 'get' ? data : null,
      headers: this.headers,
      method,
      params: method === 'get' ? data : null,
      url,
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response);
        
        throw ApiError.decode(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
      } else {
        // Something happened in setting up the request that triggered an Error
      }
    });
  }
  
  public async fetchFormData(url: string, method: string, body: any) {    
    const response = await fetch(endpoint + url, {
      method,
      body,
      headers: {
        ...this.headers,
        authorization: "Bearer " + localStorage.getItem('authToken')
      },
    });
    return response;
  }
}

export class ApiError {

  public static decode(json: any): ApiError {
    return Object.assign(Object.create(ApiError.prototype), json);
  }

  public data: any;
  public headers: any;
  public isNetworkError: boolean;

  constructor(isNetworkError: boolean) {
    this.isNetworkError = isNetworkError;
  }

}

export const base = new APIBase(endpoint);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // region common
  post: (url: string, body: object) => base.post(url, body),

  get: (url: string) => base.get(url),

  update: (url: string, body: object) => base.put(url, body),

  delete: (url: string, body: object) => base.delete(url, body),

  fetchFormData: (url: string, method: string, body: any) => base.fetchFormData(url, method, body)
}
