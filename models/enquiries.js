var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
	nocreate: true,
	noedit: true
});

Enquiry.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, required: true, options: [
		{ value: 'message', label: "Just leaving a message" },
		{ value: 'packWebDev', label: "Web Development Packages" },
		{ value: 'packWebMng', label: "Web Management Packages" },
        { value: 'ecommerce', label: "E-Commerce" },
        { value: 'social', label: "Social Media" },
        { value: 'search', label: "Search Engine Optimization / Management" },
        { value: 'other', label: "Other..." }
	] },
	message: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now }
});

Enquiry.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
})

Enquiry.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Enquiry.schema.methods.sendNotificationEmail = function(callback) {

	var enqiury = this;

	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {

		if (err) return callback(err);

		new keystone.Email('enquiry-notification').send({
			to: admins,
			from: {
				name: 'Rumatec',
				email: 'contact@rumatec.us'
			},
			subject: 'New Enquiry for Rumatec',
			enquiry: enqiury
		}, callback);

	});

}

Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();
