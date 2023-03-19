<template>
  <TabBar>
    <tab-bar-item path="/home" active-color="green">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/homeactive.svg" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" active-color="green">
      <img src="~assets/img/tabbar/type.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/typeactive.svg" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/cart" active-color="green">
      <img src="~assets/img/tabbar/shopcart.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/shopcartactive.svg" alt="" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" active-color="green">
      <img src="~assets/img/tabbar/my.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/myactive.svg" alt="" slot="item-icon-active">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </TabBar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

@import "assets/css/base.css";
</style>
