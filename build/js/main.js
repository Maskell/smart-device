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
