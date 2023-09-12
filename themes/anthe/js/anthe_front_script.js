(function(Drupal, $) {
    'use strict';
    Drupal.behaviors.anthe = {
        attach: function(context, settings) {
            var seat_capacity_var = drupalSettings.seat_capacity_var;
            var seat_capacity_data = drupalSettings.seat_capacity_data;
            if (seat_capacity_var !== 'undefined' && seat_capacity_var) {
                $.each(seat_capacity_data, function(index, value) {
                    if ($("select.exam-date option[value='" + index + "']").length > 0) {
                        $("select.exam-date option[value='" + index + "']").text(value.text);
                        $("select.exam-date option[value='" + index + "']").css('color', value.color);
                    }
                    if ($("select.exam-dates option[value='" + index + "']").length > 0) {
                        $("select.exam-dates option[value='" + index + "']").text(value.text);
                        $("select.exam-dates option[value='" + index + "']").css('color', value.color);
                    }
                });
                $('select.exam-date').selectmenu({
                    open: function() {
                        $('div.ui-selectmenu-menu li.ui-menu-item').each(function(idx) {
                            $(this).attr("style", $('select.exam-date option').eq(idx).attr('style'));
                        })
                    }
                });
                $('select.exam-dates').selectmenu({
                    open: function() {
                        $('div.ui-selectmenu-menu li.ui-menu-item').each(function(idx) {
                            $(this).attr("style", $('select.exam-dates option').eq(idx).attr('style'));
                        })
                    },
                    change: function(event, ui) {
                        var exam_date_val = ui.item.value;
                        if (exam_date_val) {
                            var parse_examdate = exam_date_val.split("_");
                            $('#msg-seat-availability').html('');
                            $('.exam-dates').next('.ui-selectmenu-button').removeClass("custom-error");
                            if (parse_examdate && parse_examdate[1] == 0) {
                                //console.log(parse_examdate[1]);
                                $('#msg-seat-availability').html('<div class="error-text">No Seat available Please select another date </div>');
                                $('.exam-dates').next('.ui-selectmenu-button').addClass("custom-error");
                            }
                            if (parse_examdate) {
                                $('input[name="field_exam_date[0][value]"]').val(parse_examdate[0]);
                                //$('.exam-dates').next('.ui-selectmenu-button').removeClass("custom-error");
                            }
                        }
                    }
                });
                $('select.exam-date').on('selectmenuchange', function() {
                    $(".ui-selectmenu-text").attr("style", $('select.exam-date option:selected').attr("style"));
                });
                $('select.exam-dates').on('selectmenuchange', function() {
                    $(this).next('.ui-selectmenu-button').find(".ui-selectmenu-text").attr("style", $('select.exam-dates option:selected').attr("style"));
                });
                //console.log(seat_capacity_data);
            }

            var exam_updatecontdowns = drupalSettings.examcontdown;
            if (exam_updatecontdowns !== 'undefined' && exam_updatecontdowns) {
                exam_updatecontdown(exam_updatecontdowns);
            }

            var confirm_back_message = drupalSettings.confirm_back_message;
            $('#step2button_previous, #step3button_previous').click(function(event) {
                event.preventDefault();
                doConfirm(confirm_back_message, function yes() {
                    window.location.reload();
                }, function no() {
                    // do nothing
                });
            });

            $("#sch_step2previous_button").click(function(event) {
                sessionStorage.setItem("isBack", true);
                $('#step2button_previous').trigger('click');
            });
            $("#sch_step3previous_button").click(function(event) {
                sessionStorage.setItem("isBack", true);
                $('#step3button_previous').trigger('click');
            });

            var examclass_exists = $('.exam-date').length;
            if (examclass_exists > 0) {
                var examdate_option = selectasinput('exam-date');

                if (examdate_option.length == 1) {
                    //console.log(examdate_option.length);
                    $("select.exam-date").css('background-image', 'none');
                    $('select.exam-date option:eq(1)').prop("selected", "selected");
                    $("select.exam-date").css('pointer-events', 'none');
                    $('select.exam-date').selectmenu();
                    $('select.exam-date').selectmenu("refresh");
                    $("select.exam-date").next('.ui-selectmenu-button').css('background-image', 'none');
                    $("select.exam-date").next('.ui-selectmenu-button').css("pointer-events", "none");
                }
            }

            var exam_mode_class_exists = $('.exam-mode').length;
            var current_path = window.location.href;
            var exists = current_path.includes("createdby");
            if (exam_mode_class_exists > 0) {
                $('.exam-mode').on('change', function() {
                    if ($(this).hasClass("custom-error")) {
                        $(this).removeClass("custom-error");
                    }
                    var examstate_val = $("select.exam-state option:selected, select#edit-field-state option:selected").val();
                    if (examstate_val && exists != true) {
                        $("select.exam-state, select#edit-field-state").val('').change();
                    }
                });
            }

            if (exists == true) {
                //$("#anthe-lead input[name='student_dob']").css('pointer-events','none');
                $("#anthe-lead .student-dob").css('pointer-events', 'none');
                $("#anthe-lead select[name='classtream']").css('pointer-events', 'none');
                $("#anthe-lead select[name='exam_state']").css('pointer-events', 'none');
                $("#anthe-lead select[name='branch_code']").css('pointer-events', 'none');
            }
            //All readonly fields when get sf_id in url.
            var sfExist = current_path.includes("sf_id");
            if (sfExist == true && $(".student-name").val() != '') {
                $(':radio.mode_type').click(function() {
                    return false;
                });
                $("#anthe-lead .student-dob").css('pointer-events', 'none');
                $("#anthe-lead .student-dob, .student-name, .student-email, .father-name, .classtream, .school-board, .exam-state, .branch-code, .exam-mode, .exam-date, #edit-school-name,#edit-student-city").addClass('readonly-fields');
                // $("#anthe-lead .student-name").addClass('readonly-fields');
                $("#anthe-lead select[name='classtream']").css('pointer-events', 'none');
                $("#edit-school-board").css('pointer-events', 'none');
                $("#anthe-lead select[name='exam_state']").css('pointer-events', 'none');
                $("#anthe-lead select[name='school_name']").css('pointer-events', 'none');
                $("#anthe-lead select[name='student_city']").css('pointer-events', 'none');
                $("#anthe-lead select[name='exam_date']").css('pointer-events', 'none');
                $("#anthe-lead select[name='branch_code']").css('pointer-events', 'none');
                $(".mode_type").css('pointer-events', 'none');
                $(".exam-mode").css('pointer-events', 'none');
            }
            if ($(".user_exam_type").val() == 'ANTHE' && $(".psid-user").val() == 1) {
                if ($('.student-name').is('[readonly]')) {
                    $('.student-name').addClass('readonly-fields');
                }
                if ($('.student-email').is('[readonly]')) {
                    $('.student-email').addClass('readonly-fields');
                }
                if ($('.father-name').is('[readonly]') && $('.father-name').val().trim() != '') {
                    $('.father-name').addClass('readonly-fields');
                } else {
                    $('.father-name').removeAttr('readonly');
                }
                if ($('.student-dob').is('[readonly]')) {
                    $("#anthe-lead .student-dob").css('pointer-events', 'none');
                    $('.student-dob').addClass('readonly-fields');
                }
            }
            // Change for state and Center Label based on Online, offline and textfield value
            var exam_mode_class_exists = $('.exam-mode').length;
            if (exam_mode_class_exists > 0) {
                var exammode_val = $("select.exam-mode option:selected").val();
                if (exammode_val != '') {
                    exam_state_center_text(exammode_val);
                }
                $('.exam-mode').on('change', function() {
                    var exammode_val = $(this).val();
                    exam_state_center_text(exammode_val);
                });
            }
            var input_exam_mode_class_exists = $('input.exam-mode').length;
            if (input_exam_mode_class_exists > 0) {
                var input_exam_mode_val = $("input.exam-mode").val();
                exam_state_center_text(input_exam_mode_val);
            }

            var exam_mode_class_exists = $('.classtream, #edit-field-exam-detail-class-stream').length;
            if (exam_mode_class_exists > 0) {
                $('.classtream, #edit-field-exam-detail-class-stream').on('change', function() {
                    if ($(".user_exam_type").val() == 'ANTHE') {
                        $(this).siblings('.form-item--error-message').html('');
                        $(this).css("border-color", "#ddd");
                    }
                    if ($(this).hasClass("custom-error")) {
                        $(this).removeClass("custom-error");
                    }
                    var examstate_val = $("select.exam-state option:selected, select#edit-field-state option:selected").val();
                    if (examstate_val) {
                        $("select.exam-state, select#edit-field-state").val('').change();
                    }
                    /*var cbtcentre = $("select.cbt-centre option:selected").val();
                    if(cbtcentre) {
                     $("select.cbt-centre").val('').change();
                    }*/
                });
            }
            $('.hasDatepicker').on('change', function() {
                // if($(".user_exam_type").val() == 'ANTHE') {
                $(this).siblings('.form-item--error-message').html('');
                $(this).css("border-color", "#ddd");
                // }
            });
            $('.exam-state').on('change', function() {
                if ($(".user_exam_type").val() == 'ANTHE') {
                    $(this).siblings('.form-item--error-message').html('');
                    $(this).css("border-color", "#ddd");
                }
            });
            $('.branch-code').on('change', function() {
                if ($(".user_exam_type").val() == 'ANTHE') {
                    $(this).siblings('.form-item--error-message').html('');
                    $(this).css("border-color", "#ddd");
                }
            });
            $('.exam-mode').on('change', function() {
                if ($(".user_exam_type").val() == 'ANTHE') {
                    $(".user_exam_mode").val($(this).val());
                }
            });
            var pg_empty_status = drupalSettings.pg_empty_status;
            var pg_success_status = drupalSettings.pg_success_status;
            //console.log(pg_empty_status);
            $(".pg_empty_message_text").css('display', 'none');
            if (pg_empty_status !== 'undefined' && pg_empty_status) {
                $("#ajax-Payment-On-Exam-Centre").css('display', 'none');
                $("input[value='PROCEED FOR PAYMENT']").css('display', 'none');
                $(".pg_empty_message_text").css('display', 'block');
                $('.pg_empty_message_text').innerHTML = scholarship_startTimer('scholarship_exam_timer', 60);
            } else {
                if (pg_success_status !== 'undefined' && pg_success_status) {
                    var pg_redirect_url = drupalSettings.pg_redirect_url;
                    console.log(pg_redirect_url);
                    if (pg_redirect_url !== 'undefined' && pg_redirect_url) {
                        window.location.href = drupalSettings.pg_redirect_url;
                    }
                }
            }

            var otp_val = $(".otp").val();
            try {
                jQuery(".lead-form-block .anthe-lead .form-item-email-otp").attr('style', 'display: none');
                if (jQuery(".lead-form-block .anthe-lead .js-form-item input").hasClass("error")) {
                    jQuery(".lead-form-block .anthe-lead .form-item-email-otp").attr('style', 'display: block');
                }
                if (otp_val.length > 0) {
                    jQuery(".lead-form-block .anthe-lead .form-item-otp").attr('style', 'display: block');
                    jQuery(".lead-form-block .signle-step-form .form-item-otp").attr('style', 'display: block');
                    jQuery(".lead-form-block .anthe-lead .form-item-email-otp").attr('style', 'display: block');
                }
            } catch (err) {
                /* TODO handle catch error */
            }
            $('.exam-centre').change(function() {
                var val_exam_centre = $(this).val();
                $('#edit-field-preferred-branch-0-value').val(val_exam_centre);
                $('#edit-field-preferred-branch-0-value').prop("readonly", true);
            });

            $('.cbt-centre').change(function() {
                if ($(this).hasClass("custom-error")) {
                    $(this).removeClass("custom-error");
                }
                /*var val_cbt_centre = $(this).val();
                $('#edit-field-exam-center-0-value').val(val_cbt_centre);
                $('#edit-field-exam-center-0-value').prop("readonly",true);*/

                var exammode_val = $('.exam-mode').val();
                exammode_val = exammode_val.split('-');
                var exammode_str = $.trim(exammode_val[0]).toLowerCase();

                if (exammode_str == 'offline') {
                    $('#exam_address_replace').attr('style', 'display: none');
                };
            });

            if (jQuery('.form-date').length) {;
                '  '
                jQuery('.form-date').attr({
                    'type': 'text',
                    'onkeydown': 'return false',
                    'placeholder': 'dd-mm-yyyy',
                    'autocomplete': 'off'
                });
            }
            jQuery('.exam-mode').on('change', function() {
                document.cookie = "exam_mode=" + jQuery(this).val();
            });
            jQuery('.exam-state').on('change', function() {
                document.cookie = "exam_state=" + jQuery(this).val();
            });
            if ($(".user_exam_type").val() != 'ANTHE') {
                jQuery('select[name="branch_code"]').change();
                jQuery('select[name="exam_date"]').change();
            }

            $('select[name="custom_user_exam_date"]').on('change', function(e) {
                if ($(this).hasClass("custom-error")) {
                    $(this).removeClass("custom-error");
                }
                var examdate = $(this).val();
                if ((examdate).length > 0) {
                    var parse_examdate = examdate.split("_");
                    $('#msg-seat-availability').html('');
                    if (parse_examdate && parse_examdate[1] == 0) {
                        $('#msg-seat-availability').html('<div class="error-text">No Seat available Please select another date </div>');

                    }

                }
            });

            var suburl = (location.search).substr(1);
            if (suburl != "") {
                var a = "?" + (location.search).substr(1)
                var href_medical = jQuery('.utm-url-medical').attr('href');
                var utm_param_medical = href_medical + a;
                var myCharacter = escapeSpecialChars('?');
                var characterCount = 0;
                characterCount = (utm_param_medical.match(new RegExp(myCharacter, 'g')) || []).length;
                if (characterCount == 1) {
                    jQuery(".utm-url-medical").attr("href", utm_param_medical);
                }

                var href_engineering = jQuery('.utm-url-engineering').attr('href');
                var utm_param_engineering = href_engineering + a;
                var myCharacter = escapeSpecialChars('?');
                var characterCount = 0;
                characterCount = (utm_param_engineering.match(new RegExp(myCharacter, 'g')) || []).length;
                if (characterCount == 1) {
                    jQuery(".utm-url-engineering").attr("href", utm_param_engineering);
                }

                var href_foundation = jQuery('.utm-url-foundation').attr('href');
                var utm_param_foundation = href_foundation + a;
                var myCharacter = escapeSpecialChars('?');
                var characterCount = 0;
                characterCount = (utm_param_foundation.match(new RegExp(myCharacter, 'g')) || []).length;
                if (characterCount == 1) {
                    jQuery(".utm-url-foundation").attr("href", utm_param_foundation);
                }
                // Common Page
                var href_sparrk = jQuery('#sparrk_register').attr('href');
                var utm_param_sparrk = href_sparrk + a;
                var myCharacter = escapeSpecialChars('?');
                var characterCount = 0;
                characterCount = (utm_param_sparrk.match(new RegExp(myCharacter, 'g')) || []).length;
                if (characterCount == 1) {
                    jQuery("#sparrk_register").attr("href", utm_param_sparrk);
                }
                var href_nest = jQuery('#nest_register').attr('href');
                var utm_param_nest = href_nest + a;
                var myCharacter = escapeSpecialChars('?');
                var characterCount = 0;
                characterCount = (utm_param_nest.match(new RegExp(myCharacter, 'g')) || []).length;
                if (characterCount == 1) {
                    jQuery("#nest_register").attr("href", utm_param_nest);
                }
                // Common Page
            }
            $('.otp-message-class').delay(3000).fadeOut();

            //Update User Logout link Accoridng Domain
            var host = location.hostname;
            var protocol = location.protocol;
            var logoutUrl = protocol + '//' + host + '/user/logout';
            jQuery("#user-logout-js a[href]").attr('href', logoutUrl);

            //Update Test URL for removing end character
            var test_link = jQuery(".begin-exam-link-up a").prop('href');
            if (typeof test_link != 'undefined') {
                var update_test_link = test_link.replace("%3D%3D", "");
                update_test_link = test_link.replace("%3D", "");
                jQuery(".begin-exam-link-up a").attr("href", update_test_link);
            }

            //Update Test Link, when there button is disabled
            var opacity_val = jQuery(".begin-exam-link-up a").css("opacity");
            if (opacity_val < 1) {
                jQuery(".begin-exam-link-up a").attr("href", "#");
            }

            jQuery(".begin-exam-link-up a").unbind().click(function() {
                var url = $(this).attr('href');
                $.urlParam = function(name) {
                    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
                    if (results) {
                        return results[1] || 0;
                    }
                }
                var params = $.urlParam('schedule_data');
                if (typeof params != 'undefined') {
                    jQuery.ajax({
                        type: "POST",
                        cache: false,
                        url: drupalSettings.path.baseUrl + "start-main-journey",
                        data: {
                            params: params
                        },
                        success: function(data) {
                            //console.log('result=='+data.sucess);
                        }
                    });
                }
            });

            // Anthe Profile OTP Validation
            $('.global-profile-otp-verify').on('click', function() {
                //TIMER
                var timeleft = 30;
                var downloadTimer = setInterval(function() {
                    if (timeleft <= 0) {
                        clearInterval(downloadTimer);
                        //change Value of button
                        $('.global-profile-otp-verify').val('Resend OTP');
                        $('.global-profile-otp-verify').prop('disabled', false);
                    } else {
                        $('.global-profile-otp-verify').val('Resend OTP after ' + timeleft + ' secs');
                        $('.global-profile-otp-verify').prop('disabled', true);
                    }
                    timeleft -= 1;
                }, 1000);
            });
        }
    };

    function escapeSpecialChars(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    }
})(Drupal, jQuery);

