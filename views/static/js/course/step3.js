/**
 * Created by meeddy on 17/7/28.
 */
define(["jquery","template","utils","form","bootstrap"],function ($,template,utils) {
    var id = utils.getQueryByKey("id");

    $.ajax({
        url:"/api/course/lesson",
        data: {cs_id: id},
        success:function (data) {
            console.log(data);
            if (data.code === 200) {
                var html = template("lesson-tpl",data.result);
                $(".steps").html(html);
            }
        }
    })

    $(".steps").on("click",".btn-edit",function () {
        var ctid = $(this).parent().data("id");

        $.ajax({
            url:'/api/course/chapter/edit',
            data: {ct_id : ctid},
            success:function (data) {
                if (data.code === 200) {
                    data.result.title = "编辑课时";
                    data.result.buttonText = "保 存";
                    data.result.url = "/api/course/chapter/modify";
                    renderModal(data.result);
                }
            }
        })
    })

    $(".steps").on("click","#btn-add",function () {
        var obj = {
            title:"添加课时",
            buttonText:"添 加",
            url: "/api/course/chapter/add"
        }

        renderModal(obj);
    })

    $(".modal-content").on("click","#save-btn",function () {
        var isF = $("#isfree").prop("checked")
        $("form").ajaxSubmit({
            data:{
                ct_cs_id:id,
                ct_is_free: isF? 1 : 0
            },
            success:function (data) {
                if (data.code ===200) {
                    $("#chapterModal").modal("hide");
                    $.ajax({
                        url: "/api/course/lesson",
                        data:{cs_id : id},
                        success:function (data) {
                            $("#count").text("课时:"+ data.result.lessons.length);
                            var html = template("list-tpl",data.result);
                            $(".lessons").html(html);
                        }
                    })
                }
            }
        })
    })


    function renderModal(data) {
        var html = template("modal-tpl",data);
        $(".modal-content").html(html);
        $("#chapterModal").modal("show");
    }


})