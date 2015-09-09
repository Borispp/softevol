require.config({
  baseUrl: 'assets/scripts',
  paths: {
    jquery: '../libs/jquery/dist/jquery.min',
    underscore: '../libs/underscore/underscore-min',
    backbone: '../libs/backbone/backbone-min',
    validation: '../libs/backbone.validation/dist/backbone-validation-min',
    'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min',
    handlebars: '../libs/handlebars/handlebars.min',
    text: '../libs/requirejs-plugins/lib/text'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['jquery', 'bootstrap'], function() {});

require(['./app/customers/base'], function(Customers) {});
