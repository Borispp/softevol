define [
	'jquery'
	'underscore'
  'handlebars'
	'backbone'

	#Models
	'./model.js'

	#View
	'./view.js'

	#Collection
	'./collection.js'


],
(
	$
	_
  Handlebars
	Backbone

	#Models
	CustomerModel

	#View
	CustomerView

	#Collection
	CustomerCollection

) ->

	class Customers
		constructor: (options) ->
			# @model = new CustomerModel

			@collection = new CustomerCollection
				model: CustomerModel

			@view = new CustomerView
				collection: @collection
				model: CustomerModel
				el: options.el

	customers = new Customers
		'el' : '.customers'
