export const theme = {
    data(){
        return{
            program:'dance-music-',
        }
    },
    computed:{
        theme(){
            return this.$store.getters.getTheme;
        },
        getTheme(){
            let theme='';
            theme=this.theme=='dark'?'dark':'light';
            return theme;
        }
    }
}