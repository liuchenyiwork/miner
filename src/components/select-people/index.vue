<template>
  <div class="select-people-container">
    <div v-for="(item, idx) in selectedPeople" :key="idx" style="padding-right: 5px; line-height: 20px; display: flex;align-items: center;">
      <!--    <img v-if="userInfo" class="avatar" :src="userInfo.avatar"  alt=""/>-->
      <img class="avatar" src="@/assets/avatar.png" alt=""/>

      <span style="padding-left: 5px; font-size: 8px">{{ item }}</span>
      <el-button class="delete-person-btn" type="text" size="mini" @click="handleDeletePeopleBtn(idx)">
        <i class="el-icon-close" style="height: 10px; width: 10px; padding-right: 5px" />
      </el-button>
    </div>
    <div style="display: flex; align-items: center;margin-left: 6px">
      <el-autocomplete
          class="new-people-input"
          style="padding-top: 5px;"
          v-if="newPeopleInputVisible"
          v-model="newPeopleInputValue"
          size="mini"
          ref="newPeopleInputRef"
          placeholder="请输入用户名"
          :fetch-suggestions="fetchCandidatePeopleList"
          @select="handleSelectNewInputPeople"
          @blur="handleNewPeopleInputCancel">
      </el-autocomplete>
      <div class="add-new-person-btn"  v-if="!newPeopleInputVisible && selectedPeople.length < maxPeople" @click="showNewPeopleInput">
        <i class="el-icon-plus"/>
      </div>
    </div>

  </div>
</template>

<script>
// import {deepClone} from "@/utils";
import userApi from "@/api/users"

export default {
  name: "index",
  props: {
    defaultPeople: {
    },
    maxPeople: {
      type: Number,
      default: 1
    },
    selectedPeople: {
      type: Array,
      require: true
    },
    role: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      userInfo: {},
      newPeopleInputVisible: false,
      newPeopleInputValue: '',
    }
  },
  mounted() {
    this.userInfo = this.$cookies.get('User-Info')
  },
  methods: {
    candidateFilter(query) {
      return (candidates) => {
        return (candidates.value.toLowerCase().indexOf(query.toLowerCase()) > -1);
      }
    },
    fetchCandidatePeopleList (query, cb) {
      if (!query.trim()) {
        cb([])
        return
      }
      userApi.list().then(({ data: res }) => {
        if (res.meta.code !== 0) {
          this.$message.error("获取用户名失败！" + res.meta.message)
          return
        }
        const candidatePeopleList = [
          ...res.data.results.map((item) => { return { value: item.name_cn + "(" + item.name + ")" } }),
          // ...res.data.results.map((item) => { return { value: item.name_cn } })
        ]

        let results = query ? candidatePeopleList.filter(this.candidateFilter(query)) : candidatePeopleList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }).catch(err => {
        this.$message.error("获取用户名异常！")
        console.log("获取用户名异常！" + err.toString())
      }).finally(()=>{

      })
    },
    handleNewInputPeopleConfirm () {
      let inputPeople = this.newPeopleInputValue;
      if (inputPeople) {
        this.selectedPeople.push(inputPeople);
      }
      this.newPeopleInputVisible = false;
      this.newPeopleInputValue = '';
    },
    showNewPeopleInput () {
      this.newPeopleInputVisible = true;
      this.$nextTick( () => {
        this.$refs.newPeopleInputRef.$refs.input.focus();
      });
    },
    handleDeletePeopleBtn (idx) {
      this.selectedPeople.splice(idx, 1)
      this.$emit('change')
    },
    handleSelectNewInputPeople (inputValue) {
      if (inputValue.value) {
        let tmp = inputValue.value.split('(')[0]
        if (this.selectedPeople.indexOf(tmp) !== -1 ) {
          this.$message.error(`请勿重复添加${this.role}！`)
          this.newPeopleInputVisible = false
          this.newPeopleInputValue = ""
          return
        }
        this.selectedPeople.push(tmp);
        this.newPeopleInputVisible = false
        this.newPeopleInputValue = ""

        // this.$confirm(`是否添加用户 ${inputValue.value} 为${this.role}？`, "提示", {
        //   confirmButtonText: "确认",
        //   cancelButtonText: "取消"
        // }).then(() => {
        //   this.selectedPeople.push(inputValue.value);
        // }).catch(() => {
        // }).finally(() => {
        //   this.newPeopleInputVisible = false
        //   this.newPeopleInputValue = ""
        // })
        this.$emit('change')
      } else {
        this.newPeopleInputVisible = false
        this.newPeopleInputValue = ""
      }
    },
    handleNewPeopleInputCancel () {
      if (this.newPeopleInputValue === "") {
        this.newPeopleInputVisible= false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.select-people-container {
  display: flex;
  align-items: center;
  .avatar {
    width: 20px;
    height: 20px;
    background-color: gainsboro;
    border-radius: 50%;
  }
  .new-people-input{
    padding-bottom: 10px;
    width: 140px;
  }
  .add-new-person-btn {
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
}


</style>