// use when you dont't need drupal behaviour
(function($, Drupal) {
    $(document).ready(function() {
        if (window.location.pathname == '/dashboard') {
            $('.dashboard-menu-uat').addClass('is-active');
        }
        //Ajax Call when we select Exam Date
        var input_exam_date_val = jQuery('input[name="exam_date"]').val();
        if (input_exam_date_val != '' && input_exam_date_val != undefined) {
            jQuery.ajax({
                type: "POST",
                cache: false,
                url: drupalSettings.path.baseUrl + "anthe/register-get-paymentmode",
                //data: {branch : id},
                beforeSend: function() {
                    jQuery('.loader-wrapper').show();
                },
                success: function(data) {
                    jQuery('#ajax-Payment-On-Exam-Centre').html(data.html);
                    jQuery('.loader-wrapper').hide();
                }
            });
        }

        if (window.location.pathname == '/exam/sch-forgot-pwd') {
            window.history.forward();
        }

        $("#node-exam-details-edit-form select").each(function() {
            $(this).find('option[selected="selected"]').each(function() {
                $(this).prop('selected', true);
            });
        });
        var exam_mode_class_exists = $('#node-exam-details-edit-form .exam-mode').length;
        if (exam_mode_class_exists > 0) {
            var exammode_val = $("select.exam-mode option:selected").val();
            if (exammode_val) {
                default_exam_mode_text(exammode_val);
            }
        }

        $('#node-exam-details-edit-form .otp').on('keypress', function(event) {
            $(this).removeClass("custom-error");
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        });
        $('#node-exam-details-edit-form select[name=field_state]').on('change', function(event) {
            $(this).removeClass("custom-error");
        });
        $("#node-exam-details-edit-form #edit-submit").click(function(event) {
            event.preventDefault();
            var mobile = $(".mobile-no").val();
            var otp = $(".otp").val();
            var exam_date = $(".exam-dates").val();
            var exam_centre = $(".cbt-centre").val();
            //var state = $("input[name=custom_state]").val();
            var state_val = $("select[name=field_state] option:selected").val();
            var otp_length = otp.length;
            var flag = true;
            /*if(stream == ''){
              $('#stream-msg').html('<div class="error-text">Please select stream</div>').show().delay(2000).hide(1000);
              $('#edit-field-exam-detail-class-stream').css('border','#FF0000 1px solid');
              $('#edit-field-exam-detail-class-stream').css('box-shadow','none');
               flag = false;
            }*/
            if (otp == '') {

                /*$('#node-exam-details-edit-form .otp').css('border','#FF0000 1px solid');
                $('#node-exam-details-edit-form .otp').css('box-shadow','none');*/
                $('#node-exam-details-edit-form .otp').addClass('custom-error');
                $('.otp-error').html('<div class="error-text">OTP field required</div>').show().delay(2000).hide(1000);

                flag = false;
            } else if (otp_length > 0) {

                $.ajax({
                    type: "POST",
                    cache: false,
                    url: drupalSettings.path.baseUrl + "anthe/exam-update-verify",
                    data: {
                        mobile: mobile,
                        otp_val: otp
                    },
                    async: false,
                    beforeSend: function() {
                        //$('.loader-wrapper').show();
                    },
                    success: function(data) {
                        var result = jQuery.parseJSON(data);
                        if (result.success == false) {
                            flag = false;
                            $('.otp-error').html('<div class="error-text">' + result.message + '</div>').show().delay(2000).hide(1000);
                            /*$('#node-exam-details-edit-form .otp').css('border','#FF0000 1px solid');
                            $('#node-exam-details-edit-form .otp').css('box-shadow','none');*/
                            $('#node-exam-details-edit-form .otp').addClass('custom-error');
                        }

                    }
                });
            }
            if (state_val == '') {
                $('#state-msg').html('<div class="error-text">Please select state</div>').show().delay(2000).hide(1000);
                /*$('select[name=field_state]').css('border','#FF0000 1px solid');
                $('select[name=field_state]').css('box-shadow','none');*/
                $('select[name=field_state]').addClass('custom-error');
                flag = false;
            }
            if (exam_date == '') {
                $('#msg-seat-availability').html('<div class="error-text">Please select Exam Date</div>').show().delay(2000).hide(1000);
                /*$('.exam-dates').css('border','#FF0000 1px solid');
                $('.exam-dates').css('box-shadow','none');*/
                $('.exam-dates').addClass('custom-error');
                $('.exam-dates').next('.ui-selectmenu-button').addClass("custom-error");
                flag = false;
            } else if (exam_date.length > 0) {
                var parse_examdate = exam_date.split("_");
                if (parse_examdate && parse_examdate[1] == 0) {
                    $('#msg-seat-availability').html('<div class="error-text">No Seat available Please select another date </div>').show().delay(2000).hide(1000);
                    /*$('.exam-dates').css('border','#FF0000 1px solid');
                    $('.exam-dates').css('box-shadow','none');*/
                    $('.exam-dates').addClass('custom-error');
                    $('.exam-dates').next('.ui-selectmenu-button').addClass("custom-error");
                    flag = false;
                }
            }

            if (exam_centre == '') {
                $('#msg-location-remaining').html('<div class="error-text">Please select Exam Centre.</div>').show().delay(2000).hide(1000);
                /*$('.cbt-centre').css('border','#FF0000 1px solid');
                $('.cbt-centre').css('box-shadow','none');*/
                $('.cbt-centre').addClass('custom-error');
                flag = false;
            }

            if (flag) {
                $(this).unbind('click');
                $("#node-exam-details-edit-form #edit-submit").click();
            }
        });
        /*if (performance.navigation.type == 1){
          var ua =  navigator.userAgent.toLowerCase();
           var check = function(r) {
            return r.test(ua);
          };
          var isfirfox = check(/firefox/);
          if(isfirfox){
            var exammode_val = $("select[name=custom_exam_mode] option:selected").val();
            var exammode_val = exammode_val.split('-');
            var exammode_str = jQuery.trim(exammode_val[0]).toLowerCase();
            $('input[name="field_exam_update_mode[0][value]"]').val(exammode_str);
            $("select#edit-field-state").val('');
          }
          
        }*/
        $(".nav-tabs li a").click(function(e) {
            e.preventDefault();
            var active = $(this).attr("href");
            $(".tab-content .tab-pane").removeClass("active");
            $(".tab-content .tab-pane" + active).addClass("active");
        });
        var profile_exam_details = drupalSettings.profile_exam_details;
        var exam_date = drupalSettings.exam_date;
        var profile_msg = drupalSettings.profile_msg;
        var communication_message = drupalSettings.communication_message;
        var d1 = new Date();
        var d2 = new Date(exam_date);
        if (d1.getTime() < d2.getTime())
            $('#education-field').prepend(profile_exam_details);
        if (communication_message) {
            $('#profile-text').before('<div class="communication-text text-center">' + communication_message + '<div>');
        }
        if (profile_msg) {
            $('#profile-text').before('<p class="error-text " style="text-align: center;">' + profile_msg + '<p>');
        }
        // if(window.location.href.endsWith('profile')) {
        //   $(".messages--status .messages__item:contains('The changes have been saved.')").hide();
        // }
        jQuery('#edit-current-pass').val('12345');
        // jQuery('.form-item-current-pass').css('display', 'none');
        $(".lead-first-btn").prop('disabled', true);
        // Allow only number in mobile field
        $(".mobile-no").keyup(function() {
            var $this = $(this);
            $this.val($this.val().replace(/[^\d.]/g, ''));
        });
        $(".signle-step-form .form-item-otp, .signle-step-form .form-item-email-otp").attr('style', 'display: none');
        // otp callback code
        $("body").on("click", ".global-otp-verify , .mobile-global-otp-verify", function(e) {
            if ($(".form-item-otp").children("div.form-item--error-message").text().trim() == "You have reached maximum incorrect OTP tries. Try again after 10 min") {
                $('.otp-error').html('');
                $(".global-otp-verify , .mobile-global-otp-verify,input[name=op]").prop('disabled', true);
                $('#otp').hide();
                $(".global-otp-verify , .mobile-global-otp-verify,input[name=op]").attr('style', 'cursor: not-allowed;');
                $('.otp-error').html(data.global_otp_message).show();
                $('.loader-wrapper').css('display', 'none');
                return false;
            }
            e.preventDefault();
            var mobile_no = $("#edit-mobile-no,input[name=mobile_no]").val();
            if (String(mobile_no).charAt(0) == 0 && String(mobile_no).length == 10) {
                if (!$(".mobile-no").parent().children('div.form-item--error-message').length) {
                    $("div.form-item-mobile-no").append('<div class="form-item--error-message">Mobile number can not start with 0</div>');
                }
                //add message in error div.
                if ($(".mobile-no").parent().children('div.form-item--error-message').text().trim() == '') {
                    $(".mobile-no").parent().children('div.form-item--error-message').html('Mobile number can not start with 0');
                }
                $(".mobile-no").addClass('error');
                $(".mobile-no").css("border-color", "#D62C26");
                return false;
            }
            //check for Number only not Alphabets
            if (mobile_no != '' && isNaN(mobile_no)) {
                if (!$(".mobile-no").parent().children('div.form-item--error-message').length) {
                    $("div.form-item-mobile-no").append('<div class="form-item--error-message">Mobile number can not start with 0</div>');
                }
                //add message in error div.
                if ($(".mobile-no").parent().children('div.form-item--error-message').text().trim() == '') {
                    $(".mobile-no").parent().children('div.form-item--error-message').html('Mobile number can not start with 0');
                }
                $(".mobile-no").addClass('error');
                $(".mobile-no").css("border-color", "#D62C26");
                return false;
            }
            var name = $(this).attr("data-id");
            var studentName = '';
            var global_otp_flag = true;
            if (name == 'anthe-otp') {
                var mobileparam = $.trim($(".mobile-no").val());
                var global_data_id = $(this).attr('data-id');

                res = mobileparam.substr(0, 2);
                //res = mobileparam.charAt(0);

                if (mobileparam == '' || mobileparam.length < 10) {
                    $('.mobile-no').addClass('error');
                    //$('.otp-error').html('Please enter 10 digit Mobile Number or 11 digit PSID.').show().delay(2000).hide(1000);
                    $("#edit-mobile-no").css("border-color", "#D62C26");
                    global_otp_flag = false;
                } else if (res != '00' && mobileparam.length > 10) {
                    $('.mobile-no').addClass('error');
                    $('.otp-error').html('Please enter valid PSID').show().delay(2000).hide(1000);;
                    $("#edit-mobile-no").css("border-color", "#D62C26");
                    global_otp_flag = false;
                }
            }
            if (name == 'email-anthe-otp') {
                studentName = $("input[name=student_name]").val();
                var mobileparam = $.trim($(".student-email").val());
                var global_data_id = $(this).attr('data-id');
                var corpid = $(this).attr('data-cop-id');
                if (mobileparam == '') {
                    $('.otp-error').html('Please provide valid Official Email.').show().delay(2000).hide(1000);
                    global_otp_flag = false;
                }
            }

            if (name == 'exam-update') {
                var global_data_id = $(this).attr('data-id');
                var mobileparam = $.trim($(".mobile-no").val());
            }

            // If flag is true call controller via ajax
            if (global_otp_flag) {
                var global_otp_data = "&mobileparam=" + mobileparam + "&global_data_id=" + global_data_id + "&student_name=" + studentName + "&corpid=" + corpid;
                $.ajax({
                    type: "POST",
                    url: drupalSettings.path.baseUrl + "anthe/global-otp-verify",
                    data: global_otp_data,
                    cache: false,
                    beforeSend: function() {
                        $('.loader-wrapper').css('display', 'block');
                    },
                    success: function(data) {
                        // webengage start
                        var mobile_no = data.webengage_mobileparam;
                        var psid = get_cookie('anthe_webengage_c_psid') || '';
                        console.log("Webengage init key", webengage_init_key);
                        if (mobile_no.length == 10 || (mobile_no.length == 11 && mobile_no.substring(0, 2) == "00") && webengage.init(drupalSettings.anthe_webengage.webengage_init_key)) {
                            webengage_Otp_text = $('.otp-wrapper a, .mobile-otp-wrapper a').text();
                            otp_text = 'Get_OTP'
                            if (webengage_Otp_text == "Resend OTP") {
                                otp_text = 'Resend_OTP'
                            }
                            if (mobile_no.length == 11 && mobile_no.substring(0, 2) == "00") {
                                // console.log("Debug ")
                                // console.log("PSID"+ psid, "mOBILE"+mobile_number);
                                psid = null != get_cookie('anthe_webengage_c_psid') ? get_cookie('anthe_webengage_c_psid') : mobile_no;
                            }
                            mobile_number = null != get_cookie('anthe_webengage_c_mobile_number') ? get_cookie('anthe_webengage_c_mobile_number') : mobile_no;
                            console.log("Before 2 " + drupalSettings.anthe_webengage_lead_type + "otp text " + otp_text);
                            webengage.track(drupalSettings.anthe_webengage_lead_type + "_2_" + otp_text, {
                                campaign_name: drupalSettings.we_campaign_name,
                                user_mobile: mobile_number,
                                user_psid: psid,
                                exam_type: drupalSettings.anthe_webengage_exam_type,
                                Journey_type: drupalSettings.anthe_webengage_journey_type == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                            });
                        }
                        drupalSettings.anthe_webengage_form_name = ""
                        // console.log("PSID"+ psid, "mOBILE"+mobile_number);
                        //webengage end

                        if (data.global_verify_status == 'success') {
                            $(".global-otp-sent").addClass('anthe-hide');
                            $(".lead-first-btn").removeClass('anthe-hide');
                            $('.loader-wrapper').css('display', 'none');
                            $('.otp').val('');
                            $('.otp-success').html('');
                            // $('#edit-mobile-no').attr('readonly', true);
                            $(".anthe-lead .form-item-otp, .anthe-lead .form-item-email-otp").attr('style', 'display: block');
                            $(".signle-step-form .form-item-otp, .signle-step-form .form-item-email-otp").attr('style', 'display: block');
                            $('.otp-success').html(data.global_otp_message).show().delay(3000).hide(1000);
                            if (name == 'exam-update' || name == 'anthe-otp') {
                                var timeleft = 30;
                                if (name == 'anthe-otp' && data.global_within_time == 'true') {
                                    var timeleft = data.global_otp_timer;
                                }
                                $('#node-exam-details-edit-form .otp-wrapper a').html("Resend OTP after " + timeleft + " secs");
                                $('#time-left-iacst').html("Time Left : " + timeleft + " secs");
                                $('.otp-wrapper a, .mobile-otp-wrapper a').addClass("otp-text");
                                var downloadTimer = setInterval(function() {
                                    timeleft--;
                                    $('#time-left-iacst').html("Time Left : " + timeleft + " secs");
                                    $(".global-otp-verify , .mobile-global-otp-verify").prop('disabled', true);
                                    if (timeleft <= 0) {
                                        clearInterval(downloadTimer);
                                        $('.otp-wrapper a, .mobile-otp-wrapper a').text('Resend OTP');
                                        $(".global-otp-verify , .mobile-global-otp-verify").removeClass('anthe-hide');
                                        $('#time-left-iacst').html("");
                                        $(".global-otp-verify , .mobile-global-otp-verify").prop('disabled', false);
                                        $('.otp-wrapper a, .mobile-otp-wrapper a').removeClass("otp-text");
                                    }
                                }, 1000);

                            }
                            //$(".lead-first-btn").prop('disabled', false);
                        } else if (data.global_verify_status == 'error') {
                            $('.otp-error').html('');
                            //$('.otp-wrapper a, .mobile-otp-wrapper').html('<a class="global-otp-verifys" data-id="' + name + '" href="#">Resend OTP</a>');
                            $('.otp-wrapper a, .mobile-otp-wrapper a').text('Resend OTP');
                            // $(".anthe-lead .form-item-otp, .anthe-lead .form-item-email-otp").attr('style', 'display: block');
                            // $(".signle-step-form .form-item-otp, .anthe-lead .form-item-email-otp").attr('style', 'display: block');
                            $('.otp-error').html(data.global_otp_message).show().delay(3000).hide(1000);
                            $('.loader-wrapper').css('display', 'none');
                        } else if (data.global_verify_status == 'block') {
                            //disabled button
                            $('.otp-error').html('');
                            $(".global-otp-verify , .mobile-global-otp-verify,input[name=op]").prop('disabled', true);
                            $('#otp').hide();
                            $(".global-otp-verify , .mobile-global-otp-verify,input[name=op]").attr('style', 'cursor: not-allowed;');
                            $('.otp-error').html(data.global_otp_message).show();
                            $('.loader-wrapper').css('display', 'none');
                        } else {
                            console.log('Something Went Wrong');
                        }
                    },
                    error: function(error) {

                    }
                });
            }
        });

        var timeout;

        function countdown(counter) {
            x = counter;
            if (x > 0) {
                timeout = setTimeout(function(timeout) {
                    var otp_length = $(".otp").val().length;
                    if (otp_length == 4) {
                        clearTimeout(timeout);
                        $(".lead-first-btn").prop('disabled', false).addClass("invert-btn");
                        $("#node-exam-details-edit-form  #edit-submit").prop('disabled', false).addClass("invert-btn");
                    } else {
                        $(".lead-first-btn").prop('disabled', true).removeClass("invert-btn");
                        $("#node-exam-details-edit-form  #edit-submit").prop('disabled', true).removeClass("invert-btn");
                        countdown(1);
                    }
                }, 100);
            }
        };
        countdown(1);
        $('body').on("keyup paste", ".otp", function() {
            var otp_length = $(this).val().length;
            if (otp_length == 4) {
                $(".lead-first-btn").prop('disabled', false).addClass("invert-btn");
                $("#node-exam-details-edit-form  #edit-submit").prop('disabled', false).addClass("invert-btn");
            } else {
                $(".lead-first-btn").prop('disabled', true).removeClass("invert-btn");
                $("#node-exam-details-edit-form  #edit-submit").prop('disabled', true).removeClass("invert-btn");
            }
            setTimeout(function() {
                var otp_length = $(".otp").val().length;
                if (otp_length == 4) {
                    $(".lead-first-btn").prop('disabled', false).addClass("invert-btn");
                    $("#node-exam-details-edit-form  #edit-submit").prop('disabled', false).addClass("invert-btn");
                } else {
                    $(".lead-first-btn").prop('disabled', true).removeClass("invert-btn");
                    $("#node-exam-details-edit-form  #edit-submit").prop('disabled', true).removeClass("invert-btn");
                }
            }, 100);
        });

        $('body').on('click', '.quicktabs-wrapper .quicktabs-tabs li', function(e) {
            $('.quicktabs-wrapper .quicktabs-tabs li').removeClass('active');
            $(this).addClass('active');
            $('.quicktabs-main .quicktabs-tabpage > div').hide();
            $('.quicktabs-main .quicktabs-tabpage > div').eq($(this).index()).show();
        });
        $('.testimonial-slider-wrap').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: false,
            dots: true,
            appendArrows: $(".slider-btn"),
        });
        $('body').on('click', '.scholarship-tab li', function() {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $('.scholarship-content .table-wrapper table').hide()
            $('.scholarship-content .table-wrapper table').eq($(this).index()).show();
        });

        function tableScroll() {
            var scrollcurrent = $('.scholarship-content .table-wrapper').scrollTop();
            var scrollStop = $('.scholarship-content .table-wrapper').find('table').attr('display', 'table').height() - $('.scholarship-content .table-wrapper').height();
            if (scrollcurrent >= scrollStop - 50) {
                $('.scholarship-content .scroll-table span').css('opacity', '0');
            } else {
                $('.scholarship-content .scroll-table span').css('opacity', '1');
            }
        };

        $('body').on('click', '.scroll-table span', function() {
            $(this).parents('.table-wrapper').scrollTop($(this).parents('.table-wrapper').scrollTop() + 50);
        });

        $('.scholarship-content .table-wrapper').scroll(function() {
            tableScroll();
        });



        $('body').on('click', '.sidebar-toggle', function() {
            $(this).next('.aside-nav').slideToggle();
        });

        $('body').on('click', '.scholarship-mobile-view-wrapper h4', function() {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
            $(this).parents('.scholarship-accordian-item').siblings().find('h4').removeClass('active');
            $(this).parents('.scholarship-accordian-item').siblings().find('h4').children('span').text('+');
            $(this).parents('.scholarship-accordian-item').siblings().find('.scholarship-accordian-content').slideUp();
            if ($(this).hasClass('active')) {
                $(this).children('span').text('-');
            } else {
                $(this).children('span').text('+');
            }

        });


        $(this).scrollTop(0);
        //enroll click scroll

        $(".enroll-btn").click(function() {
            $('html,body').animate({
                    scrollTop: $(".anthe-lead").offset().top - 30
                },
                'slow');
        });
        // FAQ Accordian
        $('body').on('click', '.class-faq-que-ans h2', function(e) {
            $(this).toggleClass('active');
            $(this).parents('.views-row').siblings().find('h2').removeClass('active');
            $(this).parent().siblings().toggleClass('active').slideToggle();
            $('.class-faq-que-ans .views-row').removeClass('close-tab');
            $(this).parents('.views-row').siblings().addClass('close-tab');
            $('.close-tab .views-field-body').slideUp().removeClass('active');
        });
        setTimeout(function() {
            $('.class-faq-que-ans .views-row:first-child h2').click();
        }, 100);
        $('body').on('click', '.close-alert', function(e) {
            $(this).parents('.alert').slideUp();
        });
        // Main navigation Functionality on Mobile - Open
        $('body').on('click', '.menu-toggle', function() {
            $("#block-anthemainmenu").animate({
                left: "0"
            });
            $('#block-anthemainmenu').prepend('<div class="main-menu-close"></div>');
            $('#block-anthemainmenu .menu-item--expanded').prepend('<div class="sub-menu-list"></div>')
        });

        // Main navigation Functionality on Mobile - Close
        $('body').on('click', '.main-menu-close', function() {
            $("#block-anthemainmenu").animate({
                left: "-300px"
            });
            $(this).remove();
            $('.sub-menu-list').remove();
            $('#block-anthemainmenu .menu-item--expanded .menu').slideUp();
        });

        $('body').on('click', '.sub-menu-list', function() {
            $(this).parents('.menu-item--expanded').find('.menu').slideToggle();
            $(this).toggleClass('active');
            $(this).parent().siblings().find('ul').slideUp();
            $(this).parent().siblings().find('.sub-menu-list').removeClass('active');
        });
        // Home page banner image
        var imagePath = $('.anthe-banner-wrapper .banner').text();
        $('.home-banner-wrapper').css("background-image", 'url(' + imagePath + ')');
        // App View Accordian
        $('body').on('click', '.app-accordian', function() {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
            $(this).siblings().removeClass('active');
            $(this).next().siblings('.app-accordian-content').slideUp();
            $('.testimonial-slider-wrap').slick('refresh');
        });
        // Syllabus Accordian
        $('body').on('click', '.syllabus-accordian h2', function() {
            $(this).toggleClass('active');
            $(this).next().slideToggle();
            $(this).parent().siblings().find('h2').removeClass('active');
            $(this).parent().siblings().find('.syllabus-content').slideUp();
        });

        /* Disable Browser back button on login page */
        if (window.location.href.indexOf("/login") > -1) {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = function() {
                window.history.pushState(null, "", window.location.href);
            };
        }

        var inp = $('#edit-field-user-school-name-wrapper input[name="field_user_school_name[0][target_id]"]');
        var inpp = $('input[name="field_user_school_name_info[0][value]"]').val();
        if ((inp.val() == '') && (inpp != '')) {
            inp.val('Not in the list (0)');
        }
        jQuery('body').on('change', 'select[name="branch_code"], select[name="exam_date"]', function() {
            if ($(".user_exam_type").val() != 'ANTHE') {
                jQuery.ajax({
                    type: "POST",
                    cache: false,
                    url: drupalSettings.path.baseUrl + "anthe/register-get-paymentmode",
                    //data: {branch : id},
                    beforeSend: function() {
                        jQuery('.loader-wrapper').show();
                    },
                    success: function(data) {
                        jQuery('#ajax-Payment-On-Exam-Centre').html(data.html);
                        jQuery('.loader-wrapper').hide();
                    }
                });
            }
        });

        $('.later').on('click', function() {
            $('#popupModal').fadeOut();
        });
        // reset focus on lead form using mutationObserver
        var targetNodes = $(".anthe-lead #form-wrapper");
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var myObserver = new MutationObserver(mutationHandler);
        var obsConfig = {
            childList: true,
            characterData: false,
            attributes: false,
            subtree: false
        };

        targetNodes.each(function() {
            myObserver.observe(this, obsConfig);
        });

        function mutationHandler() {
            if ($(".error").length) {
                $(".error:first").focus();
            } else {
                $('.anthe-lead .form-text:first').focus();
            }
        }
        if (sessionStorage.getItem("isBack")) {
            var isBack = sessionStorage.getItem("isBack");
            if (isBack == "true") {
                $('.anthe-lead .form-text:first').focus();
            }
        }
        if (drupalSettings.anthe_profile_logout == 1) {
            var $input = jQuery('#refresh');
            $input.val() == 'yes' ? location.reload(true) : $input.val('yes');
        }

        $("#edit-field-user-guardian-name-0-value").attr("maxlength", "50");
        $("#edit-field-user-guardian-name-0-value").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if (!(inputValue >= 65 && inputValue <= 90) && inputValue != 32 && inputValue != 39 && inputValue != 8 && inputValue != 9 && inputValue != 190 && inputValue != 110) {
                event.preventDefault();
            }
        });

        setTimeout(function() {
            $('#edit-field-user-date-of-birth-0-value-date').datepicker({
                dateFormat: 'dd-mm-yy',
                changeMonth: true,
                changeYear: true,
            });
            if (typeof drupalSettings.start_date != "undefined" && typeof drupalSettings.end_date != "undefined") {
                var start_date = drupalSettings.start_date;
                var end_date = drupalSettings.end_date;
                var start_year = drupalSettings.start_year;
                var end_year = drupalSettings.end_year;
                $('#edit-field-user-date-of-birth-0-value-date').datepicker('option', {
                    'minDate': new Date(start_date),
                    'maxDate': new Date(end_date),
                    'yearRange': start_year + ":" + end_year
                });
            }
            $("#edit-field-user-date-of-birth-0-value-date").attr("title", 'Date (e.g. 31-10-2020)');
        }, 2500);

        $("#edit-field-user-mother-name-0-value").attr("maxlength", "50");
        $("#edit-field-user-mother-name-0-value").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if (!(inputValue >= 65 && inputValue <= 90) && inputValue != 32 && inputValue != 39 && inputValue != 8 && inputValue != 9 && inputValue != 190 && inputValue != 110) {
                event.preventDefault();
            }
        });

        $("#edit-field-user-address-0-address-address-line1").attr("maxlength", "50");
        $("#edit-field-user-address-0-address-address-line1").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if (inputValue >= 48 && inputValue <= 57) {
                if (event.shiftKey) {
                    return false;
                }
                return true;
            }
            if (!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 96 && inputValue <= 105) && inputValue != 32 && inputValue != 39 &&
                inputValue != 8 && inputValue != 191 && inputValue != 9 && inputValue != 109 && inputValue != 110 && inputValue != 190 &&
                inputValue != 189 && inputValue != 188 && inputValue != 111) {
                event.preventDefault();
            }
            if (!(inputValue >= 65 && inputValue <= 90)) {
                if (event.shiftKey) {
                    return false;
                }
            }
        });

        $("#edit-field-user-school-name-info-0-value").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if (!(inputValue >= 65 && inputValue <= 90) && inputValue != 32 && inputValue != 39 &&
                inputValue != 8 && inputValue != 191 && inputValue != 9 && inputValue != 109 && inputValue != 110 && inputValue != 190 &&
                inputValue != 189 && inputValue != 188 && inputValue != 111) {
                event.preventDefault();
            }
            if (!(inputValue >= 65 && inputValue <= 90)) {
                if (event.shiftKey) {
                    return false;
                }
            }
        });

        $("#edit-field-user-address-0-address-postal-code").attr("maxlength", "6");
        $("#edit-field-user-address-0-address-postal-code").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if (event.shiftKey) {
                return false;
            }
            if (inputValue >= 48 && inputValue <= 57) {
                return true;
            }
            if (!(inputValue >= 96 && inputValue <= 105) && inputValue != 8 && inputValue != 9) {
                event.preventDefault();
            }
        });
        $("#edit-field-user-school-name-0-target-id").removeAttr("disabled");

        $("#edit-field-user-school-name-0-target-id").attr("maxlength", "100");
        $("#edit-field-user-school-name-0-target-id").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if (!(inputValue >= 65 && inputValue <= 90) && !(inputValue >= 96 && inputValue <= 105) && inputValue != 32 && inputValue != 39 && inputValue != 8 && inputValue != 191 && inputValue != 9) {
                event.preventDefault();
            }
        });

        $("#edit-field-user-marks-value-0-value").keyup(function(event) {

            if ($('#edit-field-last-class-marks-percent').prop('checked') == true) {
                if (parseInt(this.value) > 100) {
                    this.value = 100;
                    return false;
                }
            }

        });

        $("#edit-field-user-marks-value-0-value").keydown(function(event) {

            var inputValue = event.charCode || event.keyCode || event.which;

            if ($('#edit-field-last-class-marks-percent').prop('checked') == true) {

                if ($(this).val() != '') {
                    if ($(this).val().substring($(this).val().indexOf("."), $(this).val().indexOf(".").length).length > 2 && inputValue != 8 && inputValue != 9) {
                        event.preventDefault();
                    }
                }

                if (event.shiftKey) {
                    return false;
                }

                if (!(inputValue >= 96 && inputValue <= 105) && inputValue != 39 && inputValue != 8 && inputValue != 16 && inputValue != 107 && inputValue != 109 && inputValue != 110 && inputValue != 9 && !(inputValue >= 48 && inputValue <= 57)) {
                    event.preventDefault();
                }
            } else if ($('#edit-field-last-class-marks-grade').prop('checked') == true) {
                if (!(inputValue >= 65 && inputValue <= 90) && inputValue != 187 && inputValue != 189 && inputValue != 8 && inputValue != 9 && inputValue != 107 && inputValue != 109 && inputValue != 61) {
                    event.preventDefault();
                }
            }

        });

        $("#edit-field-last-class-marks-percent").click(function() {
            $('#edit-field-user-marks-value-0-value').val('');
        });

        $("#edit-field-last-class-marks-grade").click(function() {
            $('#edit-field-user-marks-value-0-value').val('');
        });

        $("#edit-field-user-marks-value-0-value").focusout(function() {
            if ($('#edit-field-last-class-marks-percent').prop('checked') == true) {
                var value = $(this).val().split('.');
                if ($.isEmptyObject(value[1]) == false && value[1].length == 1) {
                    $(this).val($(this).val() + '0');
                }
                if ($.isEmptyObject(value[1]) && (value[0].length == 1 || value[0].length == 2)) {
                    $(this).val($(this).val() + '.00');
                }
                if ($(this).val() == '100') {
                    $(this).val('100.00');
                }
            }
        });


        $(".form-item-field-user-address-0-address-address-line1").append(
            $("#profile-user-address").html()
        );

        $(".country").off('change');

        var user_address = $(".form-item-user-address").get(0);
        Drupal.attachBehaviors(user_address);

        $("#profile-user-address").html("");
        $("#edit-user-address").val($("#edit-field-user-address-0-address-locality").val());
        $(".form-item-field-user-address-0-address-locality").hide();

        $(".form-item-field-user-academic-address-0-address-locality").append($("#profile-academic-address").html());
        var academic_address = $(".form-item-academic-address").get(0);
        Drupal.attachBehaviors(academic_address);
        $("#profile-academic-address").html("");
        $("#edit-academic-address").val($("#edit-field-user-academic-address-0-address-locality").val());
        $("#edit-field-user-academic-address-0-address-locality").hide();
        $('label[for="edit-field-user-academic-address-0-address-locality"]').hide();

        if (typeof $("#edit-user-address").val() != "undefined") {
            if (!$("#edit-user-address").val().includes("-")) {
                if ($("#edit-field-user-address-0-address-administrative-area").val() != "") {
                    $.each(drupalSettings.states_and_codes, function(index, value) {
                        if ($("#edit-field-user-address-0-address-administrative-area").val() == value) {
                            $("#edit-user-address").val(jQuery("#edit-user-address").val() + "-" + index);
                        }
                    });
                }
            }
        }

        if (typeof $("#edit-academic-address").val() != "undefined") {
            if (!$($("#edit-academic-address").val().includes("-"))) {
                if ($("#edit-field-user-academic-address-0-address-administrative-area").val() != "") {
                    $.each(drupalSettings.states_and_codes, function(index, value) {
                        if ($("#edit-field-user-academic-address-0-address-administrative-area").val() == value) {
                            $("#edit-academic-address").val(jQuery("#edit-academic-address").val() + "-" + index);
                        }
                    });
                }
            }
        }

        $(".form-item-field-user-address-0-address-administrative-area").hide();
        $(".form-item-field-user-academic-address-0-address-administrative-area").hide();

        $("#user-form #edit-submit").val("Preview");

        $("#edit-profile-preview-edit").hide();
        $("#edit-button").hide();

        $(document).on("click", "#edit-button", function() {
            $("#preview-hide").show();
            $("#user-form #edit-submit").val("Preview");
            $("#profile-preview").html("");
            $(".cancel").show();
            $("#edit-button").hide();
        });

        $('#edit-field-user-guardian-name-wrapper').append('<div class="error-profile" id="edit-field-user-guardian-name-wrapper-error"></div>');
        $('#edit-field-user-date-of-birth-wrapper').append('<div class="error-profile" id="edit-field-user-date-of-birth-wrapper-error"></div>');
        $('.form-item-field-user-address-0-address-country-code').append('<div class="error-profile" id="form-item-field-user-address-0-address-country-code-error"></div>');
        $('.form-item-field-user-academic-address-0-address-country-code').append('<div class="error-profile" id="form-item-field-user-academic-address-0-address-country-code-error"></div>');
        $('.form-item-academic-address').append('<div class="error-profile" id="form-item-academic-address-error"></div>');
        $('.form-item-user-address').append('<div class="error-profile" id="edit-user-address-error"></div>');
        $('.js-form-type-email').append('<div class="error-profile" id="js-form-type-email-error"></div>');
        $('.js-form-item-otp').append('<div class="error-profile" id="otp-error"></div>');

        $('#edit-field-user-school-name-0-target-id').focus(function() {

            var code = $("#edit-academic-address").val().split("-")[0];
            if (code) {
                $("#edit-field-user-academic-address-0-address-locality").val(code);
            };
            var code = $("#edit-academic-address").val().split("-")[1];
            if (code) {
                $("#edit-field-user-academic-address-0-address-administrative-area").val(
                    drupalSettings.states_and_codes[code.trim()]
                );
            }
        });
        $("#edit-field-user-guardian-name-0-value").on("blur", function() {
            $(this).val($(this).val().trim());
        });
        $("#user-form #edit-submit").click(function(event) {

            var str_id = "";
            var bool_error = false;
            if ($("#edit-user-address").val() == "") {
                str_id = "#edit-user-address";
                $('#edit-user-address-error').html("Please enter city.");
                $("#edit-user-address").addClass("hasError");
                bool_error = true;
            }
            if ($("#edit-field-user-guardian-name-0-value").val().trim() == "") {
                str_id = "#edit-field-user-guardian-name-0-value";
                $('#edit-field-user-guardian-name-wrapper-error').html("Please enter guardian name.");
                $("#edit-field-user-guardian-name-0-value").addClass("hasError");
                bool_error = true;
            }
            if ($("#edit-field-user-date-of-birth-0-value-date").val() == "") {
                str_id = "#edit-field-user-date-of-birth-0-value-date";
                $('#edit-field-user-date-of-birth-wrapper-error').html("Please enter DOB.");
                $("#edit-field-user-date-of-birth-0-value-date").addClass("hasError");
                bool_error = true;
            }
            if ($("#edit-mail").val() == "") {
                str_id = "#edit-mail";
                $('#js-form-type-email-error').html("Please enter Email.");
                $("#edit-mail").addClass("hasError");
                bool_error = true;
            }
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!emailReg.test($("#edit-mail").val())) {
                str_id = "#edit-mail";
                $('#js-form-type-email-error').html("Please provide valid email address.");
                $("#edit-mail").addClass("hasError");
                bool_error = true;
            }
            if ($("#edit-field-user-address-0-address-country-code--2").val() == "") {
                str_id = "#edit-field-user-address-0-address-country-code--2";
                $('#form-item-field-user-address-0-address-country-code-error').html("Please select Country.");
                $("#edit-field-user-address-0-address-country-code--2").addClass("hasError");
                bool_error = true;
            }
            if ($("#edit-field-user-academic-address-0-address-country-code--2").val() == "") {
                str_id = "#edit-field-user-academic-address-0-address-country-code--2";
                $('#form-item-field-user-academic-address-0-address-country-code-error').html("Please select Country.");
                $("#edit-field-user-academic-address-0-address-country-code--2").addClass("hasError");
                bool_error = true;
            }
            if ($('#otp').val() == '') {
                str_id = "#otp";
                $('#otp-error').html("Please enter OTP.");
                $("#otp").addClass("hasError");
                bool_error = true;
            }

            var bool_otp = false;

            $.ajax({
                type: "POST",
                cache: false,
                url: drupalSettings.path.baseUrl + "anthe/profile-otp-verify",
                data: {
                    otp: $('#otp').val()
                },
                async: false,
                success: function(data) {
                    var result = jQuery.parseJSON(data);
                    if (result.success == false) {
                        bool_error = true;
                        $('#otp-error').html("Please enter valid OTP.");
                        $("#otp").addClass("hasError");
                        bool_otp = true;
                    }
                }
            });

            if (bool_error) {
                $('html, body').animate({
                    'scrollTop': $(str_id).position().top
                }, 500);
                return false;
            }

            $("#edit-field-user-address-0-address-locality").val($("#edit-user-address").val());
            $("#edit-field-user-academic-address-0-address-locality").val($("#edit-academic-address").val());

            var code = $("#edit-user-address").val().split("-")[1];
            if (code) {
                $("#edit-field-user-address-0-address-administrative-area").val(
                    drupalSettings.states_and_codes[code.trim()]
                );
            };
            var code = $("#edit-academic-address").val().split("-")[1];
            if (code) {
                $("#edit-field-user-academic-address-0-address-administrative-area").val(
                    drupalSettings.states_and_codes[code.trim()]
                );
            };

            if (bool_error) {
                return false;
            }

            if ($(this).val() == "Preview") {
                event.preventDefault();

                $("#preview-hide").hide();
                var profile_img = $("#edit-user-picture-wrapper img").attr("src");
                if (profile_img == undefined) {
                    profile_img = 'https://d2flmtdfyoymgx.cloudfront.net/Aakash-Anthe/themes/anthe/images/user.png';
                }
                $content =
                    '<div class="preview-profile-picture"><label>Profile Picture</label><div class="image-widget"><img src="' + profile_img + '"/></div></div>';

                $content +=
                    '<div class="preview-profile-section"><label>Father/Guardian Name :</label> <span>' +
                    $("#edit-field-user-guardian-name-0-value").val() +
                    "</span></div>";
                $content +=
                    '<div class="preview-profile-section"><label>Mother Name :</label>  <span>' +
                    $("#edit-field-user-mother-name-0-value").val() +
                    " </span></div>";
                $content +=
                    '<div class="preview-profile-section"><label>Date of Birth :</label>  <span>' +
                    $("#edit-field-user-date-of-birth-0-value-date").val() +
                    " </span></div>";
                $content +=
                    '<div class="preview-profile-section"><label>Gender :</label>  <span>';
                if ($("#edit-field-user-gender-0").prop("checked")) {
                    $content += "Female</div>";
                } else if ($("#edit-field-user-gender-1").prop("checked")) {
                    $content += "Male</div>";
                } else {
                    $content += "</div> </span>";
                }

                $content += '<div class="preview-profile-section"><label>Email address :</label> <span>' + $("#edit-mail").val() + " </span></div>";
                $content += '<div class="preview-heading"><h4>Address</h4>';
                $content += '<div class="preview-profile-section"><label>Street address : </label> <span>' + $("#edit-field-user-address-0-address-address-line1").val() +
                    " </span></div>";
                $content += '<div class="preview-profile-section"><label>City : </label> <span>' + $("#edit-user-address").val().split('-')[0] + " </span></div>";
                var state = '';
                var code = $("#edit-user-address").val().split("-")[1];
                if (code) {
                    state = drupalSettings.states_and_codes[code.trim()];
                }
                $content += '<div class="preview-profile-section"><label>State : </label> <span>' + state + " </span></div>";

                $content += '<div class="preview-profile-section"><label>Pin code :</label> <span> ' + $("#edit-field-user-address-0-address-postal-code").val() +
                    " </span></div>";
                var country = $("#edit-field-user-address-0-address-country-code--2").val() == "IN" ? 'India' : '';
                $content += '<div class="preview-profile-section"><label>Country : </label> <span>' + country + " </span></div>";
                $content += "</div>";

                $content += '<div class="preview-heading"><h4>Academic Address</h4>';
                $content += '<div class="preview-profile-section"><label>City : </label> <span>' + $("#edit-academic-address").val().split('-')[0] + " </span></div>";

                var state = '';
                var code = $("#edit-academic-address").val().split("-")[1];
                if (code) {
                    state = drupalSettings.states_and_codes[code.trim()];
                }

                $content += '<div class="preview-profile-section"><label>State : </label> <span>' + state + " </span></div>";

                var country = $("#edit-field-user-academic-address-0-address-country-code--2").val() == "IN" ? 'India' : '';
                $content += '<div class="preview-profile-section"><label>Country : </label> <span>' + country + " </span></div>";
                $content += "</div>";

                $content += "<div class='preview-profile-section'><label>School Name : </label> <span>";

                if ($("#edit-field-user-school-name-0-target-id").val() != "" && $("#edit-field-user-school-name-0-target-id").val() != "Not in the list (0)") {
                    $content +=
                        $("#edit-field-user-school-name-0-target-id").val() + "</div>";
                } else {
                    $content +=
                        $("#edit-field-user-school-name-info-0-value").val() + "</span> </div>";
                }

                $content += "<div class='preview-profile-section'><label>Marks / Grade : </label> <span>" + $("#edit-field-user-marks-value-0-value").val() + "</span> </div>";
                var board = $("#edit-field-user-board").val() == "_none" ? '' : $("#edit-field-user-board").val();
                $content += "<div class='preview-profile-section'><label>Board : </label> <span>" + board + "</span></div>";
                $("#profile-preview").html($content);
                $(".cancel").hide();
                $("#edit-button").show();
            }

            if (!bool_error) {
                $(this).val("Save");
            }

        });

        $('#user-form #edit-submit').prop('disabled', true);

        $("#user-form #otp").keydown(function(event) {
            var inputValue = event.charCode || event.keyCode || event.which;
            if ($(this).val().length > 4 && inputValue != 8) {
                event.preventDefault();
            }

            if (event.shiftKey) {
                return false;
            }

            if (!(inputValue >= 96 && inputValue <= 105) && !(inputValue >= 48 && inputValue <= 57) && inputValue != 8) {
                event.preventDefault();
            }
        });

        $("#user-form #otp").keyup(function(event) {
            if ($(this).val().length == 4) {
                $("#user-form #edit-submit").prop("disabled", false);
            } else {
                $("#user-form #edit-submit").prop("disabled", true);
            }
        });

        var city = $(
            ".views-field-field-user-address-locality .field-content"
        ).text();
        city = city.split("-");
        $(".views-field-field-user-address-locality .field-content").text(city[0]);

        var city = $(
            ".views-field-field-user-academic-address-locality .field-content"
        ).text();
        city = city.split("-");
        $(".views-field-field-user-academic-address-locality .field-content").text(
            city[0]
        );
    });
    // scroll to lead form in case of payment success/failure
    $(window).on("load", function() {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results) {
                return results[1] || 0;
            }
        }
        var web_view = $.urlParam('web_view');
        if (web_view == 1) {
            $(".lead-first-btn").prop('disabled', false);
        }
        if ((window.location.href.indexOf("pmstatus=success") > -1 ||
                window.location.href.indexOf("pmstatus=failure") > -1) &&
            $(".lead-form-block").length) {
            $('html, body').animate({
                'scrollTop': $(".lead-form-block").position().top
            });
        }
        if ($(".dashboard-content .messages--error").length != 0) {
            $(".dashboard-content .messages--status").css("top", $(".dashboard-content .messages--error").innerHeight());
        }
        // if(window.location.href.endsWith('profile')) {
        //   $(".messages--status .messages__item:contains('The changes have been saved.')").hide();
        // }
    });
    /*try {
      $(window).load(function () {
        $(this).scrollTop(0);
      });
    } catch (error) {
      console.error(error);
    }*/
    jQuery(document).ready(function() {
        jQuery('.lead-get-otp-btn').attr('href', 'javascript:void(0)');
        var schoolErrFlag = false;
        $(".js-select2").select2({
            placeholder: "School City",
            minimumInputLength: 3,

        });
        $(document).on("click", "#select2click_btn", function() {
            $(".js-select2").select2({
                placeholder: "School City*",
                minimumInputLength: 3,


            });
            if ($("#anthe-lead select[name='student_city']").parent().children('div.form-item--error-message').length) {
                $(".form-item-student-city").children('span.select2-container').css("border", "1px solid red");
            } else {
                $(".form-item-student-city").children('span.select2-container').css("border", "1px solid #E8E8E8");
            }
        });
        $(document).on("click", "#schoolselect2click_btn", function() {
            $(".school-js-select2").select2({
                tags: true,
                placeholder: "School Name*",
                minimumInputLength: 3,
            });
            if ($("#anthe-lead select[name='school_name']").attr('error-msg') == 'true') {
                $(".school-js-select2").parent().children('span.select2-container').css("border", "1px solid red");
                //dont have error div to show the message insert a new with message.
                if (!$("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').length) {
                    $("#anthe-lead select[name='school_name']").parent().append('<div class="form-item--error-message">Please select a valid school.</div>');
                }
                //add message in error div.
                if ($("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').text().trim() == '') {
                    $("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').html('Please select a valid school.');
                }
            }
            if ($("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').length) {
                schoolErrFlag = true;
                $(".school-js-select2").parent().children('span.select2-container').css("border", "1px solid red");
            }
            if (schoolErrFlag == true) {
                $(".school-js-select2").parent().children('span.select2-container').css("border", "1px solid red");
                //dont have error div to show the message insert a new with message.
                if (!$("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').length) {
                    $("#anthe-lead select[name='school_name']").parent().append('<div class="form-item--error-message">School name field is required.</div>');
                }
                //add message in error div.
                if ($("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').text().trim() == '') {
                    $("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').html('School name field is required.');
                }
            }

        });

        var current_path = window.location.href;
        var sfExist = current_path.includes("sf_id");
        if (sfExist == true && $(".student-name").val() != '') {
            // select2 disable pointer events
            jQuery(".select2-container").css('pointer-events', 'none');
            jQuery("#edit-student-city").css('display', 'block');
            jQuery(".js-form-item-student-city > span").css('display', 'none');
        }


        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results) {
                return results[1] || 0;
            }
        }
        var web_view = $.urlParam('web_view');
        if (web_view == 1) {
            $(".lead-first-btn").prop('disabled', false);
        }

        // Enable/Disable School Field
        jQuery('.other-school-name-field-wrapper .form-text').hide();
        jQuery(".school-name-field-wrapper .form-autocomplete").autocomplete({
            select: function(event, ui) {
                var other_school_value = ui.item.value;
                if (other_school_value == 'Other') {
                    jQuery('.other-school-name-field-wrapper .form-text').show();
                    jQuery('.other-school-name-field-wrapper .form-text').attr({
                        required: 'required',
                        'aria-required': 'true'
                    });
                } else {
                    jQuery('.other-school-name-field-wrapper .form-text').hide();
                    jQuery('.other-school-name-field-wrapper .form-text').attr('required', false);
                    jQuery('.other-school-name-field-wrapper .form-text').attr('aria-required', false);
                }
            }
        });

        jQuery(".reattempt-main-parent a").click(function() {
            var url = $(this).attr('href');
            $.urlParam = function(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
                if (results) {
                    return results[1] || 0;
                }
            }
            var params = $.urlParam('schedule_data');
            if (typeof params != 'undefined') {
                jQuery.ajax({
                    type: "POST",
                    cache: false,
                    url: drupalSettings.path.baseUrl + "reset-student-mock-sample",
                    data: {
                        params: params
                    },
                    success: function(data) {
                        // console.log('result=='+data.sucess);
                        //jQuery('#ajax-Payment-On-Exam-Centre').html(data.html);
                        //jQuery('.loader-wrapper').hide();
                    }
                });
            }
        });

        //Start Main Schoolership journey click
        jQuery(".start-main-journey-id a").click(function() {
            var url = $(this).attr('href');
            $.urlParam = function(name) {
                var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(url);
                if (results) {
                    return results[1] || 0;
                }
            }
            var params = $.urlParam('schedule_data');
            if (typeof params == 'undefined') {
                var params = $.urlParam('token');
            }

            if (typeof params != 'undefined') {
                jQuery.ajax({
                    type: "POST",
                    cache: false,
                    url: drupalSettings.path.baseUrl + "start-main-journey",
                    data: {
                        params: params
                    },
                    success: function(data) {
                        //console.log('result=='+data.sucess);
                    }
                });
            }
        });
        if ($(".remove_ante_exam_menu_item").length) {
            var host = window.location.host;
            var myArray = host.split(".");
            if (myArray[0] != 'anthe') {
                $(".remove_ante_exam_menu_item").remove();
            }
        }
        document.addEventListener("keypress", function(e) {
            const target = e.target.closest(".error");
            if (target) {
                target.style.borderColor = "#ddd";
                target.nextElementSibling.innerHTML = "";
            }
            if (e.target.id == 'otp') {
                target.nextElementSibling.nextElementSibling.innerHTML = "";
            }
        });
        document.addEventListener("change", function(e) {
            const target = e.target.closest(".error");
            if (target) {
                target.style.borderColor = "#ddd";
                target.nextElementSibling.innerHTML = "";
            }
        });
        $("body").on("keypress", ".ui-autocomplete-input,.select2-search__field", function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 32 && charCode < 44) || charCode == 47 || charCode == 123 || charCode == 124 || charCode == 125) {
                return false;
            } else if (charCode > 46 && charCode < 65) {
                return false;
            } else if (charCode > 90 && charCode < 97) {
                return false;
            } else if (charCode == 123 || charCode == 124 || charCode == 125) {
                return false;
            }
        });
        $("body").on("keypress", ".student-name, .father-name", function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            $key = 47;
            if (event.target.classList.contains('father-name')) {
                $key = 46;
            }
            if ((charCode > 32 && charCode < $key) || (charCode > 122 && charCode < 127)) {
                return false;
            } else if (charCode > 46 && charCode < 65) {
                return false;
            } else if (charCode > 90 && charCode < 97) {
                return false;
            }
        });
        //select2 fields validation in ANTHE
        $(document).on('select2:close', (e) => {
            if ($(".user_exam_type").val() == 'ANTHE') {
                if (e.target.name == 'student_city') {
                    if ($("#anthe-lead select[name='student_city']").val() == '') {
                        $(".form-item-student-city").children('span.select2-container').css("border", "1px solid red");

                        //dont have error div to show the message insert a new with message.
                        if (!$("#anthe-lead select[name='student_city']").parent().children('div.form-item--error-message').length) {
                            $("#anthe-lead select[name='student_city']").parent().append('<div class="form-item--error-message">School city field is required.</div>');
                        }
                        //add message in error div.
                        if ($("#anthe-lead select[name='student_city']").parent().children('div.form-item--error-message').text().trim() == '') {
                            $("#anthe-lead select[name='student_city']").parent().children('div.form-item--error-message').html('School city field is required.');
                        }
                    } else {
                        $("#anthe-lead select[name='student_city']").parent().children('div.form-item--error-message').remove();
                        $(".form-item-student-city").children('span.select2-container').css("border", "1px solid #E8E8E8");
                    }
                }
                if (e.target.name == 'school_name') {
                    if ($("#anthe-lead select[name='school_name']").val() == '') {
                        schoolErrFlag = true;
                        $(".school-js-select2").parent().children('span.select2-container').css("border", "1px solid red");
                        //dont have error div to show the message insert a new with message.
                        if (!$("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').length) {
                            $("#anthe-lead select[name='school_name']").parent().append('<div class="form-item--error-message">School name field is required.</div>');
                        }
                        //add message in error div.
                        if ($("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').text().trim() == '') {
                            $("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').html('School name field is required.');
                        }
                    } else {
                        schoolErrFlag = false;
                        $("#anthe-lead select[name='school_name']").parent().children('div.form-item--error-message').remove();
                        $(".school-js-select2").parent().children('span.select2-container').css("border", "1px solid #E8E8E8");
                    }
                }
            }
        });
        //forms all fields focusout event except coupon
        $("body").on("focusout", ".form-text, .form-select, .form-email", function(evt) {
            if ($.trim($(this).val()) == '' && this.name != 'coupon') {
                var string = '';
                $(this).addClass('error');
                $(this).css("border-color", "#D62C26");
                if ($(this).hasClass('form-select')) {
                    string = 'Please select this field.';
                } else {
                    string = $(this).attr('placeholder').replace('*', '');
                    string = string.replace('Select', '');
                    string = string.replace('Enter', '');
                    string += ' field is required';
                }
                if (string.includes("school")) {
                    string = 'School field is required';
                }
                //dont have error div to show the message insert a new with message.
                if (!$(this).parent().children('div.form-item--error-message').length) {
                    $(this).parent().append('<div class="form-item--error-message">' + string + '</div>');
                }
                //add message in error div.
                if ($(this).parent().children('div.form-item--error-message').text().trim() == '') {
                    $(this).parent().children('div.form-item--error-message').html(string);
                }
            } else {
                //mobile field validation
                if ($(this).hasClass("mobile-no")) {
                    if ($(this).val().length < 10) {
                        //dont have error div to show the message insert a new with message.
                        if (!$(this).parent().children('div.form-item--error-message').length) {
                            $(this).parent().append('<div class="form-item--error-message">Please enter 10 digit Mobile Number or 11 digit PSID.</div>');
                        }
                        //add message in error div.
                        if ($(this).parent().children('div.form-item--error-message').text().trim() == '') {
                            $(this).parent().children('div.form-item--error-message').html('Please enter 10 digit Mobile Number or 11 digit PSID.');
                        }
                        $(this).addClass('error');
                        $(this).css("border-color", "#D62C26");
                    } else {
                        //prevent to send otp only in case the mobile number is already registered.
                        if ($(this).parent().children('div.form-item--error-message').children('a').length == 0 || $(this).parent().children('div.form-item--error-message').children('a').length == 'undefined') {
                            $(this).parent().children('div.form-item--error-message').remove();
                            $(this).css("border-color", "#ddd");
                            $(this).removeClass('error');
                            // $(".global-otp-verify").click();
                        }
                    }
                } else if ($(this).hasClass('form-email')) {
                    var data = $(this).val().split('@');
                    var beforeDotCheck = data[0].split('.');
                    var err = 0;
                    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i
                    if (!pattern.test($(this).val())) {
                        err = 1;
                    }
                    if (!data[1]) {
                        err = 1;
                    } else {
                        var afterDotCheck = data[1].split('.');
                    }
                    if (beforeDotCheck.length > 3) {
                        err = 1;
                    }
                    if (data[1] && afterDotCheck.length > 3) {
                        err = 1;
                    }
                    if (data[1] && afterDotCheck.length < 2) {
                        err = 1;
                    }
                    if (data[1]) {
                        if (afterDotCheck[1].toLowerCase() == 'comcom') {
                            err = 1;
                        }
                        if (afterDotCheck.length > 2 && afterDotCheck[2].toLowerCase() == afterDotCheck[1].toLowerCase()) {
                            err = 1;
                        }
                    }
                    if ($(this).val().indexOf("-@") > 0) {
                        err = 1;
                    }
                    if (err == 1) {
                        //dont have error div to show the message insert a new with message.
                        if (!$(this).parent().children('div.form-item--error-message').length) {
                            $(this).parent().append('<div class="form-item--error-message">Please enter valid email ID.</div>');
                        }
                        //add message in error div.
                        if ($(this).parent().children('div.form-item--error-message').text().trim() == '') {
                            $(this).parent().children('div.form-item--error-message').html('Please enter valid email ID.');
                        }
                        $(this).addClass('error');
                        $(this).css("border-color", "#D62C26");
                    } else {
                        //clear the message div
                        $(this).parent().children('div.form-item--error-message').remove();
                        $(this).css("border-color", "#ddd");
                        $(this).removeClass('error');
                    }
                } else if ($(this).hasClass('otp')) {
                    if ($(".form-item-otp").children("div.form-item--error-message").text().trim() == "" || $(".form-item-otp").children("div.form-item--error-message").text().trim() == 'undefined') {
                        $(this).parent().children('div.form-item--error-message').remove();
                        $(this).css("border-color", "#ddd");
                        $(this).removeClass('error');
                    }
                }
                //other fields validation
                else {
                    //clear the message div
                    $(this).parent().children('div.form-item--error-message').remove();
                    $(this).css("border-color", "#ddd");
                    $(this).removeClass('error');
                }
            }
        });
        $("body").on("click", "#togglePayment", function(evt) {
            if ($(".third-data").val() != 1) {
                $(".exam-state").val('');
                $(".branch-code").html('<option value ="">Select Centre</option>');
                $(".exam-date").html('<option value ="">Day of Exam (dd/mm/yy)</option>');
            } else {
                if ($(".journey-type").val() == 1 && $("input[name='mode_type']:checked").val() == 1) {
                    $(".third-data").val(0);
                } else {
                    $(".exam-state").val('');
                    $(".branch-code").html('<option value ="">Select Centre</option>');
                    $(".exam-date").html('<option value ="">Day of Exam (dd/mm/yy)</option>');
                }
            }
            if ($("input[name='mode_type']:checked").val() == 1) {
                $(".user_exam_mode").val($('.exam-mode option:first').val());
            } else {
                $(".user_exam_mode").val('');
            }
            if ($(".journey-type").val() == 1) {
                if ($("input[name='mode_type']:checked").val() == 1) {
                    $("#con-msg").html("");
                    $('.coupon-val').val('');
                    $(".coupon-field-wrapper").addClass('anthe-hide');
                    $("#auto-free-span").hide();
                    $("#ajax-Payment-On-Exam-Centre").removeClass('anthe-hide');
                    setTimeout(function() {
                        $("input[name=payment_gateway][value='paytm']").prop('checked', true);
                    }, 500);
                } else {
                    $('.coupon-val').val($(".auto_coupon").val());
                    $("#edit-apply-coupon").click();
                    $('#non-refund').html('');
                    $("#auto-free-span").show();
                    setTimeout(function() {
                        $("input[name=payment_gateway][value='default']").prop('checked', true);
                    }, 500);
                }
            }
        });
        $("body").on("click", "#coupon-remove-btn", function(evt) {
            $(".pay-method").val('');
            setTimeout(function() {
                $("input[name=payment_gateway][value='paytm']").prop('checked', true);
            }, 500);

        });
        $("body").on("click", "#remove_default", function(evt) {
            setTimeout(function() {
                $("#non-refund").html('<img alt="" src="https://d16swpibua0gnc.cloudfront.net/Aakash-Anthe/s3fs-public/inline-images/anthe-nonrefun-2023.png"> Exam fees is non-refundable');
                if ($(".form-item-payment-gateway").first().children('input').val() == 'default') {
                    $(".form-item-payment-gateway").first().remove();
                }
                $(".coupon-field-wrapper").addClass('anthe-hide');
            }, 500);

        });
        $("body").on("click", ".global-otp-sent", function(evt) {
            if ($.trim($(".mobile-no").val()) == '') {
                if (!$(".mobile-no").parent().children('div.form-item--error-message').length) {
                    $("div.form-item-mobile-no").append('<div class="form-item--error-message">Mobile No. or PSID field is required</div>');
                }
                //add message in error div.
                if ($(".mobile-no").parent().children('div.form-item--error-message').text().trim() == '') {
                    $(".mobile-no").parent().children('div.form-item--error-message').html('Mobile No. or PSID field is required');
                }
                $(".mobile-no").addClass('error');
                $(".mobile-no").css("border-color", "#D62C26");
            } else if ($.trim($(".mobile-no").val()).length < 10) {
                //dont have error div to show the message insert a new with message.
                if (!$(".mobile-no").parent().children('div.form-item--error-message').length) {
                    $(".mobile-no").parent().append('<div class="form-item--error-message">Please enter 10 digit Mobile Number or 11 digit PSID.</div>');
                }
                //add message in error div.
                if ($(".mobile-no").parent().children('div.form-item--error-message').text().trim() == '') {
                    $(".mobile-no").parent().children('div.form-item--error-message').html('Please enter 10 digit Mobile Number or 11 digit PSID.');
                }
                $(".mobile-no").addClass('error');
                $(".mobile-no").css("border-color", "#D62C26");
            } else {
                //prevent to send otp only in case the mobile number is already registered.
                if ($(".mobile-no").parent().children('div.form-item--error-message').children('a').length == 0 || $(".mobile-no").parent().children('div.form-item--error-message').children('a').length == 'undefined') {
                    $(".mobile-no").parent().children('div.form-item--error-message').remove();
                    $(".mobile-no").css("border-color", "#ddd");
                    $(".mobile-no").removeClass('error');
                    $(".global-otp-verify").click();
                    // $(".global-otp-sent").addClass('anthe-hide');
                }
            }
        });
    });
})(jQuery, Drupal);


function scholarship_startTimer(element_id, duration) {
    var countDownDate = new Date().getTime() + duration * 1000; // 2 seconds

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        //document.getElementById(element_id).innerHTML = minutes + "m " + seconds + "s ";
        document.getElementById(element_id).innerHTML = seconds + "s ";
        //document.getElementById(element_id).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text
        if (distance <= 0) {
            clearInterval(x);
            jQuery("#ajax-Payment-On-Exam-Centre").css('display', 'block');
            jQuery(".pg_empty_message_text").css('display', 'none');
            jQuery("input[value='PROCEED FOR PAYMENT']").css('display', 'block');
            //document.getElementById(element_id).innerHTML = "EXPIRED";
        }
    }, 1000);

}

