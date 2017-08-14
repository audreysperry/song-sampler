let $ = require('jquery');
let handlebars = require('handlebars');

let $searchButton = $('.js-search-button');
let $termInput = $('.js-button-input');
let $choseSong = $('.results-container');

let searchTerm;
let trackPlay;
let entityValue;


let apiUrl = 'https://itunes.apple.com/search?term=';


$searchButton.on('click', function(e) {
  e.preventDefault();

  let $entityInput = $(".search-type:checked");

  entityValue = $entityInput.val();
  searchTerm = $termInput.val();
  $('.results-container').empty();
  fetchData(searchTerm, entityValue);

})

function fetchData(searchTerm, entityValue) {
  let searchUrl = apiUrl + encodeURI(searchTerm) + "&entity=" + entityValue + "&limit=24";
  fetch(searchUrl).then(function(res) {
    return res.json();
  }).then(start);

}


function start(data) {
  let itunesResults = data.results;
  displayTracks(itunesResults);
}

function displayTracks(itunesResults) {
  let source = $('#results-template').html();
  let template = handlebars.compile(source);

  itunesResults.forEach(function(song) {
    let $songHtml = $(template(song));
    $songHtml.find('.track').data('song', song);
    $('.results-container').append($songHtml);

  })
}

$choseSong.on('click', '.track', function(e) {
  let $trackPlay = $(e.target);
  let song = $trackPlay.data('song');
  console.log(song);
  if (song.kind === "song") {
    $('.js-track-player').attr('src', song.previewUrl);
  } else if (song.kind === "music-video")
    $('.js-video-player').attr('src', song.previewUrl);
})
