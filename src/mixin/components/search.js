/**search获取搜索关键词 */
export const search = {
    inject: {
        search: {
            default: ""
        }
    },
    computed: {
        keywords() {
            return this.search.keywords;
        },
    },
    watch: {
        keywords() {
            this.Search();
        },
    },
}