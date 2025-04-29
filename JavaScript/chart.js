// Входные данные:
// data - исходный массив (например, buildings)
// key - поле, по которому осуществляется группировка
// Функция создает массив данных для графика
function createArrGraph(data, key) {  
    // Группируем данные по значению ключа
    groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    // Перебираем каждую группу
    for(let entry of groupObj) {
        // Получаем минимум и максимум
        let minMax = d3.extent(entry[1].map(d => d['height']));
        // Добавляем результат в массив
        arrGraph.push({labelX : entry[0], values : minMax});
     }

     return arrGraph; // Возвращаем подготовленные данные
}

// Основная функция отрисовки графика
function drawGraph(data) {
    // Получаем текущие данные таблицы
    //const tableRows = document.querySelectorAll('#plants-table tbody tr');
    /*const currentData = Array.from(tableRows).map(row => ({
        name: row.cells[0].textContent,
        type: row.cells[1].textContent,
        distribution: row.cells[2].textContent,
        lifespan: parseFloat(row.cells[3].textContent),
        height: parseFloat(row.cells[4].textContent)
    }));*/

    const keyX = d3.select('input[name="X-axis"]:checked').node().value;
    const arrGraph = createArrGraph(data, keyX);
    const check1 = d3.select("#check1").node().checked;
    const check2 = d3.select("#check2").node().checked;

    const svg = d3.select("svg");
    svg.selectAll('*').remove();

    attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 100,
        marginY: 100
   }

    const [scX, scY] = createAxis(svg, arrGraph, attr_area);
    const chartType = d3.select("#type").node().value;
    
    if(chartType === "first") {
        createChartGist(svg, arrGraph, scX, scY, attr_area);
    } else if(chartType === "second") {
        createChartDot(svg, arrGraph, scX, scY, attr_area);
    } else if(chartType === "third") {
        createChartLine(svg, arrGraph, scX, scY, attr_area);
    }
}

// Функция создания осей с учетом выбранных параметров
function createAxis(svg, data, attr_area){
    const check1 = d3.select("#check1").node().checked;
    const check2 = d3.select("#check2").node().checked;
    let valuesToDisplay = [];
    
    if (check1) {
        valuesToDisplay = valuesToDisplay.concat(data.map(d => d.values[1]));
    }
    if (check2) {
        valuesToDisplay = valuesToDisplay.concat(data.map(d => d.values[0]));
    }

    let  [min, max] = d3.extent(valuesToDisplay);

    //let keyX =  d3.select('input[name="X-axis"]:checked').node().value;
    // Шкала для оси X
    let scaleX = d3.scaleBand()
                   .domain(data.map(d => d.labelX))
                   .range([0, attr_area.width - 2 * attr_area.marginX]);

    // Шкала для оси Y
    let scaleY = d3.scaleLinear()
                   .domain([min * 0.85, max * 1.1 ])
                   .range([attr_area.height - 2 * attr_area.marginY, 0]);               
    
    // Создание и отрисовка осей
    let axisX = d3.axisBottom(scaleX); 
    let axisY = d3.axisLeft(scaleY); 

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");
    
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);
        
    return [scaleX, scaleY];
}

// Функция создания гистограммы
function createChartGist(svg, data, scaleX, scaleY, attr_area) {
    const check1 = d3.select("#check1").node().checked;
    const check2 = d3.select("#check2").node().checked;
    const colors = { lifespan: "#f99fbe", height: "#b4f6a2" };

    if(check1 && check2) {
        createGist(svg, data, scaleX, scaleY, attr_area, colors.lifespan, d => scaleY(d.values[1]), -5);
        createGist(svg, data, scaleX, scaleY, attr_area, colors.height, d => scaleY(d.values[0]), 5);
    }
    else if(check1) {
        createGist(svg, data, scaleX, scaleY, attr_area, colors.lifespan, d => scaleY(d.values[1]));
    }
    else if(check2) {
        createGist(svg, data, scaleX, scaleY, attr_area, colors.height, d => scaleY(d.values[0]));
    }
}

// Функция создания точечной диаграммы 
function createChartDot(svg, data, scaleX, scaleY, attr_area) {
    const check1 = d3.select("#check1").node().checked;
    const check2 = d3.select("#check2").node().checked;
    const colors = { lifespan: "#f99fbe", height: "#b4f6a2" };

    if(check1 && check2) {
        createDot(svg, data, scaleX, attr_area, colors.lifespan, d => scaleY(d.values[1]), -5);
        createDot(svg, data, scaleX, attr_area, colors.height, d => scaleY(d.values[0]), 5);
    }
    else if(check1) {
        createDot(svg, data, scaleX, attr_area, colors.lifespan, d => scaleY(d.values[1]));
    }
    else if(check2) {
        createDot(svg, data, scaleX, attr_area, colors.height, d => scaleY(d.values[0]));
    }
}

// Функция рисует точки
function createDot(svg, data, scaleX, attr_area, color, value, shift = 0){
    const r = 4;
    svg.selectAll(".dot")
       .data(data)
       .enter()
       .append("circle")
       .attr("r", r)
       .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + shift)
       .attr("cy", value)
       .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
       .style("fill", color);
}

// Функция рисует столбцы гистограммы
function createGist(svg, data, scaleX, scaleY, attr_area, color, value, shift = 0){
    svg.selectAll(".dot")
       .data(data)
       .enter()
       .append("line")
       .attr("x1", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + shift)
       .attr("y1", value)
       .attr("x2", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + shift)
       .attr("y2", scaleY.range()[0]) // основание линии
       .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
       .attr("stroke", color)
       .attr("stroke-width", 10);
}

function createChartLine(svg, data, scaleX, scaleY, attr_area) {
    const check1 = d3.select("#check1").node().checked;
    const check2 = d3.select("#check2").node().checked;
    const colors = { lifespan: "#f99fbe", height: "#b4f6a2" };

    if(check1 && check2) {
        createLine(svg, data, scaleX, scaleY, attr_area, colors.lifespan, d => scaleY(d.values[1]));
        createLine(svg, data, scaleX, scaleY, attr_area, colors.height, d => scaleY(d.values[0]));
    }
    else if(check1) {
        createLine(svg, data, scaleX, scaleY, attr_area, colors.lifespan, d => scaleY(d.values[1]));
    }
    else if(check2) {
        createLine(svg, data, scaleX, scaleY, attr_area, colors.height, d => scaleY(d.values[0]));
    }
}

// Функция для рисования линии
function createLine(svg, data, scaleX, scaleY, attr_area, color, valueFunc) {

    const lineGenerator = d3.line()
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .y(valueFunc)
        .curve(d3.curveMonotoneX);

    //линия
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", lineGenerator)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);

    //точки на линии
    svg.selectAll(".line-dot-" + color.replace('#', ''))
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "line-dot-" + color.replace('#', ''))
        .attr("r", 4)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", valueFunc)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color);
}