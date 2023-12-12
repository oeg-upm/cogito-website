var query_murcia = "PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20td%3A%20%3Chttps%3A%2F%2Fwww.w3.org%2F2019%2Fwot%2Ftd%23%3E%0APREFIX%20facility%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Ffacility%23%3E%0APREFIX%20process%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Fprocess%23%3E%0APREFIX%20qual%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Fquality%23%3E%0APREFIX%20platform%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Fplatform%23%3E%0APREFIX%20props%3A%20%3Chttps%3A%2F%2Fw3id.org%2Fprops%23%3E%0APREFIX%20hctl%3A%20%3Chttps%3A%2F%2Fwww.w3.org%2F2019%2Fwot%2Fhypermedia%23%3E%0ASELECT%20%3Ftd%20%3Ftitle%20%3Fdescription%20%3FiriHref%20(group_concat(%3Frelation%3Bseparator%3D%27%2C%20%27)%20as%20%3Frelations)%20WHERE%20%7B%0A%20%20%20%20%3Chttps%3A%2F%2Fdata.cogito.iot.linkeddata.es%2Ftdd%2Fapi%2Fthings%2F55546fd7-5958-45fd-830d-bd73d3cff266%3E%20a%20facility%3AProject%20.%0A%20%20%20%20BIND(%3Chttps%3A%2F%2Fdata.cogito.iot.linkeddata.es%2Ftdd%2Fapi%2Fthings%2F55546fd7-5958-45fd-830d-bd73d3cff266%3E%20AS%20%3Ftd)%0A%20%20%20%20%3Ftd%20td%3Atitle%20%3Ftitle%20.%0A%20%20%20%20%3Ftd%20td%3Adescription%20%3Fdescription%20.%0A%20%20%20%20%3Ftd%20td%3AhasPropertyAffordance%20%3Fproperty%20.%0A%20%20%20%20%3Fproperty%20td%3Aname%20%22platform%3AhasIRI%22%20.%0A%20%20%20%20%3Fproperty%20td%3AhasForm%20%3Fform%20.%0A%20%20%20%20%3Fform%20hctl%3AhasTarget%20%3FiriHref%20.%0A%20%20%20%20%3Ftd%20td%3AhasLink%20%3Flink%20.%0A%20%20%20%20%3Flink%20hctl%3AhasTarget%20%3Ftarget%20.%0A%20%20%20%20BIND(URI(%3Ftarget)%20AS%20%3FinfoResTD)%20.%0A%20%20%20%20%3FinfoResTD%20a%20qual%3AInformationResource%20.%0A%20%20%20%20%3FinfoResTD%20td%3AhasPropertyAffordance%20%3FirProperty%20.%0A%20%20%20%20%3FirProperty%20td%3Aname%20%22platform%3AhasFileURL%22%20.%0A%20%20%20%20%3FirProperty%20td%3AhasForm%20%3FirForm%20.%0A%20%20%20%20%3FirForm%20hctl%3AhintsAtMediaType%20%3FmediaType%20.%0A%20%20%20%20%3FirForm%20hctl%3AhasTarget%20%3FfileURL%20.%0A%20%20%20%20BIND(CONCAT(%3FmediaType%2C%27%20-%20%27%2CSTR(%3FfileURL))%20AS%20%3Frelation)%20.%0A%7D%20GROUP%20BY%20%3Ftd%20%3Ftitle%20%3Fdescription%20%3FiriHref%0ALIMIT%2010%0A";

var url_murcia = "https://data.cogito.iot.linkeddata.es/tdd/api/search/sparql?query=" + query_murcia;
var events = [];
var head = null;
var results = null;
var td_count = 0;
var td_url = "";
var class_id = "";


