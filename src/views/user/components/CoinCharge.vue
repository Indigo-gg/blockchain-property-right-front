<template>
  <div class="Wrapper">
    <div>
      <a-row :gutter="16">
        <a-col v-for="(item,index) in chargeList" :key="index" :span="8">
          <div :class="selectCharge===item?'select-price-card my-flex-center':'price-card my-flex-center'"
               @click="selectPrice(item)">
            <span class="coin"><svg-icon size="20" icon="coin"></svg-icon>{{ item }}</span>
            <!--            <a-divider></a-divider>-->
            <span class="price">RMB:{{ item }}</span>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoinCharge',
  props: {},
  data() {
    return {
      chargeNum: 0,
      selectCharge: '',
      ledgerWay: 1,
      chargeList: [6, 20, 50, 100, 200, 300]
    }
  },
  methods: {
    confirmCharge() {
      this.$emit('success', {chargeNum: this.chargeNum, ledger: this.ledger})
    },
    selectPrice(item) {
      this.selectCharge = item
    }
  }
}
</script>

<style scoped lang='less'>
.price-card {
  cursor: pointer;
  width: 100px;
  height: 100px;
  text-align: center;
  //color: rgba(94, 93, 93, 0.76);
  background-color: rgb(231, 227, 227);
  margin: 10px;
  border-radius: 5px;

  .price {
    font-size: 0.7em;
    color: rgba(98, 97, 97, 0.92);

    //font-size: 12px;
  }

  .coin {
    font-size: 1.5em;
    color: rgba(35, 34, 34, 0.92);
  }

}

.select-price-card {
  cursor: pointer;
  width: 100px;
  height: 100px;
  text-align: center;

  //color: rgba(94, 93, 93, 0.76);
  background-color: rgba(192, 191, 191, 0.58);
  margin: 10px;
  border-radius: 5px;

  .price {
    font-size: 0.7em;
    color: rgba(98, 97, 97, 0.92);

    //font-size: 12px;
  }

  .coin {
    font-size: 1.5em;
    color: rgba(0, 0, 0, 0.92);
  }

}
</style>
