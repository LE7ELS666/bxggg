/**
 * Created by meeddy on 17/7/28.
 */
define(["jquery","template"],function ($,template) {
    $.ajax({
        url: "/api/course",
        success:function (data) {
            if (data.code ===200) {
                var html = template("course-list-tpl",data);
                $(".courses").html(html);
            }
        }
    })
})