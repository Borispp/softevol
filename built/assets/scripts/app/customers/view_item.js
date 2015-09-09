var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['jquery', 'underscore', 'handlebars', 'backbone', 'text!app/customers/templates/customer.html'], function($, _, Handlebars, Backbone, CustomerTemplate) {
  var View;
  return View = (function(superClass) {
    extend(View, superClass);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function(options) {
      this.model = options.model;
      this.customerTemplate = Handlebars.compile(CustomerTemplate);
      this.render();
      return this.model.on('change', (function(_this) {
        return function() {
          return _this.update(_this.model);
        };
      })(this));
    };

    View.prototype.render = function() {
      return this.$el.find('.customers_list').append(this.customerTemplate({
        customer: this.model.attributes,
        cid: this.model.cid
      }));
    };

    View.prototype.update = function(model) {
      var $block;
      $block = $('.customer.' + model.cid);
      $block.find('.customerName').html(model.get('customerName'));
      $block.find('.customerEmail').html(model.get('customerEmail'));
      $block.find('.customerPhone').html(model.get('customerPhone'));
      $block.find('.customerAddress').html(model.get('customerAddress'));
      return $block.find('.customerZip').html(model.get('customerZip'));
    };

    return View;

  })(Backbone.View);
});
