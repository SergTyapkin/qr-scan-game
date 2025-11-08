<style lang="stylus" scoped>
@import '../styles/constants.styl'
@import '../styles/buttons.styl'
@import '../styles/fonts.styl'
@import '../styles/utils.styl'
@import '../styles/animations.styl'

.root-qr-scanner
  .section-scanner
    .header
      font-large()

      color colorSec1
    video
      max-width 100%
    .camera-buttons-container
      overflow-x auto
      display flex
      gap 20px
      justify-content space-between
      width 100%
      .camera-button
        min-width 150px
        padding 5px
        button()

</style>

<template>
  <div class="root-qr-scanner roll-active" :class="{closed: closed}">
    <section class="section-scanner">
      <video class="qr-scanner-video" ref="video" />
      <div v-if="!noCamerasSelection" class="camera-buttons-container scrollable">
        <button
          v-for="camera in existingCameras"
          class="button bg rounded text-small camera-button"
          @click="selectCamera(camera)"
        >
          {{ camera.label ? camera.label : camera.id }}
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import QrScanner from "qr-scanner";

export default {
  emits: ['scan'],

  props: {
    closed: {
      type: Boolean,
      default: false,
    },
    noCamerasSelection: Boolean,
  },

  data() {
    return {
      active: false,
      existingCameras: [] as QrScanner.Camera[],
      scanner: null as QrScanner | null,
      prevValue: '',
    };
  },

  async mounted() {
    this.existingCameras = await QrScanner.listCameras(true);

    this.scanner = new QrScanner(this.$refs.video as HTMLVideoElement, (result) => {
      const text = result.data;
      if (text === this.prevValue) {
        return;
      }
      this.prevValue = text;
      this.$emit('scan', result.data);
    }, {
      highlightScanRegion: true,
      maxScansPerSecond: 10,
    });

    this.start();
  },

  unmounted() {
    this.scanner!.destroy();
  },

  methods: {
    async start() {
      if (!this.active) {
        try {
          await this.scanner!.start()
        } catch {
          this.$modals.alert("Не предоставлены права доступа к камере", "Настройте доступ к камере для этого сайта в браузере");
        }
        this.active = true;
      }
    },

    selectCamera(camera: QrScanner.Camera) {
      this.scanner!.setCamera(camera.id);
    },

    stop() {
      this.scanner!.stop();
      this.active = false;
    },
  }
};
</script>
