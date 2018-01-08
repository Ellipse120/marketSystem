export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatDateYMD (time) {
  return new Date(time).toISOString().split('T')[0]
}

export function formatDateYMDHMS (time) {
  const now = new Date(time)
  const year = '' + now.getFullYear()
  let month = '' + (now.getMonth() + 1)
  if (month.length === 1) {
    month = '0' + month
  }
  let day = '' + now.getDate()
  if (day.length === 1) {
    day = '0' + day
  }
  let hour = '' + now.getHours()
  if (hour.length === 1) {
    hour = '0' + hour
  }
  let minute = '' + now.getMinutes()
  if (minute.length === 1) {
    minute = '0' + minute
  }
  let second = '' + now.getSeconds()
  if (second.length === 1) {
    second = '0' + second
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}
