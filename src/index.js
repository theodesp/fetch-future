export const fetchF = Future => fn => function (input, options) {
  return new Future((reject, resolve) => {
    'use strict'
    let request = new XMLHttpRequest()
    let url = input;
    request.open(options.method || 'get', url)

    for (let i of options.headers) {
      request.setRequestHeader(i, options.headers[i])
    }

    request.withCredentials = options.credentials === 'include'
    request.onload = () => resolve(response())
    request.onerror = reject
    request.send(options.body)

    function response () {
      let keys = []
      let all = []
      let headers = {}
      let header

      request.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm, (m, key, value) => {
        keys.push(key = key.toLowerCase())
        all.push([key, value])
        header = headers[key]
        headers[key] = header ? `${header},${value}` : value
      })
      return {
        ok: (request.status / 200 | 0) === 1,    // 200-399
        status: request.status,
        statusText: request.statusText,
        url: request.responseURL,
        clone: response,
        text: () => Future.of(request.responseText),
        json: () => Future.of(JSON.parse(request.responseText)),
        xml: () => Future.of(request.responseXML),
        blob: () => Future.of(new Blob([request.response])),
        headers: {
          keys: () => keys,
          entries: () => all,
          get: n => headers[n.toLowerCase()],
          has: n => n.toLowerCase() in headers
        }
      }
    }
  })
}
