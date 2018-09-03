$(function() {
    $("input").on("input", function() {
        var val = $("input").val();
        $.ajax({
            url: "/api/datajson?val=" + val,
            dataType: "json",
            success: function(res) {
                var str = "";
                res.data.forEach(function(v) {
                    str += "<li>" + v + "</li>";
                })
                $(".list").html(str);
            }
        })
    })
})