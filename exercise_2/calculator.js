"use strict"

// Выбранная операция
let choice;

// История расчетов(10 строк)
const history = [];

// Функция смены выбранной операции
function changeChoice(id){
    choice = id;
    document.getElementById('choice').innerHTML = choice;
}

// Отрисовка и логика отображения историй
function historyRender(lastOperation){
  let htmlHistory = '';
  history.splice(0, 0, lastOperation)
  
  history.forEach((element, index) => {
    if (index < 10){
      htmlHistory += element + '<br>';
    }
  });

  if (history.length > 10) history.pop();

  document.getElementById('history').innerHTML = htmlHistory;
}

// Калькулятор
function calcResult(){
    let result = 0;
    const num1 = Number(document.getElementById("num1").value);
    const num2 = Number(document.getElementById("num2").value);
    switch (choice) {
        case '+':
          result = num1 + num2;
          break;
        case '-':
          result = num1 - num2;
          break;
        case '*':
          result = num1 * num2;
          break;
        case '/':
          result = num1 / num2;
          break;
    }

    historyRender(`${num1} ${choice} ${num2} = ${result}`)

    document.getElementById('result').innerHTML = result;

}
