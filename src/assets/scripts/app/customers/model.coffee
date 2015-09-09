define [
	'jquery'
	'underscore'
	'handlebars'
	'backbone'
],
(
	$
	_
	Handlebars
	Backbone
) ->

	class Model extends Backbone.Model

		initialize: (attrs) ->
			@errors = {}
			# @on 'invalid', (model, error) ->
			# 	console.log error

		validate: (attrs) ->
			@errors = {}
			if !attrs.customerName
				@errors.customerName = 'Please fill name field.'
			if !attrs.customerEmail
				@errors.customerEmail = 'Please fill email field.'
			if !attrs.customerPhone
				@errors.customerPhone = 'Please fill phone field.'
			if !attrs.customerAddress
				@errors.customerAddress = 'Please fill address field.'
			if !attrs.customerZip
				@errors.customerZip = 'Please fill zip code field.'

			return @errors

	return Model
