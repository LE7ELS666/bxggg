define(["jquery","template","nprogress","cookie"],function ($,template,NProgress) {
    $(function () {

        NProgress.start();
        NProgress.done();

        $(document).ajaxStart(function () {
            NProgress.start();
        })

        $(document).ajaxStop(function () {
            NProgress.done();
        })

        if (location.pathname != "/dashboard/login") {
            if($.cookie("PHPSESSID") == null){
                location.href = "/dashboard/login";
                return;
            }

            var userInfo = JSON.parse($.cookie("userInfo"));
            var html = template("userInfo-tpl",userInfo);

            $("#profile").html(html);
        }
    })

    //退出登录
    $(".exit").click(function () {
        $.ajax({
            url:"/api/logout",
            type:"post",
            success: function (data) {
                console.log(data.code);
                if (data.code == 200) {
                    // $.cookie("PHPSESSID",null);
                    // $.cookie("userInfo",null);
                    location.href = "/dashboard/login";
                }
            }

        })

    })

    //点击显示二级菜单

    $(".navs>ul>li>ul").parent().click(function () {
            $(this).children().slideDown();
    })

    //给当前页面加选中效果

    $(function () {
        var path = location.pathname;
        if (path == "/") {
            path = "/dashboard/index";
        }

       var activeli =  $(".navs a[href = '"+ path +"']");
        activeli.addClass("active");

        var activeul = activeli.parent().parent();
        if (activeul.siblings("a").length == 1) {
            activeul.show();
        }

    })



})


