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
});