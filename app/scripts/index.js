let $ = require('jquery');
let handlebars = require('handlebars');
let $musicVideoSearchButton = $('.js-musicvideo-search-button');
let $musicVideoSearchTerm = $('.js-musicvideo-button-input');
let $songSearchButton = $('.js-song-search-button');
let $songTermInput = $('.js-song-button-input');
let $choseSong = $('.results-container');

let searchTerm;
let trackPlay;
let entityValue;


let apiUrl = 'https://itunes.apple.com/search?term=';

//song & artist search buttons
$songSearchButton.on('click', function(e) {
  e.preventDefault();

  entityValue = "musicTrack";
  searchTerm = $songTermInput.val();
  $('.results-container').empty();
  fetchData(searchTerm, entityValue);

})

// music video search button
$musicVideoSearchButton.on('click', function(e) {
  e.preventDefault();

  entityValue = "musicVideo";
  searchTerm = $musicVideoSearchTerm.val();
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

  } else if (song.kind === "music-video") {
    $('.js-video-player').attr('src', song.previewUrl);
  }
  let $musicPlayer = $('.music-player');
  console.log($musicPlayer);
  $musicPlayer.get(0).style.display = "block";
  $musicPlayer.get(0).style.visibility = "visible";
});
