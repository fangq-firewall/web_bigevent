$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $(".login-box").hide()
        $(".reg-box").show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    let form = layui.form;
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '草，密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致的规则
            repwd: (value) => {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        //发起请求
    $("#form_reg").on("submit", (e) => {
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }, (res) => {
            if (res.status !== 0) {
                return console.log(res.message);
            }
            console.log("注册成功");
        })
    })
})