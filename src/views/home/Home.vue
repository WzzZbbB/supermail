<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        class="tabControl"
        ref="topTabControl" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @loadImg="loadImg" />
      <HomeRecommendView :recommends="recommends" />
      <feature-view />
      <tab-control
          :titles="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackBtn"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners: [],
      recommends: [],
      titles: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      type: 'pop',
      isShowBackBtn: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.type].list;
    }
  },
  created() {
    //1、请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods: {
    /**
     * 网络请求
     */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },

    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].page = page;
        this.goods[type].list.push(...res.data.data.list);
        this.$refs.scroll.finishLoad();
        this.$refs.scroll.scroll.refresh();
      })
    },


    /**
     * 事件监听
     */
    tabClick(type){
      switch (type){
        case 0:
          this.type = 'pop'
          break;
        case 1:
          this.type = 'new'
          break;
        case 2:
          this.type = 'sell'
          break;
      }
      //让两个tabControl保持一致
      this.$refs.topTabControl.currentIndex = type;
      this.$refs.tabControl.currentIndex = type;
    },

    backClick() {
      this.$refs.scroll.scrollTo(0,0);
    },

    contentScroll(position){
      //判断返回顶部按钮的显示
      this.isShowBackBtn = position.y < -1000;

      //判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },

    loadMore(){
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },

    loadImg() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tabControl {
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
