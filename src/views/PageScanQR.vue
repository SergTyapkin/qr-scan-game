<style scoped lang="stylus">
@import '../styles/constants.styl'
@import '../styles/components.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'
@import '../styles/scrollbars.styl'

.root-page
  page-root()

  .header
    font-large()
    font-bold()
  .desc
    font-thin()
    font-small-extra()
  .desc-mark
    font-thin()
    font-small-extra()
    color colorText3
    margin-bottom 10px

  .qr
    width 100%
</style>

<template>
  <div class="root-page">
    <header class="header" @contextmenu="dropBranch">Сканирование QR</header>
    <p class="desc">Отсканируйте этим сканером QR, который считаете правильным</p>
    <p class="desc-mark">Помните, что за сканирование не подходящего QR, с вас спишется 1 балл</p>
    <header class="header">Очков: {{ score }}</header>

    <QRScanner @scan="onScan" class="qr"/>

  </div>
</template>

<script lang="ts">
import QRScanner from '~/components/QRScanner.vue';
import { QRS } from '~/constants';

export default {
  components: { QRScanner },

  data() {
    return {
      selectedBranch: localStorage.getItem('branch') as string,

      score: Number(localStorage.getItem('score')) || 0,
    };
  },

  mounted() {
    const selectedBranch = localStorage.getItem('branch');
    if (selectedBranch === null || !QRS[selectedBranch]) {
      this.$router.push({name: 'default'});
      return;
    }
  },

  methods: {
    onScan(text: string) {
      if (QRS[this.selectedBranch].includes(text.toLowerCase())) {
        this.score += 1;
      } else {
        this.score -= 1;
      }
      localStorage.setItem('score', String(this.score));
    },

    async dropBranch() {
      if (!(await this.$modals.confirm('Отменяем выбор ветки', 'Восставновить счет в ветке не получится'))) {
        return;
      }
      localStorage.removeItem('score');
      localStorage.removeItem('branch');
    },
  },
};
</script>
