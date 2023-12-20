
//localStorage.clear();
let globalCards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : [];
console.log(globalCards);

function saveCards(){
    localStorage.removeItem('cards');
    localStorage.setItem('cards', JSON.stringify(globalCards));
}

function fillCards(){
    const showcase = document.querySelector('.showcase__inner');

    showcase.innerHTML = '';
    globalCards.forEach(elem => {
        showcase.innerHTML += `<div class="card">
        <div class="card__header">
            <div class="card__id">
                <p id="card-id">ID: ${elem.id}</p>
            </div>
            <button class="card-edit-btn" onclick="editCard(this)">Редачить</button>
        </div>
        <div class="card__main">
            <div class="card__img-box">
                <img id="card-url" src="${elem.url}" alt="Крутое фото товара">
            </div>
            <div class="card__title">
                <h1 id="card-name">${elem.name}</h1>
            </div>
        </div>
        <div class="card__provider">
            <p id="card-provider">${elem.provider}</p>
        </div>
        <div class="card__disc">
            <p id="card-disc">${elem.disc}</p>
        </div>
    </div>
        `;
    });

}
fillCards();

function setUpStartCards(){
    cards = [
        {
            name: 'Ананас',
            url: './assets/pineapple.png',
            id: 0,
            disc: 'Вкусный, сочный, хрустящий!',
            provider: 'ИП Фруктов А.Н.'
        },
        {
            name: 'Iphone',
            url: './assets/iphone.png',
            id: 1,
            disc: 'The best or nothing!',
            provider: 'АО М.Видео'
        },
        {
            name: 'пиво "Amstel"',
            url: './assets/beer.png',
            id: 2,
            disc: 'Освежает!',
            provider: 'ИП Фруктов А.Н.'
        },
        {
            name: 'Иголка в стоге сена',
            url: './assets/hay.png',
            id: 3,
            disc: 'Попробуй найди!',
            provider: 'ООО "Рога и копыта"'
        },
        {
            name: 'чай "Принцесса Нури"',
            url: './assets/tea.png',
            id: 4,
            disc: 'Настоящий чай, с запахом Индии.',
            provider: 'ИП Фруктов А.Н.'
        },
    ];

    globalCards = cards;
    saveCards();
    
    fillCards();
    
}

function addCard(){

    const name = document.getElementById('name').value;
    let url = document.getElementById('url').value;
    const disc = document.getElementById('disc').value;
    const id = Number(document.getElementById('id').value);
    const provider = document.getElementById('provider').value;

    if (name == ''){
        alert('поле "Название" должно быть заполнено!');
        return;
    }
    if (url == ''){
        url = './assets/empty-img.png';
    }
    if (disc == ''){
        alert('поле "Описание" должно быть заполнено!');
        return;
    }
    if (id == ''){
        alert('поле "Код товара" должно быть заполнено!');
        return;
    }
    if (provider == ''){
        alert('поле "Поставщик" должно быть заполнено!');
        return;
    }

    const card = {
        name: name,
        url: url,
        id: id,
        disc: disc,
        provider: provider
    };

    globalCards.push(card);
    
    saveCards();

    fillCards();
}

let toggle = true;
function editCard(event){
    if (document.querySelectorAll('.card_active').length == 0){
        const card = event.parentNode.parentNode;
        card.classList.add('card_active');

        const name = document.getElementById('name');
        const url = document.getElementById('url');
        const disc = document.getElementById('disc');
        const id = document.getElementById('id');
        const provider = document.getElementById('provider');

        
            name.value = card.querySelector('#card-name').innerHTML;
            url.value = card.querySelector('#card-url').src;
            disc.value = card.querySelector('#card-disc').innerHTML;
            id.value = card.querySelector('#card-id').innerHTML.replace('ID: ', '');
            provider.value = card.querySelector('#card-provider').innerHTML;
       
            
        
        const Btns = document.querySelectorAll('.add-card-form__add-btn');

        Btns[0].classList.add('btn_hidden');
        Btns[1].classList.remove('btn_hidden');
    }
    else{
        const card = event.parentNode.parentNode;
        if (Object.values(card.classList).indexOf('card_active') != -1){
            card.classList.remove('card_active');

        const name = document.getElementById('name');
        const url = document.getElementById('url');
        const disc = document.getElementById('disc');
        const id = document.getElementById('id');
        const provider = document.getElementById('provider');

            name.value = '';
            url.value = '';
            disc.value = '';
            id.value = '';
            provider.value = '';
        
        
        const Btns = document.querySelectorAll('.add-card-form__add-btn');

        Btns[0].classList.remove('btn_hidden');
        Btns[1].classList.add('btn_hidden');
        }
    }
}

function changeCard(){
    const card = document.querySelector('.card_active');

    const showcase = document.querySelector('.showcase__inner');

    const cards = showcase.querySelectorAll('.card');

    const name = document.getElementById('name');
    const url = document.getElementById('url');
    const disc = document.getElementById('disc');
    const id = document.getElementById('id');
    const provider = document.getElementById('provider');


    console.log(globalCards);
    let pos = 0;
    cards.forEach(elem => {
        
        if (Object.values(elem.classList).indexOf('card_active') != -1){
            const cardObj = {
                name: name.value,
                url: url.value,
                id: Number(id.value),
                disc: disc.value,
                provider: provider.value
            };
            
            globalCards[pos].name = cardObj.name;
            globalCards[pos].url = cardObj.url;
            globalCards[pos].id = cardObj.id;
            globalCards[pos].disc = cardObj.disc;
            globalCards[pos].provider = cardObj.provider;
            console.log(globalCards);

            saveCards();
        }
        pos++;
    });

    

    card.querySelector('#card-name').innerHTML = name.value;
    card.querySelector('#card-url').src = url.value;
    card.querySelector('#card-disc').innerHTML = disc.value;
    card.querySelector('#card-id').innerHTML = `ID: ${id.value}`;
    card.querySelector('#card-provider').innerHTML = provider.value;

}

function deleteCardScript(){
    const cards = document.querySelectorAll('.card');
    const self = document.querySelector('.delete-btn');

    if (self.innerHTML == 'Выбрать'){
        self.innerHTML = 'Удалить';
    }
    else{
        self.innerHTML = 'Выбрать';
        let pos = 0;
        cards.forEach(elem => {
            if (Object.values(elem.classList).includes('card_chosen')){
                globalCards.splice(pos, 1);
                pos--;
            }
            pos++;
        });

        saveCards();
        
        fillCards();
    }

    cards.forEach(elem => {
        elem.addEventListener('click', (e) => {
            elem.classList.toggle('card_chosen');
        });
    });

    
}

