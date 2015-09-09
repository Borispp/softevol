define [
	'jquery'
	'underscore'
	'handlebars'
	'backbone'

	#Models
	'/built/assets/scripts/app/customers/model.js'

],
(
	$
	_
	Handlebars
	Backbone

	#Models
	CustomerModel
) ->
	class Collection extends Backbone.Collection
		initialize: (@options) ->
			@getData()
			@collection = @

		getData: ->
			$.ajax
				method: 'get'
				crossDomain: true
				type: 'POST'
				dataType: 'json'
				url: '/built/customers.json'
				success: (response) =>
					@initCollection(response)
				error: (error) ->
					console.log 'Error'

		initCollection: (response) ->
			@collection.reset()
			for customer in response
				@modelItem = new CustomerModel customer
				@collection.add @modelItem
