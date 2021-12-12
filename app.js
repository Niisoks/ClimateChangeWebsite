const env = process.env.NODE_ENV || 'dev';
const path = require('path');
var nodemailer = require('nodemailer');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();



var transporter = nodemailer.createTransport({
    service:'outlook',
    auth: {
        user : 'webdevclimatechange@hotmail.com',
        pass: 'webdev4climate'
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/user', jsonParser, function(req,res){
    console.log(req.body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const comment = req.body.comment;
    response = {
        fname: fname,
        lname: lname,
        email: email,
        comment: comment
    }

    var mailOptions = {
        from: 'webdevclimatechange@hotmail.com',
        to: email,
        subject: 'Thank you for signing up to our Newsletter!',
        html: '<h1> Thank you for signing up to our newsletter ' + fname + '!</h1> <div>We appreciate you!<br>If you left a comment it will be displayed below and we will get back to you ASAP!</div><br>' + comment
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('email sent: ' + info.response);
        }
    });
    res.json(response);
});

app.listen(8000, function(){
    console.log('Express app listening on port 8000...')
});
