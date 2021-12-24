<template>
  <template>
    <div class="product-selector-container">
      <el-dropdown placement="bottom">
        <div class="select-item selected">
          <div class="icon-box"><img class="icon" src="@/assets/douyin.png" alt=""/></div>
          <div>抖音 <i class="el-icon-caret-bottom"/></div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div class="select-item">
              <div class="icon-box"><img class="icon" src="@/assets/douyin.png" alt=""/></div>
              <div>抖音</div>
            </div>
          </el-dropdown-item>
          <!--        <el-dropdown-item>-->
          <!--          <div class="select-item">-->
          <!--            <div class="icon-box"><img class="icon" src="@/assets/douyin.png" alt=""/></div>-->
          <!--            <div>抖音极速版</div>-->
          <!--          </div>-->
          <!--        </el-dropdown-item>-->
          <!--        <el-dropdown-item>-->
          <!--          <div class="select-item">-->
          <!--            <div class="icon-box"><img class="icon" src="@/assets/capcut.png" alt=""/></div>-->
          <!--            <div>剪映Capcut</div>-->
          <!--          </div>-->
          <!--        </el-dropdown-item>-->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </template>

  <script>
    export default {
      name: "product-selector",

    }
  </script>

  <style lang="less" scoped>
    .product-selector-container {
      margin: 0 26px;
      display: flex;
    }

    .select-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 44px;
      padding: 0 10px;

      &.selected {
        //color: whitesmoke;
        &:hover {
          //background-color: #46494e;
          background-color: #f5f5f5;
        }
      }

      .icon-box {
        width: 24px;
        height: 24px;
        margin-right: 6px;

        .icon {
          background-color: #b8b8b8;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          border: 1px solid gray;
        }
      }
    }
  </style>


</template>

<script>
export default {
  name: "product-selector"
}
</script>

<style scoped>

</style>
