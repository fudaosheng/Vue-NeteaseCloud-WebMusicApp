import {Carousel,CarouselItem} from 'element-ui'

const components=[Carousel,CarouselItem];

export default {
    install(Vue){
        components.forEach(item=>{
            Vue.component(item.name,item);
        });
    }
}