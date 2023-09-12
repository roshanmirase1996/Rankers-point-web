var webengage_init_key = drupalSettings.anthe_webengage.webengage_init_key;
var Ga_examType = window.location.pathname.split('/')[1];
var current_path = window.location.href;
var sfExist = current_path.includes("sf_id");
var examSource = 'Website';
if (sfExist == true) {
    examSource = 'SF';
}! function(e) {
    e(document).ready(function() {
        "login" === drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                webengage.user.login(drupalSettings.anthe_webengage_we_user_id),
                webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone),
                set_cookie("anthe_webengage_we_user_id",
                    drupalSettings.anthe_webengage_we_user_id, 365),
                webengage.track("Login", {
                    user_id: drupalSettings.anthe_webengage_we_user_id,
                    pageHostName: window.location.hostname,
                    pagePath: document.location.pathname
                }),
                console.log("Webengage Signin Submit"),
                console.log(drupalSettings.anthe_webengage_we_user_id),
                console.log(drupalSettings.anthe_webengage_we_phone)),
            "true" === drupalSettings.admitcard_download && e("#block-anthe-content .genpdf").click(function() {
                dataLayer.push({
                        event: "AdmitCard Download",
                        user_id: get_cookie("anthe_webengage_we_user_id"),
                        exam_type: drupalSettings.admitcard_exam_type,
                        pageHostName: window.location.hostname,
                        pagePath: document.location.pathname
                    }),
                    console.log("AdmitCard Download"),
                    console.log(drupalSettings.admitcard_exam_type)
            })
        // Session Start event for webengage

        if (drupalSettings.anthe_webengage_lead_type == "ANTHE" || drupalSettings.anthe_webengage_lead_type == "ANTHETESTING" || get_cookie("anthe_c_lead_type") == 'ANTHE' || get_cookie("anthe_c_lead_type") == "ANTHETESTING") {
            "signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                //  webengage.user.logout(),
                webengage.track(drupalSettings.anthe_webengage_lead_type + "_1_Session_Start", {
                    campaign_name: drupalSettings.we_campaign_name,
                    exam_type: drupalSettings.anthe_webengage_exam_type,
                    //  pageHostName: window.location.hostname,
                    //  pagePath: document.location.pathname,
                    Journey_type: drupalSettings.anthe_webengage_journey_type == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                    //  lead_type:drupalSettings.anthe_webengage_lead_type
                }),

                erase_cookie("anthe_c_campaign_name"),
                erase_cookie("step_3_verify_otp"),
                erase_cookie("step_4_personal_info"),
                erase_cookie("anthe_webengage_we_user_id"),
                erase_cookie("anthe_c_lead_type"),
                erase_cookie("anthe_c_exam_type"),
                erase_cookie("anthe_c_exam_date"),
                erase_cookie("anthe_c_exam_center"),
                erase_cookie("anthe_c_dob"),
                erase_cookie("anthe_c_fathername"),
                erase_cookie("anthe_c_mobile"),
                erase_cookie("anthe_c_email"),
                erase_cookie("anthe_c_firstname"),
                erase_cookie("anthe_c_class"),
                erase_cookie("anthe_c_stream"),
                erase_cookie("anthe_c_exam_mode"),
                erase_cookie("anthe_c_school_city"),
                erase_cookie("anthe_c_school_board"),
                erase_cookie("anthe_c_school_name"),
                erase_cookie("anthe_webengage_c_exam_fee"),
                erase_cookie("anthe_webengage_c_psid"),
                erase_cookie("anthe_webengage_c_mobile_number"),
                erase_cookie("anthe_c_user_psid"),
                erase_cookie("anthe_webenegage_c_couponcode"),
                erase_cookie("anthe_c_exam_source")
            )

            //Multistep ANTHE/AKTHE/IACST Form GET OTP
            //     "signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),

            //    e("a.global-otp-verify").click(function() {
            //         // var mobile_no = jQuery('#edit-mobile-no').val();
            //         // var psid = get_cookie('anthe_webengage_c_psid') || '';

            //         //     if (mobile_no.length == 10 || (mobile_no.length == 11 && mobile_no.substring(0,2) == "00") && webengage.init(webengage_init_key)) {
            //         //         webengage_Otp_text = e("a.global-otp-verify").text();
            //         //         otp_text = 'Get_OTP'
            //         //         if(webengage_Otp_text == "Resend OTP"){
            //         //             otp_text = 'Resend_OTP'
            //         //         }
            //         //         if(mobile_no.length == 11 && mobile_no.substring(0,2) == "00"){
            //         //             console.log("Debug ")
            //         //             psid = null != get_cookie('anthe_webengage_c_psid') ? get_cookie('anthe_webengage_c_psid') : mobile_no;
            //         //         }
            //         //         mobile_number = null != get_cookie('anthe_webengage_c_mobile_number') ? get_cookie('anthe_webengage_c_mobile_number') : mobile_no;
            //         //         // webengage.user.setAttribute("we_phone", mobile_number),
            //         //         console.log("Before PSID"+ psid, "mOBILE"+mobile_number + "cookies "+get_cookie('anthe_webengage_c_psid'));
            //         //         webengage.track(drupalSettings.anthe_webengage_lead_type+"_2_"+otp_text, {
            //         //           campaign_name: drupalSettings.we_campaign_name,
            //         //           user_mobile: mobile_number,
            //         //           user_psid:psid,
            //         //           exam_type: drupalSettings.anthe_webengage_exam_type,
            //         //         //   pageHostName: window.location.hostname,
            //         //         //   pagePath: document.location.pathname,
            //         //           Journey_type:drupalSettings.anthe_webengage_journey_type == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
            //         //         //   lead_type:drupalSettings.anthe_webengage_lead_type
            //         //       });
            //         //    }
            //         //   console.log("PSID"+ psid, "mOBILE"+mobile_number);
            //     }),
            //     drupalSettings.anthe_webengage_form_name = ""
            //     )

            if (window.location.pathname == '/thankyou') {
                let mobile_number = get_cookie('anthe_c_mobile');
                let roll_number = jQuery('#copyText').text();
                let examMode = unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ');
                let exam_time = examMode.split(/[gnt]\b/)[1];
                webengage.track(get_cookie('anthe_c_lead_type') + "_7_Thank_You_Page", {

                    campaign_name: get_cookie('anthe_c_campaign_name'),
                    we_first_name: get_cookie('anthe_c_firstname'),
                    we_email: get_cookie('anthe_c_email'),
                    mobile_no: mobile_number,
                    user_psid: get_cookie('anthe_c_user_psid'),
                    roll_number: roll_number,
                    DOB: get_cookie('anthe_c_dob'),
                    class_studying: get_cookie('anthe_c_class'),
                    exam_stream: get_cookie('anthe_c_stream'),
                    exam_mode: examMode.split(/-/)[0],
                    exam_time: exam_time,
                    school_city: get_cookie("anthe_c_school_city"),
                    school_board: get_cookie("anthe_c_school_board"),
                    school_name: get_cookie("anthe_c_school_name"),
                    state: get_cookie("anthe_webengage_exam_state"),
                    center: get_cookie("anthe_c_exam_center"),
                    DOE: get_cookie("anthe_c_exam_date"),
                    exam_type: get_cookie("anthe_c_exam_type"),
                    //    lead_type:get_cookie("anthe_c_lead_type"),
                    exam_fee: get_cookie('anthe_webengage_c_exam_fee'),
                    coupon_code: get_cookie('anthe_webenegage_c_couponcode') == null ? '' : get_cookie('anthe_webenegage_c_couponcode'),
                    payment_method: (unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').indexOf("Online") > -1 && (get_cookie("anthe_webengage_journey_type") == '1')) ? "" : (get_cookie("anthe_webengage_payment_gateway") == 'paytm' ? "Paytm" : "CcAvenue"),
                    payment_status: window.location.href.indexOf("pmstatus=success") > -1 ? 'Success' : 'Failure',
                    Journey_type: get_cookie("anthe_c_journey_type"),
                    //    pageHostName: window.location.hostname,
                    //    pagePath: document.location.pathname
                    exam_source: get_cookie('anthe_c_exam_source'),

                }, )

                jQuery('button:contains("Copy")').click(function() {
                    webengage.init(webengage_init_key),
                        webengage.track(get_cookie('anthe_c_lead_type') + "_8_Thank_You_rollno_copy", {
                            user_mobile: mobile_number,
                            user_rollnumber: roll_number,
                            Journey_type: get_cookie("anthe_c_journey_type"),
                        });
                });

                jQuery('a:contains("Go to dashboard")').click(function() {
                    webengage.init(webengage_init_key),
                        webengage.track(get_cookie('anthe_c_lead_type') + "_9_Thank_You_Go_To_Dashboard", {
                            user_mobile: mobile_number,
                            user_rollnumber: roll_number,
                            Journey_type: get_cookie("anthe_c_journey_type")
                        });
                });
            }

            if (window.location.href.indexOf("pmstatus=success") > -1 ||
                window.location.href.indexOf("pmstatus=failure") > -1) {
                let examMode = unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ');
                let exam_time = examMode.split(/[gnt]\b/)[1];
                let mobile_number = get_cookie('anthe_c_mobile');
                webengage.track(get_cookie('anthe_c_lead_type') + "_7_payment_status", {
                    campaign_name: get_cookie('anthe_c_campaign_name'),
                    we_first_name: get_cookie('anthe_c_firstname'),
                    we_email: get_cookie('anthe_c_email'),
                    mobile_no: mobile_number,
                    user_psid: get_cookie('anthe_c_user_psid'),
                    DOB: get_cookie('anthe_c_dob'),
                    // father_name: get_cookie('anthe_c_fathername'),
                    class_studying: get_cookie('anthe_c_class'),
                    exam_stream: get_cookie('anthe_c_stream'),
                    school_city: get_cookie("anthe_c_school_city"),
                    school_board: get_cookie("anthe_c_school_board"),
                    school_name: get_cookie("anthe_c_school_name"),
                    state: get_cookie("anthe_webengage_exam_state"),
                    center: get_cookie("anthe_c_exam_center"),
                    DOE: get_cookie("anthe_c_exam_date"),
                    exam_type: get_cookie("anthe_c_exam_type"),
                    exam_mode: examMode.split(/-/)[0],
                    exam_time: exam_time,
                    exam_fee: get_cookie("anthe_webengage_c_exam_fee"),
                    // lead_type:get_cookie("anthe_c_lead_type"),
                    coupon_code: get_cookie('anthe_webenegage_c_couponcode') == null ? '' : get_cookie('anthe_webenegage_c_couponcode'),
                    Journey_type: get_cookie("anthe_c_journey_type"),
                    payment_method: (unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').indexOf("Online") > -1 && (get_cookie("anthe_webengage_journey_type") == '1')) ? "" : (get_cookie("anthe_webengage_payment_gateway") == 'paytm' ? "Paytm" : "CcAvenue"),
                    payment_status: window.location.href.indexOf("pmstatus=success") > -1 ? 'Success' : 'Failure',
                    // pageHostName: window.location.hostname,
                    // pagePath: document.location.pathname
                    exam_source: get_cookie('anthe_c_exam_source'),
                }, )
            }
            erase_cookie("anthe_c_campaign_name"),
                erase_cookie("anthe_c_exam_type");
            erase_cookie("anthe_c_exam_date");
            erase_cookie("anthe_c_exam_center");
            erase_cookie("anthe_c_dob");
            erase_cookie("anthe_c_fathername");
            erase_cookie("anthe_c_mobile");
            erase_cookie("anthe_c_email");
            erase_cookie("anthe_c_firstname");
            erase_cookie("anthe_c_class");
            erase_cookie("anthe_c_stream");
            erase_cookie("anthe_c_exam_mode");
            erase_cookie("anthe_c_school_city");
            erase_cookie("anthe_c_school_board");
            erase_cookie("anthe_c_school_name");
            erase_cookie('anthe_webengage_c_exam_fee');
            erase_cookie("anthe_webengage_c_psid");
            erase_cookie("anthe_c_user_psid");
            erase_cookie("anthe_webenegage_c_couponcode");
            erase_cookie("anthe_c_exam_source");


        } else {
            "signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                //  webengage.user.logout(),
                webengage.track(drupalSettings.anthe_webengage_exam_type + "_1_Session_Start", {
                    exam_type: drupalSettings.anthe_webengage_exam_type,
                    pageHostName: window.location.hostname,
                    pagePath: document.location.pathname
                }),
                erase_cookie("step_3_verify_otp"),
                erase_cookie("step_4_personal_info"),
                erase_cookie("anthe_webengage_we_user_id")
            )

            //Multistep ANTHE/AKTHE/IACST Form GET OTP
            "signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                e("a.global-otp-verify").click(function() {
                    var mobile_no = jQuery('#edit-mobile-no').val();
                    if (mobile_no.length >= 10 && webengage.init(webengage_init_key)) {
                        webengage.user.setAttribute("we_phone", mobile_no),
                            webengage.track(drupalSettings.anthe_webengage_exam_type + "_2_Get_OTP", {
                                user_mobile: mobile_no,
                                exam_type: drupalSettings.anthe_webengage_exam_type,
                                pageHostName: window.location.hostname,
                                pagePath: document.location.pathname
                            });
                    }
                }),
                drupalSettings.anthe_webengage_form_name = ""
            )
        }

        //STEP 0 SINGLE STEP ANTHE/AKTHE/IACST
        "sp_signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                webengage.track(drupalSettings.anthe_webengage_exam_type + "_SS_1_Session_Start", {
                    pageHostName: window.location.hostname,
                    pagePath: document.location.pathname,
                    exam_type: drupalSettings.anthe_webengage_exam_type,
                }),
                erase_cookie("Intent_To_Reg"),
                console.log("pagePath ==" + " " + document.location.pathname),
                console.log(drupalSettings.anthe_webengage_exam_type + "_SS_1_Session_Start"),
                console.log("Exam type" + " " + drupalSettings.anthe_webengage_exam_type)
            ),
            //Get OTP SINGLE STEP

            "sp_signup_step_zero" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                jQuery("a.global-otp-verify").click(function() {
                    var mobile_no = jQuery('#edit-mobile-no').val();
                    if (mobile_no >= 10 && webengage.init(webengage_init_key)) {
                        webengage.track(drupalSettings.anthe_webengage_exam_type + "_SS_2_Get_OTP", {
                            user_mobile: mobile_no,
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            pageHostName: window.location.hostname,
                            pagePath: document.location.pathname
                        });
                        console.log(drupalSettings.anthe_webengage_exam_type + "_SS_2_Get_OTP");
                    }
                }),
                drupalSettings.anthe_webengage_form_name = ""
            )

    })
}(jQuery),
function(e, a) {
    "use strict";
    e.behaviors.anthe_webengage = {
        attach: function(e) {

            // Verify OTP event for webengage
            if (drupalSettings.anthe_webengage_lead_type == "ANTHE" || drupalSettings.anthe_webengage_lead_type == "ANTHETESTING") {
                "signup_step_one" == drupalSettings.anthe_webengage_form_name && (get_cookie("step_3_verify_otp") == null) && (webengage.init(webengage_init_key),
                        webengage.user.login(drupalSettings.anthe_webengage_we_phone),
                        webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone),
                        set_cookie("anthe_webengage_we_user_id",
                            drupalSettings.anthe_webengage_we_user_id, 365),
                        get_cookie('anthe_c_whatsapp_status') == "true" ? webengage.user.setAttribute("we_whatsapp_opt_in", true) : webengage.user.setAttribute("we_whatsapp_opt_in", false),
                        webengage.track(drupalSettings.anthe_webengage_lead_type + "_3_verify_otp", {
                            campaign_name: drupalSettings.we_campaign_name,
                            // user_id: drupalSettings.anthe_webengage_we_user_id,
                            user_psid: get_cookie('anthe_webengage_c_psid') != null ? get_cookie('anthe_webengage_c_psid') : "",
                            mobile_no: drupalSettings.anthe_webengage_we_phone,
                            // lead_type:drupalSettings.anthe_webengage_lead_type,
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            Journey_type: get_cookie("anthe_c_journey_type_step1") == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                            // pageHostName: window.location.hostname,
                            // pagePath: document.location.pathname,
                            HasWhatsAppOptIn: get_cookie('anthe_c_whatsapp_status'),
                        }),
                        set_cookie("step_3_verify_otp", "true", 365),
                        drupalSettings.anthe_webengage_form_name = ""
                    ),
                    // Personal Info event for webengage

                    "signup_step_two" == drupalSettings.anthe_webengage_form_name && (get_cookie("step_4_personal_info") == null) && (webengage.init(webengage_init_key),
                        dataLayer.push({
                            'event': Ga_examType + '_select_exam_date'
                        }),
                        webengage.user.setAttribute("we_first_name", drupalSettings.anthe_webengage_we_first_name),
                        webengage.user.setAttribute("we_email", drupalSettings.anthe_webengage_email),
                        webengage.track(drupalSettings.anthe_webengage_lead_type + "_4_Student_Info", {
                            campaign_name: drupalSettings.we_campaign_name,
                            // user_id: drupalSettings.anthe_webengage_we_user_id,
                            user_psid: get_cookie('anthe_webengage_c_psid') != null ? get_cookie('anthe_webengage_c_psid') : "",
                            we_first_name: drupalSettings.anthe_webengage_we_first_name,
                            we_email: drupalSettings.anthe_webengage_email,
                            mobile_no: drupalSettings.anthe_webengage_user_we_phone,
                            father_name: drupalSettings.anthe_webengage_father_name,
                            DOB: drupalSettings.anthe_webengage_student_dob,
                            class_studying: drupalSettings.anthe_webengage_class,
                            exam_stream: drupalSettings.anthe_webengage_stream,
                            school_city: drupalSettings.anthe_webengage_city,
                            school_board: drupalSettings.anthe_webengage_school_board,
                            school_name: drupalSettings.anthe_webengage_other_school_name,
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            // lead_type:drupalSettings.anthe_webengage_lead_type,
                            Journey_type: get_cookie("anthe_c_journey_type_step2") == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                            // pageHostName: window.location.hostname,
                            // pagePath: document.location.pathname
                            exam_source: examSource,
                        }),
                        console.log(examSource),
                        dataLayer.push({
                            'event': drupalSettings.anthe_webengage_exam_type + '_registration_step1_EC',
                            'student_name': drupalSettings.anthe_webengage_we_first_name,
                            'email_id': drupalSettings.anthe_webengage_email,
                        }),
                        invokeLsClickRegisterEvent(),
                        setTimeout(applyCouponAuto, 1000),
                        set_cookie("step_4_personal_info", "true", 365),
                        drupalSettings.anthe_webengage_form_name = ""
                    )
                // Exam Mode And Time used for Anthe_5 , Anthe_6 events
                let examMode = unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ');
                let exam_time = examMode.split(/[gnt]\b/)[1];
                // Complete Registration event for webengage
                "true" == get_cookie("proceed_for_checkout") && (null !== get_cookie("anthe_webengage_we_user_id")) && (webengage.init(webengage_init_key),
                    //Complete Registration Event
                    dataLayer.push({
                        'event': Ga_examType + '_complete_reg'
                    }),
                    webengage.track(drupalSettings.anthe_webengage_exam_type + "_5_Exam_Details", {
                        campaign_name: drupalSettings.we_campaign_name,
                        // user_id: drupalSettings.anthe_webengage_we_user_id,
                        user_psid: get_cookie('anthe_webengage_c_psid') != null ? get_cookie('anthe_webengage_c_psid') : "",
                        we_first_name: drupalSettings.anthe_webengage_we_first_name,
                        we_email: drupalSettings.anthe_webengage_email,
                        mobile_no: drupalSettings.anthe_webengage_user_we_phone,
                        // father_name: drupalSettings.anthe_webengage_father_name,
                        DOB: drupalSettings.anthe_webengage_student_dob,
                        class_studying: drupalSettings.anthe_webengage_class,
                        exam_stream: drupalSettings.anthe_webengage_stream,
                        school_city: drupalSettings.anthe_webengage_city,
                        school_board: drupalSettings.anthe_webengage_school_board,
                        school_name: drupalSettings.anthe_webengage_other_school_name,
                        exam_mode: examMode.split(/-/)[0],
                        exam_time: exam_time,
                        exam_fee: get_cookie('anthe_webengage_c_exam_fee'),
                        state: get_cookie("anthe_webengage_exam_state"),
                        center: get_cookie("anthe_webengage_branch_code"),
                        DOE: get_cookie("anthe_webengage_exam_date"),
                        exam_type: drupalSettings.anthe_webengage_exam_type,
                        // lead_type:drupalSettings.anthe_webengage_lead_type,
                        payment_method: (unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').indexOf("Online") > -1 && (get_cookie("anthe_webengage_journey_type") == '1')) ? "" : (get_cookie("anthe_webengage_payment_gateway") == 'paytm' ? "Paytm" : "CcAvenue"),
                        coupon_code: get_cookie('anthe_webenegage_c_couponcode') == null ? '' : get_cookie('anthe_webenegage_c_couponcode'),
                        voucher_id: get_cookie("anthe_webengage_voucher_id"),
                        Journey_type: get_cookie("anthe_webengage_journey_type") == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                        // pageHostName: window.location.hostname,
                        // pagePath: document.location.pathname
                        exam_source: examSource,

                    }),
                    console.log(examSource),
                    'Offline' == unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').split("-")[0].trim() && (webengage.init(webengage_init_key),
                        webengage.track(drupalSettings.anthe_webengage_exam_type + "_6_payment", {
                            campaign_name: drupalSettings.we_campaign_name,
                            // user_id: drupalSettings.anthe_webengage_we_user_id,
                            user_psid: get_cookie('anthe_webengage_c_psid') != null ? get_cookie('anthe_webengage_c_psid') : "",
                            we_first_name: drupalSettings.anthe_webengage_we_first_name,
                            we_email: drupalSettings.anthe_webengage_email,
                            mobile_no: drupalSettings.anthe_webengage_user_we_phone,
                            // father_name: drupalSettings.anthe_webengage_father_name,
                            DOB: drupalSettings.anthe_webengage_student_dob,
                            class_studying: drupalSettings.anthe_webengage_class,
                            exam_stream: drupalSettings.anthe_webengage_stream,
                            school_city: drupalSettings.anthe_webengage_city,
                            school_board: drupalSettings.anthe_webengage_school_board,
                            school_name: drupalSettings.anthe_webengage_other_school_name,
                            exam_mode: examMode.split(/-/)[0],
                            exam_time: exam_time,
                            exam_fee: get_cookie('anthe_webengage_c_exam_fee'),
                            state: get_cookie("anthe_webengage_exam_state"),
                            center: get_cookie("anthe_webengage_branch_code"),
                            DOE: get_cookie("anthe_webengage_exam_date"),
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            // lead_type:drupalSettings.anthe_webengage_lead_type,
                            coupon_code: get_cookie('anthe_webenegage_c_couponcode') == null ? '' : get_cookie('anthe_webenegage_c_couponcode'),
                            payment_method: (unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').indexOf("Online") > -1 && (get_cookie("anthe_webengage_journey_type") == '1')) ? "" : (get_cookie("anthe_webengage_payment_gateway") == 'paytm' ? "Paytm" : "CcAvenue"),
                            voucher_id: get_cookie("anthe_webengage_voucher_id"),
                            Journey_type: get_cookie("anthe_webengage_journey_type") == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                            // pageHostName: window.location.hostname,
                            // pagePath: document.location.pathname,
                            exam_source: get_cookie('anthe_c_exam_source'),
                        }),
                        Console.log(examSource)
                    ),

                    'Online' == unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').split("-")[0].trim() && (webengage.init(webengage_init_key),
                        webengage.track(drupalSettings.anthe_webengage_exam_type + "_6_payment", {
                            campaign_name: drupalSettings.we_campaign_name,
                            // user_id: drupalSettings.anthe_webengage_we_user_id,
                            user_psid: get_cookie('anthe_webengage_c_psid') != null ? get_cookie('anthe_webengage_c_psid') : "",
                            we_first_name: drupalSettings.anthe_webengage_we_first_name,
                            we_email: drupalSettings.anthe_webengage_email,
                            mobile_no: drupalSettings.anthe_webengage_user_we_phone,
                            // father_name: drupalSettings.anthe_webengage_father_name,
                            DOB: drupalSettings.anthe_webengage_student_dob,
                            class_studying: drupalSettings.anthe_webengage_class,
                            exam_stream: drupalSettings.anthe_webengage_stream,
                            school_city: drupalSettings.anthe_webengage_city,
                            school_board: drupalSettings.anthe_webengage_school_board,
                            school_name: drupalSettings.anthe_webengage_other_school_name,
                            exam_mode: examMode.split(/-/)[0],
                            exam_time: exam_time,
                            exam_fee: get_cookie('anthe_webengage_c_exam_fee'),
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            state: get_cookie("anthe_webengage_exam_state"),
                            center: get_cookie("anthe_webengage_branch_code"),
                            DOE: get_cookie("anthe_webengage_exam_date"),
                            // lead_type:drupalSettings.anthe_webengage_lead_type,
                            coupon_code: get_cookie('anthe_webenegage_c_couponcode') == null ? '' : get_cookie('anthe_webenegage_c_couponcode'),
                            payment_method: (unescape(get_cookie('anthe_webengage_exam_mode')).replace(/\+/g, ' ').indexOf("Online") > -1 && (get_cookie("anthe_webengage_journey_type") == '1')) ? "" : (get_cookie("anthe_webengage_payment_gateway") == 'paytm' ? "Paytm" : "CcAvenue"),
                            voucher_id: get_cookie("anthe_webengage_voucher_id"),
                            Journey_type: get_cookie("anthe_webengage_journey_type") == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page',
                            exam_source: get_cookie('anthe_c_exam_source'),
                            // pageHostName: window.location.hostname,
                            // pagePath: document.location.pathname,
                        }),
                        console.log(examSource)
                    ),

                    invokeLsPayFeeEvent(),
                    set_cookie('anthe_c_campaign_name', drupalSettings.we_campaign_name),
                    set_cookie('anthe_c_mobile', drupalSettings.anthe_webengage_user_we_phone),
                    set_cookie('anthe_c_user_psid', get_cookie('anthe_webengage_c_psid') != 'null' ? get_cookie('anthe_webengage_c_psid') : ""),
                    set_cookie('anthe_c_exam_type', drupalSettings.anthe_webengage_exam_type),
                    set_cookie('anthe_c_lead_type', drupalSettings.anthe_webengage_lead_type),
                    set_cookie('anthe_c_exam_date', get_cookie("anthe_webengage_exam_date")),
                    set_cookie('anthe_c_firstname', drupalSettings.anthe_webengage_we_first_name),
                    set_cookie('anthe_c_fathername', drupalSettings.anthe_webengage_father_name),
                    set_cookie('anthe_c_dob', drupalSettings.anthe_webengage_student_dob),
                    set_cookie('anthe_c_class', drupalSettings.anthe_webengage_class),
                    set_cookie('anthe_c_stream', drupalSettings.anthe_webengage_stream),
                    set_cookie('anthe_c_exam_center', get_cookie("anthe_webengage_branch_code")),
                    set_cookie('anthe_c_email', drupalSettings.anthe_webengage_email),
                    set_cookie('anthe_c_school_city', drupalSettings.anthe_webengage_city),
                    set_cookie('anthe_c_school_board', drupalSettings.anthe_webengage_school_board),
                    set_cookie('anthe_c_school_name', drupalSettings.anthe_webengage_other_school_name),
                    set_cookie('anthe_c_journey_type', get_cookie("anthe_webengage_journey_type") == '1' ? 'Aakash Landing Page' : 'Third Party Landing Page'),
                    erase_cookie("anthe_webengage_ls_exam_date"),
                    erase_cookie('anthe_webengage_exam_date'),
                    // erase_cookie('anthe_webengage_exam_state'),
                    // erase_cookie('anthe_webengage_branch_code'),
                    erase_cookie("proceed_for_checkout")
                )
            } else {
                // Verify OTP event for webengage
                "signup_step_one" == drupalSettings.anthe_webengage_form_name && (get_cookie("step_3_verify_otp") == null) && (webengage.init(webengage_init_key),
                        webengage.user.login(drupalSettings.anthe_webengage_we_user_id),
                        webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone),
                        set_cookie("anthe_webengage_we_user_id",
                            drupalSettings.anthe_webengage_we_user_id, 365),

                        webengage.track(drupalSettings.anthe_webengage_exam_type + "_3_Verify_OTP", {
                            //    user_id: drupalSettings.anthe_webengage_we_user_id,
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            pageHostName: window.location.hostname,
                            pagePath: document.location.pathname
                        }),
                        set_cookie("step_3_verify_otp", "true", 365),
                        drupalSettings.anthe_webengage_form_name = ""),

                    // Personal Info event for webengage

                    "signup_step_two" == drupalSettings.anthe_webengage_form_name && (get_cookie("step_4_personal_info") == null) && (webengage.init(webengage_init_key),
                        dataLayer.push({
                            'event': Ga_examType + '_select_exam_date'
                        }),
                        webengage.user.setAttribute("we_first_name", drupalSettings.anthe_webengage_we_first_name),
                        webengage.user.setAttribute("we_email", drupalSettings.anthe_webengage_email, ),
                        webengage.track(drupalSettings.anthe_webengage_exam_type + "_4_Personal_Info", {
                            user_id: drupalSettings.anthe_webengage_we_user_id,
                            we_first_name: drupalSettings.anthe_webengage_we_first_name,
                            class_studying: drupalSettings.anthe_webengage_class,
                            exam_stream: drupalSettings.anthe_webengage_stream,
                            exam_mode: drupalSettings.anthe_webengage_exam_mode,
                            exam_time: drupalSettings.anthe_webengage_exam_time,
                            exam_state: drupalSettings.anthe_webengage_state,
                            exam_prefrred_center: drupalSettings.anthe_webengage_prefrred_center,
                            we_email: drupalSettings.anthe_webengage_email,
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            pageHostName: window.location.hostname,
                            pagePath: document.location.pathname
                        }),
                        dataLayer.push({
                            'event': drupalSettings.anthe_webengage_exam_type + '_registration_step1_EC',
                            'student_name': drupalSettings.anthe_webengage_we_first_name,
                            'email_id': drupalSettings.anthe_webengage_email,
                        }),
                        invokeLsClickRegisterEvent(),
                        setTimeout(applyCouponAuto, 1000),
                        set_cookie("step_4_personal_info", "true", 365),
                        drupalSettings.anthe_webengage_form_name = ""
                    ),
                    // Complete Registration event for webengage
                    "true" == get_cookie("proceed_for_checkout") && (null !== get_cookie("anthe_webengage_we_user_id")) && (webengage.init(webengage_init_key),
                        //Complete Registration Event
                        dataLayer.push({
                            'event': Ga_examType + '_complete_reg'
                        }),
                        webengage.track(drupalSettings.anthe_webengage_exam_type + "_5_Complete_Registration", {
                            user_id: get_cookie("anthe_webengage_we_user_id"),
                            exam_type: drupalSettings.anthe_webengage_exam_type,
                            pageHostName: window.location.hostname,
                            pagePath: document.location.pathname
                        }),
                        invokeLsPayFeeEvent(),
                        erase_cookie("anthe_webengage_ls_exam_date"),
                        erase_cookie("proceed_for_checkout"))
            }

            // "true" == get_cookie("proceed_for_checkout") && (null !== get_cookie("anthe_webengage_we_user_id") && dataLayer.push({
            //     event: "Proceed for Payment",
            //     user_id: get_cookie("anthe_webengage_we_user_id"),
            //     pageHostName: window.location.hostname,
            //     pagePath: document.location.pathname
            // }),
            // invokeLsPayFeeEvent(),
            // erase_cookie("anthe_webengage_ls_exam_date"),
            // erase_cookie("proceed_for_checkout"),
            // console.log("Proceed for Payment")
            // ),


            // Single Page Registration

            //STEP 1

            "sp_signup_step_one" == drupalSettings.anthe_webengage_form_name && null == get_cookie("Intent_To_Reg") && (webengage.init(webengage_init_key),
                    webengage.user.login(drupalSettings.anthe_webengage_we_user_id),
                    webengage.user.setAttribute("we_phone", drupalSettings.anthe_webengage_we_phone),
                    set_cookie("anthe_webengage_we_user_id",
                        drupalSettings.anthe_webengage_we_user_id, 365),
                    webengage.track(drupalSettings.anthe_webengage_exam_type + "_SS_3_Verify_OTP", {
                        user_id: drupalSettings.anthe_webengage_we_user_id,
                        exam_type: drupalSettings.anthe_webengage_exam_type,
                        pageHostName: window.location.hostname,
                        pagePath: document.location.pathname
                    }),
                    set_cookie("Intent_To_Reg", true, 1),
                    console.log(drupalSettings.anthe_webengage_we_user_id),
                    //console.log(drupalSettings.anthe_webengage_we_user_id), 
                    //console.log(drupalSettings.anthe_webengage_we_phone),
                    console.log(drupalSettings.anthe_webengage_exam_type),
                    //console.log("pagePath==="),
                    //console.log("pageHostName==="),
                    //invokeLsClickRegisterEvent(),
                    console.log(drupalSettings.anthe_webengage_exam_type + "_SS_3_Verify_OTP"),
                    drupalSettings.anthe_webengage_form_name = ""),

                //STEP FINAL
                "sp_signup_step_final" == drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
                    dataLayer.push({
                        'event': Ga_examType + '_complete_reg'
                    }),
                    webengage.user.setAttribute("we_first_name", drupalSettings.anthe_webengage_we_first_name),
                    webengage.user.setAttribute("we_email", drupalSettings.anthe_webengage_email),
                    webengage.track(drupalSettings.anthe_webengage_exam_type + "_SS_4_Complete_Registration", {
                        user_id: drupalSettings.anthe_webengage_we_user_id,
                        we_first_name: drupalSettings.anthe_webengage_we_first_name,
                        exam_class: drupalSettings.anthe_webengage_class,
                        exam_stream: drupalSettings.anthe_webengage_stream,
                        exam_mode: drupalSettings.anthe_webengage_exam_mode,
                        exam_time: drupalSettings.anthe_webengage_exam_time,
                        exam_state: drupalSettings.anthe_webengage_state,
                        exam_prefrred_center: drupalSettings.anthe_webengage_prefrred_center,
                        we_email: drupalSettings.anthe_webengage_email,
                        exam_type: drupalSettings.anthe_webengage_exam_type,
                        pageHostName: window.location.hostname,
                        pagePath: document.location.pathname
                    }),
                    erase_cookie("anthe_webengage_ls_exam_date"),
                    console.log(drupalSettings.anthe_webengage_we_user_id),
                    console.log(drupalSettings.anthe_webengage_we_first_name),
                    console.log(drupalSettings.anthe_webengage_class),
                    console.log(drupalSettings.anthe_webengage_stream),
                    console.log(drupalSettings.anthe_webengage_exam_mode),
                    console.log(drupalSettings.anthe_webengage_exam_time),
                    console.log(drupalSettings.anthe_webengage_state),
                    console.log(drupalSettings.anthe_webengage_prefrred_center),
                    console.log(drupalSettings.anthe_webengage_email),
                    console.log(drupalSettings.anthe_webengage_exam_type),
                    console.log(drupalSettings.anthe_webengage_exam_type + "_SS_4_Complete_Registration"),
                    drupalSettings.anthe_webengage_form_name = ""
                )
        }
    }
}(Drupal, jQuery),
function(e) {
    e(window).on("load", function() {
        e("div").hasClass("payment-form-success-wrapper") && (null !== get_cookie("anthe_webengage_we_user_id") && dataLayer.push({
                    event: "Payment Sucess",
                    user_id: get_cookie("anthe_webengage_we_user_id"),
                    pageHostName: window.location.hostname,
                    pagePath: document.location.pathname
                }),
                invokeLsIacstRegister(),
                erase_cookie("apps_flayer_ls_event_class"),
                erase_cookie("apps_flayer_ls_event_stream"),
                erase_cookie("apps_flayer_ls_event_exam_date"),
                console.log("Payment Sucess"),
                console.log(window.location.hostname),
                console.log(document.location.pathname)),
            e("div").hasClass("payment-failed-wrapper") && (null !== get_cookie("anthe_webengage_we_user_id") && dataLayer.push({
                    event: "Payment Sucess",
                    user_id: get_cookie("anthe_webengage_we_user_id"),
                    pageHostName: window.location.hostname,
                    pagePath: document.location.pathname
                }),
                console.log("Payment Failed"),
                console.log(window.location.hostname),
                console.log(document.location.pathname))
    })
}(jQuery);

