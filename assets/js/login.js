$(function () {
    //去注册
    $("#gotoRegi").click(function () {
        $(".regiBox").show();
        $(".loginBox").hide();
    });
    // 去登录
    $("#gotoLogin").click(function () {
        $(".regiBox").hide();
        $(".loginBox").show();
    });
    //表单自定义检验规则
    let form = layui.form
    form.verify({
        //支持上述函数式的方式,也支持下述数组的形式
        //pass就是我们自定义检验密码的规则
        pass: [/^[/S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        //获取密码的内容value 
        //要求确认密码和密码一致
        repass: function (value) {
            // console.log(value, item);
            let pwd = $('.regiBox[name= password]').val()  //接口获取密码内容
            if (value !== pwd) {
                return "两次密码不一致"
            }

        }
    })
    //    ==================注册ajax==================
    $(".regiBox form").on("submit", function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        axios
            .post("/api/reguser", data)
            .then((res) => {
                // console.log(res);
                // 实现弹框 layer.msg("只想弱弱提示");
                if (res.data.status !== 0) {
                    return layer.msg(res.data.message);
                }
                layer.msg("注册成功，请登录");

                $("#gotoLogin").click();

            });
    })
    // return
    //==================登录=================
    $(".loginBox form").on("submit", function (e) {
        e.preventDefault();

        let data = $(this).serialize();

        axios
            .post("/api/login", data)
            .then((res) => {
                console.log(res.data);

                if (res.data.status !== 0) {
                    // 登录失败
                    return layer.msg(res.data.message);
                }
                localStorage.setItem("token", res.data.token);
                layer.msg("登录成功，即将跳转去首页！", function () {
                });
            });
    });

})