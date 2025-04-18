class HttpClient {
    /**
     * 创建 HttpClient 实例
     * @param {Object} options - 全局配置
     * @param {string} options.baseURL - 基础 URL
     * @param {Object} options.headers - 默认请求头
     * @param {number} options.timeout - 请求超时时间（毫秒）
     */
    constructor(options = {}) {
        this.baseURL = options.baseURL || ''
        this.headers = options.headers || {}
        this.timeout = options.timeout || 10000

        // 请求拦截器
        this.requestInterceptors = []
        // 响应拦截器
        this.responseInterceptors = []
    }

    /**
     * 添加请求拦截器
     * @param {Function} onFulfilled - 请求发送前的处理函数
     * @param {Function} onRejected - 请求错误处理函数
     */
    addRequestInterceptor(onFulfilled, onRejected) {
        this.requestInterceptors.push({ onFulfilled: onFulfilled, onRejected })
    }

    /**
     * 添加响应拦截器
     * @param {Function} onFulfilled - 响应成功处理函数
     * @param {Function} onRejected - 响应错误处理函数
     */
    addResponseInterceptor(onFulfilled, onRejected) {
        this.responseInterceptors.push({ onFulfilled, onRejected })
    }

    /**
     * 发送请求
     * @param {string} url - 请求地址
     * @param {string} method - 请求方法
     * @param {Object} data - 请求数据
     * @param {Object} headers - 请求头
     * @param {Object} options - 其他选项
     * @returns {Promise} - 返回 Promise 对象
     */
    async request(url, method = 'GET', data = null, headers = {}, options = {}) {
        // 合并配置
        const config = {
            url,
            method: method.toUpperCase(),
            headers: { ...this.headers, ...headers },
            data,
            ...options
        }

        // 处理请求拦截器
        try {
            for (const interceptor of this.requestInterceptors) {
                config = await interceptor.onFulfilled(config)
            }
        } catch (error) {
            return Promise.reject(error)
        }

        // 处理 URL
        let fullUrl = config.url
        if (this.baseURL && !fullUrl.startsWith('http')) {
            fullUrl = this.baseURL + fullUrl
        }

        // 设置超时
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error(`Request timeout after ${this.timeout}ms`))
            }, this.timeout)
        })

        // 构建请求选项
        const fetchOptions = {
            method: config.method,
            headers: config.headers,
            ...config
        }

        // 如果是 GET/HEAD 请求，不包含 body
        if (['GET', 'HEAD'].includes(config.method)) {
            delete fetchOptions.body
        } else if (data) {
            // 处理请求体
            if (typeof data === 'object') {
                fetchOptions.body = JSON.stringify(data)
                fetchOptions.headers['Content-Type'] = 'application/json'
            } else {
                fetchOptions.body = data
            }
        }

        // 发送请求
        const fetchPromise = fetch(fullUrl, fetchOptions)
            .then(async response => {
                // 处理响应数据
                let responseData
                const contentType = response.headers.get('content-type')
                if (contentType && contentType.includes('application/json')) {
                    responseData = await response.json()
                } else {
                    responseData = await response.text()
                }

                const handledResponse = {
                    data: responseData,
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers,
                    config
                }

                // 检查 HTTP 状态码
                if (!response.ok) {
                    throw handledResponse
                }

                return handledResponse
            })

        // 处理响应拦截器
        const responsePromise = Promise.race([fetchPromise, timeoutPromise])
            .then(response => {
                let handledResponse = response
                for (const interceptor of this.responseInterceptors) {
                    handledResponse = interceptor.onFulfilled(handledResponse)
                }
                return handledResponse
            })
            .catch(error => {
                for (const interceptor of this.responseInterceptors) {
                    error = interceptor.onRejected(error)
                }
                return Promise.reject(error)
            })

        return responsePromise
    }

    /**
     * GET 请求
     * @param {string} url - 请求地址
     * @param {Object} params - 查询参数
     * @param {Object} headers - 请求头
     * @param {Object} options - 其他选项
     * @returns {Promise} - 返回 Promise 对象
     */
    get(url, params = {}, headers = {}, options = {}) {
        const queryString = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&')
        const requestUrl = queryString ? `${url}?${queryString}` : url
        return this.request(requestUrl, 'GET', null, headers, options)
    }

    /**
     * POST 请求
     * @param {string} url - 请求地址
     * @param {Object} data - 请求数据
     * @param {Object} headers - 请求头
     * @param {Object} options - 其他选项
     * @returns {Promise} - 返回 Promise 对象
     */
    post(url, data = {}, headers = {}, options = {}) {
        return this.request(url, 'POST', data, headers, options)
    }

    /**
     * PUT 请求
     * @param {string} url - 请求地址
     * @param {Object} data - 请求数据
     * @param {Object} headers - 请求头
     * @param {Object} options - 其他选项
     * @returns {Promise} - 返回 Promise 对象
     */
    put(url, data = {}, headers = {}, options = {}) {
        return this.request(url, 'PUT', data, headers, options)
    }

    /**
     * DELETE 请求
     * @param {string} url - 请求地址
     * @param {Object} data - 请求数据
     * @param {Object} headers - 请求头
     * @param {Object} options - 其他选项
     * @returns {Promise} - 返回 Promise 对象
     */
    delete(url, data = {}, headers = {}, options = {}) {
        return this.request(url, 'DELETE', data, headers, options)
    }

    /**
     * PATCH 请求
     * @param {string} url - 请求地址
     * @param {Object} data - 请求数据
     * @param {Object} headers - 请求头
     * @param {Object} options - 其他选项
     * @returns {Promise} - 返回 Promise 对象
     */
    patch(url, data = {}, headers = {}, options = {}) {
        return this.request(url, 'PATCH', data, headers, options)
    }
}

// 使用示例
const http = new HttpClient({
    baseURL: '/api',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer your-token'
    },
    timeout: 5000
});

http.addResponseInterceptor(response => {
    // console.log('Response interceptor:', response)
    if (response.data.code !== 200) {
        ElMessage({
            message: response.data.msg,
            type: 'warning',
            duration: 4000
        })
    }
    return response.data
})


export default http;
