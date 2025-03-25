// Создание таблицы
const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);
    table.innerHTML = '';
    
    // Создаем заголовки
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    
    const headers = [
        { key: 'name', label: 'Название' },
        { key: 'type', label: 'Вид' },
        { key: 'distribution', label: 'Распространение' },
        { key: 'lifespan', label: 'Средняя продолжительность жизни (лет)' },
        { key: 'height', label: 'Высота (до, м)' }
    ];
    
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.label;
        th.dataset.key = header.key;
        trHead.appendChild(th);
    });
    
    thead.appendChild(trHead);
    table.appendChild(thead);
    
    // Заполняем тело таблицы
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const tr = document.createElement('tr');
        
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header.key];
            td.dataset.label = header.label;
            tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
};