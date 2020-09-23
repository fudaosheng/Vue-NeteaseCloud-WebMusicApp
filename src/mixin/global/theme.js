export const theme = {
    data() {
        return {
            program: 'dance-music-',
        }
    },
    computed: {
        theme() {
            return this.$store.getters.getTheme;
        },
        getTheme() {
            let theme = '';
            theme = this.theme == 'dark' ? 'dark' : 'light';
            return theme;
        },
        /**活跃颜色 */
        getActiveColor() {
            let color = "";
            color =
                this.theme == "dark"
                    ? "var( --dark-border-active-color)"
                    : this.theme == "green"
                        ? "var(--green-bg-color)"
                        : "";
            return color;
        },
    }
}