function selectasinput(class_name) {
    var selected = [];
    jQuery('select.' + class_name).children('option').each(function() {
        var $this = jQuery(this);
        //selected.push( { text: $this.text(), value: $this.val() });
        var option_val = $this.val();
        if (option_val != '') {
            selected.push({
                value: $this.val()
            });
        }
    });
    return selected;
}

function exam_state_center_text(exammode_val) {
    if (typeof exammode_val != "undefined" && exammode_val != '') {
        var exammode_val = exammode_val.split('-');
        var exammode_str = jQuery.trim(exammode_val[0]).toLowerCase();
        if (exammode_str == 'online') {
            // jQuery("label[for^='edit-exam-state'], label[for^='edit-field-state']").text("State");
            jQuery("#depend-exam-mode-change-text").text("Preferred Aakash Centre for Coaching");
        } else {
            //jQuery("label[for^='edit-exam-state'], label[for^='edit-field-state']").text("Exam State");
            jQuery("#depend-exam-mode-change-text").text("Preferred Aakash Centre for the Exam");

        }
    }
}

function default_exam_mode_text(exammode_val) {
    if (typeof exammode_val != "undefined" && exammode_val != '') {
        var exammode_val = exammode_val.split('-');
        var exammode_str = jQuery.trim(exammode_val[0]).toLowerCase();
        if (exammode_str == 'offline') {
            jQuery('#exam_address_replace ul span').hide();
        }
    }
}

