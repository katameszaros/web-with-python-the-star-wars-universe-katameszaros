function loadPlanetPageData(urlOfPage) {
    var request = new XMLHttpRequest();
    request.open('GET', urlOfPage, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.responseText);
            var planets = data['results'];

            bindNavButton("#next", data.next);
            bindNavButton("#previous", data.previous);
            bindPlanetTable(planets);

            $('.get_people_data').click(function () {
                clearResidentData();
                var planet = planets[parseInt(this.id)];
                loadResidentData(planet);
                bindModalTitle(planet.name);
            });
        }
    };

    request.send();
}

function bindNavButton(buttonSelector, data) {
    $(buttonSelector).unbind();
    if (data !== null) {
        $(buttonSelector).prop("disabled", false);
        $(buttonSelector).click(function () {
            $(".planet_data").remove();
            loadPlanetPageData(data);
        });
    } else {
        $(buttonSelector).prop("disabled", true);
    }
}

function bindPlanetTable(planets) {
    for (var i = 0; i < planets.length; i++) {
        $("#planetdata").append(
            '<tr class="planet_data"><td>' + planets[i].name + '</td>' +
            '<td>' + checkIfNumeric(planets[i].diameter / 1000, " km") + '</td>' +
            '<td>' + planets[i].climate + '</td>' +
            '<td>' + planets[i].terrain + '</td>' +
            '<td>' + checkIfNumeric(planets[i].surface_water, " %") + '</td>' +
            '<td>' + checkIfNumeric(planets[i].population, " people") + '</td>' +
            '<td>' + checkResidents(planets[i], i) + '</td></tr>'
        )
    }
}

function bindLineOfIndividual(people_data) {
    $("#peopledata").append(
        '<tr class="individual_data"><td>' + people_data.name + '</td>' +
        '<td>' + people_data.height / 100 + ' m</td>' +
        '<td>' + checkIfNumeric(people_data.mass, " kg") + '</td>' +
        '<td>' + people_data.skin_color + '</td>' +
        '<td>' + checkIfNone(people_data.hair_color) + '</td>' +
        '<td>' + people_data.birth_year + '</td>' +
        '<td>' + people_data.gender + '</td></tr>'
    );
}


function clearResidentData() {
    $('.modal-title').remove();
    $('.individual_data').remove();
}


function loadResidentData(planet) {
    for (var j = 0; j < planet.residents.length; j++) {
        var request_for_people = new XMLHttpRequest();
        request_for_people.open('GET', planet.residents[j], true);
        request_for_people.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                var people_data = JSON.parse(this.responseText);
                bindLineOfIndividual(people_data);
            }
        };
        request_for_people.send();
    }
}

function bindModalTitle(planet_name) {
    $('.modal-header').append(
        '<h4 class="modal-title"> Residents of ' + planet_name + '</h4>'
    );
}


function formatNumber(x) {
    if (isNaN(x))return "";
    n = x.toString().split('.');
    return n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (n.length > 1 ? "." + n[1] : "");
}


function checkResidents(planet, index) {
    if (planet.residents.length === 0) {
        return 'No known residents';
    } else {
        return '<button id=' + index + ' class = "get_people_data" type="button" data-toggle="modal" data-target="#myModal">' + planet.residents.length + ' residents </button>'
    }
}

function checkIfNone(data) {
    if (data === "none") {
        return "unknown";
    } else {
        return data;
    }
}

function checkIfNumeric(data, addOn) {
    if ($.isNumeric(data)) {
        return formatNumber(data) + addOn;
    } else {
        return "unknown";
    }
}


loadPlanetPageData('http://swapi.co/api/planets/');
