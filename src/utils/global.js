import { Carousel, CarouselItem ,Pagination} from 'element-ui'

import BMask from 'common/mask/BMask'

const components = [
    Carousel,
    CarouselItem,
    Pagination,
    BMask
];

export default {
    install(Vue) {
        components.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}