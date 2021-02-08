1.
function simpleNumber (num) {
    if( num < 2 ) return false;
    let count = 2;
    while(count < num) {
      if(num % count === 0) {
        return false;
      }
      count++;
    }
    return true;
  }
  
  function getSimple(max) {
    let i = 0;
    let list = [];
  
    while (i < max) {
      if(simpleNumber(i)) list.push(i);
      i++;
    }
    console.log(list);
  }
  
  getSimple(100)

2.
let basket = [300,200,500,600];
function countBasketPrice(array){
let sum = 0;
for(var i = 0; i < array.length; i++){
    sum += array[i];
    }
console.log(sum);
}
countBasketPrice(basket);


3.
for (let i = 0; i<=9; i++ )
   console.log(i);
4.
for(let line ="x"; line.length < 20; line += "x")
console.log(line);