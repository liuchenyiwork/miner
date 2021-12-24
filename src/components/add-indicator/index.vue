<template>
  <div class="add-gain-container">
    <div style="" v-for="(indicatorItem, indicatorIdx) in selectedIndicatorData" :key="indicatorIdx">
      <div class="add-gain-select">
        <el-select size="mini" @change="indicatorSelectChanged"
                   v-model="indicatorItem.name" placeholder="请选择指标">
          <el-option
              v-for="(item, idx) in selectableIndicatorList"
              :key="idx"
              :label="item.name"
              :value="item.name"
              :disabled="item.disabled">
          </el-option>
        </el-select>
        <div v-if="indicatorItem.name" style="display: flex; align-items: center; margin: 0 6px">
          <template v-if="indicatorItem.sign === '+'">
            <svg t="1638513868205" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4410" width="14" height="14">
              <path
                  d="M968.625624 448.106489l-442.995008-442.995008c-6.815308-6.815308-17.03827-6.815308-23.853578 0l-442.995008 442.995008c-3.407654 3.407654-6.815308 13.630616-3.407654 17.03827 0 10.222962 6.815308 13.630616 13.630616 13.630615h255.574043v528.186356c0 10.222962 6.815308 17.03827 17.038269 17.03827h340.765392c10.222962 0 17.03827-6.815308 17.038269-17.03827V478.775374H954.995008c6.815308 0 13.630616-3.407654 17.03827-10.222961 0-6.815308 0-13.630616-3.407654-20.445924z"
                  fill="#7cba59" p-id="4411"></path>
            </svg>
          </template>
          <template v-else>
            <svg t="1638514155050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="5273" width="14" height="14">
              <path
                  d="M972.8 556.373333c-3.413333-6.826667-10.24-10.24-17.066667-10.24h-256V17.066667c0-10.24-6.826667-17.066667-17.066666-17.066667H341.333333c-10.24 0-17.066667 6.826667-17.066666 17.066667V546.133333H68.266667c-6.826667 0-13.653333 3.413333-17.066667 10.24-3.413333 6.826667 0 13.653333 3.413333 17.066667l443.733334 443.733333c3.413333 6.826667 10.24 6.826667 13.653333 6.826667s10.24 0 13.653333-3.413333l443.733334-443.733334c3.413333-6.826667 3.413333-13.653333 3.413333-20.48z"
                  fill="#ee4422" p-id="5274"></path>
            </svg>
          </template>
        </div>
        <el-input v-if="indicatorItem.name" size="mini" @change="numberChanged = true"
                  @blur="numberChangeOnBlur" v-model="indicatorItem.number" style="width: 80px;">
        </el-input>
        <span v-if="indicatorItem.name" style=" padding:0 6px"> {{ indicatorItem.unit }} </span>
        <span style="padding-left: 5px">
          <div class="delete-indicator-btn" style="margin-left: 10px"
               @click="handleClickDeleteIndicatorBtn(indicatorIdx)">
            <i class="el-icon-minus"/>
          </div>
        </span>
      </div>
    </div>
    <div style="height: 42px; display: flex; align-items: center">
      <div style="line-height: 38px" class="delete-indicator-btn" @click="handleAddIndicatorBtn">
        <i class="el-icon-plus"/>
      </div>
    </div>
  </div>
</template>

<script>
import indicatorApi from "@/api/indicator";

