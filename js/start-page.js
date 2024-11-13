{
  // Функция создающая стартовое меню
  function createStartMenu() {
    const startContainer = document.createElement("div");
    const startWrapper = document.createElement("div");
    const form = document.createElement("form");
    const description = document.createElement("p");
    const descrNumbers = document.createElement("p");
    const input = document.createElement("input");
    const button = document.createElement("button");

    description.textContent = "Cards amount by vertical and horizontal";
    descrNumbers.textContent = "Available amount: 2, 4, 6, 8, 10";
    input.setAttribute("type", "number");
    input.setAttribute("placeholder", "Write a number");
    button.disabled = true;
    button.textContent = "Start the game";

    document.body.classList.add("body");
    startContainer.classList.add("start__container");
    startWrapper.classList.add("start__wrapper");
    description.classList.add("start__description");
    descrNumbers.classList.add("start__description-numbers");
    form.classList.add("start__form");
    input.classList.add("start__input");
    button.classList.add("start__button");

    document.body.append(startContainer);
    startContainer.append(startWrapper);
    startWrapper.append(description);
    startWrapper.append(descrNumbers);
    startWrapper.append(form);
    form.append(input);
    form.append(button);

    return {
      form,
      input,
      button,
    };
  }

  // Функция обрабатывающая вводимое пользователем число и помещающая его в localStorage
  function createAndGetCount() {
    const createMenu = createStartMenu();

    // Если пользователь что-то вводит - кнопка active
    createMenu.input.addEventListener("input", () => {
      createMenu.button.disabled = false;
      createMenu.button.classList.add("start__button--active");
    });

    // Если пользователь снял фокус с input - кнопка disabled
    createMenu.input.addEventListener("blur", (event) => {
      if (createMenu.input.value.length === 0 && event.target) {
        createMenu.button.disabled = true;
        createMenu.button.classList.remove("start__button--active");
      }
    });

    // Отслеживаем нажатие на кнопку "Начать игру" или Enter
    createMenu.form.addEventListener("submit", (event) => {
      // Отменяет стандартное действие браузера, в данном случае, перезагрузку страницы
      event.preventDefault();

      // Если пользователь ничего не ввел, завершаем функцию
      if (!createMenu.input.value) {
        return;
      }

      // Если пользователь что-то ввел, записываем значение в переменную, проверяем что это число является допустимым и помещаем его в localStorage
      const count = +createMenu.input.value;

      switch (count) {
        case 2:
        case 4:
        case 6:
        case 8:
        case 10:
          localStorage.removeItem("count");
          localStorage.setItem("count", count);
          createMenu.input.value = "";
          document.location = "pairs.html";
          break;
        default:
          localStorage.removeItem("count");
          localStorage.setItem("count", 4);
          createMenu.input.value = "";
          document.location = "pairs.html";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createAndGetCount();
  });
}
