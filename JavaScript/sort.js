// Создание массива для сортировки
const createSortArr = (data) => {
    const sortArr = [];
    const sortSelects = data.querySelectorAll('select[name^="level"]');
    
    for (let i = 0; i < sortSelects.length; i++) {
        const keySort = sortSelects[i].value;
        if (keySort === "0") break;
        
        const desc = data.querySelector(`[name="${sortSelects[i].name}_desc"]`).checked;
        sortArr.push({
            column: keySort, 
            order: desc,
            index: getColumnIndex(keySort)
        });
    }
    
    return sortArr;
};

// Сортировка таблицы
const sortTable = (idTable, data) => {
    const sortArr = createSortArr(data);
    if (sortArr.length === 0) {
        createTable(plants, idTable);
        return;
    }
    
    const table = document.getElementById(idTable);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.rows);
    
    rows.sort((first, second) => {
        for (const sortItem of sortArr) {
            const firstValue = first.cells[sortItem.index].textContent;
            const secondValue = second.cells[sortItem.index].textContent;
            
            const compareResult = isNumeric(firstValue) 
                ? parseFloat(firstValue) - parseFloat(secondValue)
                : firstValue.localeCompare(secondValue);
                
            if (compareResult !== 0) {
                return sortItem.order ? -compareResult : compareResult;
            }
        }
        return 0;
    });
    
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
};

// Проверка, является ли значение числовым
const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

// Получение индекса столбца по имени
const getColumnIndex = (key) => {
    const headers = {
        "name": 0,
        "type": 1,
        "distribution": 2,
        "lifespan": 3,
        "height": 4
    };
    return headers[key] || 0;
};

// Обновление следующего select в сортировке
const changeNextSelect = (nextSelect, curSelect) => {
    if (!nextSelect || !curSelect) return;
    
    nextSelect.innerHTML = curSelect.innerHTML;
    const selectedValue = curSelect.value;
    
    if (selectedValue !== "0") {
        const optionToRemove = nextSelect.querySelector(`option[value="${selectedValue}"]`);
        if (optionToRemove) {
            optionToRemove.remove();
        }
    }
};

// Инициализация select'ов для сортировки
const setSortSelects = (data, dataForm) => {
    const headers = Object.keys(data);
    const allSelects = dataForm.querySelectorAll('select[name^="level"]');
    
    allSelects.forEach((select, index) => {
        select.innerHTML = '';
        
        // Добавляем опцию "Нет"
        select.appendChild(createOption('Нет', '0'));
        
        // Добавляем остальные опции
        headers.forEach((header, i) => {
            select.appendChild(createOption(
                getHeaderLabel(header), 
                header
            ));
        });
        
        // Отключаем все select'ы кроме первого
        if (index > 0) {
            select.disabled = true;
        }
    });
};

// Создание элемента option
const createOption = (text, value) => {
    const option = document.createElement('option');
    option.textContent = text;
    option.value = value;
    return option;
};

// Получение читаемого названия заголовка
const getHeaderLabel = (key) => {
    const labels = {
        "name": "По названию",
        "type": "По виду",
        "distribution": "По распространению",
        "lifespan": "По продолжительности жизни",
        "height": "По высоте"
    };
    return labels[key] || key;
};