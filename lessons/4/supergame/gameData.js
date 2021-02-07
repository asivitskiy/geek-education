//полностью переписал игру
//загадки теперь объекты
//теперь ветвление выполняется не условиями в коде, а на основании индексов

//Создаем конструктор объекта для сущности ОТВЕТ (обект я считаю тут нужен для упрощения редактирования, чтобы не терять структуру если чего то поменяется)
function Answer(idd,mainText,masIdOfQuestions,masLabelsForQuestions,endofgamePoint) {
    this.idd = idd;//idd - уникальный индекс каждой загадки
    this.mainText = mainText;//сновной текст
    this.masIdOfQuestions = masIdOfQuestions;//массив idd загадок, к которым приводят ответы
    this.masLabelsForQuestions = masLabelsForQuestions;//masLabelsForQuestions - массив тестов вариантов ответов
    this.endofgamePoint = endofgamePoint;
}

function Histr(question,choice,text) {
    this.question = question; //
    this.choice = choice;
    this.text = text;
}

var questions = [];
questions.push(new Answer(1,'Вы живёте в тихой и уютной деревеньке на окрайне страны.\n' +
    'Здесь есть практчески всё: речка, лес, горы, озеро, луга и поля, есть даже школа в соседнем селе.\n' +
    'Сейчас начало лета, воскресенье, раннее утро, Вы просыпаетесь и собираетесь ...\n',
    [2,3],
    ['1 - Поспать до обеда','2 - Пойти прогуляться'],
    1));

questions.push(new Answer(2,'Вы решили поспать до обеда.\n'+
    'После того как Вы проснулись первое, что вы ощутили, это приятный запах, который шёл с кухни.\n'+
    'После Вы замечаете, какая за окном прекрасная погода, и Вы думаете ...\n',
    [3,4],
    ["1 - Пойти прогуляться","2 - Пойти пообедать"],
    1));

questions.push(new Answer(3,'Вы решили пойти прогуляться.\n' +
        'Вы выходите из своего дома и видите прекрасный рассвет, блики солнца так и играют на озёрной глади.\n' +
        'Вы решаете дойти до озера, полюбоваться его красотойю\n'+
        'С одной стороны тропинки Вы видите пшеничное поле, за которым веднеется лес.\n'+
        'С другой стороны течёт речка, а в далеке виднеются горы.\n'+
        'Вы наслаждаетесь пейзажами и не замечаете как летит время.\n'+
        'Домой Вы приходите только к обеду, но до обеда ещё есть время и Вы решаете ...\n',
    [5,6],
    ["1 - Подождать обед в столовой","2 - Поколоть дров перед обедом"],
    1));

questions.push(new Answer(4,"Вы пришли в столовую и поели. Хэппиэнд",
    [0,0],
    ["","",""],
    0));

questions.push(new Answer(5,"Вы подождали обеда. Дождались и поели. Прекрасно (:",
    [0,0],
    ["","",""],
    0));

questions.push(new Answer(6,"Вы покололи дров, вернулись, а еды уже нет. Вы ушли домой голодный.",
    [0,0],
    ["","",""],
    0));

var globalCurrentQuestion = 0;
var hist = [];

var histString = "";

var ans=0;
var currentQuestion = 0;


function questionRender(quest) {
        dataForRender = questions[quest];
        if (questions[quest].endofgamePoint == 1)
        {   gamestatus=1;
            ans = prompt(dataForRender.mainText + "\n" + dataForRender.masLabelsForQuestions.join("\n"));

        }
        else
        {   gamestatus=0;
            alert(dataForRender.mainText + "\n" + dataForRender.masLabelsForQuestions.join("\n"));

        }

    k = [ans,quest,gamestatus];
    return k;

}

//получение индекса объекта, который меет id choicedAns
function searchNextQuestion(choicedAns,curQuest) {
    var ii=0;
    var res=0;
    for (var curObj of questions) {
        curIdOfObj = ii;
        if (curObj.idd == questions[curQuest].masIdOfQuestions[choicedAns-1]) {
            res = ii;
        }
        ii++;
    }
    return res;
}

do {
    //приходит массив из двух значений - текущий выбор [0], текущий вопрос[1]
    currentStepMas = questionRender(globalCurrentQuestion);
    if (currentStepMas[2] == 0) {break;}

    hist.push(new Histr(globalCurrentQuestion,currentStepMas[0],questions[globalCurrentQuestion].masLabelsForQuestions[currentStepMas[0]-1] ));

    globalCurrentQuestion = searchNextQuestion(currentStepMas[0],currentStepMas[1]);


} while (1)
console.log(hist);
/*document.write(histString);*/
var historyAsk = prompt("Введите номер шага");
alert(hist[historyAsk-1].text);



