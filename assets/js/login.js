$(function() {
    $('.layui-form-a').on('click', function(e) {
        $('.login-box').hide().siblings('.login-box2').show();
    })

    $('.layui-form-a2').on('click', function(e) {
            $('.login-box2').hide().siblings('.login-box').show();
        })
        // 表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            var val = $('.login-box2[name=password]').val()
            if (value !== val)
                return '两次密码不一致'
        }

    });
    // $('#form-reg').on('submit', function(e) {
    //         e.preventDefault();
    //         $.ajax({
    //             type: 'POST',
    //             url: 'http://ajax.frontend.itheima.net/api/reguser',
    //             data: { username: $('#form-reg[name=username]').val(), password: $('#form-reg[name=password]').val() },
    //             success: function(res) {
    //                 if (res.status !== 0) {
    //                     console.log(res.status);
    //                     return console.log(res.message);
    //                 }
    //                 console.log('注册成功');
    //             }

    //         });
    //     })

    $('#form-reg').on('submit', function(e) {
        e.preventDefault();
        var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
        $.post('/api/reguser', { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() },
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
            })
    })
    $('#form-reg2').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })
})