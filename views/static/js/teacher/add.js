/**
 * Created by meeddy on 17/7/24.
 */
define(["jquery","template","utils","form","datepicker","datepickerCN","validate"],function ($,template,utils) {
    var id = utils.getQueryByKey("id");
    console.log(id);

    if (!id) {
        var obj = {
            title : "讲师添加",
            btnText : "添 加",
            url : "/api/teacher/add"
        };

        var html = template("teacher-add-tpl",obj);
        $(".body.teacher").html(html);

        $("input[name=tc_join_date]").datepicker({
            language: "zh-CN",
            format: "yyyy-mm-dd"
        });

        registeFormValidate();



    }else{
        $.ajax({
            url: "/api/teacher/edit",
            data: { tc_id: id },
            success:function (data) {
                if (data.code == 200) {
                    data.result.title = "讲师编辑";
                    data.result.btnText = "编 辑";
                    data.result.url = "/api/teacher/update";

                    var html = template("teacher-add-tpl",data.result);
                    $(".body.teacher").html(html);

                    $("input[name=tc_join_date]").datepicker({
                        language:"zh-CN",
                        format : "yyyy-mm-dd"
                    })
                    registeFormValidate();
                }
            }
        })
    }

    function registeFormValidate() {
        $("form").validate({
            onKeyup: true,
            onChange: true,
            onBlue: true,
            sendForm: false,
            description: {
                name: {
                    required: "请输入讲师名称",
                    valid: ""
                },
                pass: {
                    required: "请输入密码",
                    pattern: "密码必须是6-18位的字母或数字"
                }
            },
            eachValidField:function () {
                $(this).parent().parent().addClass("has-success").removeClass("has-error");
            },
            eachInvalidField:function () {
                $(this).parent().parent().addClass("has-error").removeClass("has-success");

            },
            valid: function () {
                console.log(this);
                this.ajaxSubmit({
                    success: function (data) {
                        if (data.code == 200) {
                            //跳转列表页
                            location.href = "/teacher/list"
                        }
                    }
                })
            },



        })
    }



})