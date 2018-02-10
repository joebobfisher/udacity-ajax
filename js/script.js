
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'&key=AIzaSyAogT6qF8foBqImJlu5NYdwWcmBUjF8ga0">')

    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f4a21a9e6af743e8af51eb60b31f67d2';
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
    return false;
};

$('#form-container').submit(loadData);
