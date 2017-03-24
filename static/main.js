
    var request = new XMLHttpRequest();
    request.open('GET', 'http://swapi.co/api/planets/', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            var planets = data['results'];
            function CheckResidents(i){
                if (planets[i].residents.length === 0){
                    return 'No known residents';
                }else{
                    return '<button>' +  planets[i].residents.length + ' residents </button>'
                    }
                };
            for (var i = 0; i < planets.length; i++) {
                $("#planetdata").append(
                    '<tr><td>' + planets[i].name + '</td>' +
                    '<td>' + planets[i].diameter / 1000 + ' km </td>' +
                    '<td>' + planets[i].climate + '</td>' +
                    '<td>' + planets[i].terrain + '</td>' +
                    '<td>' + planets[i].surface_water + ' % </td>' +
                    '<td>' + planets[i].population + '</td>' +
                    '<td>' + CheckResidents(i) + '</td></tr>'
            )}
        }
    };

    request.send();