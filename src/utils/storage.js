/**
 * localStorage/sessionStorage with expiration.
 *
 */

export default {
  /**
   *
   * @param key
   * @param value
   * @param expireTime Number(should be duration) | Date | String, whatever the param is, it will be transferred into Number(timestamp)
   */
  set: function(key, value, expireTime=-1) {

    let valueBase64 = btoa(value);

    let expireTimeFormat = '-1';
    // expire time
    switch (typeof expireTime) {
      case "number":
        // number should not be a timestamp!
        if (expireTime > 0) {
          // expireTime's unit is sec, stored timestamp's is ms
          expireTimeFormat = new Date().getTime() + (expireTime * 1000) + '';
        }
        break;
      case "object":
        if (!(expireTime instanceof Date)) {
          throw new Error('unexpected expire time type, number|Date|string are expected.')
        }
        expireTimeFormat = expireTime.getTime() + '';
        break;
      case "string":
        expireTimeFormat = new Date(Date.parse(expireTime.replace(/-/g, '/'))).getTime() + '';
        break;
      default:
        throw new Error("unexpected expire time type, number|Date|string are expected.");
    }

    let expireTimeBase64 = btoa(expireTimeFormat + '');

    let encodedValue = expireTimeBase64 + '.' + valueBase64;

    window.localStorage.setItem(key, encodedValue);
  },
  get: function(key) {
    let originalValue = window.localStorage.getItem(key);
    if (!originalValue) {
      return originalValue
    }

    let splitValues = originalValue.split('.');
    if (splitValues.length !== 2) {
      return originalValue
    }

    let expireTime = parseInt(atob(splitValues[0]));
    let valueBase64 = atob(splitValues[1]);

    if (expireTime > 0 && expireTime < new Date().getTime()) {
      window.localStorage.removeItem(key);
      return null
    }

    return btoa(valueBase64)
  },
  remove: function(key) {
    window.localStorage.removeItem(key)
  },
  setBoolean: function (key, value, expireTime=-1) {
    if (typeof value !== 'boolean') {
      throw new Error('Invalid set data type, boolean is needed!')
    }
    this.set(key, value, expireTime)
  },
  getBoolean: function (key) {
    let val = atob(this.get(key))
    return val === 'true'
  },
  setString: function () {},
  getString: function () {},
}

