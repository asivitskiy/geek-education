
document.write('<h3>Делаем корзину!</h3>');

function countTotalPrice(prices) {
    console.log(prices);
    var sum = 0;
    for (var goodPrice in prices) {//
        sum += prices[goodPrice];
    }
    return sum;
}

var basket = [];
var price;

var goods = ['Товар 1', 'Товар 2', 'Товар 3', 'Товар 4', 'Товар 5'];

document.write('<p>Выведем товары и сгенирируем цены: </p>');

for (var good of goods) {
    price = parseInt(Math.random() * 700 + 100);
    document.write('<p>' + good + ' => ' + price + '</p>');
    // Это только в качестве домашнего задания я использую ключ на кириллице!
    console.log(good);
    basket[good] = price;
}

document.write('<p>Теперь посчитаем стоимость корзины: ' + countTotalPrice(basket) + '</p>');
