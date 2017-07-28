/**
 * Created by meeddy on 17/7/25.
 */
define(["jquery","ckeditor","template","uploadify","datepicker","datepickerCN","region","form"], function ($,CKEDITOR,template) {


    $.ajax({
        url: "/api/teacher/profile",
        success: function (data) {
            if (data.code == 200) {
                var html = template("profile-tpl", data.result);
                $(".settings").html(html)


                CKEDITOR.replace("tc_introduce", {
                    toolbarGroups: [
                        {name: 'clipboard', groups: ['clipboard', 'undo']},
                        // { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                        // { name: 'links', groups: [ 'links' ] },
                        // { name: 'insert', groups: [ 'insert' ] },
                        // { name: 'forms', groups: [ 'forms' ] },

                        // { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
                        {name: 'others', groups: ['others']},
                        // '/',
                        {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
                        {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
                        // { name: 'styles', groups: [ 'styles' ] },
                        {name: 'colors', groups: ['colors']},
                        // { name: 'about', groups: [ 'about' ] }
                        {name: 'tools', groups: ['tools']},
                    ]
                });

                // $("#upfile").uploadify({
                //     swf: "/views/assets/uploadify/uploadify.swf",
                //     uploader: "/api/uploader/avatar",
                //     height: 120,
                //     width: 120,
                //     fileObjName: "tc_avatar",
                //     onUploadSuccess: function (file,data) {
                //         data = JSON.parse(data);
                //
                //         if (data.code == 200) {
                //
                //             $(".preview img").attr("src",data.result.path);
                //         }
                //     },
                //     multi:false,
                //     buttonText:"",
                //     itemTemplate: "<p></p>"
                //
                // })
                $("#upfile").uploadify({
                    //1. swf文件路径
                    swf: "/views/assets/uploadify/uploadify.swf",
                    //2. 提交接口地址
                    uploader: "/api/uploader/avatar",
                    //3. 提交图片的 键
                    fileObjName: "tc_avatar",
                    onUploadSuccess: function (file, data) {
                        data = JSON.parse(data);
                        if (data.code == 200) {
                            $(".preview img").attr("src", data.result.path);
                        }
                    },
                    width: 120,
                    height: 120,
                    buttonText: "",
                    multi: false,
                    fileTypeExts: "*.jpg; *.gif; *.png; *.jpeg",
                    itemTemplate: "<p></p>"
                })

                $("input[name=tc_birthday]").datepicker({
                    format: "yyyy-mm-dd",
                    language: "zh-CN"
                })

                $("input[name=tc_join_date]").datepicker({
                    format: "yyyy-mm-dd",
                    language: "zh-CN"
                })


                //1. 省市区插件的使用，需要在省市区三个select的父元素上调用插件的方法

                //三个select必须有自己的id 分别是 p c d

                $("#region").region({
                    url: "/views/assets/jquery-region/region.json"
                })


                $("form").submit(function () {


                    //手动将富文本编辑器中的内容更新到textarea中
                    CKEDITOR.instances["tc_introduce"].updateElement();
                    // console.log($("[name=tc_introduce]").val());

                    $(this).ajaxSubmit({
                        url: "/api/teacher/modify",
                        type: "post",
                        data: {tc_id: data.result.tc_id},
                        success: function (data) {
                            if (data.code == 200) {
                                alert("个人资料更新成功")
                            }
                        }
                    })


                    return false;
                })
            }
        }
    })
})



