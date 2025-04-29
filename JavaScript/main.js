document.addEventListener('DOMContentLoaded', () => {
    // Инициализация таблицы
    createTable(plants, 'plants-table');
    
    // Инициализация сортировки
    const sortForm = document.getElementById('sort-form');
    setSortSelects(plants[0], sortForm);

    // Получаем элементы управления сортировкой
    const firstSelect = sortForm.querySelector('[name="level1"]');
    const secondSelect = sortForm.querySelector('[name="level2"]');
    const thirdSelect = sortForm.querySelector('[name="level3"]');
    const applySortBtn = document.getElementById('apply-sort');
    const resetSortBtn = sortForm.querySelector('[type="reset"]');

    // Обработчик для первого уровня
    firstSelect.addEventListener('change', function() {
        if (this.value === "0") {
            secondSelect.disabled = true;
            thirdSelect.disabled = true;
        } else {
            secondSelect.disabled = false;
            changeNextSelect(secondSelect, this);
            thirdSelect.disabled = true;
            thirdSelect.value = "0";
        }
    });

    // Обработчик для второго уровня
    secondSelect.addEventListener('change', function() {
        if (this.value === "0") {
            thirdSelect.disabled = true;
        } else {
            thirdSelect.disabled = false;
            changeNextSelect(thirdSelect, this);
        }
    });

    // Применение сортировки
    applySortBtn.addEventListener('click', () => {
        sortTable('plants-table', sortForm);
    });

    // Сброс сортировки
    resetSortBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sortForm.reset();
        createTable(plants, 'plants-table');
        setSortSelects(plants[0], sortForm);
        
        // Принудительно отключаем второе и третье поля
        secondSelect.disabled = true;
        thirdSelect.disabled = true;

        document.getElementById("filter-form").reset();
        document.getElementById("sort-form");
    });

    // Кнопка для скрытия/показа таблицы
    let button = d3.select("#start");
    let clicked = false;
    button.on("click", function () {
        if (clicked) {
            d3.select("#plants-table").style("visibility", "visible");
            button.text("Скрыть таблицу");
        }
        if (!clicked) {
            d3.select("#plants-table").style("visibility", "collapse");
            button.text("Показать таблицу");
        }
        clicked = !clicked;
    });

    // Кнопка для построения графика
    let button2 = d3.select("#build-graph");
    button2.on("click", function () {
        let check1 = d3.select("#check1").node().checked;
        let check2 = d3.select("#check2").node().checked;

        if (!check1 && !check2) {
            // Ни один чекбокс не выбран
            d3.select("#error-message")
                .text("Выберите хотя бы одно значение для Oy")
                .style("color", "red");
        } else {
            // Хотя бы один чекбокс выбран
            d3.select("#error-message").text(""); // Убираем сообщение об ошибке
            drawGraph(plants); // Строим график
        }
    });

    // обработчики событий для автоматического снятия ошибок
    d3.select("#check1").on("change", function () {
        if (d3.select("#check1").node().checked || d3.select("#check2").node().checked) {
            d3.select("#error-message").text("");
        }
    });

    d3.select("#check2").on("change", function () {
        if (d3.select("#check1").node().checked || d3.select("#check2").node().checked) {
            d3.select("#error-message").text("");
        }
    });
});