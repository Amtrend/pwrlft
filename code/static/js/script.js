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

});
