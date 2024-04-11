// Utility functions for the application
const { clipboard } = require('electron')
const fn = {
	// Serializer object for handling data transformation
	serilizer: {
		// Method to convert a JavaScript object into a string
		serialize: (data) => { return JSON.stringify(data) },

		// Method to parse a string back into a JavaScript object
		deserialize: (data) => { return JSON.parse(data) },
	},
	localStorage: {
		get: (name = '') => {
			if (!name) return;
			return localStorage.getItem(name);
		},
		set: (name = '', value = '') => {

			if (!name) return;
			localStorage.setItem(name, value);
		},
		remove: (name = '') => {

			if (!name) return;
			localStorage.removeItem(name);
		},
	},
	copyText: (text, callback = undefined) => {
		clipboard.writeText(text);
		if (callback) {
			callback()
		}
	}
};

export {
	fn
}