/**
 * Implementation of Form Step 2 click
 * @returns {undefined}
 */
function invokeLsClickRegisterEvent() {
    var userId = drupalSettings.anthe_webengage_we_phone;
    try {
        AndroidInterface.postMessage(JSON.stringify({
            name: 'apps_flyer_event',
            body: {
                "event_name": "init_iacst_register",
                "params": {

                }
            }
        }));
    } catch (err) {
        console.log(err.message);
    }

    try {
        window.webkit.messageHandlers.eventHandler.postMessage(JSON.stringify({
            name: 'apps_flyer_event',
            body: {
                "event_name": "init_iacst_register",
                "params": {

                }
            }
        }));
    } catch (err) {
        console.log(err.message);
    }
    var jsonData = JSON.stringify({
        name: 'apps_flyer_event',
        body: {
            "event_name": "init_iacst_register",
            "params": {
                "userId": userId
            }
        }
    });
    callAjaxSaveLog(jsonData, userId);
}

/**
 * Implementation of LS Pay Fee Event
 * @returns {undefined}
 * 
 */
function invokeLsPayFeeEvent() {
    var classValue = drupalSettings.anthe_webengage_ls_class;
    var streamValue = drupalSettings.anthe_webengage_ls_stream;
    var examDate = get_cookie("anthe_webengage_ls_exam_date");
    var userId = drupalSettings.anthe_webengage_we_phone;
    try {
        AndroidInterface.postMessage(JSON.stringify({
            name: 'apps_flyer_event',
            body: {
                "event_name": "init_iacst_payment",
                "params": {
                    "class": classValue,
                    "stream": streamValue,
                    "slots": examDate
                }
            }
        }));
    } catch (err) {
        console.log(err.message);
    }

    try {
        window.webkit.messageHandlers.eventHandler.postMessage(JSON.stringify({
            name: 'apps_flyer_event',
            body: {
                "event_name": "init_iacst_payment",
                "params": {
                    "class": classValue,
                    "stream": streamValue,
                    "slots": examDate
                }
            }
        }));
    } catch (err) {
        console.log(err.message);
    }
    var jsonData = JSON.stringify({
        name: 'apps_flyer_event',
        body: {
            "event_name": "init_iacst_payment",
            "params": {
                "class": classValue,
                "stream": streamValue,
                "slots": examDate,
                "payment": "initiate"
            }
        }
    });
    callAjaxSaveLog(jsonData, userId);
}

