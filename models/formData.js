var mongoose = require('mongoose');
var FormSchema = new mongoose.Schema({

	name :
	      {
	        firstname: String,
	        lastname: String,
	      },
	mail : String,
	password : String,
	phone : Number,
	address : {
				city: String,
				state: String,
				pin : Number,
	      		country: String

	}

});

module.exports = mongoose.model("Formdatas",FormSchema);  //collection name