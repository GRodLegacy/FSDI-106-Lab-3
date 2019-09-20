
var serverURL = 'http://restclass.azurewebsites.net';

//Object constructor
function Item(title, description, price, category, image) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
    this.user = "Victor Gonzalez Rodriguez"; 
}


function register() {
    console.log('Creating new products');

    var title = $('#txtTitle').val();
    var desc = $('#txtDescription').val();
    var price = $('#txtPrice').val();
    var category = $('#txtCategory').val();
    var image = $('#txtImage').val();

    var anItem = new Item(title, desc, price, category, image);
    console.log(anItem);

    // send the object to the server
    /*
        AJAX
        Asynchronous JS XML/JSON communication
    */
    $.ajax({
        url: serverURL + '/API/points',
        type: "POST", // action
        contentType: 'application/json', // encoding (language)
        data: JSON.stringify(anItem), // message

        success: function (res) { // <- response: the server response
            console.log("server says: ", res);
        },
        error: function (error) {
            console.log('** ERROR: ', error);
        }
 
    });
}


// GET test to a server online
function readTest() {
    $.ajax({
        url: serverURL + '/API/test',
        type: 'GET',
        success: function (res) {
            // OK
            console.log(res);
        },
        error: function (error) {
            // NOT GOOD
            console.log(error)
        }




    });
}





function init() {
    console.log('admin page loaded');

    //catch the click event on the button
    $('#btnSave').click(register);
}
window.onload = init;