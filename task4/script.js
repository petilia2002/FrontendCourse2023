let globalCards = [];

const DB_URL = "http://localhost:3000/items";

function fillCards() {
  const showcase = document.querySelector(".showcase__inner");
  if (globalCards.length != 0) {
    let html = "";
    globalCards.forEach((elem) => {
      html += `<div class="card">
            <div class="card__header">
                <div class="card__id">
                    <p id="card-id">ID: ${elem.code}</p>
                </div>
                <button class="card-edit-btn" onclick="editCard(this)">Редачить</button>
            </div>
            <div class="card__main">
                <div class="card__img-box">
                    <img id="card-url" src="${elem.img}" alt="Крутое фото товара">
                </div>
                <div class="card__title">
                    <h1 id="card-name">${elem.title}</h1>
                </div>
            </div>
            <div class="card__provider">
                <p id="card-provider">${elem.provider}</p>
            </div>
            <div class="card__disc">
                <p id="card-disc">${elem.description}</p>
            </div>
        </div>
            `;
    });
    showcase.innerHTML = html;
  }
}
fillCards();

async function setUpStartCards() {
  globalCards = [];
  const showcase = document.querySelector(".showcase__inner");
  showcase.innerHTML = '<div class="preloader"></div>';

  const response = await fetch(`${DB_URL}`);
  if (!response.ok) return;

  const cardJson = await response.json();
  //console.log(cardJson);

  if (cardJson.length == 0) return;

  cardJson.forEach((elem) => {
    globalCards.push(elem);
  });
  id++;
  fillCards();
}

async function loadCreator() {
  try {
    const CREATOR_INFO_URL = "http://localhost:3000/creatorInfo";

    const response = await fetch(CREATOR_INFO_URL);

    if (!response.ok) throw new Error(response.statusText);

    const creatorJson = await response.json();

    const html = `${creatorJson.name} ${creatorJson.group} <a class="link" href="${creatorJson.repo}">моя ссылка</a>`;

    document.querySelector(".logo__inner").innerHTML = html;
  } catch (err) {
    console.error(err.message || err);
  }
}

loadCreator();

async function addCard() {
  document.querySelector(".loader").style.display = "flex";
  //setTimeout(3000);

  const name = document.getElementById("name").value;
  let url = document.getElementById("url").value;
  const disc = document.getElementById("disc").value;
  const id = Number(document.getElementById("id").value);
  const provider = document.getElementById("provider").value;

  if (name == "") {
    alert('поле "Название" должно быть заполнено!');
    return;
  }
  if (url == "") {
    url = "./assets/empty-img.png";
  }
  if (disc == "") {
    alert('поле "Описание" должно быть заполнено!');
    return;
  }
  if (id == "") {
    alert('поле "Код товара" должно быть заполнено!');
    return;
  }
  if (provider == "") {
    alert('поле "Поставщик" должно быть заполнено!');
    return;
  }

  const card = {
    title: name,
    description: disc,
    img: url,
    code: id,
    provider: provider,
  };

  globalCards.push(card);

  await fetch(DB_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(card),
  }).then(() => {
    document.querySelector(".loader").style.display = "none";
  });

  fillCards();

  document.getElementById("name").value = "";
  document.getElementById("url").value = "";
  document.getElementById("disc").value = "";
  document.getElementById("id").value = "";
  document.getElementById("provider").value = "";
}

let toggle = true;
function editCard(event) {
  if (document.querySelectorAll(".card_active").length == 0) {
    const card = event.parentNode.parentNode;
    card.classList.add("card_active");

    const name = document.getElementById("name");
    const url = document.getElementById("url");
    const disc = document.getElementById("disc");
    const id = document.getElementById("id");
    const provider = document.getElementById("provider");

    name.value = card.querySelector("#card-name").innerHTML;
    url.value = card.querySelector("#card-url").src;
    disc.value = card.querySelector("#card-disc").innerHTML;
    id.value = card.querySelector("#card-id").innerHTML.replace("ID: ", "");
    provider.value = card.querySelector("#card-provider").innerHTML;

    const Btns = document.querySelectorAll(".add-card-form__add-btn");

    Btns[0].classList.add("btn_hidden");
    Btns[1].classList.remove("btn_hidden");
  } else {
    const card = event.parentNode.parentNode;
    if (Object.values(card.classList).indexOf("card_active") != -1) {
      card.classList.remove("card_active");

      const name = document.getElementById("name");
      const url = document.getElementById("url");
      const disc = document.getElementById("disc");
      const id = document.getElementById("id");
      const provider = document.getElementById("provider");

      name.value = "";
      url.value = "";
      disc.value = "";
      id.value = "";
      provider.value = "";

      const Btns = document.querySelectorAll(".add-card-form__add-btn");

      Btns[0].classList.remove("btn_hidden");
      Btns[1].classList.add("btn_hidden");
    }
  }
}

function changeCard() {
  document.querySelector(".loader").style.display = "flex";

  const card = document.querySelector(".card_active");

  const showcase = document.querySelector(".showcase__inner");

  const cards = showcase.querySelectorAll(".card");

  const name = document.getElementById("name");
  const url = document.getElementById("url");
  const disc = document.getElementById("disc");
  const id = document.getElementById("id");
  const provider = document.getElementById("provider");

  let pos = 0;
  cards.forEach((elem) => {
    console.log(elem);
    if (Object.values(elem.classList).indexOf("card_active") != -1) {
      const cardObj = {
        title: name.value,
        img: url.value,
        code: Number(id.value),
        description: disc.value,
        provider: provider.value,
      };

      globalCards[pos].title = cardObj.title;
      globalCards[pos].img = cardObj.img;
      globalCards[pos].code = cardObj.code;
      globalCards[pos].description = cardObj.description;
      globalCards[pos].provider = cardObj.provider;

      console.log(`${DB_URL}/${globalCards[pos].id}`);

      fetch(`${DB_URL}/${globalCards[pos].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(globalCards[pos]),
      }).then(() => {
        document.querySelector(".loader").style.display = "none";
      });
    }
    pos++;
  });

  card.querySelector("#card-name").innerHTML = name.value;
  card.querySelector("#card-url").src = url.value;
  card.querySelector("#card-disc").innerHTML = disc.value;
  card.querySelector("#card-id").innerHTML = `ID: ${id.value}`;
  card.querySelector("#card-provider").innerHTML = provider.value;
}

function deleteCardScript() {
  const cards = document.querySelectorAll(".card");
  const self = document.querySelector(".delete-btn");

  if (self.innerHTML == "Выбрать") {
    self.innerHTML = "Удалить";
  } else {
    self.innerHTML = "Выбрать";
    let pos = 0;
    cards.forEach((elem) => {
      if (Object.values(elem.classList).includes("card_chosen")) {
        fetch(`${DB_URL}/${globalCards[pos].id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(globalCards[pos]),
        });
        globalCards.splice(pos, 1);
        pos--;
      }
      pos++;
    });

    fillCards();
  }

  cards.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      elem.classList.toggle("card_chosen");
    });
  });
}
