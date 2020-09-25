export const iconColor = {
    computed: {
        /**进度条活跃颜色
         * 依赖：混入theme.js
         */
        iconActiveColor() {
            let color = "";
            color =
                this.theme == "dark"
                    ? "var(--main-color)"
                    : this.theme == "green"
                        ? "var(--green-main-color)"
                        : "";
            return color;
        },
    }
}