/**
 * Implementation of LS Pay Fee Event
 * @returns {undefined}
 */
function invokeLsIacstRegister() {
    var classValue = get_cookie("apps_flayer_ls_event_class");
    var streamValue = get_cookie("apps_flayer_ls_event_stream");
    var examDate = get_cookie("apps_flayer_ls_event_exam_date");
    var userId = get_cookie("anthe_webengage_we_user_id");

    const classValueArr = classValue.split("+");
    if (classValueArr.length > 0) {
        classValue = classValueArr.join(' ');
    }

    try {
        AndroidInterface.postMessage(JSON.stringify({
            name: 'apps_flyer_event',
            body: {
                "event_name": "fin_iacst_register",
                "params": {
                    "class": classValue,
                    "stream": streamValue,
                    "slots": examDate
                }
            }
        }));
    } catch (err) {
        console.log(err.message);
    }

    try {
        window.webkit.messageHandlers.eventHandler.postMessage(JSON.stringify({
            name: 'apps_flyer_event',
            body: {
                "event_name": "fin_iacst_register",
                "params": {
                    "class": classValue,
                    "stream": streamValue,
                    "slots": examDate
                }
            }
        }));
    } catch (err) {
        console.log(err.message);
    }
    var jsonData = JSON.stringify({
        name: 'apps_flyer_event',
        body: {
            "event_name": "fin_iacst_register",
            "params": {
                "class": classValue,
                "stream": streamValue,
                "slots": examDate,
                "payment": "done"
            }
        }
    });
    callAjaxSaveLog(jsonData, userId);
}

