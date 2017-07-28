/**
 * Created by meeddy on 17/7/27.
 */
define(["jquery","utils","template","ckeditor","form"],function ($,utils,template,CKEDITOR) {
    var id = utils.getQueryByKey("id");

    $.ajax({
        url:"/api/course/basic",
        // type:"post",
        data: {cs_id: id},
        success:function (data) {
            if (data.code === 200) {
                // console.log(data.result.teacher[211].tc_id);
                // console.log(data);
                var html = template("basic-tpl",data.result);
                $(".steps").html(html);

                CKEDITOR.replace("cs_brief");

                $("form").submit(function () {
                    CKEDITOR.instances["cs_brief"].updateElement();
                    $(this).ajaxSubmit({
                        url:"/api/course/update/basic",
                        type:"post",
                        data:{cs_id:data.result.cs_id},
                        success:function (data) {
                            if (data.code === 200) {
                                location.href = "/course/step2?id=" + data.result.cs_id;
                            }
                        }
                    })

                    return false;
                })


            }
        }
    })

})