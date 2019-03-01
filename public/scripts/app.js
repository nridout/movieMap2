
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



  // EDIT MAP BUTTON
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

  // NEW LOCATION
  $(".marker-maker").hide();
  // Toggle New Marker
  $(".new-location").click(function () {
    if ($(".marker-maker").is(":hidden")) {
      $(".marker-maker").slideDown("fast");
      $(".google-map-container").removeAttr('id');
      $(".location-list-container").hide();
    } else {
      $(".marker-maker").slideUp("fast");
      $(".google-map-container").attr("id", "fullsize")
    }
  });

  // SHOW LOCATION LIST
  $(".location-list-container").hide();
  // Toggle New Marker
  $(".location-list").click(function () {
    if ($(".location-list-container").is(":hidden")) {
      $(".location-list-container").slideDown("fast");
      $(".google-map-container").removeAttr('id');
      $(".marker-maker").hide();
    } else {
      $(".location-list-container").slideUp("fast");
      $(".google-map-container").attr("id", "fullsize")
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



