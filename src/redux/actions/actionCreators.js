import {ADD_TODOS, LOADING_FALSE, LOADING_TRUE, PUSH_TODO} from "../actions/actionTypes";

export const addToDO = (payload) => ({type: 'ADD_TODOS', payload});
export const setLoadingFalse = () => ({type: 'LOADING_FALSE'});
export const setLoadingTrue = () => ({type: 'LOADING_TRUE'});
export const pushToDO = (payload) => ({type: 'PUSH_TODO', payload});



