var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    nodemailer = require("nodemailer"),
    flash = require("connect-flash");
    
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());

app.use(require("express-session")({
    secret: "Naveen & Vani forever",
    resave: false,
    saveUninitialized: false
}));


app.get("/",function(req,res){
  res.render("mainpage");
  });

app.post("/", function(req, res){
  console.log(req.body);
  let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'info@padayattil.com',
        pass: 'admin@padayattil'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'info@padayattil.com', // sender address
    to: 'info@padayattil.com', // list of receivers
    subject: 'Message from Contact Form', // Subject line
    text: 'Plain Text Body', // plain text body
    html: '<h1>  You have a message from the Contact Form </h1><br><hr>' +
          '<h2> Name : ' + req.body.name + '</h2><br>' + 
          '<h2> Email : ' + req.body.email + '</h2><br>' + 
          '<h2> Message : ' + req.body.message + '</h2><br>' // html body
    
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
  req.flash('info', 'You have successfully sent us a message! We will get back to you soon!');
  res.render("mainpage", {message : req.flash('info')});
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server has started");
});