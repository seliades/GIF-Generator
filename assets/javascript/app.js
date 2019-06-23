var muppets = ["Cookie Monster", "Fozzy Bear", "Elmo", "Oscar the Grouch", "Kermit the Frog", "Big Bird", "Miss Piggy", "Grover", "Statler and Waldorf", "Bert and Ernie"];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderButtons() {
    $("#buttons").empty();
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
    renderButtons();
    $("#muppet-input").val("");
});

$(".muppet").on("click", function () {
    var muppet = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        muppet + "&api_key=wau4sqWaddH5GCQRp2uEYDISN9tXzgMB&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);
        console.log(response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var muppetImage = $("<img>");
            muppetImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(muppetImage);

            $("#gifs").prepend(gifDiv);
        }
    });
})
