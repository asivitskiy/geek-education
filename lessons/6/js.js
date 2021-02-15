
//конструктор объектов корзины
function Basket(idOfItem,countOfItem) {
    this.idOfItem = idOfItem;
    this.countOfItem = countOfItem;
}

function Item(countOnStore,priceOfItem,nameOfItem,imgMas) {
    this.idOfItem = parseInt(Math.random()*999);
    this.countOnStore = countOnStore;
    this.priceOfItem = priceOfItem;
    this.nameOfItem = nameOfItem;
    this.imgMas = imgMas;
}

//функция вывода карточек товаров
//запускается один раз в начале - чтобы нарисовать структуру (а можно бы было её прсто в вёрстке сделать и ен париться)
//из примечательного - повешаны по два ивентлистнера на кнопки. один отправляет данные в корзину, другой перерисовывает сумму в корзине
//писать функцию прямо в кнопке неверно, т.к. корзину охота отрисовывать и их других мест, не используя кнопку
function drawListOfItems(items,targetBlock) {
    drawBasket();
    //перебираем элементы
    for (var itemItem of items) {
        const newBlock = document.createElement("div");
              newBlock.className = "itemCard";
              newBlock.id = itemItem.idOfItem;
        //картинка (маленькая)
        var itemCard__itemPreview = document.createElement("div");
        itemCard__itemPreview.className = "itemCard__itemPreview";
        itemCard__itemPreview.innerHTML += "<button data-id='left' id=" + itemItem.idOfItem + " onfocus='addEventListener(\"click\",gallery);'><<</button>";
        itemCard__itemPreview.innerHTML +="<img data-cur='0'  id="+itemItem.idOfItem+" src=" +itemItem.imgMas[0] +"  width=150>";
        itemCard__itemPreview.innerHTML += "<button data-id='right' id=" + itemItem.idOfItem + " onfocus='addEventListener(\"click\",gallery);'>>></button>";
        //название
        var itemCard__itemName = document.createElement("div");
        itemCard__itemName.className = "itemCard__itemName";
        itemCard__itemName.innerText = itemItem.nameOfItem;

        //цена
        var itemCard__itemPrice = document.createElement("div");
        itemCard__itemPrice.className = "itemCard__itemPrice";
        itemCard__itemPrice.innerText = itemItem.priceOfItem;

        //кнопочка добавить в корзину
        var itemCard__addButton = document.createElement("button");
        itemCard__addButton.className = "itemCard__itemPrice";
        itemCard__addButton.id = itemItem.idOfItem;
        itemCard__addButton.dataset.id = "add";
        itemCard__addButton.innerText = "Добавить 1кг корзину";
/*        itemCard__addButton.onclick = function(e){
            currentBasket.push(new Basket(e.target.id,1));};*/
        itemCard__addButton.addEventListener("click", addAndRemoveItems);
        itemCard__addButton.addEventListener("click", drawBasket);


        //кнопочка убрать из корзины
        var itemCard__remButton = document.createElement("button");
        itemCard__remButton.className = "itemCard__itemPrice";
        itemCard__remButton.id = itemItem.idOfItem;
        itemCard__remButton.dataset.id = "remove";
        itemCard__remButton.innerText = "Убрать 1кг из корзины";
/*        itemCard__remButton.onclick = function(e){
            currentBasket.push(new Basket(e.target.id,-1));};*/
        itemCard__remButton.addEventListener("click", addAndRemoveItems);
        itemCard__remButton.addEventListener("click", drawBasket);


        newBlock.append(itemCard__itemPreview,itemCard__itemName,itemCard__itemPrice,itemCard__addButton,itemCard__remButton);
        targetBlock.append(newBlock);

    }
}

function addAndRemoveItems(e) {
    console.log("target-> " + e.target.id);
    console.log("action-> " + e.target.dataset.id);
        //ищем индекс объекта, который запустил функцию, в корзине . если нет - функция вернет -1
        var indexOfCurrentElement = currentBasket.map(poss => poss.idOfItem).indexOf((e.target.id));

    if (e.target.dataset.id == "add") {
        if (indexOfCurrentElement < 0) {
            currentBasket.push(new Basket(e.target.id, 1));}
        else {currentBasket[indexOfCurrentElement].countOfItem += 1;}
    }
    if ((indexOfCurrentElement >= 0)&&(e.target.dataset.id == "remove")) {
        if (currentBasket[indexOfCurrentElement].countOfItem>0) {
            currentBasket[indexOfCurrentElement].countOfItem -= 1; }
        else {
            currentBasket[indexOfCurrentElement].countOfItem = 0;}
    }
    drawBasket();
}

