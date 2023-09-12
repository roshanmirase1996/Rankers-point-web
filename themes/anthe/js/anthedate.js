/*
 * @file anthedate.js
 * Contains all functionality related to anthe profile module
 */
(function(Drupal, $) {
    'use strict';

    Drupal.behaviors.anthe_profile = {
        attach: function(context, settings) {

            var start_date = drupalSettings.start_date;
            var end_date = drupalSettings.end_date;
            var start_year = drupalSettings.start_year;
            var end_year = drupalSettings.end_year;

            if (start_date && end_date && start_year && end_year) {
                if (jQuery('#date').length) {
                    jQuery('#date, .form-date').datepicker({
                        dateFormat: 'dd/mm/yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(start_date),
                        maxDate: new Date(end_date),
                        yearRange: start_year + ":" + end_year,
                        defaultDate: '01/01/2008',
                    });
                }
                if (jQuery('.form-date').length) {
                    jQuery('#date, #edit-field-user-date-of-birth-0-value-date').datepicker({
                        dateFormat: 'yy-mm-dd',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(start_date),
                        maxDate: new Date(end_date),
                        yearRange: start_year + ":" + end_year,
                    });
                    // changing date format for login page
                    jQuery('#date, #edit-user-dob').datepicker({
                        dateFormat: 'dd-mm-yy',
                        changeMonth: true,
                        changeYear: true,
                        minDate: new Date(start_date),
                        maxDate: new Date(end_date),
                        yearRange: start_year + ":" + end_year,
                    }).attr('readonly', 'true');

                }


            }

            jQuery('#edit-user-dob').datepicker({
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                minDate: new Date(start_date),
                maxDate: new Date(end_date),
                yearRange: start_year + ":" + end_year,
                constrainInput: false,
            });

            jQuery("#edit-user-dob").keydown(function(e) {
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
                    // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                    (e.keyCode >= 35 && e.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                // Ensure that it is a number and stop the keypress
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
                var a = (jQuery(this).val());
                if (a.length == 2 || a.length == 5) {
                    jQuery(this).val(a + '-');
                }
            });

            jQuery('#edit-dob').datepicker({
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
                minDate: new Date(start_date),
                maxDate: new Date(end_date),
                yearRange: start_year + ":" + end_year,
            });
            $('#edit-user-rollnumber').keyup(function() {
                var check_email_field_exists = $('#sch-student-email-wrapper .sch-student-email').length;
                console.log(check_email_field_exists);
                if (check_email_field_exists) {
                    $(".sch-student-email").css('display', 'none');
                    $(".sch-student-phone").css('display', 'none');
                    $(".form-item-user-dob").css('display', 'none');
                    $("#resend-edit-check-roll").css('display', 'none');
                    $("#edit-check-roll").removeClass('visually-hidden');
                    $("#submit-exam-pwd").css('display', 'none');
                    $("#result-message .messages__wrapper .messages").html('');
                }
            });

            $("#edit-dob").change(function() {
                if ($('#submit-exam-pwd').css('display') == 'none') {
                    $("#submit-exam-pwd").css('display', 'block');
                }
            });
        },

    };

})(Drupal, jQuery);

(function($) {
    $(document).ready(function() {
        //
    });


})(jQuery);