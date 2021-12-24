/**
 * issue interface
 */
import request from "@/utils/request";

export default {
  // 问题发现率
  rate: function(id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/issue-detection-rate`, { params: query })
  },

  // 问题趋势
  trend: function(id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/issue-detection-trends`, { params: query })
  },

  // 获取跟进中的P0问题
  followP0Issue: function (id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/open-core-issue`, { params: query })
  },

  // 问题详情
  retrieveIssue: function (issueId) {
    if (!issueId) {
      return Promise.reject(new Error('issue id is needed'))
    }
    return request.get(`/issue/${issueId}`)
  },

  // 问题列表
  list: function (query) {
    return request.get(`/issue`, { params: query })
  },

  // 更新问题
  updateIssue: function (issueId, payload){
    if (!issueId) {
      return Promise.reject(new Error('issue id is needed'))
    }
    // console.log("issueId", issueId, "body:", payload)
    return request.put(`/issue/${issueId}`, payload)
  },

  // 更新收益
  updateGain: function (issueId, payload) {
    if (!issueId) {
      return Promise.reject(new Error('issue id is needed'))
    }
    return request.put(`/issue/${issueId}/gain`, payload)
  }
}

