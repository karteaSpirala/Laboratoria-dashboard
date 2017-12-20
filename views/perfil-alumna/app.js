google.charts.load('current', { 'packages': ['corechart'] });

function drawChartOne() {
    var activeData = new google.visualization.DataTable();
    activeData.addColumn('string', 'Porcentaje');
    activeData.addColumn('number', 'Numero');
    activeData.addRows([
        ['Activas', 79],
        ['Inactivas', 21],
    ]);
    var options = {
        'title': 'Porcentaje TECH',
        'width': 530,
        'height': 400,
        'colors': ['#3068C5', '#d3d3d3'],
        'fontSize': 15,
    };
    var activeChart = new google.visualization.PieChart(document.getElementById('chart-1'));
    activeChart.draw(activeData, options);
}