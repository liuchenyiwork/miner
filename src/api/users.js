import request from "@/utils/request";

export default {
  getAuthInfo(code) {
    return request.get(`/auth/info`, { params: { code: code }})
  },

  list: function () {
    return request.get('/user')
  }
}

