export const forcible = {
    methods: {
        /**强制刷新 
         * 解决播放器子组件偶尔打开无法滚动情况
        */
        handleRefresh() {
            this.$nextTick(() => {
                this.$refs.scroll.refresh();
            });
        },
    }
}