// Module Dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto'),
	_ = require('underscore');

// User Schema
var UserSchema = new Schema({
	email: { type: String },
	username: { type: String },
	provider: { type: String },
	hashedPassword: { type: String },
	salt: { type: String }
});

// Virtuals
UserSchema.virtual('password').set(function(password) {
	this._password = password;
	this.salt = this.makeSalt();
	this.hashedPassword = this.encryptPassword(password);
}).get(function() { return this._password});

// Validations
UserSchema.path('email').validate(function (email) {
	return name.length;
}, 'Name cannot be blank');

UserSchema.path('username').validate(function (username) {
	return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashedPassword').validate(function (hashedPassword) {
	return hashedPassword.length;
}, 'Password cannot be blank');

UserSchema.pre('save', function(next) {
	if (!this.isNew)
		return next();

	if (!validatePresenceOf(this.password))
		next(new Error('Invalid password'));
	else
		next();
});

// Methods
UserSchema.methods = {
	/**
	* Authenticate - check if the passwords are the same
	*
	* @param {String} plainText
	* @return {Boolean}
	* @api public
	*/

	authenticate: function(plainText) {
		return this.encryptPassword(plainText) === this.hashed_password;
	},

	/**
	* Make salt
	*
	* @return {String}
	* @api public
	*/

	makeSalt: function() {
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},

	/**
	* Encrypt password
	*
	* @param {String} password
	* @return {String}
	* @api public
	*/

	encryptPassword: function(password) {
		if (!password) 
			return '';
		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	}
};

mongoose.model('User', UserSchema);