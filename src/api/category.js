/**
 * category interface
 */

import request from "@/utils/request";

export default {
  retrieve: function (id) {
    if (!id) {
      return Promise.reject(new Error("请使用正确的d!"))
    }
    let query = {
      product_id: id
    }
    return request.get(`/category`, { params: query })
  },
  updateReason: function (category_data_id, reason) {
    if (!category_data_id)
      return Promise.reject(new Error('category data id is needed'))

    return request.put(`/category-data/${category_data_id}`, { reason: reason })
  }
}


