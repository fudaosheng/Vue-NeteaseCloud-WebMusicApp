import { Carousel, CarouselItem ,Pagination} from 'element-ui'

const components = [
    Carousel,
    CarouselItem,
    Pagination,
];

export default {
    install(Vue) {
        components.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}