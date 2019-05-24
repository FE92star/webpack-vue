/**
 *
 * 格式化参数，自动排序提交form表单
 * @export
 * @param {*} params 传参对象 get会拼接 post会处理对象
 * @param {string} [type='POST']
 * @returns
 */
 // 200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
 // 201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
 // 202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
 // 204 NO CONTENT - [DELETE]：用户删除数据成功。
 // 400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
 // 401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
 // 403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
 // 404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
 // 406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
 // 410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
 // 422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
 // 500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。
export function formate (params, type = 'POST') {
  let d = null
  if (type === 'POST') {
    let form = new FormData()
    let arr = []
    for (let a of Object.keys(params)) {
      arr.push(a)
    }
    let arrSort = arr.sort()
    for (let b of arrSort) {
      let val = params[b]
      form.append(b, val)
    }
    d = form
  } else {
    let arr = []
    let str = ''
    for (let a of Object.keys(params)) {
      arr.push(a)
    }
    let arrSort = arr.sort()
    for (let b of arrSort) {
      let val = params[b]
      str += `${b}=${val}&`
    }
    let l = str.length - 1
    let ss = str.substr(0, l)
    d = ss
  }
  return d
}

export function loadFn () {
  let load = null
  let show = () => {
    console.log('loading')
  }
  let hide = () => {
    console.log('hide')
  }
  show = (window.insertLoad && window.insertLoad.show) ? window.insertLoad.show : show
  hide = (window.insertLoad && window.insertLoad.hide) ? window.insertLoad.hide : hide
  let obj = {
    show: show,
    hide: hide
  }
  load = (window.vload && window.vload.$load) ? window.vload.$load : obj
  return load
}

export function toastFn (msg) {
  let toast = (msg) => {
    console.log(msg)
  }
  toast = (window.vtoast && window.vtoast.$toast) ? window.vtoast.$toast.show : (window.insertToast ? window.insertToast : toast)
  return toast(msg)
}

/**
 * @export
 * @param {*} request
 * @param {*} h header object设置头的对象
 */
export function setHeader (request, h) {
  for (let i in h) {
    request.setRequestHeader(i, h[i])
  }
}

export function errorMsg (status) {
  let obj = {
    403: '资源禁止访问，你可能未登录',
    404: '接口/资源不正确，请确认',
    413: '请求实体过大',
    302: '重定向，请确认是否需要后端控制重定向',
    500: '内部服务器错误',
    501: '服务器不支持请求中要求的功能',
    502: '远端服务器错误响应',
    503: '服务器由于在维护或已经超载而无法响应',
    504: '网关超时',
    505: '不支持的 HTTP 版本',
    1000: '未知错误'
  }
  let s = typeof status === 'number' ? status : 1000
  let msg = obj[s] || 'status error or others error'
  return msg
}

export function ajaxLog (request, url) {
  if (window._Log) {
    try {
      window._Log.Crash(request.responseText, {
        mark: url
      })
    } catch (e) {
      console.log(e)
    } finally {
      console.log('try _log')
    }
  } else {
    let er = {
      code: -1,
      msg: {
        detail: errorMsg(request.status),
        url: url,
        status: request.status || 1000
      },
      success: 'error'
    }
    console.error(er)
  }
}
