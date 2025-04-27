import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {

  private axios: AxiosInstance = axios;

  public async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('Axios Error Adapter, check logs')
    }
  }

}