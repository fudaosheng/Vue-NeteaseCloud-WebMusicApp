export const table = {
    computed: {
        /**判断 */
        
        /**是否显示分割线 */
        isSplit() {
            return this.vbestTableHead.split || this.vbestTable.split;
        },
        /**分割线颜色 */
        getSpritColor() {
            return (
                this.vbestTableHead.splitColor ||
                this.vbestTable.splitColor ||
                "var(--border)"
            );
        },
    }
}