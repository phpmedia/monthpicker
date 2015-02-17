/**
 * monthPicker - a simple but useful month/year picker
 * this plugin creates two selectboxes where the user can can select month and year. afterwars a unix-timestamp is written into the
 * original input field.
 *
 * Copyright (c) Dirk Diebel <http://www.werzahltmehr.de/>.
 * Released under MIT License
 *
 *
 * <usage>
 *
 * $('#id-selector').monthpicker([options]);
 *
 * [options] accepts following JSON properties:
 *  minYear     - the minimum year the selectbox should show (default: 1980)
 *  maxYear     - the maximum year the selectbox should show (default: current year)
 *  months       - a map of month labels
 *  selectedDate - selected date (js date object, default: current date)
 *  onChange - change handler function
 *
 * </usage>
 *
 *
 * @author Dirk Diebel
 * @version 2.0.0
 * @date May 26, 2014
 *
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.monthpicker = function (options) {
        $(this).each(function() {
            var $input = $(this),
                currentDate = new Date(),
                value = parseInt($input.val(), 10),
                selectedDate = value ? new Date(value) : currentDate,
                defaults = {
                    minYear: 1980,
                    maxYear: currentDate.getUTCFullYear(),
                    selectedDate: selectedDate,
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                },
                $yearElement = $('<select class="ui-monthpicker-yearpick"></select>'),
                $monthElement = $('<select class="ui-monthpicker-monthpick"></select>'),
                currentYear = selectedDate.getUTCFullYear(),
                currentMonth = selectedDate.getUTCMonth(),
                params = $.extend(true, {}, defaults, options),
                createTimestamp = function () {
                    $input
                        .attr('value', Date.UTC($yearElement.val(), $monthElement.val(), 1))
                        .trigger('change.monthpicker');
                };

            $input.hide();

            if (params.minYear > params.maxYear) {
                var tempYear = params.maxYear;

                params.maxYear = params.minYear;
                params.minYear = tempYear;
            }

            for (var i = params.minYear; i <= params.maxYear; i++) {
                $('<option></option>')
                    .val(i)
                    .html(i)
                    .appendTo($yearElement);
            }

            for (var i = 0, l = params.months.length; i < l; i++) {
                $('<option></option>')
                    .val(i)
                    .html(params.months[i])
                    .appendTo($monthElement);
            }

            $yearElement
                .val(currentYear)
                .insertAfter($input);
            $monthElement
                .val(currentMonth)
                .insertBefore($input);

            if (typeof params.onChange === 'function') {
                $input
                    .unbind('.monthpicker')
                    .bind('change.monthpicker', params.onChange);
            }

            $yearElement.change(createTimestamp);
            $monthElement.change(createTimestamp);
        });
    };
}));
