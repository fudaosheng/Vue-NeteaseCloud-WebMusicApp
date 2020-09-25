import { Carousel, CarouselItem } from 'element-ui'

import BMask from 'common/mask/BMask'

const components = [
    Carousel,
    CarouselItem,
    BMask
];

export default {
    install(Vue) {
        components.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}