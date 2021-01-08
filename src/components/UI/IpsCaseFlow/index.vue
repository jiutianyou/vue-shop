<!-- 案件流程组件 -->
<template>
  <div class="ips-case-flow">
    <header class="ips-case-flow__head flex-center">
      <img class="ips-case-flow__icon" :src="iconProcess" />
      <span>{{ title }}</span>
    </header>
    <ul class="ips-case-flow__body">
      <li class="ips-case-flow__item flex-start" v-for="item in data" :key="item.time">
        <span v-if="item.status === 1" class="ips-case-flow__icon">
          <img class="ips-case-flow__icon--doing" :src="iconDoing">
        </span>
        <i v-else class="ips-case-flow__icon el-icon-success"></i>
        <div>
          <time>{{ item.time | parseTime }}</time>
          <h5>{{ item.node }}
            <span v-if="item.approver">（{{ item.approver }}）</span>
            <el-tooltip v-else-if="item.handlers" :content="item.handlers" :open-delay="100">
              <i>（{{ displayHandler(item.handlers) }}）</i>
            </el-tooltip>
          </h5>
          <p>{{ item.result }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import iconProcess from '@/assets/images/icon-case-process.png'
// import iconDoing from '@/assets/images/icon-doing.png'
export default {
  name: 'IpsCaseFlow',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // iconProcess,
      // iconDoing
      iconProcess: '',
      iconDoing: ''
    }
  },
  methods: {
    displayHandler (handlers) {
      return handlers.split(',')[0]
    }
  }
}
</script>
<style lang="scss" scoped>
.ips-case-flow {
  &__head {
    height: 2em;
    img {
      width: 20px;
    }
    span {
      flex: 1;
      font-weight: bold;
      color: #6B7A97;
    }
  }
  &__body {
  margin-top: 25px;
  }
  &__icon {
    box-sizing: border-box;
    position: relative;
    z-index: 2;
    flex-basis: 30px;
    padding: 3px;
    margin-right: 10px;
    text-align: center;
    background: $content-bg-color;

    &--doing {
      width: 80%;
    }
    &--todo {
      &::before {
        display: inline-block;
        content: '';
        width: .5em;
        height: .5em;
        background: #B4B4B4;
        border-radius: 50%;
      }
    }
  }
  &__item {
    position: relative;
    padding-bottom: 30px;
    &:not(:first-child)::before {
      display: inline-block;
      position: absolute;
      left: 14px;
      z-index: 1;
      content: '';
      background: #B3C8EC;
      width: 2px;
      height: 100%;
      transform: translateY(-100%);
    }
    .el-icon-success {
      color: #53B9B3;
      font-size: 20px;
    }
    div {
      flex: 1;
      h5 {
        color: #6B7A97;
        font-weight: bold;
        font-size: $font-small !important;
        margin: 5px 0 8px;
      }
      p {
        font-weight: bold;
      }
      time, p, span {
        font-size: 12px;
      }
      time, p {
        color: #6B6B6B;
      }
    }
  }
}
</style>
