//function to get movie name
function getMovieDetails(movie) {
    console.log('function check')
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "http://www.omdbapi.com/?t=" + movie + "&apikey=cb3b5a4c")
    xhr.send();
    xhr.onload = function() {
        console.log('check onload');
        if (xhr.status == 200) {
            var keep = JSON.parse(xhr.response);
            if (keep.Response == 'True') {
                console.log(xhr.response)
                displayData(xhr.response);
            } else {
                alert(keep.Error)
            }

        } else {
            console.log("error encountered", xhr.status)
            var keep = JSON.parse(xhr.status);
            console.log(keep.Error)
        }
    }
    console.log('function end')
}

//click event on search key
$('#search_movie').click(function() {
    var movie_name = $('#movie_title').val();
    // alert(movie_name);
    console.log('movie ', movie_name)
    getMovieDetails(movie_name);
});


//function to display movie details
function displayData(data) {
    var obj = JSON.parse(data);
    console.log(obj)


    //appending image
    data = document.querySelectorAll('.data');
    for (var i = 0; i < data.length; i++) {
        data[i].remove();
    }

    var img = document.createElement('img');
    img.setAttribute('src', obj.Poster);
    img.setAttribute('class', 'data')
    console.log("link ", obj.Poster)
    $('#poster').append(img);

    for (key in obj) {

        switch (key) {
            case 'Title':
                var h2 = document.createElement('h2');
                h2.textContent = key + " : " + obj[key];
                h2.setAttribute('class', 'data')
                $('.cont1').append(h2);
                console.log(key + " : " + obj[key])
                break;
            case 'Released':
            case 'Runtime':
            case 'Genre':
                var div = document.createElement('div');
                div.textContent = key + " : " + obj[key];
                div.setAttribute('class', 'data');
                $('.cont2').append(div);
                break;
            case 'Director':
            case 'Writer':
                var div = document.createElement('div');
                div.textContent = key + " : " + obj[key];
                div.setAttribute('class', 'data');
                $('.cont3').append(div);
                break;
            case 'Actors':
                var div = document.createElement('div');
                div.textContent = key + " : " + obj[key];
                div.setAttribute('class', 'data');
                $('.cont4').append(div);
                break;
            case 'Plot':
                var div = document.createElement('div');
                div.textContent = key + " : " + obj[key];
                div.setAttribute('class', 'data');
                $('.cont5').append(div);
                break;
            case 'imdbRating':
                var div = document.createElement('div');
                div.textContent = key + " : " + obj[key];
                div.setAttribute('class', 'data');
                $('.cont6').append(div);
                break;
            case 'Language':
                var div = document.createElement('div');
                div.textContent = key + " : " + obj[key];
                div.setAttribute('class', 'data');
                $('.cont7').append(div);
                break;
        }
    }
}


//function on giving grid of series
$('#search-multiple').click(function() {
    var movie = $('#movie_title').val()
    displayGrid(movie);
})


function displayGrid(data) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://www.omdbapi.com/?s=' + data + '&apikey=cb3b5a4c');
    xhr.send();

    xhr.onload = function() {
        if (xhr.status == 200) {
            appendGrid(xhr.response);
        } else {
            console.log("error encountered", xhr.status)
        }
    }
}


function appendGrid(data) {

    //remove previous data
    var elements = document.querySelectorAll('.card-ele');
    for (var i = 0; i < elements.length; i++) {
        console.log('work-check')
        elements[i].remove();
    }

    console.log(elements.length)

    series = JSON.parse(data);
    // console.log(series)
    var allEle = series.Search;
    for (i = 0; i < allEle.length; i++) {
        // console.log(allEle[i])
        var div = document.createElement('div');
        div.setAttribute('class', 'card card-ele');
        var img = document.createElement('img');
        img.setAttribute('src', allEle[i].Poster);
        img.setAttribute('class', 'card-img-top')
        div.append(img);
        var body = document.createElement('div');
        var h5 = document.createElement('h5');
        h5.textContent = allEle[i].Title
        var year = document.createElement('p');
        year.textContent = allEle[i].Year;
        var a = document.createElement('a');
        a.setAttribute('class', 'btn btn-primary details');
        a.setAttribute('href', '#accordionExample');

        a.textContent = 'More Details';
        a.setAttribute('idx', i)

        // var slide = document.createElement('a');
        // slide.textContent = '^'
        // slide.setAttribute('href', '#accordionExample');
        // slide.setAttribute('class', 'btn btn-warning');

        a.addEventListener('click', function() {
            var index = Number(this.getAttribute('idx'));
            getMovieDetails(allEle[index].Title);

        });
        body.append(h5)
        body.append(year)
        body.append(a)
            // body.append(slide)
        div.append(body)
        $('#grid').append(div);
    }
}