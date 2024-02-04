/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*
*
* INCLUDES FOLLOWING PULL REQUESTS:
* ---------------------------------
*
* Add destroy method to remove events bound to window #150 
* https://github.com/davatron5000/FitText.js/pull/150
* [ authored by: https://github.com/Petah ]
*
* Data Attributes #149 
* https://github.com/davatron5000/FitText.js/pull/149
* [ authored by: https://github.com/darnold ]
* MODIFIED for NO-CONFLICT attributes: ( data-fittext-compressor | data-fittext-min | data-fittext-max )
* [ modified by: https://github.com/iam-sysop ]
*
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    if (kompressor === 'destroy') {
      return this.each(function(){
          var uid = $(this).data('fitText.uid');
          if (uid) {
              $(window).off('.' + uid);
          }
      });
      return;
    }

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Check for compressor, min, and max data attributes on current active element
      compressor            = $this.data('fittext-compression') !== undefined ? $this.data('fittext-compression') : compressor;
      settings.minFontSize  = $this.data('fittext-min') !== undefined ? $this.data('fittext-min') : settings.minFontSize;
      settings.maxFontSize  = $this.data('fittext-max') !== undefined ? $this.data('fittext-max') : settings.maxFontSize;

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Create an event unique ID to allow unbinding 
      var uid = Math.random().toString().replace(/^[0\.]+/, 'uid-');
      $this.data('fitText.uid', uid);

      // Call on resize. Opera debounces their resize by default.
      // $(window).on('resize.fittext orientationchange.fittext', resizer);
      $(window).on('resize.fittext.' + uid + ' orientationchange.fittext.' + uid, resizer);

    });

  };

})( jQuery );
