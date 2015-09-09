var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['jquery', 'underscore', 'handlebars', 'backbone', '/built/assets/scripts/app/customers/model.js'], function($, _, Handlebars, Backbone, CustomerModel) {
  var Collection;
  return Collection = (function(superClass) {
    extend(Collection, superClass);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.initialize = function(options) {
      this.options = options;
      this.getData();
      return this.collection = this;
    };

    Collection.prototype.getData = function() {
      return $.ajax({
        method: 'get',
        crossDomain: true,
        type: 'POST',
        dataType: 'json',
        url: '/built/customers.json',
        success: (function(_this) {
          return function(response) {
            return _this.initCollection(response);
          };
        })(this),
        error: function(error) {
          return console.log('Error');
        }
      });
    };

    Collection.prototype.initCollection = function(response) {
      var customer, i, len, results;
      this.collection.reset();
      results = [];
      for (i = 0, len = response.length; i < len; i++) {
        customer = response[i];
        this.modelItem = new CustomerModel(customer);
        results.push(this.collection.add(this.modelItem));
      }
      return results;
    };

    return Collection;

  })(Backbone.Collection);
});
