/**
 * Created by meeddy on 17/7/24.
 */
define([],function () {
    return{
        getQuery: function () {
            var queryString = location.search.slice(1);
            var arr = queryString.split("&");
            var obj = {};

            arr.forEach(function (v,i) {
                var kvpair = v.split("=");
                obj[kvpair[0]] = kvpair[1];
            })

            return obj;
        },

        getQueryByKey : function (key) {
            return this.getQuery()[key];
        }


    }
})