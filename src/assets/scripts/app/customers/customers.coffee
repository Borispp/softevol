define [
	'jquery'
	'underscore'
  'handlebars'
	'backbone'

	#Models
	'/built/assets/scripts/app/customers/model.js'

	#View
	'/built/assets/scripts/app/customers/view.js'

	#Collection
	'/built/assets/scripts/app/customers/collection.js'


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
