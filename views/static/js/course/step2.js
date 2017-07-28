define(["jquery","utils","template","uploadify","jcrop","form"],function ($,utils,template) {
    var id = utils.getQueryByKey("id");

    var jcrop_api = null;

    $.ajax({
        url: "/api/course/picture",
        data: {cs_id:id},
        success: function (data) {
            if (data.code === 200) {
                var html = template("main-tpl",data.result)
                $(".steps").html(html);


                $("#upload-btn").uploadify({
                    swf: "/views/assets/uploadify/uploadify.swf",
                    uploader: "/api/uploader/cover",
                    fileObjName: "cs_cover_original",
                    formData:{cs_id:id},
                    buttonText: "选择图片",
                    buttonClass : "btn btn-success btn-sm",
                    width: 70,
                    itemTemplate: "<p></p>",
                    onUploadSuccess: function (file,data) {
                        data = JSON.parse(data);
                        if (data.code === 200) {
                            $(".preview img").attr("src",data.result.path);
                            $("#crop-btn").prop("disabled",false);
                        }


                        jcrop_api && jcrop_api.destory();
                        $("#crop-btn").text("裁切图片");

                    }

                })

                $("#upload-btn-button").css("line-height", "1.5");


                $(".preview").on("cropmove cropend",function (e,s,c) {
                    $("[name=x]").val(c.x);
                    $("[name=y]").val(c.y);
                    $("[name=w]").val(c.w);
                    $("[name=h]").val(c.h);
                })

            }
        }
    })

    $(".steps").on("click","#crop-btn",function () {
        if($(this).text() == "裁切图片"){
            $(".preview>img").Jcrop({
                aspectRatio: 2,
                boxWidth:400,
                setSelect: [0,0,400,400],

            },function () {
                jcrop_api = this;
                this.initComponent("Thumbnailer",{container:".thumb",top:0,width:240,height:120})
            })

            $(this).text("保存图片");

        }else{
            $("form").ajaxSubmit({
                data: {cs_id: id},
                success: function (data) {
                    if(data.code == 200){
                        // alert("保存裁切的图片成功");
                        // console.log(data);
                        location.href = "/course/step3?id=" + data.result.cs_id;
                    }
                }
            })
        }
    })


})