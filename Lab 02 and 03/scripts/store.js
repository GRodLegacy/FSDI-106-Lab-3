var serverURL = 'http://restclass.azurewebsites.net';

// the items catalog to display on the store
// populate the array with the info from the server
var items = [{
    title: "Keyboard",
    description: "Superb mechanical keyboard",
    price: "34.89",
    category: "Keyboards",
    image: "/images/k1.png"
}, 
{
    title: "Mouse",
    description: "Ambidextrous mouse",
    price: "24.99",
    category: "Mice",
    image: "/images/m1.jpg"

},
{
    title: "Headphones",
    description: "Nice Astro headphones with sorround sound",
    price: "199.99",
    category: "Headphones",
    image: "/images/h1.jpg"
},
{
    title: "Laptop",
    description: "Amazing gaming laptop than can run any game in 4k at 120fps and 200hz",
    price: "1949.99",
    category: "Laptops",
    image: "/images/l1.jpg"
},
{
    title: "Laptop Bag",
    description: "Good smelling leather laptop bag",
    price: "49.99",
    category: "Bag",
    image: "/images/b1.jpg"
}


];


function displayCatalog() {
    // travel the array, and display each item on the page
    var divContainer = $('#catalog');
    
    for(var i=0; i < items.length; i) {
        var item = items[i];

        var syntax = 
        `<div class ='item'>
            <img src='${item.image}'>
            <h5>${item.title}</h5>
            <label>${item.description}</label>
            <h6>${item.price}</h6>
            <button> Add to Cart </button>
        </div>  `;
        
        console.log(syntax);
        divContainer.append(syntax);

        
    }
}

function search() {
    var text = $("#txtSearch").val();
    console.log("Searching for: " + text);

    // clear previous results
    $("#catalog").html("");

    // check on each product
    //if the title or the description
    // contains the search text

    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        var lowerTitle = item.title.toLowerCase();
        var lowerSearch = text.toLowerCase();

        if (item.title.indexOf(text) >= 0){
             //text its on the title
            displayProduct(item);
        }
    }
}

function importCatalog() {
    //perform a GET request to /API/points
    console.log('Communication has begun ');
    $.ajax({
        url: serverURL + '/API/points',
        type: 'GET',
        success: function (res) { // <- response: the server response

            // adding all the products

            /*

            for each product on the response
            check iF the product user is equal to your name
            if yes, push the product on the items array
            */

            for (var i = 0; i < res.length; i++) {
                var p = res[i]; 
                if (p.user == "Victor") {
                    item.push(p);
                }
            }
            // add only my products
            console.log('Communication has ended!!');
            console.log("Data", res);
            items = res; // put data on the array, so it can be shown
        },
        error: function (error) {
            console.log('** ERROR: ', error);
        }



    });
}



function init() {
    console.log('Project started');

    //click event to search button
    $('#btnSearch').click(search);
    // even of the ENTER key of the field
    $('#txtSearch').keyPress(function(arg) {
        if (arg.key == 'Enter') {
            search();
        }
    });

    importCatalog(); // get data from server
    displayCatalog();


}



window.onload = init;