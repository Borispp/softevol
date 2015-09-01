$('.fake-select').select2({
     minimumResultsForSearch: -1
})
$('#logo').on 'click', (e) ->
  e.preventDefault()

class Popup
  constructor: (@$open, @$overlay) ->
    @$popups = $('.popup')
    @$close = $('.popup--close')
    @$popup = '#'+@$open.attr('data-open')

    @init()
  init: ->
    @$open.on 'click', (e) =>
      e.preventDefault()
      @openPopup()
    @$close.on 'click', (e) =>
      e.preventDefault()
      @closePopup()
    @$overlay.on 'click', (e) =>
      e.preventDefault()
      @closePopup()

  openPopup: ->
    @$popups.removeClass('m-show_popup')
    $(@$popup).addClass('m-show_popup')
    @$overlay.removeClass('m-hide');

  closePopup: ->
    $(@$popup).removeClass('m-show_popup')
    @$overlay.addClass('m-hide');

$.each($('.popup_open'), (item, el)->
  $el = $(el)
  $overlay = $('.m-overlay')
  new Popup($el, $overlay)
)


$("#windows_type").on('change', ->
  $("#windowsDownload").attr('href', $(@).val());
)
$("#contactus_send").on('click', (e) ->
  e.preventDefault()
  if($('#your_name').val() != '' && $('#your_email').val() != '' && $('#your_subject').val() != '' && $('#your_message').val() != '')
    $("#contactus").submit()
  else
    console.log 'Fields should not be empty'

)
# $('.m-overlay, .popup--close').on 'click', (e) ->
#   e.preventDefault()
#   $('.m-overlay').addClass('m-hide');
#   $('.popup').addClass('m-hide');
#   $('.popup').removeClass('m-show_popup');
#
# $('.popup_open').on 'click', (e) ->
#   e.preventDefault()
#   attr = $(this).attr('data-open')
#   $('.m-overlay').removeClass('m-hide');
#   $('#'+attr).removeClass('m-hide');
#   $('#'+attr).addClass('m-show_popup');