/**
 * Implementation of Call Ajax Save Log
 * @returns {undefined}
 */
function callAjaxSaveLog(jsonData, userId) {
    console.log('userIdVal==' + userId);
    jQuery.ajax({
        type: "POST",
        cache: false,
        url: drupalSettings.path.baseUrl + "ls-apps-flayer-event",
        data: {
            data: jsonData,
            userId: userId
        },
        beforeSend: function() {

        },
        success: function(data) {

        }
    });
}

/**
 * Implementation of Coupon Auto click
 * @returns {undefined}
 */
function applyCouponAuto() {
    try {
        var coupon = drupalSettings.coupon_code_value;
        var bool_pg_skip = get_cookie("bool_pg_skip");
        if (coupon && (bool_pg_skip == "FALSE")) {
            jQuery('#edit-apply-coupon').click();
            jQuery('#edit-apply-coupon').hide();
        }
    } catch (err) {
        //console.log(err.message);
    }
}



//GA4 EVENTS

jQuery(document).ready(function($) {

    //Get OTP Event
    $('#form-wrapper > div.mobile-wrapper > div.otp-wrapper > a').on('click', function() {
        if ($("input[id='edit-mobile-no']").val().length == 10) {
            dataLayer.push({
                'event': Ga_examType + '_get_otp'
            });
        }
    });

    //EXAM DATE SELECTION EVENT

    //Login Click Event
    $('#form-wrapper > div.already-registered > a').on('click', function() {
        dataLayer.push({
            'event': 'login_now_click'
        });
    });

    //LOGO CLICK EVENT
    $('#block-anthe-content > article > section.banner-main-wrapper > div > div:nth-child(1) > div > a.logotop > img,#topheader > div > div > div.col-md-4.col-sm-4.pull-left > img').on('click', function() {
        dataLayer.push({
            'event': 'aakash_logo_click'
        });
    });


})

