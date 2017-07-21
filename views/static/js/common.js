$(function () {
    if (location.pathname != "/dashboard/login") {
        if(!$.cookie("PHPSESSID")){
        	location.href = "/dashboard/login";
        	return;
		}

		var userInfo = JSON.parse($.cookie("userInfo"));
        var html = template("userInfo-tpl",userInfo);

        $("#profile").html(html);
    }
})