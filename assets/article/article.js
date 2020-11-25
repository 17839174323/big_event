$(function() {
    var layer = layui.layer
    var form = layui.form
    getwz()

    function getwz() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status == 0) {
                    var tpl = template('tpl-1', res)
                    $('tbody').html(tpl)
                }
            }
        });
    }
    var index = null
    $('#btn-1').on('click', function(e) {
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章类别',
            content: $('#jsx').html(),
        })
    })
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('提交失败');
                }
                layer.msg('提交成功')
                layer.close(index);
                getwz()

            }
        });
    })
    var indextianjia = null
    $('body').on('click', '.btn-bianji', function(e) {
        e.preventDefault()
        indextianjia = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章类别',
            content: $('#bianji').html(),
        })
        var id = $(this).attr('data-Id');
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            data: "data",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取信息失败')
                }
                form.val('articleform', res.data)
                    // layer.close(indextianjia)
            }
        });
        $('body').on('submit', '#form-bianji', function(e) {
            e.preventDefault()
            $.ajax({
                type: "post",
                url: "/my/article/updatecate",
                // data: {
                //     Id: $('#form-bianji [name=Id]').val(),
                //     name: $('#form-bianji [name=name]').val(),
                //     alias: $('#form-bianji [name=alias]').val()
                // },
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('修改文章失败')
                    }
                    layer.msg('新增文章成功')
                    layer.close(indextianjia)
                    getwz()
                }
            });
        })
    })
    $('tbody').on('click', '#btn-del', function() {
        var id = $(this).attr('data-id2')
        console.log(id);
        layer.confirm('确定要删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除信息失败')
                    }
                    layer.msg('删除信息成功')
                    layer.close(index)
                    getwz()
                }
            });

        });
    })




})