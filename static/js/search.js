function search() {

}


function search(date) {
    var input = $('#searchInput').val()
    console.log(input);
    var res = "";
    $('#status-sp').prop('hidden', false);
    $.ajax({
        url: "/api/search?keyword=" + input,
        crossDomain: true,
        type: 'GET',
        datatype: 'json',
        contentType: "Application/json",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        success: function(response) {
            console.log(response);
            $('#status-sp').prop('hidden', true);
            if (response != "no-page") {
                var converter = new showdown.Converter(),
                    html = converter.makeHtml(response);
                $('#search-content').html(html);
            } else {
                $('#search-content').html("<h3>No Page</h3>" + " " + local_date)
            }
        },
        error: function(err) {
            $('#status-sp').prop('hidden', true);
            return err;
        }
    });
    console.log("res: {}", res);
    return res;
}

function fetchPage(e) {
    console.log(e);
    var url = e.target.innerText;
    $('#status-sp').prop('hidden', false);
    $.ajax({
        url: "/api/page/" + url,
        crossDomain: true,
        type: 'GET',
        datatype: 'json',
        contentType: "Application/json",
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        success: function(response) {
            //console.log(response);
            $('#status-sp').prop('hidden', true);
            if (response != "no-page") {
                response = response.replaceAll("![[", "\n![img](/api/images/").replaceAll(" | #x-small]]", ")\n")
                var converter = new showdown.Converter(),
                    html = converter.makeHtml(response);
                $('#search-content').html(html);
            } else {
                $('#search-content').html("<h3>No Page</h3>" + " " + local_date)
            }
        },
        error: function(err) {
            $('#status-sp').prop('hidden', true);
            return err;
        }
    });
}

$(document).ready(function() {
    $("body").on("click", "a", function(e) {
        console.log("clicked");
        // e.preventDefault(); // Prevent a link from following the URL
        fetchPage(e);
    });
});