
// Функция генерерирует массив из 100 значений квадратичной функции с параметрами a и b
function createValues(a, b) {
    const values = [];
    for (let i = 0; i < 100; i++) {
        const value = a * i ** 2 + b * i + 3
        values.push(value)
    }
    return values;
}

// Создаём на глобальном уровне объект, содержащий объект графика для конкретного датасета.
// Обновляя данные в этом объекте, мы будем обновлять данные на графике
const data = {
    labels: [],
    datasets: [{
        label: 'Мера риска от процента выполнения проекта',
        data: [],
        backgroundColor: 'rgba(20, 160, 220, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 3
    }]
};

// Получаем объект холста, на котором библиотечка будет отрисовывать графики.
const ctx = document.getElementById('risk-chart').getContext('2d');

// Создаем объект графика. Конструктор принимает два параметра - объект холста и конфигурацию графика
const riskChart = new Chart(ctx, {
    type: 'line',
    // передаём в качестве одного из полей объект data, созданный выше. В нём пока нет данных
    data: data,
    options: {
        responsive: true,
        animation: {
            duration: 1000,
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Аолучаем элемент для вывода текстового представления функции
const func = document.getElementById('func');

// функция перерисовывает график на основе введённых значений
function redrawValues() {
    const a = outerRiskInput.value;
    const b = innerRiskInput.value;
    // Генерируем массив значений для вывода на графике
    const values = createValues(a, b);
    // Подписис к элементам массива - числа от 1 до 100.
    const labels = values.map((_, i) => i);
    // Обновляем объект data.
    data.labels = labels;
    data.datasets[0].data.splice(0, data.datasets[0].data.length, ...values);
    // Выводим текстовое представление функции
    func.textContent = `y = ${a}*x^2 + ${b}*x + 3`;
    // Перерисовываем график
    riskChart.update();
}

// Получаем объекты, соответсвующие инпутам (текстбоксам) из HTML-разметки по их id.
const outerRiskInput = document.getElementById('outer-risk');
const innerRiskInput = document.getElementById('inner-risk');

// Подписываемся на события ввода в iputы. Как только в инпуте происходят изменения, вызывается функция redrawValues
outerRiskInput.addEventListener('input', redrawValues);
innerRiskInput.addEventListener('input', redrawValues);

// Вызовем функцию отрисоки для инициализации графика до ввода первых данных.
redrawValues();
