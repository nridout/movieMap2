
// Function for AJAX
var handleFavourite = function (e) {
  e.preventDefault();

  var mapID = $(e.target).data().id;

  $.ajax(`/maps/${mapID}/favourite`, {method: "POST"})
  .then(function (data) {
    // if (data === "false", "true") {do something}
    return;
  });
};

var handleUnfavourite = function (e) {
  e.preventDefault();
  console.log('hey');
  var mapID = $(e.target).data().id;

  $.ajax(`/maps/${mapID}/favourite`, {method: "DELETE"})
  .then(function (data) {
    // if (data === "false", "true") {do something}
    return;
  });
};

$(document).ready(function () {
  $("body").on("click", ".fav-button", handleFavourite);
  $("body").on("click", ".unfav-button", handleUnfavourite);
});


// has to remove this
// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
