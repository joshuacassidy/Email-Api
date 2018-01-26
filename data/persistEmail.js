const mongoose = require('mongoose');

const emailPersistantsSchema = mongoose.Schema({
	from: String,
	to: String,
	subject: String,
	text: String
    
});

const emailPersistants = module.exports = mongoose.model('emails', emailPersistantsSchema);


module.exports.persistEmail = (data, callback) => {
	console.log(data,callback);
	emailPersistants.create(data, callback);
}