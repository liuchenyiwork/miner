/**
 * gain interface
 */
import request from "@/utils/request";

export default {
  // 年度收益来源
  annual: function (id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/gain-source`, {params: query})
  },

  // 重点优化收益
  core: function (id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/dashboard/core-gain`, {params: query})
  },

  // 优化收益列表
  list: function (query) {
    return request.get(`/gain`, {params: query})
  },

  // 双月新增收益
  addition: function (query) {
    return request.get(`/gain/trend/addition`, {params: query})
  },

  // 历史累计收益
  accumulation: function (query) {
    return request.get(`gain/trend/accumulation`, {params: query})
  },

  // 收益转化
  conversion: function (query) {
    return request.get(`/gain/conversion`, {params: query})
  }
}

