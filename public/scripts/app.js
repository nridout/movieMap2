
// Function for AJAX
var handleFavourite = function (e) {
  e.preventDefault();

  var mapID = $(e.target).data().id;

  if ($(e.target).hasClass("not-fav")) {
    $.ajax(`/maps/${mapID}/favourite`, {method: "POST"})
    .then(function (data) {
      // if (data === "false", "true") {do something}
      $(e.target).removeClass("not-fav");
      $(e.target).text("Unfavourite");
      return;
    });
  } else {
    $.ajax(`/maps/${mapID}/favourite`, {method: "DELETE"})
    .then(function (data) {
      // if (data === "false", "true") {do something}
      $(e.target).addClass("not-fav");
      $(e.target).text("Favourite");
      return;
    });
  }


};

var handleUnfavourite = function (e) {
  e.preventDefault();
  var mapID = $(e.target).data().id;

  $.ajax(`/maps/${mapID}/favourite`, {method: "DELETE"})
  .then(function (data) {
    // if (data === "false", "true") {do something}
    return;
  });
};

$(document).ready(function () {

  $.ajax({
    method: "GET",
    url: `${$(location).attr("href")}/favourite`
  })
  .then(function (data) {
    if (data === "true") {
      $(".fav-button").removeClass("not-fav");
      $(".fav-button").text("Unfavourite");
    }
  });

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
