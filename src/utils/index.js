/** 深拷贝函数
 * @param obj
 * @return target
 */
export function deepClone(obj) {
  if (obj === null || !obj) return obj;
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    let target = {};
    const keys = Object.keys(obj);
    keys.forEach(key => {
      if (obj[key] && typeof obj[key] === "object")
        target[key] = deepClone(obj[key]);
      else
        target[key] = obj[key];

    })
    return target
  } else if (Array.isArray(obj)) {
    let arr = [];
    obj.forEach((item, index) => {
      if (item && typeof item === "object")
        arr[index] = deepClone(item);
      else
        arr[index] = item;
    })
    return arr
  }
}


/**时间戳转化函数 返回形式为 2021-01-01 23：09：07
 * @param timestamp
 * @return 2021-01-01 23：09：07
 */
export function formatDateTime(timestamp) {
  if (!timestamp) {
    return '无'
  }
  const date = new Date(timestamp);
  const year = date.getFullYear(), month = addZero(date.getMonth() + 1);
  const day = addZero(date.getDate()), hours = addZero(date.getHours());
  const minute = addZero(date.getMinutes()), second = addZero(date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minute + ':' + second;
}

/**时间戳转化函数 返回形式为 2021-01-01
 * @param timestamp
 * @return string
 */
export function shortFormatDateTime(timestamp) {
  const date = formatDateTime(timestamp);
  if (date === '无') {
    return '无'
  }
  return date.substr(0, 10)
}

/**时间戳转化函数 返回形式为 2021-01
 * @param timestamp
 * @return string
 */
export function moreShortFormatDateTime(timestamp) {
  const date = formatDateTime(timestamp);
  if (date === '无') {
    return '无'
  }
  return date.substr(0, 7)
}

/**
 * 辅助函数， 数字小于10则转化为string，并加上0
 * @param num
 * @return string
 */
function addZero(num) {
  return num < 10 ? '0' + num : num
}

/**
 * @param timestamp
 * @return {Date}
 */
export function formatDateToUnix(timestamp) {
  return new Date(timestamp)
}

/**
 * 数据为空过滤函数
 * @param val
 * @return {string|*}
 */
export function dataEmptyFilter(val) {
  if (!val) {
    return "无"
  }
  return val
}
