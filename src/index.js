export const fetchF = Future => function (input, options = {}) {
  return new Future((reject, resolve) => {
    'use strict'
    const request = new XMLHttpRequest()
    const url = input
    request.open(options.method || 'get', url)

    for (let i in options.headers) {
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
      request.getAllResponseHeaders()
        .split('\u000d\u000a')
        .filter(Boolean)
        .reduce((acc, curr) => {
          const headerPair = curr
          // Can't use split() here because it does the wrong thing
          // if the header value has the string ": " in it.
          const index = headerPair.indexOf('\u003a\u0020')
          if (index > 0) {
            let key = headerPair.substring(0, index)
            const value = headerPair.substring(index + 2)

            keys.push(key = key.toLowerCase())
            all.push([key, value])
            header = headers[key]
            headers[key] = header ? `${header},${value}` : value
          }
        }, headers)
      return {
        ok: Future.of((request.status / 200 | 0) === 1),
        // 200-399
        status: Future.of(request.status),
        statusText: Future.of(request.statusText),
        url: Future.of(request.responseURL),
        clone: Future.of(response),
        text: Future.of(request.responseText),
        json: Future.of(JSON.parse(request.responseText)),
        xml: Future.of(request.responseXML),
        blob: Future.of(new Blob([request.response])),
        headers: {
          keys: Future.of(keys),
          entries: Future.of(all),
          get: n => Future.of(headers[n.toLowerCase()]),
          has: n => Future.of(n.toLowerCase() in headers)
        }
      }
    }
  })
}
