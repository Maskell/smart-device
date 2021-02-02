(function () {
  const headerButton = document.querySelector(
    ".page-header__contacts-item--call-back a"
  );
  const popup = document.querySelector(".popup");
  const closeButton = popup.querySelector(".popup__button--close");
  const form = popup.querySelector(".popup__form");
  const userName = popup.querySelector("#popup-user-name");
  const phone = popup.querySelector("#popup-user-phone-number");
  const message = popup.querySelector("#popup-user-question");
  let isStorageSupport = true;
  const storage = {};

  const openPopup = () => {
    popup.classList.add("popup--show");
    document.body.classList.add("overlay");
  };

  const closePopup = () => {
    popup.classList.remove("popup--show");
    document.body.classList.remove("overlay");
  };

  try {
    storage.name = localStorage.getItem("name");
    storage.phone = localStorage.getItem("phone");
    storage.message = localStorage.getItem("message");
  } catch (err) {
    isStorageSupport = false;
  }

  headerButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    openPopup();

    if (storage.name) {
      userName.value = storage.name;
      phone.value = storage.phone;
      message.value = storage.message;
      message.focus();
    } else {
      userName.focus();
    }
  });

  closeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    closePopup();
  });

  form.addEventListener("submit", () => {
    if (isStorageSupport) {
      localStorage.setItem("name", userName.value);
      localStorage.setItem("phone", phone.value);
      localStorage.setItem("message", message.value);
    }
  });

  window.addEventListener("keydown", (evt) => {
    if (evt.code === "Escape") {
      evt.preventDefault();
      if (popup.classList.contains("popup--show")) {
        closePopup();
      }
    }
  });

  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup();
    }
  });
})();

(function () {
  const footerSection = document.querySelector(".page-footer__wrapper");

  const sitemapSection = footerSection.querySelector(
    ".page-footer__sitemap-wrapper"
  );
  const sitemapList = sitemapSection.querySelector(
    ".page-footer__list--sitemap"
  );
  const contactsSection = footerSection.querySelector(
    ".page-footer__contacts-wrapper"
  );
  const contactsList = contactsSection.querySelector(
    ".page-footer__list--contacts"
  );
  const sitemapButton = sitemapSection.querySelector(
    ".page-footer__accordeon-button"
  );
  const contactsButton = contactsSection.querySelector(
    ".page-footer__accordeon-button"
  );

  const setInitialState = () => {
    sitemapButton.classList.add("page-footer__accordeon-button--js-shown");
    contactsButton.classList.add(
      "page-footer__accordeon-button--js-shown",
      "page-footer__accordeon-button--js-collapse"
    );
    sitemapList.classList.add("page-footer__list--js-hidden");
  };
  const toggleSitemapSection = () => {
    sitemapList.classList.toggle("page-footer__list--js-hidden");
    sitemapButton.classList.toggle(
      "page-footer__accordeon-button--js-collapse"
    );
  };
  const toggleContactsSection = () => {
    contactsList.classList.toggle("page-footer__list--js-hidden");
    contactsButton.classList.toggle(
      "page-footer__accordeon-button--js-collapse"
    );
  };

  setInitialState();
  sitemapButton.addEventListener("click", toggleSitemapSection);
  contactsButton.addEventListener("click", toggleContactsSection);
})();
