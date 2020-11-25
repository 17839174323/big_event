$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    getwzlbf()

    function getwzlbf() {
        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章失败')
                }
                layer.msg('获取文章成功')
                var mbyq = template('tpl-wzlb', res)
                $('tbody').html(mbyq)
                form.render()
                renderPage(res.total)

            }
        });

    }

    // 筛选
    initCate()
        // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-fl', res)
                $('[name=cate_id]').html(htmlStr)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
            // 根据最新的筛选条件，重新渲染表格的数据
        getwzlbf()
    })
    template.defaults.imports.shijian = function(date) {
        const data1 = new Date(date)
        var year = data1.getFullYear()
        var month = padZero(data1.getMonth() + 1)
        var day = padZero(data1.getDate())

        var hour = padZero(data1.getHours())
        var minutes = padZero(data1.getMinutes())
        var miao = padZero(data1.getSeconds())
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + miao

        function padZero(n) {
            return n > 9 ? n : '0' + n
        }

    }

    function renderPage(total) {
        laypage.render({
            elem: 'pagebox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 5],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    getwzlbf()
                }
            }
        })

    }
    $('tbody').on('click', '.layui-btn-del', function(e) {
        var len = $('.layui-btn-del').length
        e.preventDefault()
        var id = $(this).attr('data-id')
        $.ajax({
            type: "get",
            url: "/my/article/delete/" + id,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('删除失败')
                }
                layer.msg('删除成功')
                if (len == 1) {
                    q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                }
                getwzlbf()
            }
        })
    })

})