// WEBENGAGE Event

jQuery(document).ready(function($) {
    if (window.location.host == 'iacst.aakash.ac.in') {

        $('#block-dashboardmenu--3 > ul > li > a').on('click', function() {
            webengage.init(webengage_init_key);
            webengage.track('iacst_db_tab_' + $(this).text() + '_click');
            console.log('iacst_db_tab_' + $(this).text() + '_click');
        });





        $('#edit-user-rollnumber').on('input', function() {
            var roll = $('#edit-user-rollnumber').val();
            if ($(this).val().length === 12) {
                $('#edit-user-dob').click(function() {
                    webengage.init(webengage_init_key);
                    webengage.track("iacst_login_roll_entered", {
                        user_rollnumber: roll,
                    });
                    console.log(roll);
                });
            }
        });

        $('#edit-user-dob').change(function() {
            var dob = $(this).val();

            if (dob.length === 10) {
                webengage.init(webengage_init_key);
                webengage.track("iacst_login_DOB_entered", {
                    user_dob: dob,
                });
                console.log(dob);
            }
        });

        $('#edit-submit').on('click', function() {
            webengage.init(webengage_init_key);
            webengage.track("iacst_login_signin", {});
            console.log('iacst_login_signin');

        });

        "login" === drupalSettings.anthe_webengage_form_name && (webengage.init(webengage_init_key),
            webengage.track("iacst_login_success", {
                user_rollnumber: drupalSettings.anthe_webengage_roll_no,
                user_dob: drupalSettings.anthe_webengage_dob,
            }),
            console.log("iacst_login_success"),
            console.log(drupalSettings.anthe_webengage_roll_no),
            console.log(drupalSettings.anthe_webengage_dob))


        $(document).ready(function() {

            if (window.location.pathname == '/exam/login') {
                var dob = localStorage.getItem('dob');
                $('#edit-submit').on('click', function() {
                    dob = $('#edit-user-dob').val();
                    localStorage.setItem('dob', dob);
                });
                var roll = $('#edit-user-rollnumber').val();
                checkForErrorMessage(roll, dob);
            }

        });

        function checkForErrorMessage(roll, dob) {
            var errorMessage = $('.messages.messages--error div[role="alert"]');
            if (errorMessage.length > 0) {
                webengage.init(webengage_init_key);
                webengage.track("iacst_login_invalid_credentials", {
                        user_rollnumber: roll,
                        user_dob: dob,
                    }),
                    console.log("iacst_login_invalid_credentials");
                console.log(roll);
                console.log(dob);
            }
        }
    }

})