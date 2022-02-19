$(function() {
    // 点击“去注册账号”的链接
    console.log("加载了");
    $('#link_reg').on('click', function() {
        $(".login-box").hide()
        $(".reg-box").show()
        console.log("123");
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})