export const tableMixin={
    methods:{
        setSerial(index){
            if((index+1)<=9)return '0'+(index+1);
            return (index+1);
        },
        setBackColor(index){
            if(index%2!=0){
                return true;
            }
            return false;
        },
        musicItemClick(index){
            if(this.$parent.$parent.$el.className.indexOf('play-music-list')!=-1){
                this.$bus.$emit('PlayMusicListItem',index);
                return ;
            }
            this.$emit('musicItemClick',index);
        }
    },
}