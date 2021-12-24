/**
 * rule interface
 */

import request from '@/utils/request';

export default {
  // 获取平台规则分布
  getPlatformRule(id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/platform-rule`, {params: query})
  },

  // 获取启用中规则分布
  getActivateRule(id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/activate-rule`, {params: query})
  },

  // 获取规则数据列表
  listRuleData(query){
    return request.get(`/rule-data`, {params: query})
  },

  // 获取规则数据详情
  getRuleData(ruleDataId) {
    if (!ruleDataId) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    return request.get(`/rule-data/${ruleDataId}`)
  },

  //更新指定的规则数据
  updateRuleData(ruleDataId, payload) {
    if (!ruleDataId) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    return request.put(`/rule-data/${ruleDataId}`,payload)
  }
}

