<template>
  <scroll
    class="search-scroll"
    ref="scroll"
    :bar-color="getBarColor"
    :load-color="getLoadColor"
  >
    <div class="dance-music-search-list" @mouseenter="handleRefresh">
      <!-- <div class="search-list-title">
        <span>搜索历史</span>
        <i class="iconfont icon-shanchu" />
      </div> -->
      <div class="search-list-main">
        <b-table>
          <b-table-body slot="body">
            <b-table-tr
              class="search-table-tr"
              v-for="(item, index) in hotlist"
              :key="index"
              @click.native="handleHotItemClick(index)"
            >
              <b-table-td
                :class="{ 'search-active': index <= 2 }"
                width="30px"
                >{{ index + 1 }}</b-table-td
              >
              <b-table-td class="search-table-td-desc">
                <div class="search-item-top">
                  <div class="search-item-top-name">{{ item.searchWord }}</div>
                  <div class="search-item-top-score">{{ item.score }}</div>
                  <div class="search-item-top-url" v-if="item.iconUrl">
                    <img
                      :src="item.iconUrl"
                      :style="{ width: item.iconType == 5 ? '14px' : '24px' }"
                    />
                  </div>
                </div>
                <div class="search-item-bottom">{{ item.content }}</div>
              </b-table-td>
            </b-table-tr>
          </b-table-body>
        </b-table>
      </div>
    </div>
  </scroll>
</template>
<script>
import { forcible } from "mixin/components/forcible-refresh";
import Scroll from "common/scroll/Scroll";
import { _hotSearchDetail } from "network/search";
export default {
  name: "HotSearchList",
  components: { Scroll },
  mixins: [forcible],
  data() {
    return {
      hotlist: [],
    };
  },
  computed: {
    getTheme() {
      return this.$store.getters.getTheme;
    },
    getBarColor() {
      let color = "";
      color = this.getTheme == "dark" ? "#585e6b" : "";
      return color;
    },
    getLoadColor() {
      let color = "";
      color = this.getTheme == "dark" ? "##424447" : "";
      return color;
    },
  },
  created() {
    this.hotSearchDetail();
  },
  methods: {
    hotSearchDetail() {
      _hotSearchDetail().then((res) => {
        this.hotlist = res.data.data;
      });
    },
    /**处理热搜项点击--->跳转到搜索详情页面 */
    handleHotItemClick(index){
      this.$router.push('/search-detail/'+this.hotlist[index].searchWord);
      this.$emit('hidden');
    }
  },
};
</script>
<style lang="less" scoped>
.search-scroll {
  height: 530px;
}
.dance-music-search-list {
  width: 400px;
  padding: 5px 20px 0px 20px;
  font-size: 13px;
  line-height: initial;
  text-align: initial;
}
.search-list {
  &-title {
    padding: 8px 0px;
    font-size: 15px;
    .iconfont {
      margin-left: 5px;
    }
  }
}
.search-active {
  color: var(--main-color);
}
.search-table {
  &-tr {
    padding: 8px 0px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &-td-desc {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
.search-item-top {
  display: flex;
  height: 25px;
}
.search-item-top div {
  margin-right: 5px;
}
.search-item-top-score {
  color: #dcdde4;
}
.search-item-top-name {
  font-weight: 500;
}
.search-item-bottom {
  color: #adadad;
}
</style>