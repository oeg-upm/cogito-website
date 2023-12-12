function enrichment(id, latitude, longitude, format, text_area_id, loading_id){
    console.log("enrichment");
    loading(loading_id);
    var latitude = document.getElementById(latitude).value
    var longitude = document.getElementById(longitude).value
    if (format == "json"){
        var url = "https://data.cogito.iot.linkeddata.es/validation/api/mapping_enrichment_json/data?project_id=" + id + "&latitude=" + latitude + "&longitude=" + longitude;
    }
    else {
        var url = "https://data.cogito.iot.linkeddata.es/validation/api/enrichment_turtle_final/data?project_id=" + id + "&latitude=" + latitude + "&longitude=" + longitude;
    }
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            if (format == "json"){
                results = JSON.parse(request.responseText);
                results = JSON.stringify(results, undefined, 4);
            }
            else {
                results = request.responseText;
            }
            console.log(request.responseText);
            removeLoad(loading_id);
            document.getElementById(text_area_id).value = results;
        } else {
            console.log("Error loading groups: " + request.status + " - " + request.statusText);
        }
    };
    request.send(null);
}

function loading(loading_id) {
    document.getElementById(loading_id).style.display = "block";
}

function removeLoad(loading_id) {
    document.getElementById(loading_id).style.display = "none";
}

function copyToClipboard(id){
    navigator.clipboard.writeText(document.getElementById(id).value)
}

function executeQuery(id, head_id, body_id, loading_id, table_id){
    loading(loading_id);
    var value = document.getElementById(id).value
    var query_exe = encodeURIComponent(value)
    url = "https://data.cogito.iot.linkeddata.es/validation/api/query_graph/data?query=" + query_exe;
    // console.log(url);
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            results = JSON.parse(request.responseText);
            head = results.head.vars;
            body = results.results.bindings;
            $("#" + head_id).append(fillHeadTable(head));
            for (var i = 0; i < body.length; i++) {
                $("#" + body_id).append(fillBodyTable(head, body[i]));
            }
            table_display(table_id);
            if (events.length > 0) {
                console.log("refreshing table");
            }
            removeLoad(loading_id);
        } else {
            console.log("Error loading groups: " + request.status + " - " + request.statusText);
        }
    };
    request.send(null);
    
}

function fillHeadTable(json){
    var header = $("<tr>");
    for (var i = 0; i < json.length; i++) {
        var elem = $("<th class='col-md-2'  style='background: white; position: sticky;top: 0;'>").html(json[i]);
        header.append(elem);
    }
    return header;
}

function fillBodyTable(head, json){
    var row = $("<tr>");
    for (var i = 0; i < head.length; i++) {
        if (validURL(json[head[i]].value)) {
            var elem = $("<td>").html("<a href='" + json[head[i]].value + "' target='_blank'>" + json[head[i]].value + "</a>");
        }
        else {
            var elem = $("<td>").html(json[head[i]].value);
        }
        row.append(elem);
    }
    return row;
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function table_display(table_id) {
    document.getElementById(table_id).style.display = "block";
}