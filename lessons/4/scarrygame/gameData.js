//некорректно сравнивать игры. то что на было на уроке - по сути квест, а милионер - викторина с выводом вопросов по порядку
//можно было бы раздать вопросам грэйды и выбирать случайный вопрос из текущего уровня (но это добавит всего одно действие по выбору вопроса, а времени на набивку массива вопросов просто нет :(

function Question(mainText,rightAnswer,answers,profit,level,lastLevel) {
    this.mainText = mainText;//вопрос
    this.rightAnswer = rightAnswer;//верный ответ (индекс элменета массива , который является верным ответом)
    this.answers = answers;//masLabelsForQuestions - массив тестов вариантов ответов
    this.profit = profit;//сколько дают за вопрос
    this.level = level;//уровень вопроса
    this.lastLevel = lastLevel;//является ли конечным уровнем (не использовал в итоге, переписал кусок и свойство более не нужно.
}

//функция проверяет ответ
function answerChecker(questionArray,questionIndex,ans) {
    if (questionArray[questionIndex].rightAnswer == ans) {return true;} else {return false;}
}

//наполняем массив вопросов
questions = [];
questions.push(new Question("Сколько будет 2+2",2,["Ответ 1 - 3","Ответ 2 - 4","Ответ 3 - 5","Ответ 4 - 6"],100,1,0));
questions.push(new Question("Сколько будет 3+3",1,["Ответ 1 - 6","Ответ 2 - 7","Ответ 3 - 8","Ответ 4 - 9"],200,2,0));
questions.push(new Question("Сколько будет 4+4",3,["Ответ 1 - 6","Ответ 2 - 7","Ответ 3 - 8","Ответ 4 - 9"],300,3,0));
questions.push(new Question("Сколько будет 5+5",3,["Ответ 1 - 8","Ответ 2 - 9","Ответ 3 - 10","Ответ 4 - 11"],400,4,1));

const numberOfAttempts = 3;//количество попыток 1..до бесконечности (количество возможных ошибок)

var level = 1;//начальный уровень
var errorsCounter = 0;//счетчик ошибок
var quitFlag = true;//флаг выхода (тру играем, фолс-выходим)
var currentQuestionIndex = 0;//индекс первого вопроса
var currentSumm = 0;//сумма выиграша текущая

while (quitFlag) {
    console.log(questions);
    //ввод ответа
    var ans = +prompt("Введите -1 чтобы забрать деньги прямо сейчас!\n" + "Текущий выигрыш " + currentSumm + "\nОсталось попыток " +(numberOfAttempts-errorsCounter)+  "\n" +
        questions[currentQuestionIndex].mainText + "\n" +
        questions[currentQuestionIndex].answers.join("\n"));

    //нужно проверить ответ и либо прибавить счетчик ошибок при неверном, либо перейти на следующий уровень при успехе. сумма добавится только при успехе(естессно)
    if (answerChecker(questions,currentQuestionIndex,ans)) {level++; currentSumm += questions[currentQuestionIndex].profit } else {errorsCounter += 1;}

    //ищем вопрос с уровнем, соответствующим текущему уровню
    currentQuestionIndex = questions.map(el => el.level).indexOf(level);

    //ввод -1 для забора денег не дожидаясь конца игры
    if (ans == -1) {
        quitFlag=false;
        alert("Вы забираете "+currentSumm+" и удаляетесь в прошлый квест.");
        break;
    }
    //ошибок больше чем можно
    if (errorsCounter>=numberOfAttempts) {
        quitFlag=false;
        alert("Вы проиграли");
    }
    //currentQuestionIndex = questions.map(el => el.level).indexOf(level) возвращает -1, если элемент не найден. а не найден он, если вопросы кончились. а если впоросы кончились -  значит победа
    if (currentQuestionIndex<0) {
        quitFlag=false;
        alert("Вы выиграли "+currentSumm+". Игра закончилась, вопросов больше нет.");
    }

}



