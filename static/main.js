
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
                    return '<button id=' +i +' type="button" data-toggle="modal" data-target="#myModal">' +  planets[i].residents.length + ' residents </button>'
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
            $('button').click(function(){
                for (var i = 0; i < planets.length; i++) {
                    if (parseInt(this.id) === i){
                        for (var j = 0; j < planets[i].residents.length; j++) {
                            console.log(planets[i].residents[j]);
                                var request_for_people = new XMLHttpRequest();
                                request_for_people.open('GET', planets[i].residents[j], true);
                                request_for_people.onload = function () {
                                if (request_for_people.status >= 200 && request_for_people.status < 400) {
                                    var people_data = JSON.parse(request_for_people.responseText);
                                    console.log(people_data);
                                    $("#peopledata").append(
                                        '<tr class="individual_data"><td>' + people_data.name + '</td>' +
                                        '<td>' + people_data.height + '</td>' +
                                        '<td>' + people_data.mass + '</td>' +
                                        '<td>' + people_data.skin_color + '</td>'+
                                        '<td>' + people_data.hair_color + '</td>'+
                                        '<td>' + people_data.birth_year + '</td>'+
                                        '<td>' + people_data.gender + '</td></tr>'
                                    )

                                }
                            };

                        };

                        request_for_people.send();


                        $('.modal-header').append(
                            '<h4 class="modal-title"> Residents of ' + planets[i].name + '</h4>'
                        )

                    }
                }
            });

            $('#close_modal').click(function(){
                $('.modal-title').remove();
                $('.individual_data').remove();
            });
        };
    };

    request.send();