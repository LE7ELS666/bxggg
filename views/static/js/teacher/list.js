/**
 * Created by meeddy on 17/7/23.
 */
define(["jquery","template","bootstrap"],function ($,template) {
    $.ajax({
        url: "/api/teacher",
        type: "get",
        success: function (data) {
            template.defaults.imports.getAge = function (birthday) {
                var nowD = new Date();
                birthday = new Date(birthday);
                return nowD.getFullYear() - birthday.getFullYear();
            }
            if (data.code == 200) {
                var html = template("tList-tpl",data);
                $("#tListBody").html(html);
            }
        }
    })

    $("#tListBody").on("click",".btn-checkinfo",function () {
        var tc_id = $(this).parent().data("id");

        $.ajax({
            url: "/api/teacher/view",
            data: { tc_id: tc_id },
            success: function (data) {
                if (data.code == 200) {
                    var html = template("tInfo-tpl",data.result);
                    $(".tInfoBody").html(html);
                    $("#teacherModal").modal("show");
                }
            }
        })

    })

    $("#tListBody").on("click",".btn-toggle-status",function () {

        var tc_id = $(this).parent().data("id");
        var tc_status = $(this).data("status");

        var that = this;
        $.ajax({
                url: "/api/teacher/handle",
                type: "post",
                data: {
                    tc_id: tc_id,
                    tc_status: tc_status
                },
                success:function (data) {
                    if (data.code == 200) {

                        if (data.result.tc_status == "0") {
                            $(that).text("注 销").removeClass("btn-success").addClass("btn-warning");
                        }else{
                            $(that).text("启 用").removeClass("btn-warning").addClass("btn-success");
                        }

                        $(that).data("status",data.result.tc_status);
                    }
                }

            }
        )
    })

})