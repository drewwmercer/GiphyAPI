$(document).ready(function() {
  var searchGifs = {
    topics: [
      "javascript",
      "mac",
      "startup",
      "laptop",
      "classroom",
      "rubber duck",
      "homework",
      "twitter",
      "silicon valley",
      "unicorn"
    ],
    createButtons: function() {
      for (var i = 0; i < searchGifs.topics.length; i++) {
        var newBttn = $("<button>");
        newBttn.attr("data-search", searchGifs.topics[i]);
        newBttn.addClass("btn btn-warning");
        newBttn.addClass("searchButtons");
        newBttn.text(searchGifs.topics[i]);
        $("#searchButtonsContainer").append(newBttn);
      }
    },
    addtopics: function(e) {
      e.preventDefault();
      var userTerm = $("#submitBox").val();

      if (searchGifs.topics.indexOf(userTerm) < 0 && userTerm.length > 0) {
        searchGifs.topics.push(userTerm);
        var newBttn = $("<button>");
        newBttn.attr("data-search", userTerm);
        newBttn.addClass("btn btn-warning");
        newBttn.addClass("searchButtons");
        newBttn.text(userTerm);
        $("#searchButtonsContainer").append(newBttn);
      }
    },
    displayResults: function(e) {
      $("#displayPanel").empty();
      e.preventDefault();

      var userQuery = $(this).data("search");
      var key = "&api_key=e8c2a36d8d7742a49afbdad19c2e43ac";
      var limit = "&limit=10";
      var reqUrl =
        "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;
      $.ajax({
        url: reqUrl,
        method: "GET"
      }).done(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          var gifContain = $("<div>");
          gifContain.addClass("gifContainer");
          var animateLink = response.data[i].images["fixed_height"].url;
          var stillLink = response.data[i].images["fixed_height_still"].url;
          var rating = response.data[i].rating;
          console.log(rating);
          var ratingSpan = $("<p>");
          ratingSpan.addClass("gifRating");
          ratingSpan.text("Rating: " + rating);
          var newImg = $("<img>");
          newImg.attr("src", stillLink);
          newImg.attr("data-animate", animateLink);
          newImg.attr("data-still", stillLink);
          newImg.attr("data-state", "still");
          newImg.addClass("gif");
          gifContain.append(ratingSpan);
          gifContain.prepend(newImg);

          $("#displayPanel").append(gifContain);
        }

        $(".gif").on("click", function() {
          var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
          }
        });
      });
    }
  };
  searchGifs.createButtons();

  $("#submitTerm").click(searchGifs.addtopics);
  $(document).on("click", ".searchButtons", searchGifs.displayResults);
});
