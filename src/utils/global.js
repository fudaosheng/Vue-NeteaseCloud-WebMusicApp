import { Carousel, CarouselItem } from 'element-ui'

import BTable from 'common/table/BTable'
import BTableHead from 'common/table/BTableHead'
import BTableBody from 'common/table/BTableBody'
import BTableTr from 'common/table/BTableTr'
import BTableTd from 'common/table/BTableTd'

const components = [
    Carousel,
    CarouselItem,
    BTable,
    BTableHead,
    BTableBody,
    BTableTr,
    BTableTd
];

export default {
    install(Vue) {
        components.forEach(item => {
            Vue.component(item.name, item);
        });
    }
}