export const theme = {
    data() {
        return {
            program: 'dance-music-',
        }
    },
    computed: {
        /**监听theme */
        theme() {
            return this.$store.getters.getTheme;
        },
        /**获取当前theme */
        getTheme() {
            let theme = '';
            theme = this.theme == 'dark' ? 'dark' : 'light';
            return theme;
        },
        /**边框、按钮--活跃颜色 */
        getActiveColor() {
            let color = "";
            color =
                this.theme == "dark"
                    ? "var( --dark-border-active-color)"
                    : this.theme == "green"
                        ? "var(--green-bg-color)"
                        : "var(--primary)";
            return color;
        },
        /**全局斑马线背景颜色 */
        getStripeColor() {
            let stripeColor = "";
            stripeColor = this.theme == "dark" ? "var(--dark-table-stripe-color)" : "var(--table-stripe-color)";
            return stripeColor;
        },
        /**全局关键动态组件主题颜色*/
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