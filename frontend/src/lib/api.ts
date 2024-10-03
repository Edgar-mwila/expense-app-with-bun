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

async function fetchExpenses() {
    const res = await api.expenses.$get()
    if (!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data
}

export async function deleteExpenseFunction({id}: {id: number}) {
    const res = await api.expenses[":id{[0-9]+}"].$delete({param: {id: id.toString()}})

    if(!res.ok){
        throw new Error("Server Error. Could not delete");
    }
}

async function fetchTotal() {
    const res = await api.expenses['total'].$get()
    if (!res.ok) {
        throw new Error('server error')
    }
    const data = await res.json()
    return data
}

const client = hc<ApiRoutes>('/')

export const api = client.api;


export const userQueryOptions = queryOptions({queryKey: ['get-profile'], queryFn: fetchMe, staleTime: Infinity})
export const getAllExpensesQueryOptions = queryOptions({
    queryKey: ['get-all-expenses'],
    queryFn: fetchExpenses,
    staleTime: 1000 * 60 * 5,
})
export const getTotalExpensesCostOptions = queryOptions({
    queryKey: ['get-total'],
    queryFn: fetchTotal,
  })