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
            this.$emit('musicItemClick',index);
        }
    },
}