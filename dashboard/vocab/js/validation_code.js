function executeValidation(project_id, table_id, loading_id, div_id){
    var div = document.getElementById(div_id);
    loading(loading_id);
    url = "https://data.cogito.iot.linkeddata.es/validation/api/project_consistency_validation/data?project_id=" + project_id + "&table_id=" + table_id;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            results = request.responseText;
            div.insertAdjacentHTML( 'beforeend', results );
            table_display(div_id);
            removeLoad(loading_id);
        } else {
            console.log("Error loading groups: " + request.status + " - " + request.statusText);
        }
    };
    request.send(null);
    
}

function executeEnrichmentValidation(rdf_uri, table_id, loading_id, div_id){
    var div = document.getElementById(div_id);
    loading(loading_id);
    url = "https://data.cogito.iot.linkeddata.es/validation/api/enrichment_consistency_validation/data?rdf_uri=" + rdf_uri + "&table_id=" + table_id;
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            results = request.responseText;
            div.insertAdjacentHTML( 'beforeend', results );
            table_display(div_id);
            removeLoad(loading_id);
        } else {
            console.log("Error loading groups: " + request.status + " - " + request.statusText);
        }
    };
    request.send(null);
    
}