function doConfirm(msg, yesFn, noFn) {
    //console.log('khg');
    var confirmBox = jQuery("#confirmBox");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".yes,.no").unbind().click(function() {
        confirmBox.hide();
    });
    confirmBox.find(".yes").click(yesFn);
    confirmBox.find(".no").click(noFn);
    confirmBox.show();
    //console.log('khgoiuhyg');
}

function exam_updatecontdown(examdatetime) {
    var countDownDate = examdatetime;
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        jQuery("#exam-update-countdown").html("Time left - " + days + " d " + hours + " h " +
            minutes + " m " + seconds + " s  Left");
        if (distance < 0) {
            clearInterval(x);
            jQuery("#exam-update-countdown").html('');
        }
    }, 1000);
}


//copy text on thank you page ANTHE start
function copyText() {
    text = document.getElementById('copyText').innerHTML;
    copyTextToClipboard(text);
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Roll Number Copied";

}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';

    } catch (err) {}
    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {}, function(err) {});
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy Roll Number";
}
//copy text on thank you page ANTHE end
(function(Drupal, $) {
    'use strict';
    Drupal.behaviors.school_dropdown = {
        attach: function(context, settings) {
            // $('#school-name-field-wrapper > div > .select2-container').css("pointer-events", "none");
            // $('body').on('change',"select[name='student_city']",function() {
            //     $('#school-name-field-wrapper > div > .select2-container').css("pointer-events", "cursor");
            // });
            $("[name='school_name']").on('keypress', function() {
                var city_state = $("[name='student_city']").val();
                var val = $('[name="school_name"]').attr('data-autocomplete-path');
                var newVal = val.replace(/\?.*/, '');
                val = newVal + '?city_state=' + city_state;
                $('[name="school_name"]').attr("data-autocomplete-path", val);
            });
            $("[name='student_city']").on('keypress', function() {
                ValueEmpty('[name="school_name"]');
            });

            function ValueEmpty(selector) {
                $(selector).attr('value', '');
                $(selector).val('');
            }
        }
    };

})(Drupal, jQuery);

(function($) {
    $.fn.grid_content_loading = function($argument1, $argument2) {
        $('html, body').animate({
            scrollTop: $("#signle-step-form").offset().top
        }, 2000);
    };
})(jQuery);
(function($) {
    $.fn.grid_content_loading_1 = function($argument1, $argument2) {
        $('html, body').animate({
            scrollTop: $("#anthe-lead").offset().top
        }, 2000);
    };
})(jQuery);