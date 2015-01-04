    // Simulate config options from your production environment by
    // customising the .env file in your project's root folder.
    require('dotenv').load();

    // Require keystone
    var keystone = require('keystone');

    // Initialise keystone with your project's configuration.
    // See http://keystonejs.com/guide/config for available options
    // and documentation.

    keystone.init({

        'name': 'Getchatech',
        'brand': 'Getchatech',

        'less': 'public',
        'static': 'public',
        'favicon': 'public/favicon.ico',

        'views': 'templates/views',
        'view engine': 'jade',

        'emails': 'templates/emails',

        'auto update': true,

        'session': true,
        'auth': true,
        'user model': 'User',
        'cookie secret': 's/$)FOKW=KfHwxqQ=22D6r^KRMDN-n1M(CEIqbnSp)N/!]09!8*h}~dNXb4nsr3}',
        'cloudinary config': {
            cloud_name: 'rumatec',
            api_key: '758191134322457',
            api_secret: 'ozfIA6Y0lhqRLQTVaEhw_uwZrvw'
        },
        'mandrill username': 'justin@rumate.ch',
        'mandrill api key': 'sQhfhuKmZLgJhQ5J2LiozA',
        'google api key': 'AIzaSyBfjj4blNd0PQPcQ3eeJlFHQ5FgJZ5GRjE',
        'google server api key': 'AIzaSyBGu7b25XQrpQFswEcj_3CF1_WZHDCHHqg'

    });

    // Load your project's Models

    keystone.import('models');

    // Setup common locals for your templates. The following are required for the
    // bundled templates and layouts. Any runtime locals (that should be set uniquely
    // for each request) should be added to ./routes/middleware.js

    keystone.set('locals', {
        _: require('underscore'),
        env: keystone.get('env'),
        utils: keystone.utils,
        editable: keystone.content.editable
    });

    // Load your project's Routes

    keystone.set('routes', require('./routes'));

    // Setup common locals for your emails. The following are required by keystone's
    // default email templates, you may remove them if you're using your own.

    keystone.set('email locals', {
        logo_src: '/images/logo-email.gif',
        logo_width: 194,
        logo_height: 76,
        theme: {
            email_bg: '#f9f9f9',
            link_color: '#2697de',
            buttons: {
                color: '#fff',
                background_color: '#2697de',
                border_color: '#1a7cb7'
            }
        }
    });

    // Setup replacement rules for emails, to automate the handling of differences
    // between development a production.

    // Be sure to update this rule to include your site's actual domain, and add
    // other rules your email templates require.

    keystone.set('email rules', [{
        find: '/images/',
        replace: (keystone.get('env') == 'production') ? 'http://www.getchatech.com/images/' : 'http://localhost:3000/images/'
    }, {
        find: '/keystone/',
        replace: (keystone.get('env') == 'production') ? 'http://www.getchatech.com/keystone/' : 'http://localhost:3000/keystone/'
    }]);

    // Load your project's email test routes

    keystone.set('email tests', require('./routes/emails'));

    // Configure the navigation bar in keystone's Admin UI

    keystone.set('nav', {
        'posts': ['posts', 'post-categories'],
        'galleries': 'galleries',
        'enquiries': 'enquiries',
        'users': 'users'
    });

    // Start keystone to connect to your database and initialise the web server

    keystone.start();
