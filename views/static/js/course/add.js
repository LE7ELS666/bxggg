/**
 * Created by meeddy on 17/7/27.
 */
define(["jquery"],function ($) {
    $(".btn-success").click(function () {
        var csName = $("[name=cs_name]").val();

        $.ajax({
            url:"/api/course/create",
            type:"post",
            data:{cs_name:csName},
            success:function (data) {
                if (data.code === 200) {
                    location.href = "/course/step1?id=" + data.result.cs_id;
                }
            }
        })


        return false;

    })


})