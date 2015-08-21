// Generated by CoffeeScript 1.9.3
(function() {
  var placementBasedOnOrientation, throttle, tooltipDistanceFromElement, tooltipTemplate;

  if (window.requestAnimationFrame) {
    throttle = function(type, name, _obj) {
      var func, obj, running;
      obj = _obj || window;
      running = false;
      func = function() {
        if (running) {
          return;
        }
        running = true;
        return requestAnimationFrame(function() {
          obj.dispatchEvent(new CustomEvent(name));
          return running = false;
        });
      };
      return obj.addEventListener(type, func, true);
    };
    throttle('scroll', 'optimizedScroll', window);
  }

  tooltipTemplate = "<div class=\"tooltip in\">\n  <div class=\"tooltip-arrow\"></div>\n  <div class=\"tooltip-inner\"></div>\n</div>";

  tooltipDistanceFromElement = 5;

  placementBasedOnOrientation = function($elem, $tooltip, orientation) {
    var elemPos;
    elemPos = $elem.offset();
    switch (orientation) {
      case 'left':
        return {
          top: elemPos.top + $elem[0].offsetHeight / 2 - $tooltip[0].offsetHeight / 2,
          left: elemPos.left - $tooltip[0].offsetWidth - tooltipDistanceFromElement
        };
      case 'right':
        return {
          top: elemPos.top + $elem[0].offsetHeight / 2 - $tooltip[0].offsetHeight / 2,
          left: elemPos.left + $elem[0].offsetWidth + tooltipDistanceFromElement
        };
      case 'top':
        return {
          top: elemPos.top - $tooltip[0].offsetHeight - tooltipDistanceFromElement,
          left: elemPos.left - $tooltip[0].offsetWidth / 2 + $elem[0].offsetWidth / 2
        };
      case 'bottom':
        return {
          top: elemPos.top + $elem[0].offsetHeight + tooltipDistanceFromElement,
          left: elemPos.left - $tooltip[0].offsetWidth / 2 + $elem[0].offsetWidth / 2
        };
    }
  };

  window.stateless = window.stateless || {};

  window.stateless.tooltip = function() {
    $(document).on('mouseenter focus', '[data-tooltip]', function(e) {
      var $elem, $tooltip, orientation, text;
      $elem = $(this);
      orientation = $elem.data('placement') || 'top';
      $elem.data('title', $elem.attr('title')).attr('title', null);
      text = $(this).data('tooltip');
      $tooltip = $(tooltipTemplate).addClass(orientation);
      $tooltip.find('.tooltip-inner').text(text);
      $('body').append($tooltip);
      return $tooltip.css(placementBasedOnOrientation($elem, $tooltip, orientation));
    });
    $(document).on('mouseleave blur', '[data-tooltip]', function(e) {
      var $elem;
      $elem = $(this);
      $elem.attr('title', $elem.data('title')).data('title', null);
      return $('.tooltip').remove();
    });
    return window.addEventListener('optimizedScroll', function() {
      return $('.tooltip').remove();
    }, true);
  };

}).call(this);
