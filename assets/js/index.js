//====================发送ajax数据请求来获取用户信息======================
function getUserInfo() {
    axios.get("/my/userinfo", {
        headers: {
            Authorization: localStorage.getItem("token"),    //身份认证
        },
    })
        .then((res) => {
            // console.log(res);
            if (res.data.status !== 0) {
                //获取信息失败
                return layer.msg("获取用户信息失败")
            }
            avatarAndName(res.data);
        })
}
getUserInfo()
//处理头像和昵称
function avatarAndName(res) {
    //处理名字
    let name = res.data.nickname || res.data.username

    $("#welcome").text("欢迎" + name)
    //处理头像
    if (res.data.user_pic) {
        $(".layui-nav-img").attr("src", res, data.user_pic).show()
        $(".text_avatar").hide();

    } else {
        //没有自己头像时
        let first = name[0].toUpperCase()
        $(".text_avatar").text(first).show()
    }
}
//==============退出======================================
$("#logoutBtn").click(function () {
    //弹窗询问是否退出
    layer.confirm("确定退出登录?", { icon: 3, title: "提示" }, function (index) {
        // do something， 点击确认按钮做啥 退出

        // 退出要做啥
        //  核心思路：和登录做的事情反过来
        // 1. 页面跳转到登录页面
        // 2. 将本地存储的token给删除掉

        localStorage.removeItem("token");

        location.href = "/home/login.html";

        layer.close(index);
    });


})