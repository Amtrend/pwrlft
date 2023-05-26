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
    let mobileDocBlock = document.querySelector('.menu_mobile-body-menu_el-block-body');
    if (mobileBurger) {
        let blockContent = document.querySelector('.block_content');
        mobileBurger.addEventListener('click', function (e) {
            mobileBurger.classList.toggle('open');
            mobileDocBlock.classList.remove('visible_body');
            mobileBody.classList.toggle('visible_body');
            if (blockContent) {
                blockContent.classList.toggle('unvisible');
            }
        });
    }
    let mobileDocBtn = document.querySelector('.menu_mobile-body-menu_el-block-head');
    if (mobileDocBtn) {
        mobileDocBtn.addEventListener('click', function (e) {
            mobileDocBlock.classList.toggle('visible_body');
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
    let maleRadioCompetitionsRegister = document.getElementById('competition_registry-form_gender-male');
    let femaleRadioCompetitionsRegister = document.getElementById('competition_registry-form_gender-female');
    if (maleRadioCompetitionsRegister) {
        let labelWcMR = document.getElementById('competition_registry-form_wcat-m-label');
        let labelWcFR = document.getElementById('competition_registry-form_wcat-f-label');
        let selectWcMR = document.getElementById('competition_registry-form_wcat-m');
        let selectWcFR = document.getElementById('competition_registry-form_wcat-f');
        maleRadioCompetitionsRegister.addEventListener('click', function (e) {
            labelWcMR.style.display = 'block';
            selectWcMR.style.display = 'block';
            labelWcFR.style.display = 'none';
            selectWcFR.style.display = 'none';
        });
        femaleRadioCompetitionsRegister.addEventListener('click', function (e) {
            labelWcFR.style.display = 'block';
            selectWcFR.style.display = 'block';
            labelWcMR.style.display = 'none';
            selectWcMR.style.display = 'none';
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
                if (this.value === "Троеборье классическое") {
                    if (this.checked) {
                        blockBestPL.style.display = 'flex';
                        document.querySelector('input[value="Жим лёжа (без экип.)"]').checked = true;
                        blockBestBP.style.display = 'flex';
                    } else {
                        blockBestPL.style.display = 'none';
                    }
                }
                if (this.value === "Троеборье (экип.)") {
                    if (this.checked) {
                        blockBestPLEkip.style.display = 'flex';
                        document.querySelector('input[value="Жим лёжа (экип.)"]').checked = true;
                        blockBestBPEkip.style.display = 'flex';
                    } else {
                        blockBestPLEkip.style.display = 'none';
                    }
                }
                if (this.value === "Жим лёжа (экип.)") {
                    if (this.checked) {
                        blockBestBPEkip.style.display = 'flex';
                    } else {
                        blockBestBPEkip.style.display = 'none';
                    }
                }
                if (this.value === "Жим лёжа (без экип.)") {
                    if (this.checked) {
                        blockBestBP.style.display = 'flex';
                    } else {
                        blockBestBP.style.display = 'none';
                    }
                }
            });
        }
    }
    let SportsTypeCheckedChckbxsReg = document.querySelectorAll('.competition_registry-form_sp-t_chckbx');
    if (SportsTypeCheckedChckbxsReg.length > 0) {
        let blockBestBP = document.querySelector('.competition_entry-form_sur-bp');
        let blockBestBPEkip = document.querySelector('.competition_entry-form_sur-bpekip');
        let blockBestPL = document.querySelector('.competition_entry-form_sur-pwlclass');
        let blockBestPLEkip = document.querySelector('.competition_entry-form_sur-pwlekip');
        let blockFirstS = document.querySelector('.competition_registry-form_squat');
        let blockFirstB = document.querySelector('.competition_registry-form_bpress');
        let blockFirstD = document.querySelector('.competition_registry-form_dlift');
        for (let i = 0; i < SportsTypeCheckedChckbxsReg.length; i ++) {
            SportsTypeCheckedChckbxsReg[i].addEventListener('change', function (e) {
                if (this.value === "Троеборье классическое") {
                    if (this.checked) {
                        blockBestPL.style.display = 'flex';
                        document.querySelector('input[value="Жим лёжа (без экип.)"]').checked = true;
                        blockBestBP.style.display = 'flex';
                        blockFirstS.style.display = 'flex';
                        blockFirstB.style.display = 'flex';
                        blockFirstD.style.display = 'flex';
                    } else {
                        blockBestPL.style.display = 'none';
                        if (!document.querySelector('input[value="Жим лёжа (экип.)"]').checked && !document.querySelector('input[value="Жим лёжа (без экип.)"]').checked ) {
                            blockFirstB.style.display = 'none';
                        }
                        if (!document.querySelector('input[value="Троеборье (экип.)"]').checked) {
                            blockFirstD.style.display = 'none';
                            blockFirstS.style.display = 'none';
                        }
                    }
                }
                if (this.value === "Троеборье (экип.)") {
                    if (this.checked) {
                        blockBestPLEkip.style.display = 'flex';
                        document.querySelector('input[value="Жим лёжа (экип.)"]').checked = true;
                        blockBestBPEkip.style.display = 'flex';
                        blockFirstS.style.display = 'flex';
                        blockFirstB.style.display = 'flex';
                        blockFirstD.style.display = 'flex';
                    } else {
                        blockBestPLEkip.style.display = 'none';
                        if (!document.querySelector('input[value="Жим лёжа (экип.)"]').checked && !document.querySelector('input[value="Жим лёжа (без экип.)"]').checked ) {
                            blockFirstB.style.display = 'none';
                        }
                        if (!document.querySelector('input[value="Троеборье классическое"]').checked) {
                            blockFirstD.style.display = 'none';
                            blockFirstS.style.display = 'none';
                        }
                    }
                }
                if (this.value === "Жим лёжа (экип.)") {
                    if (this.checked) {
                        blockBestBPEkip.style.display = 'flex';
                        blockFirstB.style.display = 'flex';
                    } else {
                        blockBestBPEkip.style.display = 'none';
                        if (!document.querySelector('input[value="Троеборье классическое"]').checked && !document.querySelector('input[value="Троеборье (экип.)"]').checked ) {
                            blockFirstB.style.display = 'none';
                        }
                    }
                }
                if (this.value === "Жим лёжа (без экип.)") {
                    if (this.checked) {
                        blockBestBP.style.display = 'flex';
                        blockFirstB.style.display = 'flex';
                    } else {
                        blockBestBP.style.display = 'none';
                        if (!document.querySelector('input[value="Троеборье классическое"]').checked && !document.querySelector('input[value="Троеборье (экип.)"]').checked ) {
                            blockFirstB.style.display = 'none';
                        }
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
                        modalCompetitionsTextMain.innerHTML = 'Во время сохранения заявки произошла не известная ошибка. Пожалуйста, отправте заявку в произвольном виде на почту <a href="mailto:info@powerlifting-kirov.ru">info@powerlifting-kirov.ru</a>';
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
                            document.getElementById('secr-page_noform-pil_h_squat_' + pkId).textContent = JSON.parse(myxmlhttp.response).pil_h_squat;
                            document.getElementById('secr-page_form-pil_h_squat_' + pkId).value = JSON.parse(myxmlhttp.response).pil_h_squat;
                            document.getElementById('secr-page_form-pil_h_squat_' + pkId).placeholder = JSON.parse(myxmlhttp.response).pil_h_squat;
                            document.getElementById('secr-page_noform-pil_h_bpress_' + pkId).textContent = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).value = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).placeholder = JSON.parse(myxmlhttp.response).pil_h_bpress;
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
                            document.getElementById('secr-page_noform-pil_h_squat_' + pkId).textContent = JSON.parse(myxmlhttp.response).pil_h_squat;
                            document.getElementById('secr-page_form-pil_h_squat_' + pkId).value = JSON.parse(myxmlhttp.response).pil_h_squat;
                            document.getElementById('secr-page_form-pil_h_squat_' + pkId).placeholder = JSON.parse(myxmlhttp.response).pil_h_squat;
                            document.getElementById('secr-page_noform-pil_h_bpress_' + pkId).textContent = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).value = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).placeholder = JSON.parse(myxmlhttp.response).pil_h_bpress;
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
                            document.getElementById('secr-page_noform-pil_h_bpress_' + pkId).textContent = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).value = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).placeholder = JSON.parse(myxmlhttp.response).pil_h_bpress;
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
                            document.getElementById('secr-page_noform-pil_h_bpress_' + pkId).textContent = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).value = JSON.parse(myxmlhttp.response).pil_h_bpress;
                            document.getElementById('secr-page_form-pil_h_bpress_' + pkId).placeholder = JSON.parse(myxmlhttp.response).pil_h_bpress;
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
        let pillarHeight = '';
        let timerp = document.getElementById('timer');
        let duration = 59;
        let compFitstWeightDiv = document.getElementById("ind_scoreboard-appr_weight-1");
        let compSecWeightDiv = document.getElementById("ind_scoreboard-appr_weight-2");
        let compThirdWeightDiv = document.getElementById("ind_scoreboard-appr_weight-3");
        let compFitstWeightSpan = document.getElementById("ind_scoreboard-appr_weight-1-sp");
        let compSecWeightSpan = document.getElementById("ind_scoreboard-appr_weight-2-sp");
        let compThirdWeightSpan = document.getElementById("ind_scoreboard-appr_weight-3-sp");
        let curStateTimer = 'stop';
        let blockShowAss = document.getElementById('weight_show_assistants');

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

        function clearTimerValues() {
            timerp.textContent = "01:00";
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
            pillarHeight = '';
            timerp.textContent = "01:00";
            compFitstWeightDiv.className = 'ind_scoreboard-appr_weight';
            compSecWeightDiv.className = 'ind_scoreboard-appr_weight';
            compThirdWeightDiv.className = 'ind_scoreboard-appr_weight';
            compFitstWeightDiv.style.display = "none";
            compSecWeightDiv.style.display = "none";
            compThirdWeightDiv.style.display = "none";
            compFitstWeightSpan.textContent = "";
            compSecWeightSpan.textContent = "";
            compThirdWeightSpan.textContent = "";
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

                    if (JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                        console.log(JSON.parse(myxmlhttp.response).cur_flow_competitors_json)

                        let querysetsFromBackJson = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                        while (massTable.rows.length > 1) {
                            massTable.deleteRow(-1);
                        }
                        for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                            let newRow = massTable.insertRow();
                            let newCellFi = newRow.insertCell();
                            let textFi = document.createTextNode(`${querysetsFromBackJson[i]["competitor__surname_comp"]} ${querysetsFromBackJson[i]["competitor__name_comp"]}`);
                            if (querysetsFromBackJson[i]["competitor_translation"] !== null) {
                                newCellFi.parentElement.style.border = "5px solid #A27D29";
                            }
                            newCellFi.appendChild(textFi);
                            let newCellWeight = newRow.insertCell();
                            let textWeight = document.createTextNode(querysetsFromBackJson[i]["competitor_weight"]);
                            newCellWeight.appendChild(textWeight);
                            let compSTypes = querysetsFromBackJson[i]["competitor__sports_type__title"];
                            if (compSTypes.includes("Троеборье классическое") || compSTypes.includes("Жим лёжа (без экип.)")) {
                                let newCellsquatRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_squat_res"] === null) {
                                    let textsquatRes1 = document.createTextNode("");
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                } else {
                                    let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_squat_res"]);
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_squat_off"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["first_attempt_squat_off"] === "1") {
                                            newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["first_attempt_squat_off"] === "3") {
                                            newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_squat_res"] === null) {
                                    let textsquatRes2 = document.createTextNode("");
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                } else {
                                    let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_squat_res"]);
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_squat_off"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["second_attempt_squat_off"] === "1") {
                                            newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["second_attempt_squat_off"] === "3") {
                                            newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_squat_res"] === null) {
                                    let textsquatRes3 = document.createTextNode("");
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                } else {
                                    let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_squat_res"]);
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_squat_off"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["third_attempt_squat_off"] === "1") {
                                            newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["third_attempt_squat_off"] === "3") {
                                            newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_bpress_res"] === null) {
                                    let textbpRes1 = document.createTextNode("");
                                    newCellbpRes1.appendChild(textbpRes1);
                                } else {
                                    let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_bpress_res"]);
                                    newCellbpRes1.appendChild(textbpRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_bpress_off"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["first_attempt_bpress_off"] === "1") {
                                            newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["first_attempt_bpress_off"] === "3") {
                                            newCellbpRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_bpress_res"] === null) {
                                    let textbpRes2 = document.createTextNode("");
                                    newCellbpRes2.appendChild(textbpRes2);
                                } else {
                                    let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_bpress_res"]);
                                    newCellbpRes2.appendChild(textbpRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_bpress_off"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["second_attempt_bpress_off"] === "1") {
                                            newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["second_attempt_bpress_off"] === "3") {
                                            newCellbpRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_bpress_res"] === null) {
                                    let textbpRes3 = document.createTextNode("");
                                    newCellbpRes3.appendChild(textbpRes3);
                                } else {
                                    let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_bpress_res"]);
                                    newCellbpRes3.appendChild(textbpRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_bpress_off"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["third_attempt_bpress_off"] === "1") {
                                            newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["third_attempt_bpress_off"] === "3") {
                                            newCellbpRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_dlift_res"] === null) {
                                    let textdlRes1 = document.createTextNode("");
                                    newCelldlRes1.appendChild(textdlRes1);
                                } else {
                                    let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_dlift_res"]);
                                    newCelldlRes1.appendChild(textdlRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_dlift_off"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["first_attempt_dlift_off"] === "1") {
                                            newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["first_attempt_dlift_off"] === "3") {
                                            newCelldlRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_dlift_res"] === null) {
                                    let textdlRes2 = document.createTextNode("");
                                    newCelldlRes2.appendChild(textdlRes2);
                                } else {
                                    let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_dlift_res"]);
                                    newCelldlRes2.appendChild(textdlRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_dlift_off"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["second_attempt_dlift_off"] === "1") {
                                            newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["second_attempt_dlift_off"] === "3") {
                                            newCelldlRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_dlift_res"] === null) {
                                    let textdlRes3 = document.createTextNode("");
                                    newCelldlRes3.appendChild(textdlRes3);
                                } else {
                                    let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_dlift_res"]);
                                    newCelldlRes3.appendChild(textdlRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_dlift_off"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["third_attempt_dlift_off"] === "1") {
                                            newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["third_attempt_dlift_off"] === "3") {
                                            newCelldlRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellitSquat = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_squat_res"] === null) {
                                    let textitSquat = document.createTextNode("");
                                    newCellitSquat.appendChild(textitSquat);
                                } else {
                                    let textitSquat = document.createTextNode(querysetsFromBackJson[i]["best_squat_res"]);
                                    newCellitSquat.appendChild(textitSquat);
                                }
                                let newCellitBp = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_bpress_res"] === null) {
                                    let textitBp = document.createTextNode("");
                                    newCellitBp.appendChild(textitBp);
                                } else {
                                    let textitBp = document.createTextNode(querysetsFromBackJson[i]["best_bpress_res"]);
                                    newCellitBp.appendChild(textitBp);
                                }
                                let newCellititDl = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_dlift_res"] === null) {
                                    let textitDl = document.createTextNode("");
                                    newCellititDl.appendChild(textitDl);
                                } else {
                                    let textitDl = document.createTextNode(querysetsFromBackJson[i]["best_dlift_res"]);
                                    newCellititDl.appendChild(textitDl);
                                }
                                let newCellIt = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_sum_res"] === null) {
                                    let textIt = document.createTextNode("");
                                    newCellIt.appendChild(textIt);
                                } else {
                                    let textIt = document.createTextNode(querysetsFromBackJson[i]["best_sum_res"]);
                                    newCellIt.appendChild(textIt);
                                }
                            } else {
                                let newCellsquatRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_squat_res_ek"] === null) {
                                    let textsquatRes1 = document.createTextNode("");
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                } else {
                                    let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_squat_res_ek"]);
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_squat_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "1") {
                                            newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "3") {
                                            newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_squat_res_ek"] === null) {
                                    let textsquatRes2 = document.createTextNode("");
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                } else {
                                    let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_squat_res_ek"]);
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_squat_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "1") {
                                            newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "3") {
                                            newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_squat_res_ek"] === null) {
                                    let textsquatRes3 = document.createTextNode("");
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                } else {
                                    let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_squat_res_ek"]);
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_squat_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "1") {
                                            newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "3") {
                                            newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_bpress_res_ek"] === null) {
                                    let textbpRes1 = document.createTextNode("");
                                    newCellbpRes1.appendChild(textbpRes1);
                                } else {
                                    let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_bpress_res_ek"]);
                                    newCellbpRes1.appendChild(textbpRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "1") {
                                            newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "3") {
                                            newCellbpRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_bpress_res_ek"] === null) {
                                    let textbpRes2 = document.createTextNode("");
                                    newCellbpRes2.appendChild(textbpRes2);
                                } else {
                                    let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_bpress_res_ek"]);
                                    newCellbpRes2.appendChild(textbpRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "1") {
                                            newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "3") {
                                            newCellbpRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_bpress_res_ek"] === null) {
                                    let textbpRes3 = document.createTextNode("");
                                    newCellbpRes3.appendChild(textbpRes3);
                                } else {
                                    let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_bpress_res_ek"]);
                                    newCellbpRes3.appendChild(textbpRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "1") {
                                            newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "3") {
                                            newCellbpRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_dlift_res_ek"] === null) {
                                    let textdlRes1 = document.createTextNode("");
                                    newCelldlRes1.appendChild(textdlRes1);
                                } else {
                                    let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_dlift_res_ek"]);
                                    newCelldlRes1.appendChild(textdlRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "1") {
                                            newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "3") {
                                            newCelldlRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_dlift_res_ek"] === null) {
                                    let textdlRes2 = document.createTextNode("");
                                    newCelldlRes2.appendChild(textdlRes2);
                                } else {
                                    let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_dlift_res_ek"]);
                                    newCelldlRes2.appendChild(textdlRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "1") {
                                            newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "3") {
                                            newCelldlRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_dlift_res_ek"] === null) {
                                    let textdlRes3 = document.createTextNode("");
                                    newCelldlRes3.appendChild(textdlRes3);
                                } else {
                                    let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_dlift_res_ek"]);
                                    newCelldlRes3.appendChild(textdlRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "1") {
                                            newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "3") {
                                            newCelldlRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellitSquat = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_squat_res_ek"] === null) {
                                    let textitSquat = document.createTextNode("");
                                    newCellitSquat.appendChild(textitSquat);
                                } else {
                                    let textitSquat = document.createTextNode(querysetsFromBackJson[i]["best_squat_res_ek"]);
                                    newCellitSquat.appendChild(textitSquat);
                                }
                                let newCellitBp = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_bpress_res_ek"] === null) {
                                    let textitBp = document.createTextNode("");
                                    newCellitBp.appendChild(textitBp);
                                } else {
                                    let textitBp = document.createTextNode(querysetsFromBackJson[i]["best_bpress_res_ek"]);
                                    newCellitBp.appendChild(textitBp);
                                }
                                let newCellititDl = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_dlift_res_ek"] === null) {
                                    let textitDl = document.createTextNode("");
                                    newCellititDl.appendChild(textitDl);
                                } else {
                                    let textitDl = document.createTextNode(querysetsFromBackJson[i]["best_dlift_res_ek"]);
                                    newCellititDl.appendChild(textitDl);
                                }
                                let newCellIt = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_sum_res_ek"] === null) {
                                    let textIt = document.createTextNode("");
                                    newCellIt.appendChild(textIt);
                                } else {
                                    let textIt = document.createTextNode(querysetsFromBackJson[i]["best_sum_res_ek"]);
                                    newCellIt.appendChild(textIt);
                                }
                            }
                        }




                        // if (querysetsFromBack !== JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                        //     querysetsFromBack = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                        //     let querysetsFromBackJson = JSON.parse(querysetsFromBack);
                        //     while (massTable.rows.length > 1) {
                        //         massTable.deleteRow(-1);
                        //     }
                        //     console.log(querysetsFromBackJson)
                        //     // console.log(querysetsFromBackJson[0]["fields"])
                        //     for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                        //         let newRow = massTable.insertRow();
                        //         let newCellFi = newRow.insertCell();
                        //         let textFi = document.createTextNode(`${querysetsFromBackJson[i]["fields"]["competitor"][0]} ${querysetsFromBackJson[i]["fields"]["competitor"][1]}`);
                        //         newCellFi.appendChild(textFi);
                        //         let newCellWeight = newRow.insertCell();
                        //         let textWeight = document.createTextNode(querysetsFromBackJson[i]["fields"]["competitor_weight"]);
                        //         newCellWeight.appendChild(textWeight);
                        //         let compSTypes = querysetsFromBackJson[i]["fields"]["competitor"][2];
                        //         if (compSTypes.includes("Троеборье классическое") || compSTypes.includes("Жим лёжа (без экип.)")) {
                        //             let newCellsquatRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"] === null) {
                        //                 let textsquatRes1 = document.createTextNode("");
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //             } else {
                        //                 let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"]);
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "1") {
                        //                         newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "3") {
                        //                         newCellsquatRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"] === null) {
                        //                 let textsquatRes2 = document.createTextNode("");
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //             } else {
                        //                 let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"]);
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "1") {
                        //                         newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "3") {
                        //                         newCellsquatRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"] === null) {
                        //                 let textsquatRes3 = document.createTextNode("");
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //             } else {
                        //                 let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"]);
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "1") {
                        //                         newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "3") {
                        //                         newCellsquatRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"] === null) {
                        //                 let textbpRes1 = document.createTextNode("");
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //             } else {
                        //                 let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"]);
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "1") {
                        //                         newCellbpRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "3") {
                        //                         newCellbpRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"] === null) {
                        //                 let textbpRes2 = document.createTextNode("");
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //             } else {
                        //                 let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"]);
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "1") {
                        //                         newCellbpRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "3") {
                        //                         newCellbpRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"] === null) {
                        //                 let textbpRes3 = document.createTextNode("");
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //             } else {
                        //                 let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"]);
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "1") {
                        //                         newCellbpRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "3") {
                        //                         newCellbpRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"] === null) {
                        //                 let textdlRes1 = document.createTextNode("");
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //             } else {
                        //                 let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"]);
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "1") {
                        //                         newCelldlRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "3") {
                        //                         newCelldlRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"] === null) {
                        //                 let textdlRes2 = document.createTextNode("");
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //             } else {
                        //                 let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"]);
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "1") {
                        //                         newCelldlRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "3") {
                        //                         newCelldlRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"] === null) {
                        //                 let textdlRes3 = document.createTextNode("");
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //             } else {
                        //                 let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"]);
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "1") {
                        //                         newCelldlRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "3") {
                        //                         newCelldlRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellitSquat = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_squat_res"] === null) {
                        //                 let textitSquat = document.createTextNode("");
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             } else {
                        //                 let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res"]);
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             }
                        //             let newCellitBp = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_bpress_res"] === null) {
                        //                 let textitBp = document.createTextNode("");
                        //                 newCellitBp.appendChild(textitBp);
                        //             } else {
                        //                 let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res"]);
                        //                 newCellitBp.appendChild(textitBp);
                        //             }
                        //             let newCellititDl = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_dlift_res"] === null) {
                        //                 let textitDl = document.createTextNode("");
                        //                 newCellititDl.appendChild(textitDl);
                        //             } else {
                        //                 let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res"]);
                        //                 newCellititDl.appendChild(textitDl);
                        //             }
                        //             let newCellIt = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_sum_res"] === null) {
                        //                 let textIt = document.createTextNode("");
                        //                 newCellIt.appendChild(textIt);
                        //             } else {
                        //                 let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res"]);
                        //                 newCellIt.appendChild(textIt);
                        //             }
                        //         } else {
                        //             let newCellsquatRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"] === null) {
                        //                 let textsquatRes1 = document.createTextNode("");
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //             } else {
                        //                 let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"]);
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "1") {
                        //                         newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "3") {
                        //                         newCellsquatRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"] === null) {
                        //                 let textsquatRes2 = document.createTextNode("");
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //             } else {
                        //                 let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"]);
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "1") {
                        //                         newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "3") {
                        //                         newCellsquatRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"] === null) {
                        //                 let textsquatRes3 = document.createTextNode("");
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //             } else {
                        //                 let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"]);
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "1") {
                        //                         newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "3") {
                        //                         newCellsquatRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"] === null) {
                        //                 let textbpRes1 = document.createTextNode("");
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //             } else {
                        //                 let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"]);
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "1") {
                        //                         newCellbpRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "3") {
                        //                         newCellbpRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"] === null) {
                        //                 let textbpRes2 = document.createTextNode("");
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //             } else {
                        //                 let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"]);
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "1") {
                        //                         newCellbpRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "3") {
                        //                         newCellbpRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"] === null) {
                        //                 let textbpRes3 = document.createTextNode("");
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //             } else {
                        //                 let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"]);
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "1") {
                        //                         newCellbpRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "3") {
                        //                         newCellbpRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"] === null) {
                        //                 let textdlRes1 = document.createTextNode("");
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //             } else {
                        //                 let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"]);
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "1") {
                        //                         newCelldlRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "3") {
                        //                         newCelldlRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"] === null) {
                        //                 let textdlRes2 = document.createTextNode("");
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //             } else {
                        //                 let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"]);
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "1") {
                        //                         newCelldlRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "3") {
                        //                         newCelldlRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"] === null) {
                        //                 let textdlRes3 = document.createTextNode("");
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //             } else {
                        //                 let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"]);
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "1") {
                        //                         newCelldlRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "3") {
                        //                         newCelldlRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellitSquat = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_squat_res_ek"] === null) {
                        //                 let textitSquat = document.createTextNode("");
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             } else {
                        //                 let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res_ek"]);
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             }
                        //             let newCellitBp = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"] === null) {
                        //                 let textitBp = document.createTextNode("");
                        //                 newCellitBp.appendChild(textitBp);
                        //             } else {
                        //                 let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"]);
                        //                 newCellitBp.appendChild(textitBp);
                        //             }
                        //             let newCellititDl = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"] === null) {
                        //                 let textitDl = document.createTextNode("");
                        //                 newCellititDl.appendChild(textitDl);
                        //             } else {
                        //                 let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"]);
                        //                 newCellititDl.appendChild(textitDl);
                        //             }
                        //             let newCellIt = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_sum_res_ek"] === null) {
                        //                 let textIt = document.createTextNode("");
                        //                 newCellIt.appendChild(textIt);
                        //             } else {
                        //                 let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res_ek"]);
                        //                 newCellIt.appendChild(textIt);
                        //             }
                        //         }
                        //     }
                        // }
                    }

                    // if (JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                    //     if (querysetsFromBack !== JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                    //         querysetsFromBack = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                    //         let querysetsFromBackJson = JSON.parse(querysetsFromBack);
                    //         while (massTable.rows.length > 1) {
                    //             massTable.deleteRow(-1);
                    //         }
                    //         console.log(querysetsFromBackJson)
                    //         for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                    //             let newRow = massTable.insertRow();
                    //             let newCellFi = newRow.insertCell();
                    //             let textFi = document.createTextNode(`${querysetsFromBackJson[i]["fields"]["competitor"][0]} ${querysetsFromBackJson[i]["fields"]["competitor"][1]}`);
                    //             newCellFi.appendChild(textFi);
                    //             let newCellWeight = newRow.insertCell();
                    //             let textWeight = document.createTextNode(querysetsFromBackJson[i]["fields"]["competitor_weight"]);
                    //             newCellWeight.appendChild(textWeight);
                    //             let compSTypes = querysetsFromBackJson[i]["fields"]["competitor"][2];
                    //             if (compSTypes.includes("Троеборье классическое") || compSTypes.includes("Жим лёжа (без экип.)")) {
                    //                 let newCellsquatRes1 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"] === null) {
                    //                     let textsquatRes1 = document.createTextNode("");
                    //                     newCellsquatRes1.appendChild(textsquatRes1);
                    //                 } else {
                    //                     let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"]);
                    //                     newCellsquatRes1.appendChild(textsquatRes1);
                    //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "1") {
                    //                             newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "3") {
                    //                             newCellsquatRes1.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellsquatRes2 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"] === null) {
                    //                     let textsquatRes2 = document.createTextNode("");
                    //                     newCellsquatRes2.appendChild(textsquatRes2);
                    //                 } else {
                    //                     let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"]);
                    //                     newCellsquatRes2.appendChild(textsquatRes2);
                    //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "1") {
                    //                             newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "3") {
                    //                             newCellsquatRes2.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellsquatRes3 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"] === null) {
                    //                     let textsquatRes3 = document.createTextNode("");
                    //                     newCellsquatRes3.appendChild(textsquatRes3);
                    //                 } else {
                    //                     let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"]);
                    //                     newCellsquatRes3.appendChild(textsquatRes3);
                    //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "1") {
                    //                             newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "3") {
                    //                             newCellsquatRes3.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellbpRes1 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"] === null) {
                    //                     let textbpRes1 = document.createTextNode("");
                    //                     newCellbpRes1.appendChild(textbpRes1);
                    //                 } else {
                    //                     let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"]);
                    //                     newCellbpRes1.appendChild(textbpRes1);
                    //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "1") {
                    //                             newCellbpRes1.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "3") {
                    //                             newCellbpRes1.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellbpRes2 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"] === null) {
                    //                     let textbpRes2 = document.createTextNode("");
                    //                     newCellbpRes2.appendChild(textbpRes2);
                    //                 } else {
                    //                     let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"]);
                    //                     newCellbpRes2.appendChild(textbpRes2);
                    //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "1") {
                    //                             newCellbpRes2.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "3") {
                    //                             newCellbpRes2.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellbpRes3 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"] === null) {
                    //                     let textbpRes3 = document.createTextNode("");
                    //                     newCellbpRes3.appendChild(textbpRes3);
                    //                 } else {
                    //                     let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"]);
                    //                     newCellbpRes3.appendChild(textbpRes3);
                    //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "1") {
                    //                             newCellbpRes3.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "3") {
                    //                             newCellbpRes3.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCelldlRes1 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"] === null) {
                    //                     let textdlRes1 = document.createTextNode("");
                    //                     newCelldlRes1.appendChild(textdlRes1);
                    //                 } else {
                    //                     let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"]);
                    //                     newCelldlRes1.appendChild(textdlRes1);
                    //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "1") {
                    //                             newCelldlRes1.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "3") {
                    //                             newCelldlRes1.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCelldlRes2 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"] === null) {
                    //                     let textdlRes2 = document.createTextNode("");
                    //                     newCelldlRes2.appendChild(textdlRes2);
                    //                 } else {
                    //                     let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"]);
                    //                     newCelldlRes2.appendChild(textdlRes2);
                    //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "1") {
                    //                             newCelldlRes2.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "3") {
                    //                             newCelldlRes2.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCelldlRes3 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"] === null) {
                    //                     let textdlRes3 = document.createTextNode("");
                    //                     newCelldlRes3.appendChild(textdlRes3);
                    //                 } else {
                    //                     let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"]);
                    //                     newCelldlRes3.appendChild(textdlRes3);
                    //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "1") {
                    //                             newCelldlRes3.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "3") {
                    //                             newCelldlRes3.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellitSquat = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_squat_res"] === null) {
                    //                     let textitSquat = document.createTextNode("");
                    //                     newCellitSquat.appendChild(textitSquat);
                    //                 } else {
                    //                     let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res"]);
                    //                     newCellitSquat.appendChild(textitSquat);
                    //                 }
                    //                 let newCellitBp = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_bpress_res"] === null) {
                    //                     let textitBp = document.createTextNode("");
                    //                     newCellitBp.appendChild(textitBp);
                    //                 } else {
                    //                     let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res"]);
                    //                     newCellitBp.appendChild(textitBp);
                    //                 }
                    //                 let newCellititDl = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_dlift_res"] === null) {
                    //                     let textitDl = document.createTextNode("");
                    //                     newCellititDl.appendChild(textitDl);
                    //                 } else {
                    //                     let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res"]);
                    //                     newCellititDl.appendChild(textitDl);
                    //                 }
                    //                 let newCellIt = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_sum_res"] === null) {
                    //                     let textIt = document.createTextNode("");
                    //                     newCellIt.appendChild(textIt);
                    //                 } else {
                    //                     let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res"]);
                    //                     newCellIt.appendChild(textIt);
                    //                 }
                    //             } else {
                    //                 let newCellsquatRes1 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"] === null) {
                    //                     let textsquatRes1 = document.createTextNode("");
                    //                     newCellsquatRes1.appendChild(textsquatRes1);
                    //                 } else {
                    //                     let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"]);
                    //                     newCellsquatRes1.appendChild(textsquatRes1);
                    //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "1") {
                    //                             newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "3") {
                    //                             newCellsquatRes1.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellsquatRes2 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"] === null) {
                    //                     let textsquatRes2 = document.createTextNode("");
                    //                     newCellsquatRes2.appendChild(textsquatRes2);
                    //                 } else {
                    //                     let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"]);
                    //                     newCellsquatRes2.appendChild(textsquatRes2);
                    //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "1") {
                    //                             newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "3") {
                    //                             newCellsquatRes2.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellsquatRes3 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"] === null) {
                    //                     let textsquatRes3 = document.createTextNode("");
                    //                     newCellsquatRes3.appendChild(textsquatRes3);
                    //                 } else {
                    //                     let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"]);
                    //                     newCellsquatRes3.appendChild(textsquatRes3);
                    //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "1") {
                    //                             newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "3") {
                    //                             newCellsquatRes3.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellbpRes1 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"] === null) {
                    //                     let textbpRes1 = document.createTextNode("");
                    //                     newCellbpRes1.appendChild(textbpRes1);
                    //                 } else {
                    //                     let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"]);
                    //                     newCellbpRes1.appendChild(textbpRes1);
                    //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "1") {
                    //                             newCellbpRes1.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "3") {
                    //                             newCellbpRes1.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellbpRes2 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"] === null) {
                    //                     let textbpRes2 = document.createTextNode("");
                    //                     newCellbpRes2.appendChild(textbpRes2);
                    //                 } else {
                    //                     let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"]);
                    //                     newCellbpRes2.appendChild(textbpRes2);
                    //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "1") {
                    //                             newCellbpRes2.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "3") {
                    //                             newCellbpRes2.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellbpRes3 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"] === null) {
                    //                     let textbpRes3 = document.createTextNode("");
                    //                     newCellbpRes3.appendChild(textbpRes3);
                    //                 } else {
                    //                     let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"]);
                    //                     newCellbpRes3.appendChild(textbpRes3);
                    //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "1") {
                    //                             newCellbpRes3.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "3") {
                    //                             newCellbpRes3.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCelldlRes1 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"] === null) {
                    //                     let textdlRes1 = document.createTextNode("");
                    //                     newCelldlRes1.appendChild(textdlRes1);
                    //                 } else {
                    //                     let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"]);
                    //                     newCelldlRes1.appendChild(textdlRes1);
                    //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "1") {
                    //                             newCelldlRes1.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "3") {
                    //                             newCelldlRes1.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCelldlRes2 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"] === null) {
                    //                     let textdlRes2 = document.createTextNode("");
                    //                     newCelldlRes2.appendChild(textdlRes2);
                    //                 } else {
                    //                     let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"]);
                    //                     newCelldlRes2.appendChild(textdlRes2);
                    //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "1") {
                    //                             newCelldlRes2.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "3") {
                    //                             newCelldlRes2.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCelldlRes3 = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"] === null) {
                    //                     let textdlRes3 = document.createTextNode("");
                    //                     newCelldlRes3.appendChild(textdlRes3);
                    //                 } else {
                    //                     let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"]);
                    //                     newCelldlRes3.appendChild(textdlRes3);
                    //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] !== null) {
                    //                         if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "1") {
                    //                             newCelldlRes3.style.backgroundColor = "#ffa0a0";
                    //                         } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "3") {
                    //                             newCelldlRes3.style.backgroundColor = "#aaffaa";
                    //                         }
                    //                     }
                    //                 }
                    //                 let newCellitSquat = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_squat_res_ek"] === null) {
                    //                     let textitSquat = document.createTextNode("");
                    //                     newCellitSquat.appendChild(textitSquat);
                    //                 } else {
                    //                     let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res_ek"]);
                    //                     newCellitSquat.appendChild(textitSquat);
                    //                 }
                    //                 let newCellitBp = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"] === null) {
                    //                     let textitBp = document.createTextNode("");
                    //                     newCellitBp.appendChild(textitBp);
                    //                 } else {
                    //                     let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"]);
                    //                     newCellitBp.appendChild(textitBp);
                    //                 }
                    //                 let newCellititDl = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"] === null) {
                    //                     let textitDl = document.createTextNode("");
                    //                     newCellititDl.appendChild(textitDl);
                    //                 } else {
                    //                     let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"]);
                    //                     newCellititDl.appendChild(textitDl);
                    //                 }
                    //                 let newCellIt = newRow.insertCell();
                    //                 if (querysetsFromBackJson[i]["fields"]["best_sum_res_ek"] === null) {
                    //                     let textIt = document.createTextNode("");
                    //                     newCellIt.appendChild(textIt);
                    //                 } else {
                    //                     let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res_ek"]);
                    //                     newCellIt.appendChild(textIt);
                    //                 }
                    //             }
                    //         }
                    //         // console.log("got");
                    //         // // massTable.style.height = "100vh";
                    //         // console.log(getComputedStyle(massTable).fontSize)
                    //         // function missFz() {
                    //         //     // console.log(getComputedStyle(massTable).fontSize)
                    //         //     // massTable.style.fontSize = parseFloat(getComputedStyle(massTable).fontSize) - 1 + "px"
                    //         //     // console.log(getComputedStyle(massTable).fontSize)
                    //         //     massTable.style.height = "100vh"
                    //         // }
                    //         // window.onresize = missFz()
                    //     }
                    // }

                    if (JSON.parse(myxmlhttp.response).cur_transl_pk) {
                        if (curtranslPk === JSON.parse(myxmlhttp.response).cur_transl_pk && curStateTimer !== JSON.parse(myxmlhttp.response).timer_state) {
                            if (JSON.parse(myxmlhttp.response).timer_state === "start") {
                                curStateTimer = "start";
                                startTimerComp(duration, timerp);
                            } else if (JSON.parse(myxmlhttp.response).timer_state === "stop") {
                                curStateTimer = "stop";
                                stopTimerComp();
                                clearTimerValues();
                            }
                        }
                        if (curtranslPk !== JSON.parse(myxmlhttp.response).cur_transl_pk && JSON.parse(myxmlhttp.response).competitor_ordered_weight_offset.length === 0) {
                            // start timer when get translation
                            // startTimerComp(duration, timerp);
                            pillarHeight = JSON.parse(myxmlhttp.response).pillar_height;
                            curtranslPk = JSON.parse(myxmlhttp.response).cur_transl_pk;
                            competitorEx = JSON.parse(myxmlhttp.response).competitor_exercise;
                            competitorExAtt = JSON.parse(myxmlhttp.response).competitor_exercise_attempt;
                            competitorFi = JSON.parse(myxmlhttp.response).competitor_fi;
                            competitorWc = JSON.parse(myxmlhttp.response).competitor_weight_cat;
                            competitorOw = JSON.parse(myxmlhttp.response).competitor_ordered_weight;
                            console.log(competitorOw)
                            let twentyFive = '';
                            let twenty = '';
                            let fifteen = '';
                            let ten = '';
                            let five = '';
                            let twoAndHalf = '';
                            let oneAndTwentyFive = '';
                            let twoLocks = true;
                            let remainder = '';
                            if (Number(competitorOw) > 25) {
                                let pancakes = Number(competitorOw) - 25;
                                if (Math.floor(pancakes / 50) > 0) {
                                    twentyFive = Math.floor(pancakes / 50);
                                    remainder = pancakes % 50;
                                    if (Math.floor(remainder / 40) > 0) {
                                        twenty = Math.floor(remainder / 40);
                                        remainder = remainder % 40;
                                        if (Math.floor(remainder / 30) > 0) {
                                            fifteen = Math.floor(remainder / 30);
                                            remainder = remainder % 30;
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = pancakes % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (Math.floor(remainder / 30) > 0) {
                                            fifteen = Math.floor(remainder / 30);
                                            remainder = remainder % 30;
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (Math.floor(pancakes / 40) > 0) {
                                        twenty = Math.floor(pancakes / 40);
                                        remainder = pancakes % 40;
                                        if (Math.floor(remainder / 30) > 0) {
                                            fifteen = Math.floor(remainder / 30);
                                            remainder = remainder % 30;
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = pancakes % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (Math.floor(pancakes / 30) > 0) {
                                            fifteen = Math.floor(pancakes / 30);
                                            remainder = pancakes % 30;
                                            if (Math.floor(remainder / 20) > 0) {
                                                ten = Math.floor(remainder / 20);
                                                remainder = remainder % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (Math.floor(pancakes / 20) > 0) {
                                                ten = Math.floor(pancakes / 20);
                                                remainder = pancakes % 20;
                                                if (Math.floor(remainder / 10) > 0) {
                                                    five = Math.floor(remainder / 10);
                                                    remainder = remainder % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (Math.floor(pancakes / 10) > 0) {
                                                    five = Math.floor(pancakes / 10);
                                                    remainder = pancakes % 10;
                                                    if (Math.floor(remainder / 5) > 0) {
                                                        twoAndHalf = Math.floor(remainder / 5);
                                                        remainder = remainder % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    }
                                                } else {
                                                    if (Math.floor(pancakes / 5) > 0) {
                                                        twoAndHalf = Math.floor(pancakes / 5);
                                                        remainder = pancakes % 5;
                                                        if (Math.floor(remainder / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(remainder / 2.5);
                                                        }
                                                    } else {
                                                        if (Math.floor(pancakes / 2.5) > 0) {
                                                            oneAndTwentyFive = Math.floor(pancakes / 2.5);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if ((Number(competitorOw) - 25) === 0) {
                                } else if ((Number(competitorOw) - 22.5) === 0) {
                                    oneAndTwentyFive = 1;
                                    twoLocks = false;
                                } else {
                                    twoLocks = false;
                                }
                            }
                            if (twentyFive) {
                                let twentyFiveDiv = document.createElement('span');
                                twentyFiveDiv.classList.add('weight_show_assistants-twenty_five');
                                twentyFiveDiv.textContent = twentyFive;
                                blockShowAss.append(twentyFiveDiv);
                            }
                            if (twenty) {
                                let twentyDiv = document.createElement('span');
                                twentyDiv.classList.add('weight_show_assistants-twenty');
                                twentyDiv.textContent = twenty;
                                blockShowAss.append(twentyDiv);
                            }
                            if (fifteen) {
                                let fifteenDiv = document.createElement('span');
                                fifteenDiv.classList.add('weight_show_assistants-fifteen');
                                fifteenDiv.textContent = fifteen;
                                blockShowAss.append(fifteenDiv);
                            }
                            if (ten) {
                                let tenDiv = document.createElement('span');
                                tenDiv.classList.add('weight_show_assistants-ten');
                                tenDiv.textContent = ten;
                                blockShowAss.append(tenDiv);
                            }
                            if (five) {
                                let fiveDiv = document.createElement('span');
                                fiveDiv.classList.add('weight_show_assistants-five');
                                fiveDiv.textContent = five;
                                blockShowAss.append(fiveDiv);
                            }
                            if (twoAndHalf) {
                                let twoAndHalfDiv = document.createElement('span');
                                twoAndHalfDiv.classList.add('weight_show_assistants-two_half');
                                twoAndHalfDiv.textContent = twoAndHalf;
                                blockShowAss.append(twoAndHalfDiv);
                            }
                            if (oneAndTwentyFive) {
                                let oneAndTwentyFiveDiv = document.createElement('span');
                                oneAndTwentyFiveDiv.classList.add('weight_show_assistants-one_twenty_five');
                                oneAndTwentyFiveDiv.textContent = oneAndTwentyFive;
                                blockShowAss.append(oneAndTwentyFiveDiv);
                            }
                            if (twoLocks) {
                                let twoLocksDiv = document.createElement('span');
                                twoLocksDiv.classList.add('weight_show_assistants-locks');
                                let twoLocksDivAdd = document.createElement('span');
                                twoLocksDivAdd.classList.add('weight_show_assistants-locks_add');
                                twoLocksDiv.append(twoLocksDivAdd);
                                blockShowAss.append(twoLocksDiv);
                            }
                            if (pillarHeight) {
                                let textBlockPillar = document.createElement('span');
                                textBlockPillar.classList.add('weight_show_assistants-pillar');
                                textBlockPillar.textContent = pillarHeight;
                                blockShowAss.append(textBlockPillar);
                            }
                            indScoreBoard.style.display = "flex";
                            indScoreWcat.textContent = competitorWc;
                            indScoreScore1.style.backgroundColor = "red";
                            indScoreScore2.style.backgroundColor = "red";
                            indScoreScore3.style.backgroundColor = "red";
                            indScoreFi.textContent = competitorFi;
                            indScoreAc.textContent = competitorEx;
                            indScoreAtt.textContent = competitorExAtt;
                            indScoreWeight.textContent = competitorOw;
                            if (JSON.parse(myxmlhttp.response).comp_first_off && JSON.parse(myxmlhttp.response).comp_sec_off) {
                                compFitstWeightDiv.style.display = "block";
                                compSecWeightDiv.style.display = "block";
                                compThirdWeightDiv.style.display = "block";
                                compFitstWeightSpan.textContent = JSON.parse(myxmlhttp.response).comp_first_weight;
                                compSecWeightSpan.textContent = JSON.parse(myxmlhttp.response).comp_sec_weight;
                                compThirdWeightSpan.textContent = competitorOw;
                                compThirdWeightDiv.classList.add('ind_scoreboard-appr_weight-cur');
                                if (JSON.parse(myxmlhttp.response).comp_first_off === "2" || JSON.parse(myxmlhttp.response).comp_first_off === "3") {
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else {
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                }
                                if (JSON.parse(myxmlhttp.response).comp_sec_off === "2" || JSON.parse(myxmlhttp.response).comp_sec_off === "3") {
                                    compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else {
                                    compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                }
                            } else if (JSON.parse(myxmlhttp.response).comp_first_off) {
                                compFitstWeightDiv.style.display = "block";
                                compSecWeightDiv.style.display = "block";
                                compFitstWeightSpan.textContent = JSON.parse(myxmlhttp.response).comp_first_weight;
                                compSecWeightSpan.textContent = competitorOw;
                                compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-cur');
                                if (JSON.parse(myxmlhttp.response).comp_first_off === "2" || JSON.parse(myxmlhttp.response).comp_first_off === "3") {
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else {
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                }
                            } else {
                                compFitstWeightDiv.style.display = "block";
                                compFitstWeightSpan.textContent = competitorOw;
                                compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-cur');
                            }
                        } else if (curtranslPk === JSON.parse(myxmlhttp.response).cur_transl_pk && JSON.parse(myxmlhttp.response).competitor_ordered_weight_offset.length !== 0) {
                            competitorOwOff = JSON.parse(myxmlhttp.response).competitor_ordered_weight_offset;
                            // document.getElementById('score_page-competitor_ordered_weight_offset').textContent = competitorOwOff;
                            if (competitorOwOff === "1") {
                                indScoreScore1.style.backgroundColor = "white";
                                if (JSON.parse(myxmlhttp.response).comp_first_off && JSON.parse(myxmlhttp.response).comp_sec_off) {
                                    compThirdWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compThirdWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                } else if (JSON.parse(myxmlhttp.response).comp_first_off) {
                                    compSecWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                } else {
                                    compFitstWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                }
                            } else if (competitorOwOff === "2") {
                                indScoreScore1.style.backgroundColor = "white";
                                indScoreScore2.style.backgroundColor = "white";
                                if (JSON.parse(myxmlhttp.response).comp_first_off && JSON.parse(myxmlhttp.response).comp_sec_off) {
                                    compThirdWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compThirdWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else if (JSON.parse(myxmlhttp.response).comp_first_off) {
                                    compSecWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else {
                                    compFitstWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                }
                            } else if (competitorOwOff === "3") {
                                indScoreScore1.style.backgroundColor = "white";
                                indScoreScore2.style.backgroundColor = "white";
                                indScoreScore3.style.backgroundColor = "white";
                                if (JSON.parse(myxmlhttp.response).comp_first_off && JSON.parse(myxmlhttp.response).comp_sec_off) {
                                    compThirdWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compThirdWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else if (JSON.parse(myxmlhttp.response).comp_first_off) {
                                    compSecWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                } else {
                                    compFitstWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-take');
                                }
                            } else if (competitorOwOff === "0") {
                                if (JSON.parse(myxmlhttp.response).comp_first_off && JSON.parse(myxmlhttp.response).comp_sec_off) {
                                    compThirdWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compThirdWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                } else if (JSON.parse(myxmlhttp.response).comp_first_off) {
                                    compSecWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compSecWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                } else {
                                    compFitstWeightDiv.classList.remove('ind_scoreboard-appr_weight-cur');
                                    compFitstWeightDiv.classList.add('ind_scoreboard-appr_weight-nottake');
                                }
                            }
                            // show 4 sec after get offset
                            // setTimeout(clearScore, 4000);
                            stopTimerComp();
                        }
                    } else {
                        clearScore();
                        stopTimerComp();
                        while (blockShowAss.firstChild) {
                            blockShowAss.removeChild(blockShowAss.firstChild);
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
        function getScore() {
            document.getElementById('score-form_btn').click();
        }

        // setInterval(getScore, 5000);
        setInterval(getScore, 2000);

    }

    let secrPageSpanClickBtns = document.querySelectorAll('.secr-page_span-click');
    if (secrPageSpanClickBtns.length > 0) {
        for (let i=0; i < secrPageSpanClickBtns.length; i++) {
            secrPageSpanClickBtns[i].addEventListener('click', function (e) {
                secrPageSpanClickBtns[i].parentElement.parentElement.style.border = '3px solid rgb(162, 125, 41)';
                secrPageSpanClickBtns[i].style.display = 'none';
                secrPageSpanClickBtns[i].previousElementSibling.style.display = 'block';
                let closeBtn = secrPageSpanClickBtns[i].previousElementSibling.querySelector('.secr-page_before-span-block_no');
                closeBtn.addEventListener('click', function (e) {
                    secrPageSpanClickBtns[i].previousElementSibling.style.display = 'none';
                    secrPageSpanClickBtns[i].style.display = 'block';
                    secrPageSpanClickBtns[i].parentElement.parentElement.style.border = '1px solid #092942';
                });
                let sendBtn = secrPageSpanClickBtns[i].previousElementSibling.querySelector('.secr-page_before-span-block_ok');
                sendBtn.addEventListener('click', function (e) {
                    e.stopImmediatePropagation();
                    secrPageSpanClickBtns[i].parentElement.parentElement.style.border = '1px solid #092942';
                    let method = document.getElementById('secretary-page_form').getAttribute('method');
                    let endpoint = document.getElementById('secretary-page_form').getAttribute('action');
                    let token = document.getElementById('secretary-page_form').querySelector('[name="csrfmiddlewaretoken"]').value;
                    let targElementOfData = secrPageSpanClickBtns[i].previousElementSibling.firstElementChild;
                    let sendData = '';
                    if (targElementOfData.tagName === "INPUT" || targElementOfData.tagName === "SELECT") {
                        if (targElementOfData.tagName === "INPUT") {
                            if (targElementOfData.value === '') {
                                targElementOfData.value = 0;
                            }
                        }
                        sendData = 'saveval=yes&saveattrname=' + encodeURIComponent(targElementOfData.name) + '&saveattrval=' + encodeURIComponent(targElementOfData.value);
                    }
                    let xhr = new XMLHttpRequest();
                    xhr.open(method, endpoint, true);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhr.setRequestHeader('X-CSRFToken', token);
                    xhr.send(sendData);
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            targElementOfData.value = JSON.parse(xhr.response).saved_val;
                            targElementOfData.placeholder = JSON.parse(xhr.response).saved_val;
                            secrPageSpanClickBtns[i].textContent = JSON.parse(xhr.response).saved_val;
                            secrPageSpanClickBtns[i].previousElementSibling.style.display = 'none';
                            secrPageSpanClickBtns[i].style.display = 'block';
                            if (JSON.parse(xhr.response).saved_val === null && targElementOfData.tagName === 'SELECT') {
                                secrPageSpanClickBtns[i].textContent = 'пусто';
                            }
                        }
                    }
                    xhr.onerror = function () {
                        console.log(xhr.responseText);
                    };
                });
            });
        }
    }

    let startTimerBtn = document.getElementById('secr-page_show_btn-timer-p');
    if (startTimerBtn) {
        let modalSecr = document.getElementById('secr-page_form_modal');
        let modalSecrClose = document.getElementById('secr-page_form_modal-close');
        let modalSecrTextMain = document.getElementById('secr-page_form_modal-text');
        let stopTimerBtn = document.getElementById('secr-page_show_btn-timer-s');
        startTimerBtn.addEventListener('click', function (e) {
            let endpoint = document.getElementById('secretary-page_form').getAttribute('action');
            let token = document.getElementById('secretary-page_form').querySelector('[name="csrfmiddlewaretoken"]').value;
            let sendData = 'secretarytimer=start';
            let xhr = new XMLHttpRequest();
            xhr.open("post", endpoint, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.send(sendData);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    startTimerBtn.style.display = "none";
                    stopTimerBtn.style.display = "flex";
                } else if (xhr.status === 302) {
                    modalSecr.style.display = "block";
                    modalSecrTextMain.textContent = JSON.parse(xhr.response).error;
                    window.onclick = function (event) {
                        if (event.target === modalSecr) {
                            modalSecr.style.display = "none";
                        }
                    }
                    modalSecrClose.onclick = function () {
                        modalSecr.style.display = "none";
                    }
                }
            }
            xhr.onerror = function () {
                console.log(xhr.responseText);
            };
        });
        stopTimerBtn.addEventListener('click', function (e) {
            let endpoint = document.getElementById('secretary-page_form').getAttribute('action');
            let token = document.getElementById('secretary-page_form').querySelector('[name="csrfmiddlewaretoken"]').value;
            let sendData = 'secretarytimer=stop';
            let xhr = new XMLHttpRequest();
            xhr.open("post", endpoint, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.send(sendData);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    stopTimerBtn.style.display = "none";
                    startTimerBtn.style.display = "flex";
                }
            }
            xhr.onerror = function () {
                console.log(xhr.responseText);
            };
        });
    }

    let secrPagePlayBtns = document.querySelectorAll('.secr-page_show_btn-p');
    if (secrPagePlayBtns.length > 0) {
        let modalSecr = document.getElementById('secr-page_form_modal');
        let modalSecrClose = document.getElementById('secr-page_form_modal-close');
        let modalSecrTextMain = document.getElementById('secr-page_form_modal-text');
        let curTranslVal = document.getElementById('cur_transl').value;
        if (curTranslVal.length > 0) {
            let curTranslValPk = curTranslVal.split('_')[0];
            let curTranslValType = curTranslVal.split('_')[1];
            let curTranslTr = document.getElementById('secr-page_noform-tr_' + curTranslValPk);
            let curTranslDiv = curTranslTr.querySelector(`div[data-attr="${curTranslValType}"]`)
            curTranslDiv.parentElement.style.border = '3px solid rgb(162, 125, 41)';
            curTranslDiv.nextElementSibling.style.display = 'block';
            curTranslDiv.style.display = 'none';
            curTranslDiv.nextElementSibling.addEventListener('dblclick', function (e) {
                let method = document.getElementById('secretary-page_form').getAttribute('method');
                let endpoint = document.getElementById('secretary-page_form').getAttribute('action');
                let token = document.getElementById('secretary-page_form').querySelector('[name="csrfmiddlewaretoken"]').value;
                let pkId = curTranslDiv.previousElementSibling.id.split('secr-page_noform-')[1].split('_')[1];
                let sendData = 'showmeatt=no&pk=' + encodeURIComponent(pkId);
                let xhr = new XMLHttpRequest();
                xhr.open(method, endpoint, true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-CSRFToken', token);
                xhr.send(sendData);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        curTranslDiv.parentElement.style.border = '1px solid #092942';
                        curTranslDiv.style.display = 'block';
                        curTranslDiv.nextElementSibling.style.display = 'none';
                    }
                }
                xhr.onerror = function () {
                    console.log(xhr.responseText);
                };
            });
        }
        for (let i=0; i < secrPagePlayBtns.length; i++) {
            secrPagePlayBtns[i].addEventListener('dblclick', function (e){
                let parentTd = secrPagePlayBtns[i].parentElement;
                let stopBtn = secrPagePlayBtns[i].nextElementSibling;
                let pkId = secrPagePlayBtns[i].previousElementSibling.id.split('secr-page_noform-')[1].split('_')[1];
                let typeOfMot = secrPagePlayBtns[i].getAttribute('data-attr');
                let method = document.getElementById('secretary-page_form').getAttribute('method');
                let endpoint = document.getElementById('secretary-page_form').getAttribute('action');
                let token = document.getElementById('secretary-page_form').querySelector('[name="csrfmiddlewaretoken"]').value;
                let sendData = 'showmeatt=yes&pk=' + encodeURIComponent(pkId) + '&typeatt=' + encodeURIComponent(typeOfMot);
                let xhr = new XMLHttpRequest();
                xhr.open(method, endpoint, true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-CSRFToken', token);
                xhr.send(sendData);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        parentTd.style.border = '3px solid rgb(162, 125, 41)';
                        secrPagePlayBtns[i].style.display = 'none';
                        stopBtn.style.display = 'block';
                        stopBtn.addEventListener('dblclick', function (e) {
                            sendData = 'showmeatt=no&pk=' + encodeURIComponent(pkId);
                            xhr = new XMLHttpRequest();
                            xhr.open(method, endpoint, true);
                            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                            xhr.setRequestHeader('X-CSRFToken', token);
                            xhr.send(sendData);
                            xhr.onload = function () {
                                if (xhr.status === 200) {
                                    parentTd.style.border = '1px solid #092942';
                                    secrPagePlayBtns[i].style.display = 'block';
                                    stopBtn.style.display = 'none';
                                    document.getElementById('secr-page_show_btn-timer-s').style.display = "none";
                                    document.getElementById('secr-page_show_btn-timer-p').style.display = "flex";
                                }
                            }
                            xhr.onerror = function () {
                                console.log(xhr.responseText);
                            };
                        });
                    } else if (xhr.status === 302) {
                        modalSecr.style.display = "block";
                        modalSecrTextMain.textContent = JSON.parse(xhr.response).error;
                        window.onclick = function(event) {
                            if (event.target === modalSecr) {
                                modalSecr.style.display = "none";
                            }
                        }
                        modalSecrClose.onclick = function() {
                            modalSecr.style.display = "none";
                        }
                    }
                }
                xhr.onerror = function () {
                    console.log(xhr.responseText);
                };
            });
        }
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
                    // console.log("запрос")
                    if (JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                        console.log(JSON.parse(myxmlhttp.response).cur_flow_competitors_json)

                        let querysetsFromBackJson = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                        while (massTable.rows.length > 1) {
                            massTable.deleteRow(-1);
                        }
                        for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                            let newRow = massTable.insertRow();
                            let newCellFi = newRow.insertCell();
                            let textFi = document.createTextNode(`${querysetsFromBackJson[i]["competitor__surname_comp"]} ${querysetsFromBackJson[i]["competitor__name_comp"]}`);
                            if (querysetsFromBackJson[i]["competitor_translation"] !== null) {
                                newCellFi.parentElement.style.border = "5px solid #A27D29";
                            }
                            newCellFi.appendChild(textFi);
                            let newCellWeight = newRow.insertCell();
                            let textWeight = document.createTextNode(querysetsFromBackJson[i]["competitor_weight"]);
                            newCellWeight.appendChild(textWeight);
                            let compSTypes = querysetsFromBackJson[i]["competitor__sports_type__title"];
                            if (compSTypes.includes("Троеборье классическое") || compSTypes.includes("Жим лёжа (без экип.)")) {
                                let newCellsquatRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_squat_res"] === null) {
                                    let textsquatRes1 = document.createTextNode("");
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                } else {
                                    let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_squat_res"]);
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_squat_off"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["first_attempt_squat_off"] === "1") {
                                            newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["first_attempt_squat_off"] === "3") {
                                            newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_squat_res"] === null) {
                                    let textsquatRes2 = document.createTextNode("");
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                } else {
                                    let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_squat_res"]);
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_squat_off"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["second_attempt_squat_off"] === "1") {
                                            newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["second_attempt_squat_off"] === "3") {
                                            newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_squat_res"] === null) {
                                    let textsquatRes3 = document.createTextNode("");
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                } else {
                                    let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_squat_res"]);
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_squat_off"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["third_attempt_squat_off"] === "1") {
                                            newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["third_attempt_squat_off"] === "3") {
                                            newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_bpress_res"] === null) {
                                    let textbpRes1 = document.createTextNode("");
                                    newCellbpRes1.appendChild(textbpRes1);
                                } else {
                                    let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_bpress_res"]);
                                    newCellbpRes1.appendChild(textbpRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_bpress_off"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["first_attempt_bpress_off"] === "1") {
                                            newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["first_attempt_bpress_off"] === "3") {
                                            newCellbpRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_bpress_res"] === null) {
                                    let textbpRes2 = document.createTextNode("");
                                    newCellbpRes2.appendChild(textbpRes2);
                                } else {
                                    let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_bpress_res"]);
                                    newCellbpRes2.appendChild(textbpRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_bpress_off"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["second_attempt_bpress_off"] === "1") {
                                            newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["second_attempt_bpress_off"] === "3") {
                                            newCellbpRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_bpress_res"] === null) {
                                    let textbpRes3 = document.createTextNode("");
                                    newCellbpRes3.appendChild(textbpRes3);
                                } else {
                                    let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_bpress_res"]);
                                    newCellbpRes3.appendChild(textbpRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_bpress_off"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["third_attempt_bpress_off"] === "1") {
                                            newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["third_attempt_bpress_off"] === "3") {
                                            newCellbpRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_dlift_res"] === null) {
                                    let textdlRes1 = document.createTextNode("");
                                    newCelldlRes1.appendChild(textdlRes1);
                                } else {
                                    let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_dlift_res"]);
                                    newCelldlRes1.appendChild(textdlRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_dlift_off"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["first_attempt_dlift_off"] === "1") {
                                            newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["first_attempt_dlift_off"] === "3") {
                                            newCelldlRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_dlift_res"] === null) {
                                    let textdlRes2 = document.createTextNode("");
                                    newCelldlRes2.appendChild(textdlRes2);
                                } else {
                                    let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_dlift_res"]);
                                    newCelldlRes2.appendChild(textdlRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_dlift_off"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["second_attempt_dlift_off"] === "1") {
                                            newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["second_attempt_dlift_off"] === "3") {
                                            newCelldlRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_dlift_res"] === null) {
                                    let textdlRes3 = document.createTextNode("");
                                    newCelldlRes3.appendChild(textdlRes3);
                                } else {
                                    let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_dlift_res"]);
                                    newCelldlRes3.appendChild(textdlRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_dlift_off"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["third_attempt_dlift_off"] === "1") {
                                            newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["third_attempt_dlift_off"] === "3") {
                                            newCelldlRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellitSquat = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_squat_res"] === null) {
                                    let textitSquat = document.createTextNode("");
                                    newCellitSquat.appendChild(textitSquat);
                                } else {
                                    let textitSquat = document.createTextNode(querysetsFromBackJson[i]["best_squat_res"]);
                                    newCellitSquat.appendChild(textitSquat);
                                }
                                let newCellitBp = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_bpress_res"] === null) {
                                    let textitBp = document.createTextNode("");
                                    newCellitBp.appendChild(textitBp);
                                } else {
                                    let textitBp = document.createTextNode(querysetsFromBackJson[i]["best_bpress_res"]);
                                    newCellitBp.appendChild(textitBp);
                                }
                                let newCellititDl = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_dlift_res"] === null) {
                                    let textitDl = document.createTextNode("");
                                    newCellititDl.appendChild(textitDl);
                                } else {
                                    let textitDl = document.createTextNode(querysetsFromBackJson[i]["best_dlift_res"]);
                                    newCellititDl.appendChild(textitDl);
                                }
                                let newCellIt = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_sum_res"] === null) {
                                    let textIt = document.createTextNode("");
                                    newCellIt.appendChild(textIt);
                                } else {
                                    let textIt = document.createTextNode(querysetsFromBackJson[i]["best_sum_res"]);
                                    newCellIt.appendChild(textIt);
                                }
                            } else {
                                let newCellsquatRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_squat_res_ek"] === null) {
                                    let textsquatRes1 = document.createTextNode("");
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                } else {
                                    let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_squat_res_ek"]);
                                    newCellsquatRes1.appendChild(textsquatRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_squat_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "1") {
                                            newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["first_attempt_squat_off_ek"] === "3") {
                                            newCellsquatRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_squat_res_ek"] === null) {
                                    let textsquatRes2 = document.createTextNode("");
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                } else {
                                    let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_squat_res_ek"]);
                                    newCellsquatRes2.appendChild(textsquatRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_squat_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "1") {
                                            newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["second_attempt_squat_off_ek"] === "3") {
                                            newCellsquatRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellsquatRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_squat_res_ek"] === null) {
                                    let textsquatRes3 = document.createTextNode("");
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                } else {
                                    let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_squat_res_ek"]);
                                    newCellsquatRes3.appendChild(textsquatRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_squat_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "1") {
                                            newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["third_attempt_squat_off_ek"] === "3") {
                                            newCellsquatRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_bpress_res_ek"] === null) {
                                    let textbpRes1 = document.createTextNode("");
                                    newCellbpRes1.appendChild(textbpRes1);
                                } else {
                                    let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_bpress_res_ek"]);
                                    newCellbpRes1.appendChild(textbpRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "1") {
                                            newCellbpRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["first_attempt_bpress_off_ek"] === "3") {
                                            newCellbpRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_bpress_res_ek"] === null) {
                                    let textbpRes2 = document.createTextNode("");
                                    newCellbpRes2.appendChild(textbpRes2);
                                } else {
                                    let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_bpress_res_ek"]);
                                    newCellbpRes2.appendChild(textbpRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "1") {
                                            newCellbpRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["second_attempt_bpress_off_ek"] === "3") {
                                            newCellbpRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellbpRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_bpress_res_ek"] === null) {
                                    let textbpRes3 = document.createTextNode("");
                                    newCellbpRes3.appendChild(textbpRes3);
                                } else {
                                    let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_bpress_res_ek"]);
                                    newCellbpRes3.appendChild(textbpRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "1") {
                                            newCellbpRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["third_attempt_bpress_off_ek"] === "3") {
                                            newCellbpRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes1 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["first_attempt_dlift_res_ek"] === null) {
                                    let textdlRes1 = document.createTextNode("");
                                    newCelldlRes1.appendChild(textdlRes1);
                                } else {
                                    let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["first_attempt_dlift_res_ek"]);
                                    newCelldlRes1.appendChild(textdlRes1);
                                    if (querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "1") {
                                            newCelldlRes1.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["first_attempt_dlift_off_ek"] === "3") {
                                            newCelldlRes1.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes2 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["second_attempt_dlift_res_ek"] === null) {
                                    let textdlRes2 = document.createTextNode("");
                                    newCelldlRes2.appendChild(textdlRes2);
                                } else {
                                    let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["second_attempt_dlift_res_ek"]);
                                    newCelldlRes2.appendChild(textdlRes2);
                                    if (querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "1") {
                                            newCelldlRes2.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["second_attempt_dlift_off_ek"] === "3") {
                                            newCelldlRes2.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCelldlRes3 = newRow.insertCell();
                                if (querysetsFromBackJson[i]["third_attempt_dlift_res_ek"] === null) {
                                    let textdlRes3 = document.createTextNode("");
                                    newCelldlRes3.appendChild(textdlRes3);
                                } else {
                                    let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["third_attempt_dlift_res_ek"]);
                                    newCelldlRes3.appendChild(textdlRes3);
                                    if (querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] !== null) {
                                        if (querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "1") {
                                            newCelldlRes3.style.backgroundColor = "#ffa0a0";
                                        } else if (querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["third_attempt_dlift_off_ek"] === "3") {
                                            newCelldlRes3.style.backgroundColor = "#aaffaa";
                                        }
                                    }
                                }
                                let newCellitSquat = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_squat_res_ek"] === null) {
                                    let textitSquat = document.createTextNode("");
                                    newCellitSquat.appendChild(textitSquat);
                                } else {
                                    let textitSquat = document.createTextNode(querysetsFromBackJson[i]["best_squat_res_ek"]);
                                    newCellitSquat.appendChild(textitSquat);
                                }
                                let newCellitBp = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_bpress_res_ek"] === null) {
                                    let textitBp = document.createTextNode("");
                                    newCellitBp.appendChild(textitBp);
                                } else {
                                    let textitBp = document.createTextNode(querysetsFromBackJson[i]["best_bpress_res_ek"]);
                                    newCellitBp.appendChild(textitBp);
                                }
                                let newCellititDl = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_dlift_res_ek"] === null) {
                                    let textitDl = document.createTextNode("");
                                    newCellititDl.appendChild(textitDl);
                                } else {
                                    let textitDl = document.createTextNode(querysetsFromBackJson[i]["best_dlift_res_ek"]);
                                    newCellititDl.appendChild(textitDl);
                                }
                                let newCellIt = newRow.insertCell();
                                if (querysetsFromBackJson[i]["best_sum_res_ek"] === null) {
                                    let textIt = document.createTextNode("");
                                    newCellIt.appendChild(textIt);
                                } else {
                                    let textIt = document.createTextNode(querysetsFromBackJson[i]["best_sum_res_ek"]);
                                    newCellIt.appendChild(textIt);
                                }
                            }
                        }




                        // if (querysetsFromBack !== JSON.parse(myxmlhttp.response).cur_flow_competitors_json) {
                        //     querysetsFromBack = JSON.parse(myxmlhttp.response).cur_flow_competitors_json;
                        //     let querysetsFromBackJson = JSON.parse(querysetsFromBack);
                        //     while (massTable.rows.length > 1) {
                        //         massTable.deleteRow(-1);
                        //     }
                        //     console.log(querysetsFromBackJson)
                        //     // console.log(querysetsFromBackJson[0]["fields"])
                        //     for (let i = 0; i < querysetsFromBackJson.length; i ++) {
                        //         let newRow = massTable.insertRow();
                        //         let newCellFi = newRow.insertCell();
                        //         let textFi = document.createTextNode(`${querysetsFromBackJson[i]["fields"]["competitor"][0]} ${querysetsFromBackJson[i]["fields"]["competitor"][1]}`);
                        //         newCellFi.appendChild(textFi);
                        //         let newCellWeight = newRow.insertCell();
                        //         let textWeight = document.createTextNode(querysetsFromBackJson[i]["fields"]["competitor_weight"]);
                        //         newCellWeight.appendChild(textWeight);
                        //         let compSTypes = querysetsFromBackJson[i]["fields"]["competitor"][2];
                        //         if (compSTypes.includes("Троеборье классическое") || compSTypes.includes("Жим лёжа (без экип.)")) {
                        //             let newCellsquatRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"] === null) {
                        //                 let textsquatRes1 = document.createTextNode("");
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //             } else {
                        //                 let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res"]);
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "1") {
                        //                         newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off"] === "3") {
                        //                         newCellsquatRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"] === null) {
                        //                 let textsquatRes2 = document.createTextNode("");
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //             } else {
                        //                 let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res"]);
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "1") {
                        //                         newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off"] === "3") {
                        //                         newCellsquatRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"] === null) {
                        //                 let textsquatRes3 = document.createTextNode("");
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //             } else {
                        //                 let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res"]);
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "1") {
                        //                         newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off"] === "3") {
                        //                         newCellsquatRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"] === null) {
                        //                 let textbpRes1 = document.createTextNode("");
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //             } else {
                        //                 let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res"]);
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "1") {
                        //                         newCellbpRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off"] === "3") {
                        //                         newCellbpRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"] === null) {
                        //                 let textbpRes2 = document.createTextNode("");
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //             } else {
                        //                 let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res"]);
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "1") {
                        //                         newCellbpRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off"] === "3") {
                        //                         newCellbpRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"] === null) {
                        //                 let textbpRes3 = document.createTextNode("");
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //             } else {
                        //                 let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res"]);
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "1") {
                        //                         newCellbpRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off"] === "3") {
                        //                         newCellbpRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"] === null) {
                        //                 let textdlRes1 = document.createTextNode("");
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //             } else {
                        //                 let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res"]);
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "1") {
                        //                         newCelldlRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off"] === "3") {
                        //                         newCelldlRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"] === null) {
                        //                 let textdlRes2 = document.createTextNode("");
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //             } else {
                        //                 let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res"]);
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "1") {
                        //                         newCelldlRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off"] === "3") {
                        //                         newCelldlRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"] === null) {
                        //                 let textdlRes3 = document.createTextNode("");
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //             } else {
                        //                 let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res"]);
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "1") {
                        //                         newCelldlRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off"] === "3") {
                        //                         newCelldlRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellitSquat = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_squat_res"] === null) {
                        //                 let textitSquat = document.createTextNode("");
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             } else {
                        //                 let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res"]);
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             }
                        //             let newCellitBp = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_bpress_res"] === null) {
                        //                 let textitBp = document.createTextNode("");
                        //                 newCellitBp.appendChild(textitBp);
                        //             } else {
                        //                 let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res"]);
                        //                 newCellitBp.appendChild(textitBp);
                        //             }
                        //             let newCellititDl = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_dlift_res"] === null) {
                        //                 let textitDl = document.createTextNode("");
                        //                 newCellititDl.appendChild(textitDl);
                        //             } else {
                        //                 let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res"]);
                        //                 newCellititDl.appendChild(textitDl);
                        //             }
                        //             let newCellIt = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_sum_res"] === null) {
                        //                 let textIt = document.createTextNode("");
                        //                 newCellIt.appendChild(textIt);
                        //             } else {
                        //                 let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res"]);
                        //                 newCellIt.appendChild(textIt);
                        //             }
                        //         } else {
                        //             let newCellsquatRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"] === null) {
                        //                 let textsquatRes1 = document.createTextNode("");
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //             } else {
                        //                 let textsquatRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_squat_res_ek"]);
                        //                 newCellsquatRes1.appendChild(textsquatRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "1") {
                        //                         newCellsquatRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_squat_off_ek"] === "3") {
                        //                         newCellsquatRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"] === null) {
                        //                 let textsquatRes2 = document.createTextNode("");
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //             } else {
                        //                 let textsquatRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_squat_res_ek"]);
                        //                 newCellsquatRes2.appendChild(textsquatRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "1") {
                        //                         newCellsquatRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_squat_off_ek"] === "3") {
                        //                         newCellsquatRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellsquatRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"] === null) {
                        //                 let textsquatRes3 = document.createTextNode("");
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //             } else {
                        //                 let textsquatRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_squat_res_ek"]);
                        //                 newCellsquatRes3.appendChild(textsquatRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "1") {
                        //                         newCellsquatRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_squat_off_ek"] === "3") {
                        //                         newCellsquatRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"] === null) {
                        //                 let textbpRes1 = document.createTextNode("");
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //             } else {
                        //                 let textbpRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_bpress_res_ek"]);
                        //                 newCellbpRes1.appendChild(textbpRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "1") {
                        //                         newCellbpRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_bpress_off_ek"] === "3") {
                        //                         newCellbpRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"] === null) {
                        //                 let textbpRes2 = document.createTextNode("");
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //             } else {
                        //                 let textbpRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_bpress_res_ek"]);
                        //                 newCellbpRes2.appendChild(textbpRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "1") {
                        //                         newCellbpRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_bpress_off_ek"] === "3") {
                        //                         newCellbpRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellbpRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"] === null) {
                        //                 let textbpRes3 = document.createTextNode("");
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //             } else {
                        //                 let textbpRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_bpress_res_ek"]);
                        //                 newCellbpRes3.appendChild(textbpRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "1") {
                        //                         newCellbpRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_bpress_off_ek"] === "3") {
                        //                         newCellbpRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes1 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"] === null) {
                        //                 let textdlRes1 = document.createTextNode("");
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //             } else {
                        //                 let textdlRes1 = document.createTextNode(querysetsFromBackJson[i]["fields"]["first_attempt_dlift_res_ek"]);
                        //                 newCelldlRes1.appendChild(textdlRes1);
                        //                 if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "1") {
                        //                         newCelldlRes1.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["first_attempt_dlift_off_ek"] === "3") {
                        //                         newCelldlRes1.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes2 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"] === null) {
                        //                 let textdlRes2 = document.createTextNode("");
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //             } else {
                        //                 let textdlRes2 = document.createTextNode(querysetsFromBackJson[i]["fields"]["second_attempt_dlift_res_ek"]);
                        //                 newCelldlRes2.appendChild(textdlRes2);
                        //                 if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "1") {
                        //                         newCelldlRes2.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["second_attempt_dlift_off_ek"] === "3") {
                        //                         newCelldlRes2.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCelldlRes3 = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"] === null) {
                        //                 let textdlRes3 = document.createTextNode("");
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //             } else {
                        //                 let textdlRes3 = document.createTextNode(querysetsFromBackJson[i]["fields"]["third_attempt_dlift_res_ek"]);
                        //                 newCelldlRes3.appendChild(textdlRes3);
                        //                 if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] !== null) {
                        //                     if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "0" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "1") {
                        //                         newCelldlRes3.style.backgroundColor = "#ffa0a0";
                        //                     } else if (querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "2" || querysetsFromBackJson[i]["fields"]["third_attempt_dlift_off_ek"] === "3") {
                        //                         newCelldlRes3.style.backgroundColor = "#aaffaa";
                        //                     }
                        //                 }
                        //             }
                        //             let newCellitSquat = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_squat_res_ek"] === null) {
                        //                 let textitSquat = document.createTextNode("");
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             } else {
                        //                 let textitSquat = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_squat_res_ek"]);
                        //                 newCellitSquat.appendChild(textitSquat);
                        //             }
                        //             let newCellitBp = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"] === null) {
                        //                 let textitBp = document.createTextNode("");
                        //                 newCellitBp.appendChild(textitBp);
                        //             } else {
                        //                 let textitBp = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_bpress_res_ek"]);
                        //                 newCellitBp.appendChild(textitBp);
                        //             }
                        //             let newCellititDl = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"] === null) {
                        //                 let textitDl = document.createTextNode("");
                        //                 newCellititDl.appendChild(textitDl);
                        //             } else {
                        //                 let textitDl = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_dlift_res_ek"]);
                        //                 newCellititDl.appendChild(textitDl);
                        //             }
                        //             let newCellIt = newRow.insertCell();
                        //             if (querysetsFromBackJson[i]["fields"]["best_sum_res_ek"] === null) {
                        //                 let textIt = document.createTextNode("");
                        //                 newCellIt.appendChild(textIt);
                        //             } else {
                        //                 let textIt = document.createTextNode(querysetsFromBackJson[i]["fields"]["best_sum_res_ek"]);
                        //                 newCellIt.appendChild(textIt);
                        //             }
                        //         }
                        //     }
                        // }
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
        // setInterval(getScoreComp, 5000);
        setInterval(getScoreComp, 2000);
    }

    let searchParticipantBtn = document.getElementById('register_part_page-search_btn');
    let participantsAllText = document.getElementById('register_part_page-participants_cnt');
    let competitorsAllText = document.getElementById('register_part_page-competitors_cnt');
    if (searchParticipantBtn) {
        searchParticipantBtn.addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            let method = 'post';
            let endpoint = window.location.pathname;
            let token = document.querySelector('[name="csrfmiddlewaretoken"]').value;
            let searchData = document.querySelector('.register_part_page-search').value;
            let sendData = 'search=yes&searchval=' + encodeURIComponent(searchData);
            let xhr = new XMLHttpRequest();
            let mainBlock = document.querySelector('.register_part_page-participants_block');
            let partSlug = document.getElementById('comp_name').value;
            xhr.open(method, endpoint, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.send(sendData);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let answer = JSON.parse(xhr.response).answer;
                    document.querySelector('.register_part_page-search').value = '';
                    while (mainBlock.firstChild) {
                        mainBlock.removeChild(mainBlock.firstChild);
                    }
                    if (answer.length > 0) {
                        for (let i=0; i < answer.length; i ++) {
                            let aPart = document.createElement('a');
                            aPart.classList.add('register_part_page-participant_block');
                            aPart.setAttribute('target', '_blank');
                            aPart.setAttribute('href', '/competitions/' + partSlug + '/' + answer[i]['id'] + '/register_participant/');
                            let pPart = document.createElement('p');
                            pPart.textContent = answer[i]['surname_comp'] + ' ' + answer[i]['name_comp'] + ' ' + answer[i]['patronymic_comp'] + ' ' + new Date(answer[i]['birthday']).toLocaleString().split(',')[0];
                            aPart.append(pPart);
                            mainBlock.append(aPart);
                        }
                    }
                    participantsAllText.textContent = JSON.parse(xhr.response).cur_participants_cnt;
                    competitorsAllText.textContent = JSON.parse(xhr.response).cur_compprotocols_cnt;
                }
                xhr.onerror = function () {
                    console.log(xhr.responseText);
                };
            }
        });
        let selectGender = document.getElementById('register_part_page-filter_block-gen');
        let selectMain = document.getElementById('register_part_page-filter_block-wcat');
        let selectMale = document.getElementById('register_part_page-filter_block-wcat-male');
        let selectFemale = document.getElementById('register_part_page-filter_block-wcat-female');
        let searchClearBtn = document.getElementById('register_part_page-search_cls');
        searchClearBtn.addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            let method = 'post';
            let endpoint = window.location.pathname;
            let token = document.querySelector('[name="csrfmiddlewaretoken"]').value;
            let sendData = 'searchstop=yes';
            let xhr = new XMLHttpRequest();
            let mainBlock = document.querySelector('.register_part_page-participants_block');
            let partSlug = document.getElementById('comp_name').value;
            xhr.open(method, endpoint, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.send(sendData);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let answer = JSON.parse(xhr.response).answer;
                    document.querySelector('.register_part_page-search').value = '';
                    while (mainBlock.firstChild) {
                        mainBlock.removeChild(mainBlock.firstChild);
                    }
                    if (answer.length > 0) {
                        for (let i=0; i < answer.length; i ++) {
                            let aPart = document.createElement('a');
                            aPart.classList.add('register_part_page-participant_block');
                            aPart.setAttribute('target', '_blank');
                            aPart.setAttribute('href', '/competitions/' + partSlug + '/' + answer[i]['id'] + '/register_participant/');
                            let pPart = document.createElement('p');
                            pPart.textContent = answer[i]['surname_comp'] + ' ' + answer[i]['name_comp'] + ' ' + answer[i]['patronymic_comp'] + ' ' + new Date(answer[i]['birthday']).toLocaleString().split(',')[0];
                            aPart.append(pPart);
                            mainBlock.append(aPart);
                        }
                    }
                    participantsAllText.textContent = JSON.parse(xhr.response).cur_participants_cnt;
                    competitorsAllText.textContent = JSON.parse(xhr.response).cur_compprotocols_cnt;
                    selectMain.style.display = 'block';
                    selectGender.value = 'change_gen';
                    selectFemale.value = 'change_cat';
                    selectMale.value = 'change_cat';
                    selectFemale.style.display = 'none';
                    selectMale.style.display = 'none';
                }
                xhr.onerror = function () {
                    console.log(xhr.responseText);
                };
            }
        });
        let goShowFiltered = document.getElementById('register_part_page-filter_block-btn');
        selectGender.addEventListener('change', function (e) {
            if (selectGender.value === 'male') {
                selectMain.style.display = 'none';
                selectFemale.style.display = 'none';
                selectMale.style.display = 'block';
            }
            if (selectGender.value === 'female') {
                selectMain.style.display = 'none';
                selectMale.style.display = 'none';
                selectFemale.style.display = 'block';
            }
            if (selectGender.value === 'change_gen') {
                selectMain.style.display = 'block';
                selectMale.style.display = 'none';
                selectFemale.style.display = 'none';
            }
        });
        goShowFiltered.addEventListener('click', function (e) {
            e.stopImmediatePropagation();
            if (selectGender.value !== 'change_gen') {
                let genSelected = selectGender.value;
                let wcatSelected = '';
                if (getComputedStyle(selectMale).display === 'block') {
                    wcatSelected = selectMale.value;
                }
                if (getComputedStyle(selectFemale).display === 'block') {
                    wcatSelected = selectFemale.value;
                }
                let method = 'post';
                let endpoint = window.location.pathname;
                let token = document.querySelector('[name="csrfmiddlewaretoken"]').value;
                let sendData = 'filtershow=yes&gen=' + encodeURIComponent(genSelected) + '&wcat=' + encodeURIComponent(wcatSelected);
                let xhr = new XMLHttpRequest();
                let mainBlock = document.querySelector('.register_part_page-participants_block');
                let partSlug = document.getElementById('comp_name').value;
                xhr.open(method, endpoint, true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-CSRFToken', token);
                xhr.send(sendData);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        let answer = JSON.parse(xhr.response).answer;
                        while (mainBlock.firstChild) {
                            mainBlock.removeChild(mainBlock.firstChild);
                        }
                        if (answer.length > 0) {
                            for (let i=0; i < answer.length; i ++) {
                                let aPart = document.createElement('a');
                                aPart.classList.add('register_part_page-participant_block');
                                aPart.setAttribute('target', '_blank');
                                aPart.setAttribute('href', '/competitions/' + partSlug + '/' + answer[i]['id'] + '/register_participant/');
                                let pPart = document.createElement('p');
                                pPart.textContent = answer[i]['surname_comp'] + ' ' + answer[i]['name_comp'] + ' ' + answer[i]['patronymic_comp'] + ' ' + new Date(answer[i]['birthday']).toLocaleString().split(',')[0];
                                aPart.append(pPart);
                                mainBlock.append(aPart);
                            }
                        }
                        participantsAllText.textContent = JSON.parse(xhr.response).cur_participants_cnt;
                        competitorsAllText.textContent = JSON.parse(xhr.response).cur_compprotocols_cnt;
                    }
                    xhr.onerror = function () {
                        console.log(xhr.responseText);
                    };
                }
            }
        });
    }
    let delParticipantBtn = document.getElementById('competition_registry-form_del');
    if (delParticipantBtn) {
        let modal = document.getElementById('reg-participant-modal_aus');
        let modalY = document.getElementById('reg-participant-modal_aus_yes');
        let modalN = document.getElementById('reg-participant-modal_aus_no');
        let modalClose = document.getElementById('reg-participant-modal_aus_close');
        let modalText = document.getElementById('reg-participant-modal_aus-text');
        delParticipantBtn.addEventListener('click', function (e) {
            modalText.textContent = 'Вы уверены?';
            modal.style.display = 'flex';
            window.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            }
            modalN.onclick = function() {
                modal.style.display = "none";
            }
            modalClose.onclick = function() {
                modal.style.display = "none";
            }
            modalY.onclick = function() {
                let method = 'post';
                let endpoint = window.location.pathname;
                let token = document.querySelector('[name="csrfmiddlewaretoken"]').value;
                let sendData = 'delpart=yes';
                let xhr = new XMLHttpRequest();
                let partSlug = document.getElementById('comp_name').value;
                xhr.open(method, endpoint, true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-CSRFToken', token);
                xhr.send(sendData);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        window.location.href = '/competitions/' + partSlug + '/register_participants/';
                    }
                    xhr.onerror = function () {
                        console.log(xhr.responseText);
                    };
                }
            }
        });
    }
    let saveCurFlowBtn = document.getElementById('register_part_page-cur-flow-btn');
    if (saveCurFlowBtn) {
        saveCurFlowBtn.addEventListener('click', function (e) {
            let setFlow = document.getElementById('competition_registry-cur-flow').value;
            let method = 'post';
            let endpoint = window.location.pathname;
            let token = document.querySelector('[name="csrfmiddlewaretoken"]').value;
            let sendData = 'setflow=' + encodeURIComponent(setFlow);
            let xhr = new XMLHttpRequest();
            xhr.open(method, endpoint, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('X-CSRFToken', token);
            xhr.send(sendData);
            xhr.onload = function () {
                // if (xhr.status === 200) {
                //     window.location.href = '/competitions/' + partSlug + '/register_participants/';
                // }
                xhr.onerror = function () {
                    console.log(xhr.responseText);
                };
            }
        });
    }

});
