export const loadingMixin={
    methods:{
        showLoading(){
            this.$store.commit('showLoading');
        },
        hiddenLoading(){
            this.$store.commit('hiddenLoading');
        }
    }
}