export default {
  name: "index",
  props: {
    maxNumber: {
      type: Number,
      default: 20
    },
    id: {
      type: Number,
      require: true
    },
    type: {
      type: String,
      require: true
    },
    data: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      selectableIndicatorList: [],
      indicatorChanged: false,
      numberChanged: false,
      selectedIndicatorData: this.data.map((item) => {
        return {
          name: item.indicator,
          id: item.indicator_id,
          number: item.number,
          sign: item.sign,
          unit: item.unit
        }
      }),
      indicatorSignUnitMap: {}
    }
  },
  mounted() {
    this._prepare()
  },
  methods: {
    _prepare() {
      this.fetchSelectableIndicatorData()
    },
    fetchSelectableIndicatorData() {
      let query = {
        category_id: this.id,
        type: this.type
      }
      indicatorApi.list(query).then(({data: res}) => {
        if (res.meta.code !== 0) {
          return this.$message.error("获取收益指标列表失败！")
        }
        this.selectableIndicatorList = res.data.map((item) => {
              return {
                name: item.name,
                id: item.id,
                sign: item.sign,
                unit: item.unit,
                disabled: false
              }
            }
        )
        this.updateSelectedIndicatorDisabled()
        res.data.forEach((item) => {
          this.indicatorSignUnitMap[item.name] = {id: item.id, sign: item.sign, unit: item.unit}
        })
      }).catch(err => {
        this.$message.error("获取收益指标列表异常！")
        console.log("获取收益指标列表异常!" + err.toString())
      }).finally(() => {
      })
    },

    handleClickDeleteIndicatorBtn(indicatorIdx) {
      this.selectedIndicatorData.splice(indicatorIdx, 1)
      this.$emit('change', this.type, this.selectedIndicatorData)
    },
    handleAddIndicatorBtn() {
      if (this.selectedIndicatorData.length >= 20) {
        return this.$message({message: '最多添加20条收益', duration: 2000, type: 'warning', offset: 100,});
      }
      this.updateSelectedIndicatorDisabled()
      let tmp = {name: '', number: '',}
      this.selectedIndicatorData.push(tmp)
    },
    indicatorSelectChanged() {
      // this.indicatorChanged = true
      for (let i = 0; i < this.selectedIndicatorData.length; ++i) {
        if (this.selectedIndicatorData[i].name === "") continue
        Object.assign(this.selectedIndicatorData[i], {id: this.indicatorSignUnitMap[this.selectedIndicatorData[i].name].id})
        Object.assign(this.selectedIndicatorData[i], {sign: this.indicatorSignUnitMap[this.selectedIndicatorData[i].name].sign})
        Object.assign(this.selectedIndicatorData[i], {unit: this.indicatorSignUnitMap[this.selectedIndicatorData[i].name].unit})
      }
      this.updateSelectedIndicatorDisabled()
      this.readyIndicatorAndNumber()
    },
    indicatorChangedOnBlur() {
      for (let i = 0; i < this.selectedIndicatorData.length; ++i) {
        Object.assign(this.selectedIndicatorData[i], {id: this.indicatorSignUnitMap[this.selectedIndicatorData[i].name].id})
        Object.assign(this.selectedIndicatorData[i], {sign: this.indicatorSignUnitMap[this.selectedIndicatorData[i].name].sign})
        Object.assign(this.selectedIndicatorData[i], {unit: this.indicatorSignUnitMap[this.selectedIndicatorData[i].name].unit})
      }
      this.readyIndicatorAndNumber()
    },
    numberChangeOnBlur() {
      if (!this.numberChanged) return
      this.readyIndicatorAndNumber()
    },
    readyIndicatorAndNumber() {
      this.selectedIndicatorData = this.selectedIndicatorData.map((item) => {
        return {
          name: item.name,
          id: item.id,
          sign: item.sign,
          number: item.number === '' ? '' : Number(item.number).toFixed(3),
          unit: item.unit
        }
      })
      this.$emit('change', this.type, this.selectedIndicatorData)
    },
    updateSelectedIndicatorDisabled() {
      this.selectableIndicatorList = this.selectableIndicatorList.map(item1 => {
        let flag = false
        this.selectedIndicatorData.forEach((item2) => {
          if (item2.name === item1.name) {
            flag = true
          }
        })
        return {
          name: item1.name,
          id: item1.id,
          sign: item1.sign,
          unit: item1.unit,
          disabled: flag
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.add-gain-container {
  //height: 40px;
  //display: flex;
  //align-items: center;
}

.add-gain-select {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.avatar {
  width: 20px;
  height: 20px;
  background-color: gainsboro;
  border-radius: 50%;
}

.new-people-input {
  padding-bottom: 10px;
  width: 140px;
}

.delete-indicator-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  color: #5F48C5;
  border: .2px solid #5F48C5;
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
}


</style>

