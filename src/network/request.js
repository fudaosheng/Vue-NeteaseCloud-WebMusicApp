import axios from 'axios'
import $store from '@/store/index' 
let ajaxTimer=0; 
export function request(config) {
    $store.commit('showLoading');
    const install = axios.create({
        baseURL: 'http://localhost:3000',
        timeOut: 5000
    });
    install.interceptors.request.use(data => {
        ajaxTimer++;
        return data;
    }, err => {
        return err
    });
    install.interceptors.response.use(data => {
        ajaxTimer--;
        if(ajaxTimer==0)$store.commit('hiddenLoading');
        return data;
    }, err => {
        return err;
    });
    return install(config);
}