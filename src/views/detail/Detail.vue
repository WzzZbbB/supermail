<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="detailnav"/>
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll" @scroll="contentScroll">
      <DetailSwiper :top-images="topImages" ref="good"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart" />
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import Scroll from "@/components/common/scroll/Scroll";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail";
  import {debounce} from "@/common/utils";
  //import { Message } from 'element-ui';

  export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      offSets: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  components: {
    GoodsList,
    DetailParamInfo,
    DetailBaseInfo,
    DetailNavBar,
    DetailSwiper,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailCommentInfo,
    DetailBottomBar
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid

    //请求iid的详情数据
    getDetail(this.iid).then(res => {
      let data = res.data.result
      //轮播图
      this.topImages = data.itemInfo.topImages;
      //商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      //商家信息
      this.shop = new Shop(data.shopInfo);
      //商品详情数据
      this.detailInfo = data.detailInfo;
      //商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.data.list
    })

    //给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.offSets = [];
      this.offSets.push(0);
      this.offSets.push(this.$refs.param.$el.offsetTop-44)
      this.offSets.push(this.$refs.comment.$el.offsetTop-44)
      this.offSets.push(this.$refs.recommend.$el.offsetTop-44)
    },100)
  },
  methods: {
    imageLoad(){
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0,-this.offSets[index],200)
    },
    contentScroll(position) {
      const positionY = -position.y;
      for (let i = 0; i < this.offSets.length; i++) {
        if (i !== this.currentIndex){
          if (i < this.offSets.length-1){
            if (positionY >= this.offSets[i] && positionY <= this.offSets[i+1]){
              this.currentIndex = i;
              this.$refs.detailnav.currentIndex = i;
            }
          }else {
            if (positionY >= this.offSets[i]){
              this.currentIndex = i;
              this.$refs.detailnav.currentIndex = i;
            }
          }
        }
      }
    },
    addCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品信息加入到购物车
      this.$store.dispatch('addCart',product).then(res => {
          //this.$message({message:'添加成功',type:'success',offset:50,showClose:true})
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}

</style>