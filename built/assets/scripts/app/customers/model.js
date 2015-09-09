var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['jquery', 'underscore', 'handlebars', 'backbone'], function($, _, Handlebars, Backbone) {
  var Model;
  Model = (function(superClass) {
    extend(Model, superClass);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.initialize = function(attrs) {
      return this.errors = {};
    };

    Model.prototype.validate = function(attrs) {
      this.errors = {};
      if (!attrs.customerName) {
        this.errors.customerName = 'Please fill name field.';
      }
      if (!attrs.customerEmail) {
        this.errors.customerEmail = 'Please fill email field.';
      }
      if (!attrs.customerPhone) {
        this.errors.customerPhone = 'Please fill phone field.';
      }
      if (!attrs.customerAddress) {
        this.errors.customerAddress = 'Please fill address field.';
      }
      if (!attrs.customerZip) {
        this.errors.customerZip = 'Please fill zip code field.';
      }
      return this.errors;
    };

    return Model;

  })(Backbone.Model);
  return Model;
});
