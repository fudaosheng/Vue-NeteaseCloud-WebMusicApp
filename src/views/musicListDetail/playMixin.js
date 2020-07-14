export const playMixin={
    data(){
        return{
            playIndex:.5,
        }
    },
    created(){
        this.$bus.$on('Playing',(index,path)=>{
            if(this.$route.path==path){
                this.playIndex=index;
            }
        })
    },
}