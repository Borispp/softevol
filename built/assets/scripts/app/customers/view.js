var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

define(['jquery', 'underscore', 'handlebars', 'backbone', './view_item.js', 'text!app/customers/templates/form.html'], function($, _, Handlebars, Backbone, ViewItem, EditForm) {
  var View;
  return View = (function(superClass) {
    extend(View, superClass);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.initialize = function(options) {
      this.collection = options.collection;
      this.model = options.model;
      this.editForm = Handlebars.compile(EditForm);
      return this.listenTo(this.collection, 'add', function(model) {
        return new ViewItem({
          model: model,
          el: options.el
        });
      });
    };

    View.prototype.events = {
      'click .customer--remove': 'removeModel',
      'click .customer--edit': 'editModel',
      'click .customers_list .customer--save': 'saveModel',
      'click .customer--add': 'showAddForm',
      'click .form--edit_customers.new .customer--save': 'addNewCustomer',
      'click .customers--save': 'showCollection'
    };

    View.prototype.removeModel = function(e) {
      var cid;
      cid = e.currentTarget.dataset.cid;
      this.collection.remove(this.collection.get(cid));
      return $('.customer.' + cid).fadeOut(function() {
        return this.remove();
      });
    };

    View.prototype.editModel = function(e) {
      var $block, cid;
      cid = e.currentTarget.dataset.cid;
      $block = $('.customer.' + cid);
      $block.addClass('customer_edit');
      return $block.append(this.editForm({
        cid: cid,
        customer: this.collection.get(cid).attributes
      }));
    };

    View.prototype.saveModel = function(e) {
      var $block, $form, cid, customer, data, i, len, model, val;
      cid = e.currentTarget.dataset.cid;
      model = this.collection.get(cid);
      $block = $('.customer.' + cid);
      $form = $('.form--edit_customers.' + cid);
      data = $form.serializeArray();
      customer = {};
      for (i = 0, len = data.length; i < len; i++) {
        val = data[i];
        customer[val.name] = val.value;
      }
      model.set(customer);
      $block.removeClass('customer_edit');
      return $block.find('.form--edit_customers ').remove();
    };

    View.prototype.showAddForm = function() {
      $(this.el).addClass('showAddForm');
      return $(this.el).append(this.editForm({
        cid: 'new',
        customer: ''
      }));
    };

    View.prototype.hideAddForm = function() {
      $(this.el).removeClass('showAddForm');
      return $(this.el).find('.form--edit_customers.new').remove();
    };

    View.prototype.addNewCustomer = function() {
      var $form, customer, data, i, len, model, val;
      $form = $('.form--edit_customers.new');
      data = $form.serializeArray();
      $form.find('.m-error').html('');
      $form.find('.m-error').addClass('m-hide');
      customer = {};
      for (i = 0, len = data.length; i < len; i++) {
        val = data[i];
        customer[val.name] = val.value;
      }
      model = new this.model(customer);
      model.isValid();
      if ($.isEmptyObject(model.validationError)) {
        this.collection.add(model);
        return this.hideAddForm();
      } else {
        return $.each(model.validationError, function(item, msg) {
          $('.form--edit_customers.new input[name=' + item + '] + .m-error').html(msg);
          return $('.form--edit_customers.new input[name=' + item + '] + .m-error').removeClass('m-hide');
        });
      }
    };

    View.prototype.showCollection = function() {
      return console.log(this.collection);
    };

    return View;

  })(Backbone.View);
});
