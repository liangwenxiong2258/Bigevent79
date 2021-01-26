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
//添加响应拦截器 处理
axios.interceptors.response.use(function (response) {
    //对向应数据做点什么
    console.log(response);
    if (response.data.status === 1 && response.data.message === "身份认证失败") {
        //身份认证失败要跳回登录页面
        localStorage.removeItem("token");

        location.href = "/home/login.html";
    }
    return response
},
    function (error) {
        return Promise.rehect(error);
    }
)