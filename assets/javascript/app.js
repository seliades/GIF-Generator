var muppets = ["Cookie Monster", "Fozzy Bear", "Elmo", "Oscar the Grouch", "Kermit the Frog", "Gonzo", "Miss Piggy", "Grover", "Statler and Waldorf", "Bert and Ernie"];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderButtons() {
    for (var i = 0; i < muppets.length; i++) {
        var a = $("<button>");
        a.addClass("muppet");
        a.attr("data-name", muppets[i]);
        a.text(muppets[i]);
        $("#buttons").append(a);
    }
}
renderButtons();

$("#add-muppet").on("click", function (event) {
    event.preventDefault();
    var muppet = $("#muppet-input").val().trim();
    muppets.push(muppet);
    console.log(muppets);
    $("#buttons").empty();
    renderButtons();
    $("#muppet-input").val("");
});

$("body").on("click", ".muppet", function () {
    var muppet2 = $(this).attr("data-name");
    console.log(muppet2);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        muppet2.split(' ').join('%20') + "&api_key=wau4sqWaddH5GCQRp2uEYDISN9tXzgMB&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");

            var p = $("<h5>").text("Title: " + results[i].title);
            var muppetImage = $("<img>");
            var q = $("<p>").text("Rating: " + results[i].rating);
            muppetImage.attr("src", results[i].images.fixed_height_still.url);
            muppetImage.attr("data-still", results[i].images.fixed_height_still.url);
            muppetImage.attr("data-animate", results[i].images.fixed_height.url);
            muppetImage.addClass("starter");
            muppetImage.attr("data-state", "still");

            gifDiv.append(p);
            gifDiv.append(muppetImage);
            gifDiv.append(q);
            gifDiv.addClass("holder");

            $("#gifs").prepend(gifDiv);
        }
    });
})

$("body").on("click", ".starter", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});


