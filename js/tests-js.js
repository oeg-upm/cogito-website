function removeCheck(id) {
    $('#notmatch').html('');
    $('#test').val('');
    $('#'+id).remove();
    if($('#storedtests').html().trim().length == 0) {
        $('#checksuite').attr("disabled", true);

    }
}

function removeAll(id) {

    var labels = document.getElementsByName("testlabel");
    var report = document.getElementsByName("report");
    report.forEach(function (item) {
        item.style.visibility = 'hidden';
    });

    var len = labels.length;
    parentNode = labels[0].parentNode;
    for(var i=0; i<len; i++)
    {
        parentNode.removeChild(labels[0]);
    }

    var remove = document.getElementById("removeall");
    remove.remove();
    $('#checksuite').attr("disabled", true);

}

function  add() {

    var removeall=document.getElementById("removeall");
    if(removeall!=null) {
        removeall.remove();
    }
    $('#notmatch').html("");

    var idrandom = Math.random().toString(36).substring(7);
    var labels = document.getElementsByName("testlabel");
    var test = $("#test").val();

    $.ajax({
        type: 'GET',
        data: {test: JSON.stringify($('#test').val())},
        dataType: "json",
        url: 'http://delta.iot.linkeddata.es/rest/tests/testscheck',
        success: function (data, textStatus, jqXHR) {
            if (data.length > 0) {
                $.each(data, function (i, item) {
                    if(item.Results.length>0){
                        if (labels.length == 0) {
                            var newtestbutton = " <button  id=\"" + idrandom + "\" class=\"label label-default\" name=\"testlabel\" value=\"" + test + "\" onclick=\"removeCheck('" + idrandom + "');\" style=\"font-size: 75%; font-weight: bold; line-height: 1; \"><span class=\"submit glyphicon glyphicon-remove\"></span>  1. " + test + "</button>\n";
                            $('#storedtests').append(newtestbutton);
                            if(labels.length>1){
                                var newtestbutton = " <button  id=\"removeall\" class=\"label label-default\" name=\"removeall\" value=\"removeAll\" onclick=\"removeAll('" + idrandom + "');\" style=\"font-size: 75%; font-weight: bold; line-height: 1; \"><span class=\"submit glyphicon glyphicon-remove\"></span>Remove all</button>\n";
                                $('#storedtests').append(newtestbutton);
                            }
                        } else {
                            var newtestbutton = " <button  id=\"" + idrandom + "\" class=\"label label-default\" name=\"testlabel\" value=\"" + test + "\" onclick=\"removeCheck('" + idrandom + "');\" style=\"font-size: 75%; font-weight: bold; line-height: 1; \"><span class=\"submit glyphicon glyphicon-remove\"></span> " + (labels.length + 1) + ". " + test + "</button>\n";
                            $('#storedtests').append(newtestbutton);
                        }
                        if(labels.length>1){
                            var newtestbutton = " <button  id=\"removeall\" class=\"label label-default\" name=\"removeall\" value=\"removeAll\" onclick=\"removeAll('" + idrandom + "');\" style=\"font-size: 75%; font-weight: bold; line-height: 1; \"><span class=\"submit glyphicon glyphicon-remove\"></span>Remove all</button>\n";
                            $('#storedtests').append(newtestbutton);
                        }

                        $('#checksuite').attr("disabled", false);

                    }else{
                        $('#notmatch').html("<p>This is not a test expression</p>");
                    }
                    $('#test').val('');
                });
            } else {
                $('#notmatch').html("<p>This is not a test expression</p>");
            }


        },
        error: function (ts) {
            $('#notmatch').html("<p>This is not a test expression</p>");
        }
    });



}

