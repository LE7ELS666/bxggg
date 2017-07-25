/**
 * Created by meeddy on 17/7/21.
 */
define(["jquery","cookie","form"],function ($) {
    $(function () {
        $("form").submit(function () {
            $(this).ajaxSubmit({

                url: "/api/login",
                type:"post",

                success: function (data) {
                    if (data.code === 200) {
                        $.cookie("userInfo",JSON.stringify(data.result),{path:"/"});
                        location.href = "/";
                    }
                }
            })
            return false;
        })
    })
})


