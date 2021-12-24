<template>
  <div class="indicator-wrapper">
    <slot name="indicator">
      <div class="indicator"
           :class="{'dot': shape === 'dot', [type]: type !== ''}"
           :style="{width: indicatorSize, height: indicatorSize}"
      ></div>
    </slot>
    <slot name="content">
      <div class="content">
        <span>{{ content }}</span>
      </div>
    </slot>
  </div>
</template>

<script>
const Types = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error',
  fatal: 'fatal',
  experiment: 'fatal',
  solved: 'warning',
  solving: 'danger',
  black: 'black',
  panic: 'panic'
};

export default {
  name: "index",
  props: {
    shape: {
      type: String,
      default: "dot"  // square
    },
    type: {
      type: String,
      default: Types.info,
    },
    size: {
      type: String || Number,
      default: "6px"
    },
    content: {
      type: String
    }
  },
  computed: {
    indicatorSize () {
      if (typeof this.size === 'number') return `${this.size}px`

      if (this.size === "mini") {
        return '6px'
      } else if (this.size === "small") {
        return '8px'
      } else if (this.size === "medium") {
        return '10px'
      } else {
        return '8px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.indicator-wrapper {
  display: flex;
  align-items: center;

  .indicator {
    margin-right: 6px;

    width: 10px;
    height: 10px;
    //background-color: green;
  }
  .dot {
    border-radius: 50%;
  }
  .success {
    background-color: #02c302;
  }
  .info {
    background-color: gray;
  }
  .black {
    background-color: black;
  }
  .warning {
    background-color: #f1c257;
  }
  .error {
    background-color: #e56465;
  }
  .fatal {
    background-color: #5F48C5;
  }
  .danger {
    background-color: #f6003c;
  }
  .panic{
    background-color: #2c2c2c;
  }
}
</style>

