/**
 * indicator interface
 */

import request from '@/utils/request';
export default {
  list: function (query) {
    return request.get(`/indicator`, { params: query})
  }
}