function drawBasket() {
    var textForBasket = "Список товаров: <br><br>";
    if (currentBasket.length != 0) {
        //подсчет корзины
        var smm = 0;
        for (var el of currentBasket) {
            //поиск индекса объекта, который имеет определенный idOfItem
            var indexOfCurrentElement = itemElem.map(poss => poss.idOfItem).indexOf(parseInt(el.idOfItem));
            smm += itemElem[indexOfCurrentElement].priceOfItem * el.countOfItem;
            //переписываем объект в временную переменную, чтобы не такскать кучу кода ниже
            if (el.countOfItem>0) {
            textForBasket += itemElem[indexOfCurrentElement].nameOfItem + " (" + el.countOfItem + " кг) -> ";
            textForBasket += el.countOfItem * itemElem[indexOfCurrentElement].priceOfItem + "руб. ";
            //тут я обленился писать через функцию вставку кнопок в корзине, слушателя повешал на онфокус
            textForBasket += "<button onfocus='addEventListener(\"click\",addAndRemoveItems);' id=" + el.idOfItem + " data-id='remove'>убрать 1кг</button><br>";
            }
        }
    } else { smm = 0; }
        //отрисовка корзины
        basketBlock = document.querySelector(".try1");
        smm = "<br> Общая сумма: " + smm + "руб.";
        basketBlock.innerHTML = textForBasket + smm;
}

//листалка галереи
function gallery(e) {
    //блок-источник клика
    var sourceOfClick = document.getElementById(`${e.target.id}`).querySelector(".itemCard__itemPreview img");
    //получаем индекс элемента, который имеет ткущий idOfItem
    var indexOfItem = itemElem.map(poss => poss.idOfItem).indexOf(parseInt(e.target.id));
    //получаем массив всех картинок к блоку, который активировал событие
    var masOfImg = itemElem[indexOfItem].imgMas;
    //сразу считаем количество картинок в массиве
    var imgCounter = masOfImg.length;
    //индекс текущей картинки из массива
    var currentMasImgIndex = sourceOfClick.dataset.cur;
    //действие (лево-право)
    var actionDirection = e.target.dataset.id;

    console.log("исх index-> " + parseInt(currentMasImgIndex));
/*    if (currentMasImgIndex == imgCounter-1) {
        if (actionDirection == "right") {
            currentMasImgIndex = 0;
        } else {
            currentMasImgIndex -= 1;
        }

        if (currentMasImgIndex == 0) {
            if (actionDirection == "left") {
                currentMasImgIndex = imgCounter - 1;
            } else {
                currentMasImgIndex = currentMasImgIndex*1-1;
            }
        }*/
    if (actionDirection == "right"){
        currentMasImgIndex =currentMasImgIndex*1+1;}
    if (actionDirection == "left"){
        currentMasImgIndex = currentMasImgIndex*1-1;}
    if (currentMasImgIndex>imgCounter-1) {currentMasImgIndex=0}
    if (currentMasImgIndex<0) {currentMasImgIndex=imgCounter-1}


    console.log("direction-> " + actionDirection);
    console.log("изм index-> " + parseInt(currentMasImgIndex));
    //извлекаем требуемую картинку (исходя из id блока и ткущей картинки)
    imgName = itemElem[indexOfItem].imgMas[parseInt(currentMasImgIndex)];
    //рисуем нужную картинку в нужном блоке
    document.getElementById(`${e.target.id}`).querySelector(".itemCard__itemPreview img").src = imgName;
    document.getElementById(`${e.target.id}`).querySelector(".itemCard__itemPreview img").dataset.cur = (currentMasImgIndex);

    console.log(sourceOfClick.dataset.cur);

    /*aaa.getElementsByTagName("img")[0].src = "fh0.jpg";*/
}


//объявляем и наполняем массив объектов товаров и массив объектов корзины
var currentBasket=[];
var itemElem=[];
itemElem.push(new Item(5,999,"Морковка",["mork0.jpg","mork1.jpg","mork2.jpg"]));
itemElem.push(new Item(5,499,"Картоха",["potat0.jpg","potat1.jpg","potat2.jpg"]));
itemElem.push(new Item(5,5399,"Фейхоа",["fh0.jpg","fh1.jpg","fh2.jpg"]));


//выбираем блок, в который будем выводить наши карточки товаров и выводим карточки
listContainer = document.querySelector(".list-container");
drawListOfItems(itemElem,listContainer);


