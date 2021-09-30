function getRand() {
    $('#status-sp').prop('hidden', false);
    $.ajax({
        statusCode: {
            500: function() {
                window.location.href = '/obweb';
            }
        },
        url: "/api/rand",
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
            content = response[1]
            file = response[0]
            localStorage.setItem('page', content);
            localStorage.setItem('file', file);
            var fileName = document.getElementById('fileName');
            console.log(fileName);
            if (fileName != null) {
                fileName.innerText = file;
            }
            if (content != "no-page") {
                $('#page-content').html(renderMdToHtml(content));
            } else {
                $('#page-content').html("<h3>No Page</h3>")
            }
        },
        error: function(err) {
            $('#status-sp').prop('hidden', true);
            console.log(err);
            return err;
        }
    });
}

$(document).ready(function() {
    getRand();
});