{
  // Создаём функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].
  function createNumbersArray(count) {
    const array = [];

    for (let i = 1; i <= (count * count) / 2; i++) {
      array.push(i, i);
    }
    return array;
  }

  // Создаём функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
  function shuffle(arr) {
    let length = arr.length;
    let a = null;
    let b = null;

    while (length) {
      b = Math.floor(Math.random() * length--);
      a = arr[length];
      arr[length] = arr[b];
      arr[b] = a;
    }
    return arr;
  }

  // Используем две созданные функции для создания массива с перемешанными номерами. На основе этого массива создаём DOM-элементы карточек.
  // У каждой карточки будет свой номер из массива произвольных чисел. count - количество пар.
  function createCards(count) {
    // Вызываем две функции и присваиваем их в переменные
    // initialArray - начальный, парный массив, shuffleArray - перемешанный предыдущий массив
    const initialArray = createNumbersArray(count);
    const shuffleArray = shuffle(initialArray);

    // Создаём DOM элементы
    const container = document.createElement("div");
    const cardWrapper = document.createElement("div");

    // Кнопка повторного запуска игры
    const button = document.createElement("button");
    button.textContent = "Play again";

    // Этот блок нужен для того, чтобы пользователь не мог нажимать на кнопки пока не пройдет setTimeout
    const transparent = document.createElement("div");

    // Массив в который помещаются все созданные карточки для присваивания им атрибутов data-card в дальнейшем
    // Этот массив мы получаем из функции через return, чтобы иметь доступ к карточкам, для отслеживания нажатий
    let cardsArray = [];

    // Внешний цикл создает cardStack - количество горизонтальных строк в поле (для игры 4 x 4, будет 4 строки по 4 карточки в каждом cardStack), выполняется cout раз
    for (let i = 0; i < count; i++) {
      const cardStack = document.createElement("div");
      cardStack.classList.add("card-stack");

      // После того как создан один cardStack, запускается цикл помещающий count карточек в один cardStack (в одну строку)
      for (let i = 0; i < count; i++) {
        // Присваивание значения переменной card
        const card = document.createElement("div");
        card.classList.add("card");

        // Проверка count и применение соответствующих стилей в зависимости от количества карточек
        switch (count) {
          case 2:
            card.classList.add("card-two");
            button.classList.add("button--exception");
            break;
          case 4:
            card.classList.add("card-four");
            break;
          case 6:
            card.classList.add("card-six");
            break;
          case 8:
            card.classList.add("card-eight");
            break;
          case 10:
            card.classList.add("card-ten");
            break;
        }
        // Добавляем div карты в массив cardsArray
        cardsArray.push(card);

        // Каждую итерацию цикла одна карточка помещается в cardStack
        cardStack.append(card);
      }

      // Заполненная карточками строка, cardStack, помещается в cardWrapper - общую обёртку для всех карточек
      cardWrapper.append(cardStack);
    }

    // Цикл присваивающий каждой карточке из shuffleArray атрибуты data-card и id
    // data-card = цифре на карточке, id = от 0 до конца массива по порядку (0, 1, 2...)
    for (let i = 0; i < shuffleArray.length; i++) {
      cardsArray[i].setAttribute("data-card", shuffleArray[i]);
      cardsArray[i].setAttribute("id", i);
      cardsArray[i].textContent = shuffleArray[i];
    }

    document.body.classList.add("body");
    container.classList.add("container");
    cardWrapper.classList.add("card-wrapper");
    button.classList.add("button");
    transparent.classList.add("transparent");

    document.body.append(container);
    container.append(cardWrapper);
    container.append(button);
    document.body.append(transparent);

    return {
      container,
      cardsArray,
      cardWrapper,
      transparent,
      button,
    };
  }

  // Функция запускающая игру, сначала создаются карточки, затем отслеживается нажатие на них и присваиваются соответствующие стили
  function startGame(count) {
    const cardsCreate = createCards(count);
    // Создаем массив, который будем использовать для сверки data-card двух нажатых карточек
    let cardsComparison = [];

    // Циклом forEach проходимся по всем карточкам из массива cardsArray и отслеживаем клики
    cardsCreate.cardsArray.forEach((element) => {
      element.addEventListener("click", (e) => {
        const target = e.currentTarget;

        // Записываем в переменную значение id нажатой карточки
        const currentId = target.getAttribute("id");

        // Нажатой карточке присваиваем стиль с жёлтой подсветкой
        target.classList.add("card--wait");

        // Пуш карты в массив cardsComparison
        cardsComparison.push(target);

        // Если в массиве 2 карточки (если пользователь нажал на две карточки), записываем атрибуты двух этих карточек в переменные, так же записываем в переменную id первой карточки, чтобы использовать ее для сравнения со второй и добавляем класс блоку transparent, чтобы блокировать лишние нажатия
        if (cardsComparison.length === 2) {
          cardsCreate.transparent.classList.add("transparent--active");
          const firstCard = cardsComparison[0].getAttribute("data-card");
          const firstCardId = cardsComparison[0].getAttribute("id");
          const secondCard = cardsComparison[1].getAttribute("data-card");

          // Если атрибуты data-card у обоих карточек равны, то удаляем стили с жёлтой подсветкой и добавляем стили с зеленой, в конце очищаем массив cardsComparison и удаляем блок transparent
          if (firstCard === secondCard && firstCardId !== currentId) {
            cardsComparison[0].classList.remove("card--wait");
            cardsComparison[1].classList.remove("card--wait");
            cardsComparison[0].classList.add("card--true");
            cardsComparison[1].classList.add("card--true");
            cardsComparison = [];
            cardsCreate.transparent.classList.remove("transparent--active");
            // Если атрибуты data-card не равны, удаляем стили с жёлтой подсветкой и добавляем стили с красной подсветкой, но только на 0.5с, что бы пользователь успел ознакомиться с неправильной картой, в конце очищаем массив cardsComparison и удаляем блок transparent
          } else {
            cardsComparison[0].classList.remove("card--wait");
            cardsComparison[1].classList.remove("card--wait");
            cardsComparison[0].classList.add("card--false");
            cardsComparison[1].classList.add("card--false");
            setTimeout(() => {
              cardsComparison[0].classList.remove("card--false");
              cardsComparison[1].classList.remove("card--false");
              cardsComparison = [];
              cardsCreate.transparent.classList.remove("transparent--active");
            }, 300);
          }
        }
      });
    });

    // Переменная зписывающая в себя все карточки с классом card--true - открытые карточки
    const findTrueCards = cardsCreate.cardWrapper.getElementsByClassName("card--true");

    // Цикл определяющий что пользователь собрал все пары карточек и закончил игру
    // Если длина массива findTrueCards === длине массива cardsArray - всего созданных карточек, то сбросить очистить все что было в body и вызвать функцию создания игры еще раз по нажатию кнопки "сыграть ещё раз"
    cardsCreate.cardsArray.forEach((element) => {
      element.addEventListener("click", () => {
        if (findTrueCards.length === cardsCreate.cardsArray.length) {
          // Активирую анимацию подсветки
          cardsCreate.transparent.classList.add("transparent--active");
          cardsCreate.button.classList.add("button--active");
          cardsCreate.cardWrapper.classList.add("card-wrapper--pulse");

          cardsCreate.button.addEventListener("click", () => {
            cardsCreate.transparent.classList.remove("transparent--active");
            cardsCreate.button.classList.remove("button--active");
            cardsCreate.cardsArray = [];
            cardsCreate.container.remove();
            cardsCreate.transparent.remove();
            startGame(count);
          });
        }
      });
    });
  }

  // Вызов функции создания игры после загрузки DOM
  document.addEventListener("DOMContentLoaded", () => {
    const count = localStorage.getItem("count");
    startGame(count);
  });
}
