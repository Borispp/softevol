define [
	'jquery'
	'underscore'
	'handlebars'
	'backbone'

	#ViewItem
	'./view_item.js'


	# templates
	'text!./templates/form.html'
],
(
	$
	_
	Handlebars
	Backbone

	#ViewItem
	ViewItem

	#templates
	EditForm
) ->

	class View extends Backbone.View
		initialize: (options) ->
			@collection = options.collection
			@model = options.model

			@editForm = Handlebars.compile EditForm

			@listenTo @collection, 'add', (model) ->
				new ViewItem
					model: model
					el: options.el

		events:
			'click .customer--remove' : 'removeModel'
			'click .customer--edit' : 'editModel'
			'click .customers_list .customer--save' : 'saveModel'
			'click .customer--add' : 'showAddForm'
			'click .form--edit_customers.new .customer--save' : 'addNewCustomer'
			'click .customers--save' : 'showCollection'

		removeModel: (e) ->
			cid = e.currentTarget.dataset.cid
			@collection.remove @collection.get(cid)
			$('.customer.'+cid).fadeOut ->
				@remove()

		editModel: (e) ->
			cid = e.currentTarget.dataset.cid
			$block = $('.customer.'+cid)
			$block.addClass('customer_edit')
			$block.append @editForm
				cid: cid
				customer: @collection.get(cid).attributes

		saveModel: (e) ->
			cid = e.currentTarget.dataset.cid
			model = @collection.get(cid)

			$block = $('.customer.'+cid)
			$form = $('.form--edit_customers.'+cid)
			data = $form.serializeArray()

			customer = {}
			for val in data
			  customer[val.name] = val.value

			model.set customer

			$block.removeClass('customer_edit')
			$block.find('.form--edit_customers ').remove()


		showAddForm: ->
			$(@el).addClass('showAddForm')
			$(@el).append @editForm
				cid: 'new'
				customer: ''

		hideAddForm: ->
			$(@el).removeClass('showAddForm')
			$(@el).find('.form--edit_customers.new').remove()

		addNewCustomer: ->
			$form = $('.form--edit_customers.new')
			data = $form.serializeArray()

			#Clear errors
			$form.find('.m-error').html('')
			$form.find('.m-error').addClass('m-hide')

			#Creating model
			customer = {}
			for val in data
			  customer[val.name] = val.value
			model = new @model(customer)
			model.isValid()

			#Check validation
			if $.isEmptyObject model.validationError
				@collection.add model
				@hideAddForm()
			else
				$.each model.validationError, (item, msg) ->
					$form.find('input[name='+item+'] + .m-error').html(msg)
					$form.find('input[name='+item+'] + .m-error').removeClass('m-hide')

		showCollection: ->
			console.log @collection


			# @model.on 'change', =>
			# 	@render()
