let ready = (callback) => {
    if (document.readyState !== "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => {

    function getXmlHttp(){
        let xmlhttp;
        try {
            xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {
                xmlhttp = false;
            }
        }
        if (!xmlhttp && typeof XMLHttpRequest !== 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }

    let menuHeadLi = document.querySelector('.menu_el-doc-head');
    if (menuHeadLi) {
        let allMenuSubBlocks = document.querySelector('.menu_el-doc_block');
        menuHeadLi.onmouseover = function (e) {
            allMenuSubBlocks.style.opacity = '1';
            allMenuSubBlocks.style.visibility = 'visible';
        }
        allMenuSubBlocks.onmouseover = function (e) {
            allMenuSubBlocks.style.opacity = '1';
            allMenuSubBlocks.style.visibility = 'visible';
        }
        allMenuSubBlocks.onmouseout = function (e) {
            allMenuSubBlocks.style.opacity = '0';
            allMenuSubBlocks.style.visibility = 'hidden';
        }
        menuHeadLi.onmouseout = function (e) {
            allMenuSubBlocks.style.opacity = '0';
            allMenuSubBlocks.style.visibility = 'hidden';
        }
    }
    let mobileBurger = document.querySelector('.nav_icon-mobile');
    let mobileBody = document.querySelector('.menu_mobile-body');
    if (mobileBurger) {
        mobileBurger.addEventListener('click', function (e) {
            mobileBurger.classList.toggle('open');
            mobileBody.classList.toggle('visible_body');
        });
    }
    let mobileDocBtn = document.querySelector('.menu_mobile-body-menu_el-block-head');
    let mobileDocBlock = document.querySelector('.menu_mobile-body-menu_el-block-body');
    if (mobileDocBtn) {
        mobileDocBtn.addEventListener('click', function (e) {
            mobileDocBlock.classList.toggle('menu_mobile-body-menu_el-block-body_visible');
        });
    }
    let footerMailLink = document.querySelector('.unlink_class_footer-mail');
    let footerMailIco = document.querySelector('.footer_mail_img');
    let footerMailText = document.querySelector('.footer_text-mail');
    if (footerMailLink) {
        footerMailLink.onmouseover = function (e) {
            footerMailIco.style.filter = 'invert(0.6)';
            footerMailText.style.color = '#bdaa7e';
        }
        footerMailLink.onmouseout = function (e) {
            footerMailIco.style.filter = 'none';
            footerMailText.style.color = '#FFFFFF';
        }
    }
    let maleRadioCompetitions = document.getElementById('competition_entry-form_gender-male');
    let femaleRadioCompetitions = document.getElementById('competition_entry-form_gender-female');
    if (maleRadioCompetitions) {
        let labelWcM = document.getElementById('competition_entry-form_wcat-m-label');
        let labelWcF = document.getElementById('competition_entry-form_wcat-f-label');
        let sekectWcM = document.getElementById('competition_entry-form_wcat-m');
        let sekectWcF = document.getElementById('competition_entry-form_wcat-f');
        maleRadioCompetitions.addEventListener('click', function (e) {
            labelWcM.style.display = 'block';
            sekectWcM.style.display = 'block';
            labelWcF.style.display = 'none';
            sekectWcF.style.display = 'none';
        });
        femaleRadioCompetitions.addEventListener('click', function (e) {
            labelWcF.style.display = 'block';
            sekectWcF.style.display = 'block';
            labelWcM.style.display = 'none';
            sekectWcM.style.display = 'none';
        });
    }
    let SportsTypeCheckedChckbxs = document.querySelectorAll('.competition_entry-form_sp-t_chckbx');
    if (SportsTypeCheckedChckbxs) {
        let blockBestBP = document.querySelector('.competition_entry-form_sur-bp');
        let blockBestBPEkip = document.querySelector('.competition_entry-form_sur-bpekip');
        let blockBestPL = document.querySelector('.competition_entry-form_sur-pwlclass');
        let blockBestPLEkip = document.querySelector('.competition_entry-form_sur-pwlekip');
        for (let i = 0; i < SportsTypeCheckedChckbxs.length; i ++) {
            SportsTypeCheckedChckbxs[i].addEventListener('change', function (e) {
                if (this.value === "?????????????????? ????????????????????????") {
                    if (this.checked) {
                        blockBestPL.style.display = 'flex';
                        document.querySelector('input[value="?????? ???????? (?????? ????????.)"]').checked = true;
                        blockBestBP.style.display = 'flex';
                    } else {
                        blockBestPL.style.display = 'none';
                    }
                }
                if (this.value === "?????????????????? (????????.)") {
                    if (this.checked) {
                        blockBestPLEkip.style.display = 'flex';
                        document.querySelector('input[value="?????? ???????? (????????.)"]').checked = true;
                        blockBestBPEkip.style.display = 'flex';
                    } else {
                        blockBestPLEkip.style.display = 'none';
                    }
                }
                if (this.value === "?????? ???????? (????????.)") {
                    if (this.checked) {
                        blockBestBPEkip.style.display = 'flex';
                    } else {
                        blockBestBPEkip.style.display = 'none';
                    }
                }
                if (this.value === "?????? ???????? (?????? ????????.)") {
                    if (this.checked) {
                        blockBestBP.style.display = 'flex';
                    } else {
                        blockBestBP.style.display = 'none';
                    }
                }
            });
        }
    }
    let competitionEntryForm = document.getElementById('competition_entry-form');
    let modalCompetitions = document.getElementById('competition_form_modal');
    let modalCompetitionsClose = document.getElementById('competition_form_modal-close');
    let modalCompetitionsText = document.getElementById('competition_form_modal-fio');
    let modalCompetitionsTextMain = document.getElementById('competition_form_modal-text');
    if (competitionEntryForm) {
        competitionEntryForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let surnameCompetitor = document.getElementById('competition_entry-form_sur-input');
            let nameCompetitor = document.getElementById('competition_entry-form_name-input');
            let patricCompetitor = document.getElementById('competition_entry-form_patr-input');
            let birthdayCompetitor = document.getElementById('competition_entry-form_birthday-input');
            // let wcatMCompetitor = document.getElementById('competition_entry-form_wcat-m');
            // let wcatFCompetitor = document.getElementById('competition_entry-form_wcat-f');
            let sptCompetitor = document.querySelectorAll('.competition_entry-form_sp-t_chckbx');
            let brPWE = document.getElementById('competition_entry-form_pwlekip-input');
            let brPW = document.getElementById('competition_entry-form_pwlclass-input');
            let brBPE = document.getElementById('competition_entry-form_bpekip-input');
            let brBP = document.getElementById('competition_entry-form_bp-input');
            let surTrainer = document.getElementById('competition_entry-form_sur-trn-input');
            let nameTrainer = document.getElementById('competition_entry-form_name-trn-input');
            let patrTrainer = document.getElementById('competition_entry-form_patr-trn-input');
            let clubCompetitor = document.getElementById('competition_entry-form_club-input');
            let phoneCompetitor = document.getElementById('competition_entry-form_phone-input');
            let mailCompetitor = document.getElementById('competition_entry-form_mail-input');
            let agreeCompetitor = document.getElementById('competition_entry-form_agree-chckbx');
            if (surnameCompetitor.value === "" || surnameCompetitor.value.length > 100) {
                surnameCompetitor.style.border = "1px solid #bd7979";
            } else {
                surnameCompetitor.style.border = "1px solid #192b45";
            }
            if (nameCompetitor.value === "" || nameCompetitor.value.length > 100) {
                nameCompetitor.style.border = "1px solid #bd7979";
            } else {
                nameCompetitor.style.border = "1px solid #192b45";
            }
            if (patricCompetitor.value === "" || patricCompetitor.value.length > 100) {
                patricCompetitor.style.border = "1px solid #bd7979";
            } else {
                patricCompetitor.style.border = "1px solid #192b45";
            }
            if (birthdayCompetitor.value === "") {
                birthdayCompetitor.style.border = "1px solid #bd7979";
            } else {
                birthdayCompetitor.style.border = "1px solid #192b45";
            }
            let sptCompetitorchckd = [];
            for (let i = 0; i < sptCompetitor.length; i ++) {
                if (sptCompetitor[i].checked) {
                    sptCompetitorchckd.push(sptCompetitor[i]);
                }
            }
            if (sptCompetitorchckd.length < 1) {
                for (let i = 0; i < sptCompetitor.length; i ++) {
                    sptCompetitor[i].style.border = "1px solid #bd7979";
                }
            } else {
                for (let i = 0; i < sptCompetitor.length; i ++) {
                    sptCompetitor[i].style.border = "1px solid #192b45";
                }
            }
            if (surTrainer.value.length > 100) {
                surTrainer.style.border = "1px solid #bd7979";
            } else {
                surTrainer.style.border = "1px solid #192b45";
            }
            if (nameTrainer.value.length > 100) {
                nameTrainer.style.border = "1px solid #bd7979";
            } else {
                nameTrainer.style.border = "1px solid #192b45";
            }
            if (patrTrainer.value.length > 100) {
                patrTrainer.style.border = "1px solid #bd7979";
            } else {
                patrTrainer.style.border = "1px solid #192b45";
            }
            if (clubCompetitor.value.length > 150) {
                clubCompetitor.style.border = "1px solid #bd7979";
            } else {
                clubCompetitor.style.border = "1px solid #192b45";
            }
            if (phoneCompetitor.value.length > 15) {
                phoneCompetitor.style.border = "1px solid #bd7979";
            } else {
                phoneCompetitor.style.border = "1px solid #192b45";
            }
            if (mailCompetitor.value.length > 30) {
                mailCompetitor.style.border = "1px solid #bd7979";
            } else {
                mailCompetitor.style.border = "1px solid #192b45";
            }
            if (agreeCompetitor.checked === false) {
                agreeCompetitor.style.border = "1px solid #bd7979";
            } else {
                agreeCompetitor.style.border = "1px solid #192b45";
            }
            if (surnameCompetitor.value !== "" && surnameCompetitor.value.length < 100 && nameCompetitor.value !== "" && nameCompetitor.value.length < 100 && patricCompetitor.value !== "" && patricCompetitor.value.length < 100 && birthdayCompetitor.value !== "" && sptCompetitorchckd.length > 0 && surTrainer.value.length < 100 && nameTrainer.value.length < 100 && patrTrainer.value.length < 100 && clubCompetitor.value.length < 150 && phoneCompetitor.value.length < 15 && mailCompetitor.value.length < 30 && agreeCompetitor.checked === true) {
                let thisForm = e.target;
                let method = thisForm.getAttribute('method');
                let endpoint = thisForm.getAttribute('action');
                let data = thisForm.elements;
                let resultForm = '';
                for (let i = 0; i < data.length; i ++) {
                    let item = data.item(i);
                    let value = item.value;
                    if (item.type === "radio" || item.type === "checkbox") {
                        if (item.checked) {
                            resultForm = resultForm + '&' + item.name + '=' + encodeURIComponent(value);
                        }
                    } else {
                        resultForm = resultForm + '&' + item.name + '=' + encodeURIComponent(value);
                    }
                }
                // console.log(resultForm);
                let myxmlhttp = getXmlHttp();
                myxmlhttp.open(method, endpoint, true);
                myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                myxmlhttp.setRequestHeader("X-CSRFToken", data.csrfmiddlewaretoken.value);
                myxmlhttp.send(resultForm);
                myxmlhttp.onload = function() {
                    if (myxmlhttp.status === 200) {
                        surnameCompetitor.value = "";
                        nameCompetitor.value = "";
                        patricCompetitor.value = "";
                        birthdayCompetitor.value = "";
                        for (let i = 0; i < sptCompetitor.length; i ++) {
                            sptCompetitor[i].checked = false;
                        }
                        brPWE.value = "";
                        brPWE.parentElement.style.display = "none";
                        brPW.value = "";
                        brPW.parentElement.style.display = "none";
                        brBPE.value = "";
                        brBPE.parentElement.style.display = "none";
                        brBP.value = "";
                        brBP.parentElement.style.display = "none";
                        surTrainer.value = "";
                        nameTrainer.value = "";
                        patrTrainer.value = "";
                        clubCompetitor.value = "";
                        phoneCompetitor.value = "";
                        mailCompetitor.value = "";
                        modalCompetitions.style.display = "block";
                        modalCompetitionsText.textContent = JSON.parse(myxmlhttp.response).np;
                        // setTimeout(function () {
                        //     modalCompetitions.style.display = "none";
                        // }, 4000);
                        window.onclick = function(event) {
                            if (event.target === modalCompetitions) {
                                modalCompetitions.style.display = "none";
                            }
                        }
                        modalCompetitionsClose.onclick = function() {
                            modalCompetitions.style.display = "none";
                        }
                    } else if (myxmlhttp.status === 500) {
                        console.log(JSON.parse(myxmlhttp.response).error)
                        surnameCompetitor.value = "";
                        nameCompetitor.value = "";
                        patricCompetitor.value = "";
                        birthdayCompetitor.value = "";
                        for (let i = 0; i < sptCompetitor.length; i ++) {
                            sptCompetitor[i].checked = false;
                        }
                        brPWE.value = "";
                        brPWE.parentElement.style.display = "none";
                        brPW.value = "";
                        brPW.parentElement.style.display = "none";
                        brBPE.value = "";
                        brBPE.parentElement.style.display = "none";
                        brBP.value = "";
                        brBP.parentElement.style.display = "none";
                        surTrainer.value = "";
                        nameTrainer.value = "";
                        patrTrainer.value = "";
                        clubCompetitor.value = "";
                        phoneCompetitor.value = "";
                        mailCompetitor.value = "";
                        modalCompetitions.style.display = "block";
                        modalCompetitionsTextMain.innerHTML = '???? ?????????? ???????????????????? ???????????? ?????????????????? ???? ?????????????????? ????????????. ????????????????????, ???????????????? ???????????? ?? ???????????????????????? ???????? ???? ?????????? <a href="mailto:info@powerlifting-kirov.ru">info@powerlifting-kirov.ru</a>';
                        window.onclick = function(event) {
                            if (event.target === modalCompetitions) {
                                modalCompetitions.style.display = "none";
                            }
                        }
                        modalCompetitionsClose.onclick = function() {
                            modalCompetitions.style.display = "none";
                        }
                    }
                };
                myxmlhttp.onerror = function() {
                    console.log(myxmlhttp.responseText);
                };
            }
        });
    }
    // let screenWidth = window.innerWidth;
    // let competitorsTable = document.querySelectorAll('.competitors_list_table-tbody');
    // if (competitorsTable) {
    //     if (screenWidth > 1000) {
    //         for (let i = 0; i < competitorsTable.length; i ++) {
    //             competitorsTable[i].style.marginLeft = ((screenWidth - Number(getComputedStyle(competitorsTable[i]).width.split('p')[0])) / 2) - 40 + 'px';
    //         }
    //     }
    // }
    let secretaryPageSelectStreams = document.getElementById('form-secretary_stream-select');
    if (secretaryPageSelectStreams) {
        secretaryPageSelectStreams.addEventListener("change", function (e) {
            e.preventDefault();
            // console.log(secretaryPageSelectStreams)
            document.getElementById('form-secretary_stream-btn').click();
        });
    }
    let curUrl = new URL(window.location)
    if (curUrl.pathname.indexOf('/secretary_page/') !== -1) {
        let curStreamUrl = curUrl.searchParams.get('form-secretary_stream-select');
        if (curStreamUrl) {
            let selectOpts = secretaryPageSelectStreams.children;
            for (let i = 0; i < selectOpts.length; i ++) {
                if (curStreamUrl === selectOpts[i].textContent) {
                    selectOpts[i].setAttribute('selected', true);
                    break;
                }
            }
        }
    }
    let secrPageChbxsTransl = document.querySelectorAll('.secr-page_chckbx');
    if (secrPageChbxsTransl) {
        for (let i = 0; i < secrPageChbxsTransl.length; i ++) {
            secrPageChbxsTransl[i].addEventListener("change", function (e) {
                e.preventDefault();
                for (let x = 0; x < secrPageChbxsTransl.length; x++) {
                    if (secrPageChbxsTransl[x].checked && secrPageChbxsTransl[x] !== this) {
                        secrPageChbxsTransl[x].checked = false;
                    }
                }
            });
            // if (secrPageChbxsTransl[i].parentNode.parentNode.nextElementSibling.firstElementChild.options.selectedIndex !== 0) {
            //     secrPageChbxsTransl[i].setAttribute('disabled', true);
            // } else {
            //     secrPageChbxsTransl[i].removeAttribute('disabled', true);
            // }
            // console.log(secrPageChbxsTransl[i].parentNode.parentNode.nextElementSibling.firstElementChild.options.selectedIndex)
        }
    }
    let secrPageFioSpans = document.querySelectorAll('.secr-page_fio-span');
    if (secrPageFioSpans) {
        let modalSecr = document.getElementById('secr-page_form_modal');
        let modalSecrClose = document.getElementById('secr-page_form_modal-close');
        let modalSecrTextMain = document.getElementById('secr-page_form_modal-text');
        for (let i =0; i < secrPageFioSpans.length; i ++) {
            secrPageFioSpans[i].addEventListener('dblclick', function (e) {
                let fioSpanId = e.target.getAttribute('id');
                let pkId = fioSpanId.split("fio-")[1];
                let trNoForm = document.getElementById('secr-page_noform-tr_' + pkId);
                trNoForm.style.display = "none";
                let trForm = document.getElementById('secr-page_form-tr_' + pkId);
                trForm.style.display = "table-row";
                let formComp = document.getElementById('secr-page_form-tr' + pkId);
                formComp.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    let thisForm = e.target;
                    let method = thisForm.getAttribute('method');
                    let endpoint = thisForm.getAttribute('action');
                    let data = document.getElementById('secr-page_form-tr' + pkId).elements;
                    let resultSPForm = '';
                    let checkBoxTransl = '';
                    for (let i = 0; i < data.length; i++) {
                        let item = data.item(i);
                        let value = item.value;
                        if (item.type === "checkbox") {
                            if (item.checked) {
                                checkBoxTransl = item;
                                resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                            }
                        } else {
                            resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                        }
                    }
                    let myxmlhttp = getXmlHttp();
                    // console.log(resultSPForm)
                    let token = data.csrfmiddlewaretoken.value;
                    myxmlhttp.open(method, endpoint, true);
                    myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    myxmlhttp.setRequestHeader("X-CSRFToken", token);
                    myxmlhttp.send(resultSPForm);
                    myxmlhttp.onload = function() {
                        if (myxmlhttp.status === 200) {
                            document.getElementById('secr-page_noform-fat-squat-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_squat_res;
                            document.getElementById('secr-page_form-fat-squat-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_squat_res;
                            document.getElementById('secr-page_form-fat-squat-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_squat_res;
                            document.getElementById('secr-page_noform-fat-squat-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_squat_off;
                            document.getElementById('secr-page_form-fat-squat-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_squat_off;
                            document.getElementById('secr-page_noform-sat-squat-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_squat_res;
                            document.getElementById('secr-page_form-sat-squat-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_squat_res;
                            document.getElementById('secr-page_form-sat-squat-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_squat_res;
                            document.getElementById('secr-page_noform-sat-squat-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_squat_off;
                            document.getElementById('secr-page_form-sat-squat-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_squat_off;
                            document.getElementById('secr-page_noform-tat-squat-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_squat_res;
                            document.getElementById('secr-page_form-tat-squat-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_squat_res;
                            document.getElementById('secr-page_form-tat-squat-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_squat_res;
                            document.getElementById('secr-page_noform-tat-squat-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_squat_off;
                            document.getElementById('secr-page_form-tat-squat-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_squat_off;
                            document.getElementById('secr-page_noform-fat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_noform-fat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_form-fat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_noform-sat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_noform-sat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_form-sat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_noform-tat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_noform-tat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            document.getElementById('secr-page_form-tat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            document.getElementById('secr-page_noform-fat-dlift-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_dlift_res;
                            document.getElementById('secr-page_form-fat-dlift-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_dlift_res;
                            document.getElementById('secr-page_form-fat-dlift-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_dlift_res;
                            document.getElementById('secr-page_noform-fat-dlift-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_dlift_off;
                            document.getElementById('secr-page_form-fat-dlift-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_dlift_off;
                            document.getElementById('secr-page_noform-sat-dlift-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_dlift_res;
                            document.getElementById('secr-page_form-sat-dlift-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_dlift_res;
                            document.getElementById('secr-page_form-sat-dlift-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_dlift_res;
                            document.getElementById('secr-page_noform-sat-dlift-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_dlift_off;
                            document.getElementById('secr-page_form-sat-dlift-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_dlift_off;
                            document.getElementById('secr-page_noform-tat-dlift-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_dlift_res;
                            document.getElementById('secr-page_form-tat-dlift-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_dlift_res;
                            document.getElementById('secr-page_form-tat-dlift-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_dlift_res;
                            document.getElementById('secr-page_noform-tat-dlift-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_dlift_off;
                            document.getElementById('secr-page_form-tat-dlift-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_dlift_off;
                            if (JSON.parse(myxmlhttp.response).comp_transl) {
                                // checkBoxTransl.checked = false;
                                let chbxParPar = checkBoxTransl.parentNode.parentNode;
                                let indexTd = [...chbxParPar.parentNode.children].indexOf(chbxParPar)
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                parTr.children[indexTd].style.border = "3px solid #A27D29";
                                noformTr.children[indexTd].style.border = "3px solid #A27D29";
                            } else {
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                for (let i = 0; i < parTr.children.length; i ++) {
                                    parTr.children[i].style.border = "1px solid #092942";
                                }
                                for (let i = 0; i < noformTr.children.length; i ++) {
                                    noformTr.children[i].style.border = "1px solid #092942";
                                }
                            }
                            // console.log(JSON.parse(myxmlhttp.response).testjson)
                            // console.log(JSON.parse(JSON.parse(myxmlhttp.response).testjson)[0])
                            // for (let i = 0; i < JSON.parse(myxmlhttp.response).testjson.length; i ++) {
                            //     console.log(JSON.parse(myxmlhttp.response).testjson[i])
                            // }
                            trNoForm.style.display = "table-row";
                            trForm.style.display = "none";
                        } else if (myxmlhttp.status === 302) {
                            // console.log(JSON.parse(myxmlhttp.response).error)
                            modalSecr.style.display = "block";
                            modalSecrTextMain.textContent = JSON.parse(myxmlhttp.response).error;
                            window.onclick = function(event) {
                                if (event.target === modalSecr) {
                                    modalSecr.style.display = "none";
                                }
                            }
                            modalSecrClose.onclick = function() {
                                modalSecr.style.display = "none";
                            }
                        }
                    };
                    myxmlhttp.onerror = function() {
                        console.log(myxmlhttp.responseText);
                    };
                });
                let declineBtn = document.getElementById('secr-page_form-btn-decline_' + pkId);
                declineBtn.addEventListener('click', function () {
                    trNoForm.style.display = "table-row";
                    trForm.style.display = "none";
                });
            });
        }
    }
    let secrPageFioSpansEk = document.querySelectorAll('.secr-page_fio-span-ek');
    if (secrPageFioSpansEk) {
        let modalSecr = document.getElementById('secr-page_form_modal');
        let modalSecrClose = document.getElementById('secr-page_form_modal-close');
        let modalSecrTextMain = document.getElementById('secr-page_form_modal-text');
        for (let i =0; i < secrPageFioSpansEk.length; i ++) {
            secrPageFioSpansEk[i].addEventListener('dblclick', function (e) {
                let fioSpanId = e.target.getAttribute('id');
                let pkId = fioSpanId.split("fio-")[1];
                let trNoForm = document.getElementById('secr-page_noform-tr_' + pkId);
                trNoForm.style.display = "none";
                let trForm = document.getElementById('secr-page_form-tr_' + pkId);
                trForm.style.display = "table-row";
                let formComp = document.getElementById('secr-page_form-tr' + pkId);
                formComp.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    let thisForm = e.target;
                    let method = thisForm.getAttribute('method');
                    let endpoint = thisForm.getAttribute('action');
                    let data = document.getElementById('secr-page_form-tr' + pkId).elements;
                    let resultSPForm = '';
                    let checkBoxTransl = '';
                    for (let i = 0; i < data.length; i++) {
                        let item = data.item(i);
                        let value = item.value;
                        if (item.type === "checkbox") {
                            if (item.checked) {
                                checkBoxTransl = item;
                                resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                            }
                        } else {
                            resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                        }
                    }
                    let myxmlhttp = getXmlHttp();
                    let token = data.csrfmiddlewaretoken.value;
                    myxmlhttp.open(method, endpoint, true);
                    myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    myxmlhttp.setRequestHeader("X-CSRFToken", token);
                    myxmlhttp.send(resultSPForm);
                    myxmlhttp.onload = function() {
                        if (myxmlhttp.status === 200) {
                            document.getElementById('secr-page_noform-fat-squat-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_squat_res;
                            document.getElementById('secr-page_form-fat-squat-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_squat_res;
                            document.getElementById('secr-page_form-fat-squat-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_squat_res;
                            document.getElementById('secr-page_noform-fat-squat-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_squat_off;
                            document.getElementById('secr-page_form-fat-squat-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_squat_off;
                            document.getElementById('secr-page_noform-sat-squat-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_squat_res;
                            document.getElementById('secr-page_form-sat-squat-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_squat_res;
                            document.getElementById('secr-page_form-sat-squat-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_squat_res;
                            document.getElementById('secr-page_noform-sat-squat-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_squat_off;
                            document.getElementById('secr-page_form-sat-squat-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_squat_off;
                            document.getElementById('secr-page_noform-tat-squat-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_squat_res;
                            document.getElementById('secr-page_form-tat-squat-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_squat_res;
                            document.getElementById('secr-page_form-tat-squat-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_squat_res;
                            document.getElementById('secr-page_noform-tat-squat-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_squat_off;
                            document.getElementById('secr-page_form-tat-squat-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_squat_off;
                            document.getElementById('secr-page_noform-fat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_noform-fat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_form-fat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_noform-sat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_noform-sat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_form-sat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_noform-tat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_noform-tat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            document.getElementById('secr-page_form-tat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            document.getElementById('secr-page_noform-fat-dlift-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_dlift_res;
                            document.getElementById('secr-page_form-fat-dlift-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_dlift_res;
                            document.getElementById('secr-page_form-fat-dlift-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_dlift_res;
                            document.getElementById('secr-page_noform-fat-dlift-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_dlift_off;
                            document.getElementById('secr-page_form-fat-dlift-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_dlift_off;
                            document.getElementById('secr-page_noform-sat-dlift-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_dlift_res;
                            document.getElementById('secr-page_form-sat-dlift-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_dlift_res;
                            document.getElementById('secr-page_form-sat-dlift-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_dlift_res;
                            document.getElementById('secr-page_noform-sat-dlift-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_dlift_off;
                            document.getElementById('secr-page_form-sat-dlift-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_dlift_off;
                            document.getElementById('secr-page_noform-tat-dlift-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_dlift_res;
                            document.getElementById('secr-page_form-tat-dlift-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_dlift_res;
                            document.getElementById('secr-page_form-tat-dlift-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_dlift_res;
                            document.getElementById('secr-page_noform-tat-dlift-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_dlift_off;
                            document.getElementById('secr-page_form-tat-dlift-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_dlift_off;
                            if (JSON.parse(myxmlhttp.response).comp_transl) {
                                // checkBoxTransl.checked = false;
                                let chbxParPar = checkBoxTransl.parentNode.parentNode;
                                let indexTd = [...chbxParPar.parentNode.children].indexOf(chbxParPar)
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                parTr.children[indexTd].style.border = "3px solid #A27D29";
                                noformTr.children[indexTd].style.border = "3px solid #A27D29";
                            } else {
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                for (let i = 0; i < parTr.children.length; i ++) {
                                    parTr.children[i].style.border = "1px solid #092942";
                                }
                                for (let i = 0; i < noformTr.children.length; i ++) {
                                    noformTr.children[i].style.border = "1px solid #092942";
                                }
                            }
                            trNoForm.style.display = "table-row";
                            trForm.style.display = "none";
                        } else if (myxmlhttp.status === 302) {
                            modalSecr.style.display = "block";
                            modalSecrTextMain.textContent = JSON.parse(myxmlhttp.response).error;
                            window.onclick = function(event) {
                                if (event.target === modalSecr) {
                                    modalSecr.style.display = "none";
                                }
                            }
                            modalSecrClose.onclick = function() {
                                modalSecr.style.display = "none";
                            }
                        }
                    };
                    myxmlhttp.onerror = function() {
                        console.log(myxmlhttp.responseText);
                    };
                });
                let declineBtn = document.getElementById('secr-page_form-btn-decline_' + pkId);
                declineBtn.addEventListener('click', function () {
                    trNoForm.style.display = "table-row";
                    trForm.style.display = "none";
                });
            });
        }
    }
    let secrPageFioSpansBp = document.querySelectorAll('.secr-page_fio-span-bp');
    if (secrPageFioSpansBp) {
        let modalSecr = document.getElementById('secr-page_form_modal');
        let modalSecrClose = document.getElementById('secr-page_form_modal-close');
        let modalSecrTextMain = document.getElementById('secr-page_form_modal-text');
        for (let i =0; i < secrPageFioSpansBp.length; i ++) {
            secrPageFioSpansBp[i].addEventListener('dblclick', function (e) {
                let fioSpanId = e.target.getAttribute('id');
                let pkId = fioSpanId.split("fio-")[1];
                let trNoForm = document.getElementById('secr-page_noform-tr_' + pkId);
                trNoForm.style.display = "none";
                let trForm = document.getElementById('secr-page_form-tr_' + pkId);
                trForm.style.display = "table-row";
                let formComp = document.getElementById('secr-page_form-tr' + pkId);
                formComp.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    let thisForm = e.target;
                    let method = thisForm.getAttribute('method');
                    let endpoint = thisForm.getAttribute('action');
                    let data = document.getElementById('secr-page_form-tr' + pkId).elements;
                    let resultSPForm = '';
                    let checkBoxTransl = '';
                    for (let i = 0; i < data.length; i++) {
                        let item = data.item(i);
                        let value = item.value;
                        if (item.type === "checkbox") {
                            if (item.checked) {
                                checkBoxTransl = item;
                                resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                            }
                        } else {
                            resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                        }
                    }
                    let myxmlhttp = getXmlHttp();
                    let token = data.csrfmiddlewaretoken.value;
                    myxmlhttp.open(method, endpoint, true);
                    myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    myxmlhttp.setRequestHeader("X-CSRFToken", token);
                    myxmlhttp.send(resultSPForm);
                    myxmlhttp.onload = function() {
                        if (myxmlhttp.status === 200) {
                            document.getElementById('secr-page_noform-fat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_noform-fat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_form-fat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_noform-sat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_noform-sat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_form-sat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_noform-tat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_noform-tat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            document.getElementById('secr-page_form-tat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            if (JSON.parse(myxmlhttp.response).comp_transl) {
                                // checkBoxTransl.checked = false;
                                let chbxParPar = checkBoxTransl.parentNode.parentNode;
                                let indexTd = [...chbxParPar.parentNode.children].indexOf(chbxParPar)
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                parTr.children[indexTd].style.border = "3px solid #A27D29";
                                noformTr.children[indexTd].style.border = "3px solid #A27D29";
                            } else {
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                for (let i = 0; i < parTr.children.length; i ++) {
                                    parTr.children[i].style.border = "1px solid #092942";
                                }
                                for (let i = 0; i < noformTr.children.length; i ++) {
                                    noformTr.children[i].style.border = "1px solid #092942";
                                }
                            }
                            // console.log(JSON.parse(myxmlhttp.response).testjson)
                            trNoForm.style.display = "table-row";
                            trForm.style.display = "none";
                        } else if (myxmlhttp.status === 302) {
                            // console.log(JSON.parse(myxmlhttp.response).error)
                            modalSecr.style.display = "block";
                            modalSecrTextMain.textContent = JSON.parse(myxmlhttp.response).error;
                            window.onclick = function(event) {
                                if (event.target === modalSecr) {
                                    modalSecr.style.display = "none";
                                }
                            }
                            modalSecrClose.onclick = function() {
                                modalSecr.style.display = "none";
                            }
                        }
                    };
                    myxmlhttp.onerror = function() {
                        console.log(myxmlhttp.responseText);
                    };
                });
                let declineBtn = document.getElementById('secr-page_form-btn-decline_' + pkId);
                declineBtn.addEventListener('click', function () {
                    trNoForm.style.display = "table-row";
                    trForm.style.display = "none";
                });
            });
        }
    }
    let secrPageFioSpansBpek = document.querySelectorAll('.secr-page_fio-span-bpek');
    if (secrPageFioSpansBpek) {
        let modalSecr = document.getElementById('secr-page_form_modal');
        let modalSecrClose = document.getElementById('secr-page_form_modal-close');
        let modalSecrTextMain = document.getElementById('secr-page_form_modal-text');
        for (let i =0; i < secrPageFioSpansBpek.length; i ++) {
            secrPageFioSpansBpek[i].addEventListener('dblclick', function (e) {
                let fioSpanId = e.target.getAttribute('id');
                let pkId = fioSpanId.split("fio-")[1];
                let trNoForm = document.getElementById('secr-page_noform-tr_' + pkId);
                trNoForm.style.display = "none";
                let trForm = document.getElementById('secr-page_form-tr_' + pkId);
                trForm.style.display = "table-row";
                let formComp = document.getElementById('secr-page_form-tr' + pkId);
                formComp.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    let thisForm = e.target;
                    let method = thisForm.getAttribute('method');
                    let endpoint = thisForm.getAttribute('action');
                    let data = document.getElementById('secr-page_form-tr' + pkId).elements;
                    let resultSPForm = '';
                    let checkBoxTransl = '';
                    for (let i = 0; i < data.length; i++) {
                        let item = data.item(i);
                        let value = item.value;
                        if (item.type === "checkbox") {
                            if (item.checked) {
                                checkBoxTransl = item;
                                resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                            }
                        } else {
                            resultSPForm = resultSPForm + '&' + item.name + '=' + encodeURIComponent(value);
                        }
                    }
                    let myxmlhttp = getXmlHttp();
                    let token = data.csrfmiddlewaretoken.value;
                    myxmlhttp.open(method, endpoint, true);
                    myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    myxmlhttp.setRequestHeader("X-CSRFToken", token);
                    myxmlhttp.send(resultSPForm);
                    myxmlhttp.onload = function() {
                        if (myxmlhttp.status === 200) {
                            document.getElementById('secr-page_noform-fat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_form-fat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).first_attempt_bpress_res;
                            document.getElementById('secr-page_noform-fat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_form-fat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).first_attempt_bpress_off;
                            document.getElementById('secr-page_noform-sat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_form-sat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).second_attempt_bpress_res;
                            document.getElementById('secr-page_noform-sat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_form-sat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).second_attempt_bpress_off;
                            document.getElementById('secr-page_noform-tat-bpress-res_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_form-tat-bpress-res_' + pkId).placeholder = JSON.parse(myxmlhttp.response).third_attempt_bpress_res;
                            document.getElementById('secr-page_noform-tat-bpress-off_' + pkId).textContent = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            document.getElementById('secr-page_form-tat-bpress-off_' + pkId).value = JSON.parse(myxmlhttp.response).third_attempt_bpress_off;
                            if (JSON.parse(myxmlhttp.response).comp_transl) {
                                // checkBoxTransl.checked = false;
                                let chbxParPar = checkBoxTransl.parentNode.parentNode;
                                let indexTd = [...chbxParPar.parentNode.children].indexOf(chbxParPar)
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                parTr.children[indexTd].style.border = "3px solid #A27D29";
                                noformTr.children[indexTd].style.border = "3px solid #A27D29";
                            } else {
                                let parTr = document.getElementById('secr-page_form-tr_' + pkId);
                                let noformTr = document.getElementById('secr-page_noform-tr_' + pkId);
                                for (let i = 0; i < parTr.children.length; i ++) {
                                    parTr.children[i].style.border = "1px solid #092942";
                                }
                                for (let i = 0; i < noformTr.children.length; i ++) {
                                    noformTr.children[i].style.border = "1px solid #092942";
                                }
                            }
                            // console.log(JSON.parse(myxmlhttp.response).testjson)
                            trNoForm.style.display = "table-row";
                            trForm.style.display = "none";
                        } else if (myxmlhttp.status === 302) {
                            // console.log(JSON.parse(myxmlhttp.response).error)
                            modalSecr.style.display = "block";
                            modalSecrTextMain.textContent = JSON.parse(myxmlhttp.response).error;
                            window.onclick = function(event) {
                                if (event.target === modalSecr) {
                                    modalSecr.style.display = "none";
                                }
                            }
                            modalSecrClose.onclick = function() {
                                modalSecr.style.display = "none";
                            }
                        }
                    };
                    myxmlhttp.onerror = function() {
                        console.log(myxmlhttp.responseText);
                    };
                });
                let declineBtn = document.getElementById('secr-page_form-btn-decline_' + pkId);
                declineBtn.addEventListener('click', function () {
                    trNoForm.style.display = "table-row";
                    trForm.style.display = "none";
                });
            });
        }
    }


    let scoreboardForm = document.getElementById('score-form');
    if (scoreboardForm) {
        let indScoreBoard = document.getElementById('ind_scoreboard');
        let indScoreWcat = document.getElementById('ind_scoreboard-wcat_score-text');
        let indScoreScore1 = document.getElementById('ind_scoreboard-wcat_score-text-score-1');
        let indScoreScore2 = document.getElementById('ind_scoreboard-wcat_score-text-score-2');
        let indScoreScore3 = document.getElementById('ind_scoreboard-wcat_score-text-score-3');
        let indScoreFi = document.getElementById('ind_scoreboard-fi');
        let indScoreAc = document.getElementById('ind_scoreboard-type-action');
        let indScoreAtt = document.getElementById('ind_scoreboard-order-att');
        let indScoreWeight = document.getElementById('ind_scoreboard-action-weight');
        let massTableTitle = document.querySelector('.mass_scoreboard-table-title');
        let massTable = document.querySelector('.mass_scoreboard-table');
        let querysetsFromBack = '';
        let curtranslPk = '';
        // let curtranslVal = '';
        let competitorEx = '';
        let competitorExAtt = '';
        let competitorFi = '';
        let competitorWc = '';
        let competitorOw = '';
        let competitorOwOff = '';
        let timerp = document.getElementById('timer');
        let duration = 59;

        let timeoutTimeId = null;
        function startTimerComp(duration, timerp) {
            let timer = duration, minutes, seconds;
            timeoutTimeId = setInterval(function () {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                timerp.textContent = minutes + ":" + seconds;
                if (--timer < 0) {
                    clearInterval(timeoutTimeId);
                    // timerp.textContent = "01:00";
                    timerp.textContent = "00:00";
                }
            }, 1000);
        }
        function stopTimerComp() {
            if (timeoutTimeId) {
                clearInterval(timeoutTimeId);
                timeoutTimeId = null;
            }

        }

        function clearScore() {
            indScoreBoard.style.display = "none";
            indScoreWcat.textContent = "";
            indScoreScore1.style.backgroundColor = "red";
            indScoreScore2.style.backgroundColor = "red";
            indScoreScore3.style.backgroundColor = "red";
            indScoreFi.textContent = "";
            indScoreAc.textContent = "";
            indScoreAtt.textContent = "";
            indScoreWeight.textContent = "";
            curtranslPk = '';
            competitorEx = '';
            competitorExAtt = '';
            competitorFi = '';
            competitorWc = '';
            competitorOw = '';
            competitorOwOff = '';
            timerp.textContent = "01:00";
        }

        scoreboardForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let thisForm = e.target;
            let method = thisForm.getAttribute('method');
            let endpoint = thisForm.getAttribute('action');
            let data = document.getElementById('score-form').elements;
            let resultScbForm = '';
            for (let i = 0; i < data.length; i++) {
                let item = data.item(i);
                let value = item.value;
                resultScbForm = resultScbForm + '&' + item.name + '=' + encodeURIComponent(value);
            }
            let myxmlhttp = getXmlHttp();
            let token = data.csrfmiddlewaretoken.value;
            myxmlhttp.open(method, endpoint, true);
            myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            myxmlhttp.setRequestHeader("X-CSRFToken", token);
            myxmlhttp.send(resultScbForm);
            myxmlhttp.onload = function() {
                if (myxmlhttp.status === 200) {
                    // console.log("????????????")

                    if (JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                        if (querysetsFromBack !== JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                            querysetsFromBack = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                            let querysetsFromBackJson = JSON.parse(querysetsFromBack);
                            while (massTable.rows.length > 1) {
                                massTable.deleteRow(-1);
                            }

                            console.log(querysetsFromBackJson)
                            console.log(querysetsFromBackJson[0]["fields"])
                            for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                                let newRow = massTable.insertRow();
                                let newCellFi = newRow.insertCell();
                                let textFi = document.createTextNode(`${querysetsFromBackJson[i]["fields"]["competitor"][0]} ${querysetsFromBackJson[i]["fields"]["competitor"][1]}`);
                                newCellFi.appendChild(textFi);
                                let newCellWeight = newRow.insertCell();
                                let textWeight = document.createTextNode(querysetsFromBackJson[i]["fields"]["competitor_weight"]);
                                newCellWeight.appendChild(textWeight);
                                let compSTypes = querysetsFromBackJson[i]["fields"]["competitor"][2];
                                if (compSTypes.includes("?????????????????? ????????????????????????") || compSTypes.includes("?????? ???????? (?????? ????????.)")) {
                                    let newCellsquatRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"] === null) {
                                        let textsquatRes1 = document.createTextNode("");
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                    } else {
                                        let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"]);
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "1") {
                                                newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "3") {
                                                newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"] === null) {
                                        let textsquatRes2 = document.createTextNode("");
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                    } else {
                                        let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"]);
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "1") {
                                                newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "3") {
                                                newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"] === null) {
                                        let textsquatRes3 = document.createTextNode("");
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                    } else {
                                        let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"]);
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "1") {
                                                newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "3") {
                                                newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"] === null) {
                                        let textbpRes1 = document.createTextNode("");
                                        newCellbpRes1.appendChild(textbpRes1);
                                    } else {
                                        let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"]);
                                        newCellbpRes1.appendChild(textbpRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "1") {
                                                newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "3") {
                                                newCellbpRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"] === null) {
                                        let textbpRes2 = document.createTextNode("");
                                        newCellbpRes2.appendChild(textbpRes2);
                                    } else {
                                        let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"]);
                                        newCellbpRes2.appendChild(textbpRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "1") {
                                                newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "3") {
                                                newCellbpRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"] === null) {
                                        let textbpRes3 = document.createTextNode("");
                                        newCellbpRes3.appendChild(textbpRes3);
                                    } else {
                                        let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"]);
                                        newCellbpRes3.appendChild(textbpRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "1") {
                                                newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "3") {
                                                newCellbpRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"] === null) {
                                        let textdlRes1 = document.createTextNode("");
                                        newCelldlRes1.appendChild(textdlRes1);
                                    } else {
                                        let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"]);
                                        newCelldlRes1.appendChild(textdlRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "1") {
                                                newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "3") {
                                                newCelldlRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"] === null) {
                                        let textdlRes2 = document.createTextNode("");
                                        newCelldlRes2.appendChild(textdlRes2);
                                    } else {
                                        let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"]);
                                        newCelldlRes2.appendChild(textdlRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "1") {
                                                newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "3") {
                                                newCelldlRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"] === null) {
                                        let textdlRes3 = document.createTextNode("");
                                        newCelldlRes3.appendChild(textdlRes3);
                                    } else {
                                        let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"]);
                                        newCelldlRes3.appendChild(textdlRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "1") {
                                                newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "3") {
                                                newCelldlRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellitSquat = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_squat_res"] === null) {
                                        let textitSquat = document.createTextNode("");
                                        newCellitSquat.appendChild(textitSquat);
                                    } else {
                                        let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res"]);
                                        newCellitSquat.appendChild(textitSquat);
                                    }
                                    let newCellitBp = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_bpress_res"] === null) {
                                        let textitBp = document.createTextNode("");
                                        newCellitBp.appendChild(textitBp);
                                    } else {
                                        let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res"]);
                                        newCellitBp.appendChild(textitBp);
                                    }
                                    let newCellititDl = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_dlift_res"] === null) {
                                        let textitDl = document.createTextNode("");
                                        newCellititDl.appendChild(textitDl);
                                    } else {
                                        let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res"]);
                                        newCellititDl.appendChild(textitDl);
                                    }
                                    let newCellIt = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_sum_res"] === null) {
                                        let textIt = document.createTextNode("");
                                        newCellIt.appendChild(textIt);
                                    } else {
                                        let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res"]);
                                        newCellIt.appendChild(textIt);
                                    }
                                } else {
                                    let newCellsquatRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"] === null) {
                                        let textsquatRes1 = document.createTextNode("");
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                    } else {
                                        let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"]);
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "1") {
                                                newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "3") {
                                                newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"] === null) {
                                        let textsquatRes2 = document.createTextNode("");
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                    } else {
                                        let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"]);
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "1") {
                                                newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "3") {
                                                newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"] === null) {
                                        let textsquatRes3 = document.createTextNode("");
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                    } else {
                                        let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"]);
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "1") {
                                                newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "3") {
                                                newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"] === null) {
                                        let textbpRes1 = document.createTextNode("");
                                        newCellbpRes1.appendChild(textbpRes1);
                                    } else {
                                        let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"]);
                                        newCellbpRes1.appendChild(textbpRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "1") {
                                                newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "3") {
                                                newCellbpRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"] === null) {
                                        let textbpRes2 = document.createTextNode("");
                                        newCellbpRes2.appendChild(textbpRes2);
                                    } else {
                                        let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"]);
                                        newCellbpRes2.appendChild(textbpRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "1") {
                                                newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "3") {
                                                newCellbpRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"] === null) {
                                        let textbpRes3 = document.createTextNode("");
                                        newCellbpRes3.appendChild(textbpRes3);
                                    } else {
                                        let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"]);
                                        newCellbpRes3.appendChild(textbpRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "1") {
                                                newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "3") {
                                                newCellbpRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"] === null) {
                                        let textdlRes1 = document.createTextNode("");
                                        newCelldlRes1.appendChild(textdlRes1);
                                    } else {
                                        let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"]);
                                        newCelldlRes1.appendChild(textdlRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "1") {
                                                newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "3") {
                                                newCelldlRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"] === null) {
                                        let textdlRes2 = document.createTextNode("");
                                        newCelldlRes2.appendChild(textdlRes2);
                                    } else {
                                        let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"]);
                                        newCelldlRes2.appendChild(textdlRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "1") {
                                                newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "3") {
                                                newCelldlRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"] === null) {
                                        let textdlRes3 = document.createTextNode("");
                                        newCelldlRes3.appendChild(textdlRes3);
                                    } else {
                                        let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"]);
                                        newCelldlRes3.appendChild(textdlRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "1") {
                                                newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "3") {
                                                newCelldlRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellitSquat = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_squat_res_ek"] === null) {
                                        let textitSquat = document.createTextNode("");
                                        newCellitSquat.appendChild(textitSquat);
                                    } else {
                                        let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res_ek"]);
                                        newCellitSquat.appendChild(textitSquat);
                                    }
                                    let newCellitBp = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"] === null) {
                                        let textitBp = document.createTextNode("");
                                        newCellitBp.appendChild(textitBp);
                                    } else {
                                        let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"]);
                                        newCellitBp.appendChild(textitBp);
                                    }
                                    let newCellititDl = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"] === null) {
                                        let textitDl = document.createTextNode("");
                                        newCellititDl.appendChild(textitDl);
                                    } else {
                                        let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"]);
                                        newCellititDl.appendChild(textitDl);
                                    }
                                    let newCellIt = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_sum_res_ek"] === null) {
                                        let textIt = document.createTextNode("");
                                        newCellIt.appendChild(textIt);
                                    } else {
                                        let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res_ek"]);
                                        newCellIt.appendChild(textIt);
                                    }
                                }
                            }
                            // console.log("got");
                            // // massTable.style.height = "100vh";
                            // console.log(getComputedStyle(massTable).fontSize)
                            // function missFz() {
                            //     // console.log(getComputedStyle(massTable).fontSize)
                            //     // massTable.style.fontSize = parseFloat(getComputedStyle(massTable).fontSize) - 1 + "px"
                            //     // console.log(getComputedStyle(massTable).fontSize)
                            //     massTable.style.height = "100vh"
                            // }
                            // window.onresize = missFz()
                        }
                    }

                    if (JSON.parse(myxmlhttp.response).cur_transl_pk) {
                        if (curtranslPk !== JSON.parse(myxmlhttp.response).cur_transl_pk && JSON.parse(myxmlhttp.response).competitor_ordered_weight_offset.length === 0) {
                            startTimerComp(duration, timerp);
                            curtranslPk = JSON.parse(myxmlhttp.response).cur_transl_pk;
                            competitorEx = JSON.parse(myxmlhttp.response).competitor_exercise;
                            competitorExAtt = JSON.parse(myxmlhttp.response).competitor_exercise_attempt;
                            competitorFi = JSON.parse(myxmlhttp.response).competitor_fi;
                            competitorWc = JSON.parse(myxmlhttp.response).competitor_weight_cat;
                            competitorOw = JSON.parse(myxmlhttp.response).competitor_ordered_weight;
                            indScoreBoard.style.display = "flex";
                            indScoreWcat.textContent = competitorWc;
                            indScoreScore1.style.backgroundColor = "red";
                            indScoreScore2.style.backgroundColor = "red";
                            indScoreScore3.style.backgroundColor = "red";
                            indScoreFi.textContent = competitorFi;
                            indScoreAc.textContent = competitorEx;
                            indScoreAtt.textContent = competitorExAtt;
                            indScoreWeight.textContent = competitorOw;
                        } else if (curtranslPk === JSON.parse(myxmlhttp.response).cur_transl_pk && JSON.parse(myxmlhttp.response).competitor_ordered_weight_offset.length !== 0) {
                            competitorOwOff = JSON.parse(myxmlhttp.response).competitor_ordered_weight_offset;
                            // document.getElementById('score_page-competitor_ordered_weight_offset').textContent = competitorOwOff;
                            if (competitorOwOff === "1") {
                                indScoreScore1.style.backgroundColor = "white";
                            } else if (competitorOwOff === "2") {
                                indScoreScore1.style.backgroundColor = "white";
                                indScoreScore2.style.backgroundColor = "white";
                            } else if (competitorOwOff === "3") {
                                indScoreScore1.style.backgroundColor = "white";
                                indScoreScore2.style.backgroundColor = "white";
                                indScoreScore3.style.backgroundColor = "white";
                            }
                            setTimeout(clearScore, 4000);
                            stopTimerComp();
                        }
                    } else {
                        clearScore();
                        stopTimerComp();
                    }

                } else if (myxmlhttp.status === 500) {
                    console.log(JSON.parse(myxmlhttp.response).error)
                }
            };
            myxmlhttp.onerror = function() {
                console.log(myxmlhttp.responseText);
            };
        });
        function getScore() {
            document.getElementById('score-form_btn').click();
            // console.log(curtranslPk)
            // console.log(curtranslVal)
        }

        setInterval(getScore, 5000);

    }


    let scoreboardCompForm = document.getElementById('score-comp-form');
    if (scoreboardCompForm) {
        let massTable = document.querySelector('.mass_scoreboard-table');
        let querysetsFromBack = '';

        scoreboardCompForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let thisForm = e.target;
            let method = thisForm.getAttribute('method');
            let endpoint = thisForm.getAttribute('action');
            let data = document.getElementById('score-comp-form').elements;
            let resultScbForm = '';
            for (let i = 0; i < data.length; i++) {
                let item = data.item(i);
                let value = item.value;
                resultScbForm = resultScbForm + '&' + item.name + '=' + encodeURIComponent(value);
            }
            let myxmlhttp = getXmlHttp();
            let token = data.csrfmiddlewaretoken.value;
            myxmlhttp.open(method, endpoint, true);
            myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            myxmlhttp.setRequestHeader("X-CSRFToken", token);
            myxmlhttp.send(resultScbForm);
            myxmlhttp.onload = function() {
                if (myxmlhttp.status === 200) {
                    // console.log("????????????")
                    if (JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                        if (querysetsFromBack !== JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                            querysetsFromBack = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                            let querysetsFromBackJson = JSON.parse(querysetsFromBack);
                            while (massTable.rows.length > 1) {
                                massTable.deleteRow(-1);
                            }
                            console.log(querysetsFromBackJson)
                            console.log(querysetsFromBackJson[0]["fields"])
                            for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                                let newRow = massTable.insertRow();
                                let newCellFi = newRow.insertCell();
                                let textFi = document.createTextNode(`${querysetsFromBackJson[i]["fields"]["competitor"][0]} ${querysetsFromBackJson[i]["fields"]["competitor"][1]}`);
                                newCellFi.appendChild(textFi);
                                let newCellWeight = newRow.insertCell();
                                let textWeight = document.createTextNode(querysetsFromBackJson[i]["fields"]["competitor_weight"]);
                                newCellWeight.appendChild(textWeight);
                                let compSTypes = querysetsFromBackJson[i]["fields"]["competitor"][2];
                                if (compSTypes.includes("?????????????????? ????????????????????????") || compSTypes.includes("?????? ???????? (?????? ????????.)")) {
                                    let newCellsquatRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"] === null) {
                                        let textsquatRes1 = document.createTextNode("");
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                    } else {
                                        let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"]);
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "1") {
                                                newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "3") {
                                                newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"] === null) {
                                        let textsquatRes2 = document.createTextNode("");
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                    } else {
                                        let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"]);
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "1") {
                                                newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "3") {
                                                newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"] === null) {
                                        let textsquatRes3 = document.createTextNode("");
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                    } else {
                                        let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"]);
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "1") {
                                                newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "3") {
                                                newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"] === null) {
                                        let textbpRes1 = document.createTextNode("");
                                        newCellbpRes1.appendChild(textbpRes1);
                                    } else {
                                        let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"]);
                                        newCellbpRes1.appendChild(textbpRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "1") {
                                                newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "3") {
                                                newCellbpRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"] === null) {
                                        let textbpRes2 = document.createTextNode("");
                                        newCellbpRes2.appendChild(textbpRes2);
                                    } else {
                                        let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"]);
                                        newCellbpRes2.appendChild(textbpRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "1") {
                                                newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "3") {
                                                newCellbpRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"] === null) {
                                        let textbpRes3 = document.createTextNode("");
                                        newCellbpRes3.appendChild(textbpRes3);
                                    } else {
                                        let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"]);
                                        newCellbpRes3.appendChild(textbpRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "1") {
                                                newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "3") {
                                                newCellbpRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"] === null) {
                                        let textdlRes1 = document.createTextNode("");
                                        newCelldlRes1.appendChild(textdlRes1);
                                    } else {
                                        let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"]);
                                        newCelldlRes1.appendChild(textdlRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "1") {
                                                newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "3") {
                                                newCelldlRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"] === null) {
                                        let textdlRes2 = document.createTextNode("");
                                        newCelldlRes2.appendChild(textdlRes2);
                                    } else {
                                        let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"]);
                                        newCelldlRes2.appendChild(textdlRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "1") {
                                                newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "3") {
                                                newCelldlRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"] === null) {
                                        let textdlRes3 = document.createTextNode("");
                                        newCelldlRes3.appendChild(textdlRes3);
                                    } else {
                                        let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"]);
                                        newCelldlRes3.appendChild(textdlRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "1") {
                                                newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "3") {
                                                newCelldlRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellitSquat = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_squat_res"] === null) {
                                        let textitSquat = document.createTextNode("");
                                        newCellitSquat.appendChild(textitSquat);
                                    } else {
                                        let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res"]);
                                        newCellitSquat.appendChild(textitSquat);
                                    }
                                    let newCellitBp = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_bpress_res"] === null) {
                                        let textitBp = document.createTextNode("");
                                        newCellitBp.appendChild(textitBp);
                                    } else {
                                        let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res"]);
                                        newCellitBp.appendChild(textitBp);
                                    }
                                    let newCellititDl = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_dlift_res"] === null) {
                                        let textitDl = document.createTextNode("");
                                        newCellititDl.appendChild(textitDl);
                                    } else {
                                        let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res"]);
                                        newCellititDl.appendChild(textitDl);
                                    }
                                    let newCellIt = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_sum_res"] === null) {
                                        let textIt = document.createTextNode("");
                                        newCellIt.appendChild(textIt);
                                    } else {
                                        let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res"]);
                                        newCellIt.appendChild(textIt);
                                    }
                                } else {
                                    let newCellsquatRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"] === null) {
                                        let textsquatRes1 = document.createTextNode("");
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                    } else {
                                        let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"]);
                                        newCellsquatRes1.appendChild(textsquatRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "1") {
                                                newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "3") {
                                                newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"] === null) {
                                        let textsquatRes2 = document.createTextNode("");
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                    } else {
                                        let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"]);
                                        newCellsquatRes2.appendChild(textsquatRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "1") {
                                                newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "3") {
                                                newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellsquatRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"] === null) {
                                        let textsquatRes3 = document.createTextNode("");
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                    } else {
                                        let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"]);
                                        newCellsquatRes3.appendChild(textsquatRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "1") {
                                                newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "3") {
                                                newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"] === null) {
                                        let textbpRes1 = document.createTextNode("");
                                        newCellbpRes1.appendChild(textbpRes1);
                                    } else {
                                        let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"]);
                                        newCellbpRes1.appendChild(textbpRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "1") {
                                                newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "3") {
                                                newCellbpRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"] === null) {
                                        let textbpRes2 = document.createTextNode("");
                                        newCellbpRes2.appendChild(textbpRes2);
                                    } else {
                                        let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"]);
                                        newCellbpRes2.appendChild(textbpRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "1") {
                                                newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "3") {
                                                newCellbpRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellbpRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"] === null) {
                                        let textbpRes3 = document.createTextNode("");
                                        newCellbpRes3.appendChild(textbpRes3);
                                    } else {
                                        let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"]);
                                        newCellbpRes3.appendChild(textbpRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "1") {
                                                newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "3") {
                                                newCellbpRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes1 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"] === null) {
                                        let textdlRes1 = document.createTextNode("");
                                        newCelldlRes1.appendChild(textdlRes1);
                                    } else {
                                        let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"]);
                                        newCelldlRes1.appendChild(textdlRes1);
                                        if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "1") {
                                                newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "3") {
                                                newCelldlRes1.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes2 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"] === null) {
                                        let textdlRes2 = document.createTextNode("");
                                        newCelldlRes2.appendChild(textdlRes2);
                                    } else {
                                        let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"]);
                                        newCelldlRes2.appendChild(textdlRes2);
                                        if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "1") {
                                                newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "3") {
                                                newCelldlRes2.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCelldlRes3 = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"] === null) {
                                        let textdlRes3 = document.createTextNode("");
                                        newCelldlRes3.appendChild(textdlRes3);
                                    } else {
                                        let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"]);
                                        newCelldlRes3.appendChild(textdlRes3);
                                        if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] !== null) {
                                            if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "1") {
                                                newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                            } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "3") {
                                                newCelldlRes3.style.backgroundColor = "#aaffaa";
                                            }
                                        }
                                    }
                                    let newCellitSquat = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_squat_res_ek"] === null) {
                                        let textitSquat = document.createTextNode("");
                                        newCellitSquat.appendChild(textitSquat);
                                    } else {
                                        let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res_ek"]);
                                        newCellitSquat.appendChild(textitSquat);
                                    }
                                    let newCellitBp = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"] === null) {
                                        let textitBp = document.createTextNode("");
                                        newCellitBp.appendChild(textitBp);
                                    } else {
                                        let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"]);
                                        newCellitBp.appendChild(textitBp);
                                    }
                                    let newCellititDl = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"] === null) {
                                        let textitDl = document.createTextNode("");
                                        newCellititDl.appendChild(textitDl);
                                    } else {
                                        let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"]);
                                        newCellititDl.appendChild(textitDl);
                                    }
                                    let newCellIt = newRow.insertCell();
                                    if (querysetsFromBackJson[i]["fields"]["best_sum_res_ek"] === null) {
                                        let textIt = document.createTextNode("");
                                        newCellIt.appendChild(textIt);
                                    } else {
                                        let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res_ek"]);
                                        newCellIt.appendChild(textIt);
                                    }
                                }
                            }
                        }
                    }

                } else if (myxmlhttp.status === 500) {
                    console.log(JSON.parse(myxmlhttp.response).error)
                }
            };
            myxmlhttp.onerror = function() {
                console.log(myxmlhttp.responseText);
            };
        });

        function getScoreComp() {
            document.getElementById('score-comp-form_btn').click();
        }

        setInterval(getScoreComp, 5000);

    }

// console.log(window.location.pathname)
// console.log(window.location.search)
// console.log(decodeURIComponent(window.location.search))
// console.log(window.location.search.('form-secretary_stream-select'))
// let secretaryPageSelectStreamForm = document.getElementById('form-secretary_stream');
// if (secretaryPageSelectStreamForm) {
//     secretaryPageSelectStreamForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         let thisForm = e.target;
//         let method = thisForm.getAttribute('method');
//         let endpoint = thisForm.getAttribute('action');
//         let data = thisForm.elements;
//         let resultForm = '';
//         for (let i = 0; i < data.length; i++) {
//             let item = data.item(i);
//             let value = item.value;
//             resultForm = resultForm + '&' + item.name + '=' + encodeURIComponent(value);
//         }
//         console.log(resultForm);
//         let myxmlhttp = getXmlHttp();
//         myxmlhttp.open(method, endpoint, true);
//         myxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//         myxmlhttp.setRequestHeader("X-CSRFToken", data.csrfmiddlewaretoken.value);
//         myxmlhttp.send(resultForm);
//         myxmlhttp.onload = function () {
//             if (myxmlhttp.status === 200) {
//                 console.log("ok")
//             } else if (myxmlhttp.status === 500) {
//                 console.log(JSON.parse(myxmlhttp.response).error)
//             }
//         };
//         myxmlhttp.onerror = function () {
//             console.log(myxmlhttp.responseText);
//         };
//     });
// }


});