function check() {
    var empty=document.getElementById("empty");

    if(empty!= null){
        empty.remove();
    }

    $('#checktests').html("<div class=\"loader\">\n" +
        "                        <span></span>\n" +
        "                        <span></span>\n" +
        "                        <span></span>\n" +
        "                    </div>");
    $('#checktests').attr("disabled", true);


    $('#checktests').html("<div class=\"loader\">\n" +
        "                        <span></span>\n" +
        "                        <span></span>\n" +
        "                        <span></span>\n" +
        "                    </div>");
    $('#checktests').attr("disabled", true);
    $('#notmatch').html('');
    var array = $(this).serializeArray();
    var id = document.getElementById("test");
    if(id.value != "") {
        array.push(id.value);
       $.ajax({
            type: 'GET',
            data: {test: JSON.stringify(array)},
            dataType: "json",

            url: 'http://delta.iot.linkeddata.es/rest/tests/results/',
            //  url: 'delta.iot.linkeddata.es/rest/tests/results',
            success: function (data, textStatus, jqXHR) {

                if (data.length > 0) {
                    var table = document.getElementById("table");

                    $.each(data, function (i, item) {
                        var row = table.insertRow(1);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        cell1.innerHTML = "<div align=\"center\">"+item.Test+"</div>";
                        //var results = item.Results;
                        $.each(item.Results, function (j, results) {
                            //cell4.innerHTML = "<button type=\"button\" class=\"btn btn-default\" onclick=\"removeOntology(this)\" title=\"Remove test\"> <span class=\"submit glyphicon glyphicon-remove-sign\"    style =\"color:rgb(255, 0, 0)\"></span> </button>";
                            cell2.innerHTML = "<div align=\"center\">"+results.Ontology+"</div>";

                            if (results.Result == 'passed') {
                                cell3.innerHTML = "<div align=\"center\"><span align=\"center\" class=\"label label-success\" data-toggle=\"tooltip\" title=\"The ontology passed the test\">Passed</span></div>" ;
                            } else if (results.Result == 'undefined') {
                                var test = item.Test;
                                $.each(results.Undefined, function (j, undefined) {
                                    test = test.replace(undefined, "<span style=\"color:red;\">"+undefined+"</span>");
                                });
                                cell1.innerHTML = "<div align=\"center\">"+"<p name=\"testintable\">" + test + "</p></div>";
                                cell3.innerHTML = "<div align=\"center\"><span align=\"center\" class=\"label label-default \" data-toggle=\"tooltip\" title=\"The terms in the test are not defined in the ontology\">Undefined</span></div>";
                                // cell3.innerHTML = "<p>The terms in the test are not defined in the ontology</p>";
                            } else if (results.Result == 'absent') {
                                cell3.innerHTML = "<div align=\"center\"><span align=\"center\" class=\"label label-warning\" data-toggle=\"tooltip\" title=\"The ontology does not implement the requirement associated to the test\">Absent</span></div>";
                                // cell3.innerHTML =  "<p>The ontology does not implement the requirement associated to the test</p>";
                            } else {
                                cell3.innerHTML = "<div align=\"center\"><span align=\"center\" class=\"label label-danger\" data-toggle=\"tooltip\" title=\"The ontology has a relation which causes a conflict with the one define in the test\">Conflict</span></div>";
                                //cell3.innerHTML = "<p>The ontology has a relation which causes a conflict with the one define in the test</p>";
                            }
                            cell4.innerHTML = "<button type=\"button\" class=\"btn btn-default\" onclick=\"removeTest(this)\" title=\"Remove test\"> <span class=\"submit glyphicon glyphicon-remove-sign\"    style =\"color:rgb(255, 0, 0)\"></span> </button>";
                        });
                    });
                } else {

                    $('#notmatch').html("This is not a test expression");
                    $('#checktests').attr("disabled", false);
                    $('#checktests').html("Check test");
                    $('#' + idrandom).remove();

                }
                $('#checktests').html('Check test');
                $('#checktests').removeAttr("disabled");


            },
            error: function (ts) {
                $('#notmatch').html("Something went wrong");
                $('#' + idrandom).remove();
                $('#checktests').html('Check');
                $('#checktests').removeAttr("disabled");
            }
        });
    }else{
        $('#notmatch').html("There is no defined test");
        $('#checktests').attr("disabled", false);
        $('#checktests').html("Check test");
    }

}

function openTests() {
    window.open('tests-info.html', '_blank');
}



function  removeTest(btn) {

    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);

}