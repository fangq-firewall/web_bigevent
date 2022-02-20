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

    let form = layui.form
    let layer = layui.layer
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
        let date = { username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val() }
        $.post('/api/reguser', date, (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！')
                //模拟点击
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})