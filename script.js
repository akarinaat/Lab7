$(document).ready(function() {

var animals = ["dog", "cat", "rabbit","horse", "elephant","mouse","turtle", "goat", "chicken"];

function populateButtons(array){

    $("#animal-buttons").empty();
    array.forEach(element => {
        var a = $("<button>");
        a.text(element);
        // a.text("dog");
        a.addClass("animal-button");
        a.attr("data-type", element);
        $("#animal-buttons").append(a);

    });
}

// registrar el evento
$("#animal-buttons").on("click", ".animal-button", function()
{

    alert("ya entre");
    //para que si elijo perro y luego gato que entocnes borre perro para mostrar gato
$("#animals").empty();

    // quién me está haciendo click
    // para el boton que le estoy dando click, dame su data-type, y ese será el type.
    var type = $(this).attr("data-type");

    // ahorita que tengo mi llave, se la pongo, y esta es la url que sale cuando le poco en cada boton
    //la url me la da la documentación de giphy

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=HWR8HIEMPtYcrSodMl1ejjw3MRe5nhMJ&limit=10";

    $.ajax ({

        url: queryURL,
        method: "GET"
    })
// termina ajax
// Empieza promesa
.then(function(response){
    console.log(response);
    response.data.forEach(gif => {

        var animalDiv = $(`<div class = 'animal-item'>`);
        var rating = gif.rating;
        var p = $("<p>").text("rating: " + rating);

        var animated = gif.images.fixed_height.url;
        var still = gif.images.fixed_height_still.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still",still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);


    })

console.log(response);

})


})

// esto de aqui abajo es una funcoin compoleta pero agregando el elemento al que se la vamos a implementar
$("#animals").on("click", ".animal-image", function(){

    // aqui es para entrar para cuando se le da click a la imagen

    var state = $(this).attr("data-state");

    if(state === "still"){

        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    }else{

        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }


});


$("#add-animal").on("click", function(e){
    //esto es para no recargar la página
    e.preventDefault();

    //.val con jqyery y .value con js
    var newItem = $("input").val();
    animals.push(newItem);
    populateButtons(animals);



});

populateButtons(animals);


});
