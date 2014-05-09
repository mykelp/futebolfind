var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	templatePath = path.normalize(__dirname + '/../app/mailer/templates'),
	notifier = {
		APN: false,
		email: false,
		actions: ['comment'],
		tplPath: templatePath,
		postmarkKey: 'POSTMARK_KEY',
		parseAppId: 'PARSE_APP_ID',
		parseApiKey: 'PARSE_MASTER_KEY'
	};

module.exports = {
	development: {
		db: 'mongodb://localhost/futebolfind-dev',
		root: rootPath,
		notifier: notifier,
		app: {
			name: 'futebolfind - Development'
		}
	},
	test: {
		db: 'mongodb://localhost.futebolfind-test',
		root: rootPath,
		notifier: notifier,
		app: {
			name: 'futebolfind - Test'
		}
	},
	production: {
		db: 'mongodb://localhost/futebolfind',
		root: rootPath,
		notifier: notifier,
		app: {
			name: 'futebolfind'
		}
	}
};