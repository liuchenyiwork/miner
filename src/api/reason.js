/**
 <<<<<<< HEAD
 * reason
 =======
 * reason interface
 >>>>>>> 442eb2f (feat:rule edit)
 */

import request from '@/utils/request';

export default {
  listReasons(reasonType) {
    // deactivate,inapplicable
    return request.get(`/reason`, {params: {type: reasonType}})
  },
  create(type, reason) {
    if (["inapplicable", "deactivate"].indexOf(type) === -1)
      return Promise.reject(new Error('invalid reason type'))

    if (!reason)
      return Promise.reject(new Error('reason is needed'))

    return request.post(`/reason`, { reason, type })
  },
  // 获取原因列表
  getReasonList(query) {
    return request.get(`/reason`, {params: query})
  },
}

