$(document).ready(function () {
  $("body").on("click", ".fav-button", handleFavourite);
  $("body").on("click", ".unfav-button", handleUnfavourite);

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

  $( "#markerMaker" ).submit(function( event ) {

    event.preventDefault();
    var $form = $('#markerMaker');
    var formData = $($form).serialize();

    console.log("this is form: ", formData)

    $.ajax({
      type: "POST",
      url: $(location).attr("href")+'/points',
      data: formData,
    })
    .done(function(response) {
      $('#markerName').val('');
      $('#markerLocation').val('');
      $('#markerImage').val('');
      $('#markerDetails').val('');
      location.reload();
    })
    .fail(function(data){
      console.log("failure in ajax")
    })


  });
});
