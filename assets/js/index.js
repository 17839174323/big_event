$(function() {
    getdata()
    $('.out').on('click', function(e) {
        layer.confirm('你确定?', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})

function getdata() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取信息失败!')
            }
            touxiang(res.data)
        },
    })
}

function touxiang(user) {
    var name = user.nickname || user.username
    console.log(user);
    $('#welcome').html('欢迎&nbsp;' + name)
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}