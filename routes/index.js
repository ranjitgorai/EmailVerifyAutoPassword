var express = require('express');
var router = express.Router();
var formmodel = require("../models/formData");
var generator = require('generate-password');
var  mailer = require('express-mailer');
/* GET home page. */
router.get('/formApp', function(req, res) {
  res.render('forminput');
});

router.post('/formApp', function(req, res) { 



	   var fname = req.body.name.firstname;
	   //console.log(fname);
	   var lname = req.body.name.lastname;
	   //console.log(lname);
		var umail = req.body.mail;
		//console.log(umail);
		var phn = req.body.phone ;
		//console.log(phn);
		var city = req.body.address.city;
		//console.log(city);
		var state = req.body.address.state;
		//console.log(state);
		var pin = req.body.address.pin;
		//console.log(pin);
		var country = req.body.address.country;
		//console.log(country);



	formmodel.find({mail: umail }).exec(function (err, results) {
      
	    if(err){}
		
	  if(results.length){
	    	
	      return res.json({error : false , result : 'This User Already Exist'});

	  }else{

             var password = generator.generate({
				    length: 10,
				    numbers: true
			  });
			 //console.log(password);

            var data = { 
            	"name" :{
            		 'firstname' : fname,
            	     'lastname' : lname

            	    },
            	
            	 'mail ' : umail,
            	 'password' : password, 
            	 "address" :{
            	 	 'phone' : phn,
	            	 'city' : city,
	            	 'state' : state,
	            	 'pin' : pin,
	            	 'country' : country

            	 }
            	 

            };
            //console.log(data);
            var formIpt = new formmodel(data);
            console.log(formIpt);

            formIpt.save(function (err, result){
		        console.log(result);
		        if(err){  
		              return res.json({error: true , reason: err});
		            }
		            return res.json({error : false , result : result});


            });


             //console.log(password);
             //console.log(umail);
			     
			  res.mailer.send('passw', {
			    to: umail,  
			    subject: 'Your Login Password', 
			    text:password  
			  }, function (err, success) {
			  	//console.log(err, success);
			    if (err) {
			      
			      res.send({result: 'There was an error sending the email'});
			    }else{
			    	  res.send({result: 'Email Sent'});
			    }
			    
			  });


	  }
	});
  
});

module.exports = router;
