define [
	'jquery'
	'underscore'
	'handlebars'
	'backbone'

	# templates
	'text!./customer.html'
],
(
	$
	_
	Handlebars
	Backbone

	# templates
  CustomerTemplate
) ->

	class View extends Backbone.View
		initialize: (options) ->
			@model = options.model
			@customerTemplate = Handlebars.compile CustomerTemplate
			@render()

			@model.on 'change', =>
				@update @model

		render: ->
			@$el.find('.customers_list').append @customerTemplate
				customer: @model.attributes
				cid: @model.cid

		update: (model) ->
			$block = $('.customer.'+model.cid)
			$block.find('.customerName').html(model.get 'customerName')
			$block.find('.customerEmail').html(model.get 'customerEmail')
			$block.find('.customerPhone').html(model.get 'customerPhone')
			$block.find('.customerAddress').html(model.get 'customerAddress')
			$block.find('.customerZip').html(model.get 'customerZip')
