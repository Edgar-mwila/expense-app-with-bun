import { queryOptions } from '@tanstack/react-query';
import { ApiRoutes }  from '../../../server/app';
import { hc } from 'hono/client'

async function fetchMe() {
    const res = await api.auth['me'].$get();
    if(!res.ok){
        throw new Error("server error");
    }
    const data = await res.json();
    return data
}

const client = hc<ApiRoutes>('/')

export const api = client.api;


export const userQueryOptions = queryOptions({queryKey: ['get-profile'], queryFn: fetchMe, staleTime: Infinity})