var elements_query_murcia = "PREFIX%20rdf%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0APREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20td%3A%20%3Chttps%3A%2F%2Fwww.w3.org%2F2019%2Fwot%2Ftd%23%3E%0APREFIX%20facility%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Ffacility%23%3E%0APREFIX%20process%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Fprocess%23%3E%0APREFIX%20qual%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Fquality%23%3E%0APREFIX%20platform%3A%20%3Chttps%3A%2F%2Fcogito.iot.linkeddata.es%2Fdef%2Fplatform%23%3E%0APREFIX%20props%3A%20%3Chttps%3A%2F%2Fw3id.org%2Fprops%23%3E%0APREFIX%20hctl%3A%20%3Chttps%3A%2F%2Fwww.w3.org%2F2019%2Fwot%2Fhypermedia%23%3E%0ASELECT%20%3Ftd%20%3Ftitle%20%3Fdescription%20%3Ftarget%20%3FrelatedTD%20%3FiriHref%20(group_concat(%3Ffile%3B%20separator%3D%27%2C%20%27)%20as%20%3Ffiles)%20WHERE%20%7B%0A%20%20%20%20%3Ftd%20a%20facility%3AElement%20.%0A%20%20%20%20%3Ftd%20td%3Atitle%20%3Ftitle%20.%0A%20%20%20%20%3Ftd%20td%3Adescription%20%3Fdescription%20.%0A%20%20%20%20%3Ftd%20td%3AhasPropertyAffordance%20%3Fproperty%20.%0A%20%20%20%20%3Ftd%20td%3AhasPropertyAffordance%20%3Fproperty2%20.%0A%20%20%20%20%3Fproperty%20td%3Aname%20%27platform%3AhasIRI%27%20.%0A%20%20%20%20%3Fproperty%20td%3AhasForm%20%3Fform%20.%0A%20%20%20%20%3Fform%20hctl%3AhasTarget%20%3Ftarget%20.%0A%20%20%20%20%3Fproperty2%20td%3Aname%20%27platform%3AhasFileURL%27%20.%0A%20%20%20%20%3Fproperty2%20td%3AhasForm%20%3Fform2%20.%0A%20%20%20%20%3Fform2%20hctl%3AhasTarget%20%3Ftarget2%20.%0A%20%20%20%20%3Fform2%20hctl%3AhintsAtMediaType%20%3Ftype%20.%0A%20%20%20%20%3Ftd%20td%3AhasLink%20%3Flink%20.%0A%20%20%20%20%3Flink%20hctl%3AhasTarget%20%3FrelatedTD%20.%0A%20%20%20%20BIND(URI(%3FrelatedTD)%20AS%20%3FprojectTD)%20.%0A%20%20%20%20%3FprojectTD%20td%3AhasPropertyAffordance%20%3FprojProp%20.%0A%20%20%20%20%3FprojProp%20td%3Aname%20%27platform%3AhasIRI%27%20.%0A%20%20%20%20%3FprojProp%20td%3AhasForm%20%3FprojForm%20.%0A%20%20%20%20%3FprojForm%20hctl%3AhasTarget%20%3FiriHref%20.%0A%20%20%20%20BIND(%3Chttps%3A%2F%2Fdata.cogito.iot.linkeddata.es%2Ftdd%2Fapi%2Fthings%2F55546fd7-5958-45fd-830d-bd73d3cff266%3E%20AS%20%3FbindProjTD)%20.%0A%20%20%20%20BIND(CONCAT(STR(%3Ftarget2)%2C%20%27%20-%20%27%2C%20%3Ftype)%20AS%20%3Ffile).%0A%20%20%20%20FILTER(%3FprojectTD%20%3D%20%3FbindProjTD)%0A%7D%20GROUP%20BY%20%3Ftd%20%3Ftitle%20%3Fdescription%20%3Ftarget%20%3FrelatedTD%20%3FiriHref%0ALIMIT%2015%0A"

var elements_url_murcia = "https://data.cogito.iot.linkeddata.es/tdd/api/search/sparql?query=" + elements_query_murcia;

