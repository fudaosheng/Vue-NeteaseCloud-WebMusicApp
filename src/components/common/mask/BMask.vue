<template>
  <div :class="maskClass" :style="maskStyle">
    <slot>
      <i :class="icon" :style="iconStyle" v-if="icon" />
      <img :src="src" alt="" :style="imgStyle" v-if="!icon && src" />
      <span>{{ text }}</span>
    </slot>
  </div>
</template>
<script>
const prefixCls = "vbestui-mask";
export default {
  name: "BMask",
  data() {
    return {
      prefixCls: prefixCls,
    };
  },
  props: {
    /**是否是相对与屏幕显示 */
    fix: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    /**只对icon、img有效 */
    size: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
    background:{
        type:String,
        default:""
    }
  },
  computed: {
    maskClass() {
      return [
        `${this.prefixCls}`,
        this.fix ? `${this.prefixCls + "-fix"}` : "",
      ];
    },
    maskStyle() {
      return {
        color: this.color,
        backgroundColor:this.background,
        fontSize:this.fontSize,
      };
    },
    iconStyle() {
      return {
        color: this.color,
        fontSize: this.size,
      };
    },
    imgStyle(){
        return{
            width:this.size,
            height:this.size,
        }
    }
  },
};
</script>
<style scoped>
.vbestui-mask {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: inherit;
}
.vbestui-mask-fix {
  position: fixed;
}
.vbestui-mask img {
  width: 100%;
}
</style>