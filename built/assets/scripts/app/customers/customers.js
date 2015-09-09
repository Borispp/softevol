define(['jquery', 'underscore', 'handlebars', 'backbone', './model.js', './view.js', './collection.js'], function($, _, Handlebars, Backbone, CustomerModel, CustomerView, CustomerCollection) {
  var Customers, customers;
  Customers = (function() {
    function Customers(options) {
      this.collection = new CustomerCollection({
        model: CustomerModel
      });
      this.view = new CustomerView({
        collection: this.collection,
        model: CustomerModel,
        el: options.el
      });
    }

    return Customers;

  })();
  return customers = new Customers({
    'el': '.customers'
  });
});
