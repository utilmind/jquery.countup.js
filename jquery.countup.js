/*!
* jquery.countup.js 1.0.3
*
* Copyright 2016, Adrián Guerra Marrero http://agmstudio.io @AGMStudio_io
* Released under the MIT License
*
* Date: Oct 27, 2016
*
* Forked by utilmind 31.05.2021: https://github.com/utilmind/jquery.countup.js
*/
(function($) {
  "use strict";

  $.fn.countUp = function(options) {

    // Defaults
    var settings = $.extend({
        time: 2000,
        delay: 10,
        offset: "100%",
    }, options);

    return this.each(function() {

        // Store the object
        var $this = $(this),

            counterUpper = function() {
                var num = $this.data("counter-to");
                if (!num)
                    $this.data("counter-to", num = $this.text()); // text is dynamic. We can use only the first initial value. It will be useless when it start count up.
                num = num.toString(); // parsed as string, since there can be multiple values

                var time = parseInt($this.data("counter-time")) || settings.time,
                    delay = parseInt($this.data("counter-delay")) || settings.delay,

                    divisions = time / delay,
                    nums = [num],
                    isComma = /[\d]+,[\d]+/.test(num);

                num = num.replace(/,/g, "");

                var isInt = /^[\d]+$/.test(num),
                    isFloat = /^[\d]+\.[\d]+$/.test(num),
                    decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

                // Generate list of incremental numbers to display
                for (var i = divisions; i >= 1; --i) {

                    // Preserve as int if input was int
                    var newNum = parseInt(Math.round(num / divisions * i));

                    // Preserve float if input was float
                    if (isFloat) {
                        newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                    }

                    // Preserve commas if input had commas
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                        }
                    }

                    nums.unshift(newNum);
                }

                // start
                $this.data("counterup-nums", nums)
                     .text("0");

                // Updates the number until we're done
                var f = function() {
                    var nums = $this.data('counterup-nums');
                    if (nums.length) {
                        $this.text(nums.shift());
                        setTimeout($this.data('counterup-func'), delay);
                    }else {
                        $this.data('counterup-nums', undefined)
                             .data('counterup-func', undefined);
                    }
                };
                $this.data('counterup-func', f);

                // Start the count up
                setTimeout($this.data('counterup-func'),delay);
            };

            // Perform counts when the element gets into view
            $this.waypoint(counterUpper, {
                offset: $this.data("counter-offset") || settings.offset,
                triggerOnce: true
            });
        });

    };

})(jQuery);
