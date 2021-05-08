//Author: Abhishek Sawant, 8683623

//declaring regular expressions
var passwordRegex = /^[0-9A-Za-z]{8,12}$/;
var phoneRegex = /^[0-9]{3}[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;
var creditRegex = /^[0-9]{4}[\-][0-9]{4}[\-][0-9]{4}[\-][0-9]{4}$/;
var emailRegex = /^[A-Za-z0-9]{1,30}[\@][A-Za-z]{1,30}[\.][A-Za-z]{1,30}$/;

function submitForm(){
    return true;
    
    //fetching all the values from input boxes
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var password = document.getElementById('password').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var credit1 = document.getElementById('credit1').value;
    var province = document.getElementById('province').value;
    var pen = document.getElementById('pen').value;
    var books = document.getElementById('books').value;
    var qty1 = document.getElementById('qty1').value;
    var qty2 = document.getElementById('qty2').value;

    //listing all possible errors
    var errors = '';
    if(name == ''){
        errors += `Please enter your full name in the name field.<br>`;
    }
    if(email == ''){
        errors += `Please enter your email address in the email field.<br>`;
    }
    else if(!emailRegex.test(email)){
        errors += `Please enter a valid input in email address field. <br>`;
    }   
    if(phone == ''){
        errors += `Please enter your phone number in the phone field.<br>`;
    }   
    else if(!phoneRegex.test(phone)){
        errors += `Please enter a valid input in phone number field. <br>`;
    }
    if(password == ''){
        errors += `Please enter your password in the password field.<br>`;
    }   
    if(city == ''){
        errors += `Please enter your city in the city field.<br>`;
    }    
    if(address == ''){
        errors += `Please enter your full address in the address field.<br>`;
    } 
    if(province == ''){
        errors += `Please select your province.<br>`;
    }
    if(!passwordRegex.test(password)){
        errors += `Password should consist of 8-12 alphanumeric characters.<br>`;
    }
    if(pen != '' || books != ''){
        if(!creditRegex.test(credit1)){
            errors += `Please enter a valid input in card number field. <br>`;
        }
    }
    if(password != confirmPassword){
        errors += `Please enter the same password in password and confirm password field.<br>`;
    }
    if((pen == 'Black Pen' || pen == 'Red Pen' || pen == 'Blue Pen') && (qty1 == '')){
        errors += `Please select the number of pens you want.<br>`;
    }
    if((books == '100 Pages Book' || books == '200 Pages Book') && (qty2 == '')){
        errors += `Please select the number of books you want.<br>`;
    }

    //listing all entries for the final receipt
    var output = '';
    output += `<b>Name:</b> ${name} <br><br>`;
    output += `<b>Email:</b> ${email} <br><br>`;
    output += `<b>Phone:</b> ${phone} <br><br>`;
    output += `<b>Address:</b> ${address}, ${city}, ${province}<br><br>`;

    //printing the products on the final receipt and calculating cost
    if (pen == '' && books == ''){
        output += `<b>Order Summary:</b> No products selected. <br><br>`;
        var bill = 0;
    }
    else if(pen == ''){
        output += `<b>Products:</b> ${books} <b>Quantity:</b> ${qty2}<br><br>`;
        if (books == '100 Pages Book'){
            var bill = qty2 * 10;
        }
        else if(books == '200 Pages Book'){
            var bill = qty2 * 20; 
        }
    }
    else if(books == ''){
        output += `<b>Products:</b> ${pen} <b>Quantity:</b> ${qty1}<br><br>`;
        var bill = qty1 * 5; 
    }
    else{
        output += `<b>Products:</b> ${pen} <b>Quantity:</b> ${qty1} <br> <b>Products:</b> ${books} <b>Quantity:</b> ${qty2} <br><br>`;
        if (books == '100 Pages Book'){
            var bill = qty1 * 5 + qty2 * 10;
        }
        else if(books == '200 Pages Book'){
            var bill = qty1 * 5 + qty2 * 20; 
        }
    }
    output += `<b>Bill:</b> $${bill} <br>`; //printing the total cost of purchase
    if(errors == '' && bill <= 10){ //bill not printed if total cost is less than or equal to 10
        errors += `Receipt will only be generated for purchases greater than $10`;
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
    output += `<b>Tax:</b> $${tax} <br><br>`;

    //on-submit actions
    //show the errors, if no errors are found print the bill
    if(errors != '') { 
        document.getElementById('errors').innerHTML = errors;
        document.getElementById('formResult').innerHTML = "Receipt can't be generated";
    }
    else{
        return true;
        document.getElementById('errors').innerHTML = '';
        document.getElementById('formResult').innerHTML = output;   
    }     
    return false;
}

function clearForm(){
    document.getElementById("purchaseForm").reset(); //clears all input fields on-click
}