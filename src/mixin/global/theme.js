export const theme = {
    data(){
        return{
            program:'dance-music-',
        }
    },
    computed:{
        theme(){
            return this.$store.getters.getTheme;
        }
    }
}