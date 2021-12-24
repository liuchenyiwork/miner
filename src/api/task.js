/**
 * task interface
 */

import request from '@/utils/request';

export default {
  // 获取任务列表
  getTaskList(query) {
    return request.get(`/task`, {params: query})
  },

  //更新任务状态
  patchTask(taskId, payload) {
    if (!taskId) {
      return Promise.reject(new Error("请使用正确的id！"))
    }
    return request.patch(`/task/${taskId}`,payload)
  }
}

