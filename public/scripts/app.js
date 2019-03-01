
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
  $("body").on("click", ".fav-button", handleFavourite);
  $("body").on("click", ".unfav-button", handleUnfavourite);

  // EDIT MAP BUTTON
  // Hide on load
  $(".update-map-container").hide();
  // Toggle Edit form
  $("#edit-map").click(function () {
    if ($(".update-map-container").is(":hidden")) {
      $(".update-map-container").slideDown("fast");
      $("#update-name").focus();
    } else {
      $(".update-map-container").slideUp("fast");
    }
  });

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



