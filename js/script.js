document.addEventListener("DOMContentLoaded", () => {

  // Top menu item set active
  const topMenuItemLink = document.querySelectorAll('.top-menu .menu-item__link');

  if (typeof(topMenuItemActive) != "undefined" && topMenuItemActive !== null) {
    topMenuItemLink[topMenuItemActive].classList.add('active');
  }

  // News Swiper slider
  const newsSlider = document.querySelector('.news-slider');

  if (newsSlider) {
    const slider = new Swiper('.news-slider', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 15,
      autoplay: false,
    });
  }

  // Events Swiper slider
  const eventsSlider = document.querySelector('.events-slider');

  if (eventsSlider) {
    const slider = new Swiper('.events-slider', {
      loop: true,
      slidesPerView: 'auto',
      spaceBetween: 15,
      autoplay: false,
    });
  }


  // Current year
  const now = new Date();
  const year = now.getFullYear();

  const currentYear = document.getElementById('current-year');
  currentYear.innerText = year;


  // Mobile menu
  const body = document.querySelector('body');
  const burgerMenuWrapper = document.querySelector('.burger-menu-wrapper');
  const mobileMenu = document.querySelector('.mobile-menu');

  function openMobileMenu() {
    body.classList.add('overflow-hidden');
    mobileMenu.classList.add('active');
    burgerMenuWrapper.classList.add('menu-is-open');
  }

  function closeMobileMenu() {
    body.classList.remove('overflow-hidden');
    burgerMenuWrapper.classList.remove('menu-is-open');
    mobileMenu.classList.remove('active');
  }

  burgerMenuWrapper.onclick = function() {
    if (burgerMenuWrapper.classList.contains('menu-is-open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  const listParentClick = document.querySelectorAll('.mobile-menu li.menu-item a');

  for (let i=0; i < listParentClick.length; i++) {
    listParentClick[i].onclick = function (event) {
      event.preventDefault();
      closeMobileMenu();
      let hrefClick = this.href;
      setTimeout(function() {
        location.href = hrefClick
      }, 500);
    }
  }


  // Окна
  const modalWindows = document.querySelectorAll('.modal-window');
  const callbackFormBtns = document.querySelectorAll('.callback-form-btn');
  const callbackModal = document.querySelector('#callback-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-window .modal-close');

  callbackFormBtns.forEach((item) => {
    item.onclick = function () {
      modalWindowOpen(callbackModal);
    }
  });
  
  function modalWindowOpen(win) {
    // Открытие окна
    body.classList.add('overflow-hidden');
    win.classList.add('active');
    setTimeout(function(){
      win.childNodes[1].classList.add('active');
    }, 200);
  }

  for (let i=0; i < modalCloseBtns.length; i++) {
    modalCloseBtns[i].onclick = function() {
      modalWindowClose(modalWindows[i]);
    }
  }

  for (let i = 0; i < modalWindows.length; i++) {
    modalWindows[i].onclick = function(event) {
      let classList = event.target.classList;
      for (let j = 0; j < classList.length; j++) {
        if (classList[j] == "modal" || classList[j] == "modal-wrapper" || classList[j] == "modal-window") {
          modalWindowClose(modalWindows[i])
        }
      }
    }
  }

  function modalWindowClose(win) {
    body.classList.remove('overflow-hidden');
    win.childNodes[1].classList.remove('active');
    setTimeout(() => {
      win.classList.remove('active');
    }, 300);
  }


  // Input phone mask
  function inputPhoneMask() {
    const elementPhone = document.querySelectorAll('.js-input-phone-mask');

    const maskOptionsPhone = {
      mask: '+{7} (000) 000 00 00'
    };

    elementPhone.forEach((item) => {
      const mask = IMask(item, maskOptionsPhone);
    });

    // Маска номера телефона на странице оформления заказа checkout billing billing_phone
    const billingPhone = document.getElementById('billing_phone');

    if (billingPhone) {
      const maskBillingPhone = IMask(billingPhone, maskOptionsPhone);
    }
  }

  inputPhoneMask();


  // Set cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/" + "; sameSite=Lax;";
  }

  function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  function checkCookies() {
    let cookieNote = document.querySelector('#cookie_note');
    let cookieBtnAccept = cookieNote.querySelector('#cookie_accept');

    // Если куки we-use-cookie нет или она просрочена, то показываем уведомление
    if (!getCookie('we-use-cookie')) {
      cookieNote.classList.add('active');
    }

    // При клике на кнопку устанавливаем куку we-use-cookie на один год
    cookieBtnAccept.addEventListener('click', function () {
      setCookie('we-use-cookie', 'true', 365);
      cookieNote.classList.remove('active');
    });
  }

  checkCookies();



  // Показ карты Офис/Склад страница Контакты
  const contactsPage = document.querySelector('.contacts-page');

  if (contactsPage) {

    const mapBtns = document.querySelectorAll('.map-btn');
    const mapItems = document.querySelectorAll('.map-item');

    for (let i = 0; i < mapBtns.length; i++) {
      mapBtns[i].onclick = function() {
        console.log(mapBtns[i]);
        for (let j = 0; j < mapItems.length; j++) {
          mapItems[j].classList.add('hidden');
        }

        mapItems[i].classList.remove('hidden');
      }
    }

  }



});