// Interfaces
import { IBookData } from '../types/book.type';
import { API_Params, API_Response } from '../types/common.type';
import BaseApi from '../common/base.api';

type Headers = {
    'Content-Type': string;
    'Access-Control-Allow-Origin': string;
    Authorization: string;
};
const token: string | null = localStorage.getItem('jwtAccessToken');
let headers: Headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Authorization': `Bearer ${token}`
};

export const getAllItem = ({ ...params }: API_Params) => {
    return BaseApi.get<API_Response>('/books', { params, headers },)
}

export const getItem = (id: string) => {
    return BaseApi.get<IBookData>(`/books/${id}`, { headers })
}

export const createItem = (data: IBookData) => {
    return BaseApi.post<IBookData>('/books', data, { headers })
}

export const updateItem = (id: string, data: IBookData) => {
    return BaseApi.patch<IBookData>(`/books/${id}`, data, { headers })
}

export const removeItem = (id: string) => {
    return BaseApi.delete<IBookData>(`/books/${id}`, { headers })
}