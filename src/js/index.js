$(function() {
    $("input").on("input", function() {
        var val = $("input").val();
        $.ajax({
            url: "/api/data.json?val=" + val,
            dataType: "json",
            success: function(res) {
                console.log(res);
            }
        })
    })
})