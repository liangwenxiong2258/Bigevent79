axios.defaults.baseURL = "http://api-breakingnews-web.itheima.net"
//添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        if (config.url.indexOf("/my") !== 1) {
            config.headers.Authorization = localStorage.getItem("token")
            return config;
        }
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
)