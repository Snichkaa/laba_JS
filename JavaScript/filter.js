// Соответствие между полями формы и свойствами объектов растений
const correspond = {
    "name": "name1",
    "type": "view1",
    "distribution": "country1",
    "lifespan": ["live1", "live2"],
    "height": ["height1", "height2"]
};

// Получение данных из формы
const dataFilter = (dataForm) => {
    const dictFilter = {};
    
    for (let j = 0; j < dataForm.elements.length; j++) {
        const item = dataForm.elements[j];

        if (item.type === "text" || item.type === "number") {
            let valInput = item.value;

            if (item.type === "text") {
                valInput = valInput.toLowerCase();
            } else if (item.type === "number") {
                valInput = valInput === "" ? 
                    (item.id.includes("1") ? -Infinity : Infinity) : 
                    parseFloat(valInput);
            }

            dictFilter[item.id] = valInput;
        }
    }

    return dictFilter;
};

// Фильтрация таблицы
const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);
    const tableFilter = data.filter(item => {
        let result = true;

        for (const key in item) {
            const val = item[key];

            if (typeof val === "string") {
                const valLower = val.toLowerCase();
                const filterValue = datafilter[correspond[key]];
                result = result && (filterValue === "" || valLower.includes(filterValue));
            } else if (typeof val === "number") {
                const [from, to] = correspond[key].map(id => datafilter[id]);
                result = result && (val >= from && val <= to);
            }
        }

        return result;
    });

    createTable(tableFilter, idTable);
};

// Очистка фильтров
const clearFilters = () => {
    const filterForm = document.getElementById("filter-form");
    const sortForm = document.getElementById("sort-form");
    
    // Сброс фильтров
    filterForm.reset();
    
    // Очистка текстовых и числовых полей
    const inputs = filterForm.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Полный сброс сортировки
    sortForm.reset();
    const sortSelects = sortForm.querySelectorAll('select[name^="level"]');
    sortSelects.forEach((select, index) => {
        select.value = "0"; // Устанавливаем "Нет"
        select.disabled = index > 0; // Отключаем все кроме первого
    });
    
    // Сбрасываем чекбоксы "по убыванию"
    sortForm.querySelectorAll('[name$="_desc"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Восстановление исходной таблицы
    createTable(plants, 'plants-table');
};


// Применение фильтров
const applyFilters = () => {
    const form = document.getElementById("filter-form");
    filterTable(plants, 'plants-table', form);
};

// Инициализация обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById("filter-form");
    
    // Применение фильтра
    document.getElementById('apply-filter').addEventListener('click', applyFilters);
    
    // Сброс фильтра
    filterForm.addEventListener('reset', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение
        clearFilters();
        document.getElementById('sort-form').reset();
    });
    
    // Убедитесь, что поля ввода не заблокированы
    const inputs = filterForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.disabled = false;
        });
    });
});