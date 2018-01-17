export const BASE_API_URL = '/api/'


export function apiHeaders(){ return {authorization:`Bearer${localStorage.getItem('token')}`} }