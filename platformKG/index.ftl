<!doctype html>
<html class="">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Table Example</title>
    <link href="boilerplate.css" rel="stylesheet" type="text/css">
    <link href="onzebuurt.css" rel="stylesheet" type="text/css">
    <style>

    </style>
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script type="text/javascript">
        var url = "https://data.cogito.iot.linkeddata.es/tdd/api/things/";
        var events = [];

        $(document).ready(function () {
            var request = new XMLHttpRequest();
            request.open("GET", url);
            request.onload = function () {
                if (request.status === 200) {
                    events = JSON.parse(request.responseText);
                    for (var i = 0; i < events.length; i++) {
                        $("#eventList").append(createListElementForEvent(i));
                    }
                    if (events.length > 0) {
                        $("#eventList").listview('refresh');
                    } else {
                        console.log("Error");
                    }
                } else {
                    //alert("fout gegaan");
                    console.log("Error loading groups: " + request.status + " - " + request.statusText);
                }
            };
            request.send(null);
        });

        function createListElementForEvent(eventIndex) {

            var properties = Object.keys(events[eventIndex].properties).length;
            var links = Object.keys(events[eventIndex].properties).length;

            var identifier = $("<td>").text(events[eventIndex].id);

            var properties_string = "";
            for (var i = 0; i < properties; i++) {
                properties_string += Object.keys(events[eventIndex].properties)[i] + ": " + "<span><a href='" + Object.values(events[eventIndex].properties)[i].forms[0].href + "'>" + Object.values(events[eventIndex].properties)[i].forms[0].href + "</span></a>" + "<br>";
            }
            console.log(properties_string)
            var properties_info = $("<td>").html(properties_string);
            var special_info = $("<td>").text(events[eventIndex].description);
            var thing_description = $("<td>").text("http://data.cogito.iot.linkeddata.es/api/things/" + events[eventIndex].id);

            return $("<tr>").append(identifier).append(properties_info).append(special_info).append(thing_description);
        } 
    </script>

</head>
<body>

    <div class="tabelEvents">
        <table id="eventList" class="tabel" border="1">
            <tr>
                <th>Identifier</th>
                <th>Info</th>
                <th>Special Info</th>
                <th>Thing Description</th>
            </tr>
        </table>
    </div>

</body>

</html>