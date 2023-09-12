(function(Drupal, $) {
    'use strict';

    Drupal.behaviors.anthe_coupons = {
        attach: function(context, settings) {

            //White Box ISSUE #1 FIX
            $("form[name='payuForm']").show(function() {
                setTimeout(function() {
                    $("form[name='payuForm']").hide();
                    $('.loader-wrapper').show();
                }, 150)
            })

            $("form[name='ccavenueForm']").show(function() {
                setTimeout(function() {
                    $("form[name='ccavenueForm']").hide();
                    $('.loader-wrapper').show();
                }, 150)
            })

            $("form[name='paytmForm']").show(function() {
                setTimeout(function() {
                    $("form[name='paytmForm']").hide();
                    $('.loader-wrapper').show();
                }, 150)
            })

            $("form[name='default']").show(function() {
                setTimeout(function() {
                    $("form[name='default']").hide();
                    $('.loader-wrapper').show();
                }, 150)
            })

            //White Box ISSUE #1 FIX END

            //coupon code start

            var bool_pg_skip = get_cookie("bool_pg_skip");
            var bool_pg_skip_without_coupon = get_cookie("bool_pg_without_coupon_skip");
            if (typeof bool_pg_skip != "undefined" && bool_pg_skip == "FALSE") {
                $('#coupon-redirect').hide();
                $('input[id^="edit-finish"]').val('Pay & Register Now');
            } else if (typeof bool_pg_skip != "undefined" && bool_pg_skip == "TRUE") {
                $('#coupon-redirect').show();
                $('input[id^="edit-finish"]').val('Register Now');
                //$('input[id^="edit-finish"]').attr('disabled','disabled');
                $('#edit-apply-coupon').css('display', 'none');
            } else if (typeof bool_pg_skip_without_coupon != "undefined" && bool_pg_skip_without_coupon == "TRUE") {
                $('input[id^="edit-finish"]').val('Register Now');
                //$('input[id^="edit-finish"]').attr('disabled','disabled');
            }
            $("input[name='mock_test']").click(function() {

                var bool_pg_skip_exam = get_cookie("bool_pg_skip_exam");
                var bool_pg_skip_mock_test = get_cookie("bool_pg_skip_mock_test");

                if ($(this).val() == 1) {
                    if (typeof bool_pg_skip_exam != "undefined" && bool_pg_skip_exam == "TRUE") {
                        $('#ajax-Payment-On-Exam-Centre').hide();
                        $('input[id^="edit-finish"]').val('Register Now');
                        $('input[id^="edit-payment-gateway-default"').prop('checked', true);
                        $('#edit-apply-coupon').css('display', 'none');
                    }
                }
                if ($(this).val() == 2) {
                    if (typeof bool_pg_skip_exam != "undefined" && bool_pg_skip_exam == "TRUE" && typeof bool_pg_skip_mock_test != "undefined" && bool_pg_skip_mock_test == "TRUE") {
                        $('#ajax-Payment-On-Exam-Centre').hide();
                        $('input[id^="edit-finish"]').val('Register Now');
                        $('input[id^="edit-payment-gateway-default"').prop('checked', true);
                        $('#edit-apply-coupon').css('display', 'none');
                    }
                    if (typeof bool_pg_skip_mock_test != "undefined" && bool_pg_skip_mock_test == "FALSE") {
                        $.ajax({
                            type: "POST",
                            async: "false",
                            cache: false,
                            url: drupalSettings.path.baseUrl + "anthe/register-get-paymentmode",
                            data: {
                                boolcoupon: 0
                            },
                            beforeSend: function() {
                                $('.loader-wrapper').show();
                            },
                            success: function(data) {
                                $('#ajax-Payment-On-Exam-Centre').html(data.html);
                                $('.loader-wrapper').hide();
                                $('#ajax-Payment-On-Exam-Centre').removeClass("anthe-hide");
                            }
                        });

                        $('#coupon-redirect').hide();
                        $('#ajax-Payment-On-Exam-Centre').show();
                        $('input[id^="edit-finish"]').val('Pay & Register Now');
                    }
                }
            });

            $('input[id^="edit-coupon"]').keypress(function(e) {
                var regex = new RegExp("^[a-zA-Z0-9]+$");
                var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }

                e.preventDefault();
                return false;
            });

            // coupon code end

            $("#withoutCoupanProcess").click(function() {
                var url = $(this).attr('data-url');
                $.ajax({
                    type: "POST",
                    async: "false",
                    cache: false,
                    url: url,
                    data: {},
                    beforeSend: function() {
                        $('.loader-wrapper').show();
                    },
                    success: function(data) {
                        window.location.replace('/dashboard');
                    }
                });
            });
        }
    };
})(Drupal, jQuery);