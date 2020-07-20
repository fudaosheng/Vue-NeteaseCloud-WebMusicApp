<template>
    <div class="loading">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
    </div>
</template>
<script>
    // 部分样式代码冗长，未作展示
    export default {
        name:'Loading'
    }
</script>
<style>
.ivu-spin-fix{
    background: none !important;
    color: #b82525;
}
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
