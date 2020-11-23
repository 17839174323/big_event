$(function() {
    var form = layui.form
    var layer = layui.layer
    $('#getpwd').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: { oldPwd: $('#getpwd [name = password]').val(), newPwd: $('#getpwd [name = rapassword]').val() },
            success: function(res) {
                // console.log(data);
                if (res.status !== 0) {
                    console.log($('#getpwd [name = password]').val());
                    console.log(res);
                    return layer.msg('更新密码失败');
                }
                layer.msg('更新密码成功')
            }
        });
    })
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            var val = $('#getpwd [name = rapassword]').val()
            if (value !== val)
                return '两次密码不一致'
        }
    })
})