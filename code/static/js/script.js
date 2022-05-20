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
    let screenWidth = window.innerWidth;
    let competitorsTable = document.querySelectorAll('.competitors_list_table-tbody');
    if (competitorsTable) {
        if (screenWidth > 1000) {
            for (let i = 0; i < competitorsTable.length; i ++) {
                competitorsTable[i].style.marginLeft = ((screenWidth - Number(getComputedStyle(competitorsTable[i]).width.split('p')[0])) / 2) - 40 + 'px';
            }
        }
    }

});
