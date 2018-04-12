var mongoose=require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var Schema=mongoose.Schema;

autoIncrement.initialize(mongoose);

var movieSchema=new Schema({
    title:'String',
    permalink:'String',
    content:'String',
    genre:'String',
	  director:{type:String,default:'Admin'},
	  releaseYear: { type: Date, default: Date.now },
	comments:[{
		content:'String',
		author:'String',
		datePublished:{ type: Date, default: Date.now }
	}]
});

movieSchema.plugin(autoIncrement.plugin, {model:'Movie',startAt:1});

module.exports=mongoose.model('Movie',movieSchema);
