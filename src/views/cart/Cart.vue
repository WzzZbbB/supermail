<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!--商品的列表-->
    <cart-list />

    <!--底部汇总-->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar

  },
  computed: {
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
