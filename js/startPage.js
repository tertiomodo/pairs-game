{
  // Функция создающая стартовое меню
  function createStartMenu() {
    const startSection = document.createElement("div");
    const startContainer = document.createElement("div");
    const startWrapper = document.createElement("div");
    const form = document.createElement("form");
    const description = document.createElement("p");
    const levelName = document.createElement("p");
    const levelRangeWrapper = document.createElement("div");
    const levelRange = document.createElement("input");
    const stopPointsWrapper = document.createElement("div");
    const pointsArray = new Array(5).fill(null).map(() => document.createElement("div"));
    const button = document.createElement("button");

    description.textContent = "Choose the level";
    levelName.textContent = "Easy";
    levelRange.setAttribute("type", "range");
    levelRange.setAttribute("min", "1");
    levelRange.setAttribute("max", "5");
    levelRange.setAttribute("step", "1");
    levelRange.setAttribute("value", "1");
    levelRange.setAttribute("data-lvl", "1");
    button.textContent = "Start the game";

    document.body.classList.add("body");
    startSection.classList.add("start");
    startContainer.classList.add("start__container");
    startWrapper.classList.add("start__wrapper");
    description.classList.add("start__description");
    levelName.classList.add("start__description");
    form.classList.add("start__form");
    levelRangeWrapper.classList.add("start__range-wrapper");
    levelRange.classList.add("start__range");
    stopPointsWrapper.classList.add("start__stop-points-wrapper");
    button.classList.add("start__button");

    document.body.append(startSection);
    startSection.append(startContainer);
    startContainer.append(startWrapper);
    startWrapper.append(description);
    startWrapper.append(levelName);
    startWrapper.append(form);
    pointsArray.forEach((point) => {
      point.classList.add("start__stop-point");
      stopPointsWrapper.append(point);
    });
    levelRangeWrapper.append(levelRange);
    levelRangeWrapper.append(stopPointsWrapper);
    form.append(levelRangeWrapper);
    form.append(button);

    return {
      form,
      levelName,
      levelRange,
    };
  }

  // Функция обрабатывающая вводимое пользователем число и помещающая его в localStorage
  function createAndGetCount() {
    const createMenu = createStartMenu();

    createMenu.levelRange.addEventListener("input", () => {
      const level = Number(createMenu.levelRange.value);
      const levelNames = ["Easy", "Normal", "Hard", "Extreme", "Legendary"];
      createMenu.levelName.textContent = levelNames[level - 1];
      createMenu.levelRange.dataset.lvl = level;
    });

    // Отслеживаем нажатие на кнопку "Start the game" или Enter
    createMenu.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const count = Number(createMenu.levelRange.value);
      localStorage.removeItem("count");
      localStorage.setItem("count", count * 2);
      document.location = "pairs.html";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    createAndGetCount();
  });
}
