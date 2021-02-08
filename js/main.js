/* eslint-disable func-names */
/* eslint-disable no-undef */
(function () {
  const headerButton = document.querySelector(
    ".page-header__contacts-item--call-back a"
  );
  const popup = document.querySelector(".popup");
  const closeButton = popup.querySelector(".popup__button--close");
  const popupForm = popup.querySelector(".popup__form");
  const popupUserName = popup.querySelector("#popup-user-name");
  const popupPhone = popup.querySelector("#popup-user-phone-number");
  const popupMessage = popup.querySelector("#popup-user-question");

  const formSection = document.querySelector(".form");
  const userName = formSection.querySelector("#user-name");
  const phone = formSection.querySelector("#user-phone-number");
  const message = formSection.querySelector("#user-question");

  const storage = {};
  let isStorageSupport = true;

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
      popupUserName.value = storage.name;
      popupPhone.value = storage.phone;
      popupMessage.value = storage.message;
      popupMessage.focus();
    } else {
      popupUserName.focus();
    }
  });

  closeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    closePopup();
  });

  popupForm.addEventListener("submit", () => {
    if (isStorageSupport) {
      localStorage.setItem("name", popupUserName.value);
      localStorage.setItem("phone", popupPhone.value);
      localStorage.setItem("message", popupMessage.value);
    }
  });

  form.addEventListener("submit", () => {
    if (isStorageSupport) {
      localStorage.setItem("name", userName.value);
      localStorage.setItem("phone", phone.value);
      localStorage.setItem("message", message.value);
    }
  });

  if (storage.name) {
    userName.value = storage.name;
    phone.value = storage.phone;
    message.value = storage.message;
  }

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

  IMask(document.querySelector("#popup-user-phone-number"), {
    mask: "+{7}(000)000-00-00",
  });
  IMask(document.querySelector("#user-phone-number"), {
    mask: "+{7}(000)000-00-00",
  });
})();

(function () {
  const footerSection = document.querySelector(".page-footer__wrapper");
  const accordionSections = footerSection.querySelectorAll(".accordion");

  accordionSections.forEach((section, index) => {
    const button = section.querySelector(".page-footer__accordion-button");

    button.classList.add("page-footer__accordion-button--js");
    section.classList.add("accordion--collapsed");

    if (index === 1) {
      section.classList.remove("accordion--collapsed");
      section.classList.add("accordion--expanded");
    }
  });

  const toggleSections = (evt) => {
    const { target } = evt;

    if (target.tagName === "BUTTON") {
      accordionSections.forEach((section) => {
        if (section.classList.contains("accordion--collapse")) {
          return;
        }
        section.classList.remove("accordion--expanded");
        section.classList.add("accordion--collapsed");
      });

      const currentSection = target.closest("div");

      if (currentSection.classList.contains("accordion--collapsed")) {
        currentSection.classList.remove("accordion--collapsed");
        currentSection.classList.add("accordion--expanded");
      }
    }
  };
  footerSection.addEventListener("click", toggleSections);
})();
