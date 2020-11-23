$(function() {
    var form = layui.form
    var layer = layui.layer
        // '用户名称必须在1-6位之间!'
    form.verify({
        nickname: function(value) {
            console.log(value.length);
            if (value.length > 6) {
                return ('用户名称必须在1-6位之间!')
            }
        }
    })
    getuser()

    function getuser() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formuserinfo', res.data);
            }
        });
    }
    $('#btnrest').on('click', function(e) {
        e.preventDefault();
        getuser();
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                window.parent.getdata()
            }
        });
    })
})