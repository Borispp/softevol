var Popup;

$('.fake-select').select2({
  minimumResultsForSearch: -1
});

$('#logo').on('click', function(e) {
  return e.preventDefault();
});

Popup = (function() {
  function Popup($open, $overlay1) {
    this.$open = $open;
    this.$overlay = $overlay1;
    this.$popups = $('.popup');
    this.$close = $('.popup--close');
    this.$popup = '#' + this.$open.attr('data-open');
    this.init();
  }

  Popup.prototype.init = function() {
    this.$open.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.openPopup();
      };
    })(this));
    this.$close.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.closePopup();
      };
    })(this));
    return this.$overlay.on('click', (function(_this) {
      return function(e) {
        e.preventDefault();
        return _this.closePopup();
      };
    })(this));
  };

  Popup.prototype.openPopup = function() {
    this.$popups.removeClass('m-show_popup');
    $(this.$popup).addClass('m-show_popup');
    return this.$overlay.removeClass('m-hide');
  };

  Popup.prototype.closePopup = function() {
    $(this.$popup).removeClass('m-show_popup');
    return this.$overlay.addClass('m-hide');
  };

  return Popup;

})();

$.each($('.popup_open'), function(item, el) {
  var $el, $overlay;
  $el = $(el);
  $overlay = $('.m-overlay');
  return new Popup($el, $overlay);
});

$("#windows_type").on('change', function() {
  return $("#windowsDownload").attr('href', $(this).val());
});

$("#contactus_send").on('click', function(e) {
  e.preventDefault();
  if ($('#your_name').val() !== '' && $('#your_email').val() !== '' && $('#your_subject').val() !== '' && $('#your_message').val() !== '') {
    return $("#contactus").submit();
  } else {
    return console.log('Fields should not be empty');
  }
});