$(document).ready(function () {
    var request = new XMLHttpRequest();
    request.open("POST", url_murcia);
    request.onload = function () {
        if (request.status === 200) {
            events = JSON.parse(request.responseText);
            head = events.head;
            results = events.results.bindings;
            for (var i = 0; i < results.length; i++) {
                // console.log(results[i]);
                $("#eventList3").append(createListElementForEvent2(i, "Project"));
                // alert(td_url)
                // render_td(td_url, class_id);
            }
            if (events.length > 0) {
                console.log("refreshing table");
            } else {
                console.log("Error");
            }
        } else {
            console.log("Error loading groups: " + request.status + " - " + request.statusText);
        }
    };
    request.send(null);
});

$(document).ready(function () {
    var request = new XMLHttpRequest();
    request.open("POST", elements_url_murcia);
    request.onload = function () {
        if (request.status === 200) {
            events = JSON.parse(request.responseText);
            head = events.head;
            results = events.results.bindings;
            for (var i = 0; i < results.length; i++) {
                // console.log(results[i]);
                $("#eventList4").append(createListElementForEvent2(i, "Element"));
                // render_td(td_url, class_id);
            }
            if (events.length > 0) {
                console.log("refreshing table");
            } else {
                console.log("Error");
            }
        } else {
            console.log("Error loading groups: " + request.status + " - " + request.statusText);
        }
    };
    request.send(null);
});



function createListElementForEvent2(resultsIndex, type) {
    
    if (type === "Project"){
        res = fillProjectTable2(results[resultsIndex]);
    }
    if (type === "Element"){
        res = fillElementsTable2(results[resultsIndex]);
    }

    return res;
} 


function fillProjectTable2(td){
    var dt_identifier = $("<td>").html("<span><a href='" + td.iriHref.value.replace("https://data.cogito.iot.linkeddata.es/resources/", "https://data.cogito.iot.linkeddata.es/enriched/") +  "' target='_blank'>" + td.title.value + "</span></a>");
    var description = $("<td>").text(td.description.value);
    var final_files = "";
    for (var elem of td.relations.value.split(', ')) {
        elem = elem.split(" - ");
        if (elem[0] == "construction"){ elem[0] = "IFC" }
        final_files += "<span><a href='" + elem[1] + "'>" + elem[0].replace("platform:", "").charAt(0).toUpperCase() + elem[0].replace("platform:", "").slice(1) + "</span></a>" + "<br>";
    }
    var relations = $("<td>").html(final_files);
    var td_link = $("<td>").html("<span><a href='" + td.td.value + "'>" + td.td.value + "</span></a>" + "<br>");
    return $("<tr>").append(dt_identifier).append(description).append(relations).append(td_link);
}

function fillElementsTable2(td){
    var dt_identifier = $("<td>").html("<span><a href='" + td.target.value +  "'>" + td.title.value + "</span></a>");
    var description = $("<td>").text(td.description.value);

    var relatedProjectTD = $("<td>").html("<span><a href='" + td.relatedTD.value +  "'> Related Project TD Link </span></a>");
    var relatedProjectKGURI = $("<td>").html("<span><a href='" + td.iriHref.value +  "'> Related Project KG URI </span></a>");
    var final_files = "";
    for (var elem of td.files.value.split(', ')) {
        elem = elem.split(" - ");
        if (elem[1] == "construction"){ elem[1] = "Belongs To IFC File: " } else { elem[1] = "Has Image: " }
        final_files += "<span>" + elem[1] + "<a href='" + elem[0] + "'>Link</span></a>" + "<br>";
    }
    var files = $("<td>").html(final_files);
    
    var td_link = $("<td>").html("<span><a href='" + td.td.value + "'>" + td.td.value + "</span></a>" + "<br>");

    return $("<tr>").append(dt_identifier).append(description).append(relatedProjectTD).append(relatedProjectKGURI).append(files).append(td_link);
}
