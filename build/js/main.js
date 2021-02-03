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

// (function () {

//   const isStorageSupport = true;
//   const storage = {};

//   try {
//     storage.name = localStorage.getItem("name");
//     storage.phone = localStorage.getItem("phone");
//     storage.message = localStorage.getItem("message");
//   } catch (err) {
//     isStorageSupport = false;
//   }

//   if (storage.name) {
//     userName.value = storage.name;
//     phone.value = storage.phone;
//     message.value = storage.message;
//     message.focus();
//   } else {
//     userName.focus();
//   }
// })();

(function () {
  const footerSection = document.querySelector(".page-footer__wrapper");
  const accordeonSections = footerSection.querySelectorAll(".accordeon");
  const expandSection = (sectionIndex) => {
    if (sectionIndex >= 0 && sectionIndex < accordeonSections.length) {
      const section = accordeonSections.item(sectionIndex);
      section
        .querySelector(".page-footer__accordeon-button")
        .classList.add("page-footer__accordeon-button--js-collapse");

      section
        .querySelector(".page-footer__list")
        .classList.remove("page-footer__list--js-hidden");
    }
  };

  accordeonSections.forEach((section) => {
    const accordeonButton = section.querySelector(
      ".page-footer__accordeon-button"
    );
    const accordeonList = section.querySelector(".page-footer__list");
    const toggleSection = () => {
      accordeonButton.classList.toggle(
        "page-footer__accordeon-button--js-collapse"
      );
      accordeonList.classList.toggle("page-footer__list--js-hidden");
    };
    accordeonButton.classList.add("page-footer__accordeon-button--js-shown");
    accordeonList.classList.add("page-footer__list--js-hidden");
    accordeonButton.addEventListener("click", toggleSection);
  });

  expandSection(1);
})();
