//Author: Abhishek Sawant, 8683623

//import dependencies like express package
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

//set up the DB connection
//database, localhost, name of the database
mongoose.connect('mongodb://localhost:27017/tapeStationeryStore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//set up the model for the order
const Order = mongoose.model('Order', {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    pen: String,
    qty1: Number,
    books: String,
    qty2: Number,
    bill: Number,
    tax: Number
});

//set up global variables
var myApp = express();
myApp.use(bodyParser.urlencoded({extended:false}));

//set up the path to views folder
myApp.set('views', path.join(__dirname, 'views'));

//set up the path to public folder
myApp.use(express.static(__dirname + '/public'));

//define the view engine
myApp.set('view engine', 'ejs');

//handle http requests/ define routes
myApp.get('/', function(req, res){
    res.render('form');
});

//custom function to check if password matches with confirm password
function checkPasswordMatch(value, {req}){
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    if(password != confirmPassword){
        throw new Error('Please enter the same password in password and confirm password field.');
    }
    return true;
}

myApp.post('/', [
    check('name', 'Please enter your full name in the name field.').notEmpty(),
    check('address', 'Please enter your full address in the address field.').notEmpty(),
    check('city', 'Please enter your city in the city field.').notEmpty(),
    check('province', 'Please select your province').not().isIn(['']),
    check('email', 'Please enter a valid input in email address field.').isEmail(),
    check('phone', 'Please enter a valid input in phone field.').isMobilePhone(),
    check('password').custom(checkPasswordMatch)
], 
function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('form',{
            errors: errors.array()
        });
    }
    else{
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var confirmPassword = req.body.confirmPassword;
        var phone = req.body.phone;
        var address = req.body.address;
        var city = req.body.city;
        var province = req.body.province;
        var pen = req.body.pen;
        var qty1 = req.body.qty1;
        var books = req.body.books;
        var qty2 = req.body.qty2;
        var paymentMethod = req.body.paymentMethod;
        var credit1 = req.body.credit1;

        if (pen == '' && books == ''){
            var bill = 0;
        }
        else if(pen == ''){
            if (books == '100 Pages Book'){
                var bill = qty2 * 10;
                var product = '100 Pages Book';
            }
            else if(books == '200 Pages Book'){
                var bill = qty2 * 20; 
                var product = '200 Pages Book';
            }
        }
        else if(books == ''){
            var bill = qty1 * 5; 
            var product = 'Pen';
        }
        else{
            if (books == '100 Pages Book'){
                var bill = qty1 * 5 + qty2 * 10;
                var product = 'Pen, 100 Pages Book';
            }
            else if(books == '200 Pages Book'){
                var bill = qty1 * 5 + qty2 * 20; 
                var product = 'Pen, 200 Pages Book';
            }
        }

        //tax calculation
        if (province == 'AB' || province == 'QC' || province == 'BC' || province == 'SK' || province == 'YT' || province == 'NU' || province == 'MB' || province == 'NT'){
            var tax = (bill * 0.05).toFixed(2);
        }
        else if(province == 'ON'){
            var tax = (bill * 0.13).toFixed(2);
        }
        else if(province == 'NB' || province == 'NL' || province == 'NS' || province == 'PE'){
            var tax = (bill * 0.15).toFixed(2);
        }

        var pageData = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            phone: phone,
            address: address,
            city: city,
            province: province,
            pen: pen,
            qty1: qty1,
            books: books,
            qty2: qty2,
            paymentMethod: paymentMethod,
            credit1: credit1,
            bill: bill,
            tax: tax,
            product: product
        }

        //store orders to database
        var newOrder = new Order(pageData);

        //save order
        newOrder.save().then(function(){
            console.log('new order is created')
        });

        res.render('form', pageData);
    }
});

myApp.get('/allOrders', function(req, res){
    Order.find({}).exec(function(err, orders){
        res.render('allOrders', {orders: orders});
    });
});

//start the server and listen to a port
myApp.listen(8080);

//confirming the code is working
console.log('server is working..');

const addCheck = (a,b) =>{
    return a+b;
}
console.log(addCheck(50,60));