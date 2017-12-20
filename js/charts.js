getIndex.addEventListener('change', getAndDraw);

function getAndDraw(e) {
    e.preventDefault();
    google.charts.load('current', { 'packages': ['corechart'] });
    var selectedIndex = (event.target.selectedIndex);
    var city = event.target[selectedIndex].dataset.city;
    var classyear = event.target[selectedIndex].dataset.classyear;
    var students = data[city][classyear]['students']
    var totalStudentsGeneration = data[city][classyear]['students'].length;
    var techScore = []
    var hseScore = []
    for (var i = 0; i < totalStudentsGeneration; i++) {
        var sprintsNumber = data[city][classyear]['students'][i]['sprints'].length;
    }
    //console.log(sprintsNumber)

    var numberCity = document.getElementById('number-city')
    var numberGeneration = document.getElementById('number-generation')
    var title = document.getElementById('title');
    var totalStudentsCity = 0
    if (data[city]['2017-2'] !== undefined) {
        totalStudentsCity = totalStudentsCity + data[city]['2017-2']['students'].length
    }
    if (data[city]['2017-1'] !== undefined) {
        totalStudentsCity = totalStudentsCity + data[city]['2017-1']['students'].length
    }
    if (data[city]['2016-2'] !== undefined) {
        totalStudentsCity = totalStudentsCity + data[city]['2016-2']['students'].length
    }

    numberCity.innerText = 'Estudiantes por sede: ' + totalStudentsCity
    numberGeneration.innerText = 'Estudiantes por generación: ' + totalStudentsGeneration
    var cityText = ''
    if (city === 'AQP') {
        cityText = 'AREQUIPA'
    } else if (city === 'LIM') {
        cityText = 'LIMA'
    } else if (city === 'SCL') {
        cityText = 'SANTIAGO'
    } else if (city === 'CDMX') {
        cityText = 'CIUDAD DE MEXICO'
    }
    title.innerText = cityText + ' ' + classyear


    countActive = 0
    activeArrayStudents = []
    for (var j = 0; j < data[city][classyear]['students'].length; j++) {
        if (data[city][classyear]['students'][j]['active'] === true) {
            countActive = countActive + 1;
            activeArrayStudents.push()
        }
    }
    countInactive = totalStudentsGeneration - countActive;
    var numberCity = document.getElementById('number-city')
    var numberGeneration = document.getElementById('number-generation')
    var ratings = data[city][classyear]['ratings'];
    var arrayScoreJedi = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayScoreJedi[i] = ratings[i].jedi;
    }

    var arrayScoreTeachers = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayScoreTeachers[i] = ratings[i].teacher;
    }

    var teacherAvg = eval(arrayScoreTeachers.join('+')) / arrayScoreTeachers.length
    teacherAvg = teacherAvg.toFixed(2)
    var teacherAvgText = document.getElementsByClassName('teacher-avg')

    for (var i = 0; i < teacherAvgText.length; i++) {
        teacherAvgText[i].innerText = 'Puntaje: ' + teacherAvg
    }



    var arrayRecommend = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayRecommend[i] = 100 - ratings[i]['student']['no-cumple']
    }

    var arrayPromoters = [];
    var arrayPassive = [];
    var arrayDetractors = [];

    for (var i = 0; i < ratings.length; i++) {
        arrayPromoters[i] = ratings[i]['nps']['promoters'];
        arrayPassive[i] = ratings[i]['nps']['passive'];
        arrayDetractors[i] = ratings[i]['nps']['detractors'];
    }

    promoters = eval(arrayPromoters.join('+')) / arrayPromoters.length
    passive = eval(arrayPassive.join('+')) / arrayPassive.length
    detractors = eval(arrayDetractors.join('+')) / arrayDetractors.length


    //calculando el porcentaje de alumnas que superan el 70%
    var studentsTechScore = []
    var studentsHseScore = []
    var studentsTargetTech = []
    var studentsTargetHse = []

    for (var i = 0; i < students.length; i++) {
        var sprints = students[i]['sprints'].length;
        for (var j = 0; j < sprints; j++) {
            if (students[i]['active'] === true) {
                studentsTechScore.push(students[i]['sprints'][j]['score']['tech'])
            }
        }
    }

    for (var i = 0; i < studentsTechScore.length; i++) {
        if (studentsTechScore[i] > 1260) {
            studentsTargetTech.push(studentsTechScore[i])
        }
    }

    var percentagePassedTech = studentsTargetTech.length * 100 / studentsTechScore.length

    for (var i = 0; i < students.length; i++) {
        var sprints = students[i]['sprints'].length;
        for (var j = 0; j < sprints; j++) {
            if (students[i]['active'] === true) {
                studentsHseScore.push(students[i]['sprints'][j]['score']['hse'])
            }
        }
    }

    for (var i = 0; i < studentsHseScore.length; i++) {
        if (studentsHseScore[i] > 840) {
            studentsTargetHse.push(studentsHseScore[i])
        }
    }

    var percentagePassedHse = studentsTargetHse.length * 100 / studentsHseScore.length
    var percentajePassedTotal = (percentagePassedHse + percentagePassedTech) / 2
    var percentajeNotPassedTotal = 100 - percentajePassedTotal

    var activeStudentsArray = []
    for (var i = 0; i < students.length; i++) {
        if (students[i]['active'] === true) {
            activeStudentsArray.push(students[i])
        }
    }


    var sprintTech0 = 0
    var sprintTech1 = 0
    var sprintTech2 = 0
    var sprintTech3 = 0

    for (var i = 0; i < activeStudentsArray.length; i++) {
        if (activeStudentsArray[i]['sprints'][0]['score']['tech'] > 1260) {
            sprintTech0 = sprintTech0 + 1
        }
        if (activeStudentsArray[i]['sprints'][1]['score']['tech'] > 1260) {
            sprintTech1 = sprintTech1 + 1
        }
        if (activeStudentsArray[i]['sprints'][2] && activeStudentsArray[i]['sprints'][2]['score']['tech'] > 1260) {
            sprintTech2 = sprintTech2 + 1
        }
        if (activeStudentsArray[i]['sprints'][3] && activeStudentsArray[i]['sprints'][3]['score']['tech'] > 1260) {
            sprintTech3 = sprintTech3 + 1
        }
    }

    var sprintHse0 = 0
    var sprintHse1 = 0
    var sprintHse2 = 0
    var sprintHse3 = 0

    for (var i = 0; i < activeStudentsArray.length; i++) {
        if (activeStudentsArray[i]['sprints'][0]['score']['hse'] > 840) {
            sprintHse0 = sprintHse0 + 1
        }
        if (activeStudentsArray[i]['sprints'][1]['score']['hse'] > 840) {
            sprintHse1 = sprintHse1 + 1
        }
        if (activeStudentsArray[i]['sprints'][2] && activeStudentsArray[i]['sprints'][2]['score']['hse'] > 840) {
            sprintHse2 = sprintHse2 + 1
        }
        if (activeStudentsArray[i]['sprints'][3] && activeStudentsArray[i]['sprints'][3]['score']['hse'] > 840) {
            sprintHse3 = sprintHse3 + 1
        }
    }

    sprintTech0 = (sprintTech0 * 100) / countActive
    sprintTech1 = (sprintTech1 * 100) / countActive
    sprintTech2 = (sprintTech2 * 100) / countActive
    sprintTech3 = (sprintTech3 * 100) / countActive
    sprintHse0 = (sprintHse0 * 100) / countActive
    sprintHse1 = (sprintHse1 * 100) / countActive
    sprintHse2 = (sprintHse2 * 100) / countActive
    sprintHse3 = (sprintHse3 * 100) / countActive

    // gráficas
    google.charts.setOnLoadCallback(drawActiveChart);
    google.charts.setOnLoadCallback(drawTargetChart);
    google.charts.setOnLoadCallback(drawTechChart);
    google.charts.setOnLoadCallback(drawHSEChart);
    google.charts.setOnLoadCallback(drawJediChart);
    google.charts.setOnLoadCallback(drawRecommendChart);
    google.charts.setOnLoadCallback(drawNPSChart);
    google.charts.setOnLoadCallback(drawTeacherChart);

    // gráfica de estudiantes activas - inactivas
    function drawActiveChart() {
        var activeData = new google.visualization.DataTable();
        activeData.addColumn('string', 'Estudiantes');
        activeData.addColumn('number', 'Numero');
        activeData.addRows([
            ['Activas', countActive],
            ['Inactivas', countInactive],
        ]);
        var options = {
            'title': 'Estudiantes activas',
            'width': 530,
            'height': 400,
            'colors': ['#3068C5', '#d3d3d3'],
            'fontSize': 15,
        };
        var activeChart = new google.visualization.PieChart(document.getElementById('chart-active'));
        activeChart.draw(activeData, options);
    }

    // gráfica de estudiantes que cumplen la meta 
    function drawTargetChart() {
        var targetData = new google.visualization.DataTable();
        targetData.addColumn('string', 'Estudiantes');
        targetData.addColumn('number', 'Numero');
        targetData.addRows([
            ['Cumplen meta', percentajePassedTotal],
            ['No cumplen meta', percentajeNotPassedTotal],
        ]);
        var options = {
            'title': 'Estudiantes que cumplen la meta',
            'width': 530,
            'height': 400,
            'colors': ['#00A86B', '#FF0000'],
            'fontSize': 15,
        };
        var targetChart = new google.visualization.PieChart(document.getElementById('chart-target'));
        targetChart.draw(targetData, options);
    }

    //Gráfica que muestra el porcetanje de alumnas que cumplen la meta TECH
    function drawTechChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Porcentaje'],
            ['1', sprintTech0],
            ['2', sprintTech1],
            ['3', sprintTech2],
            ['4', sprintTech3]
        ]);
        var options = {
            title: 'Porcentaje de alumnas que cumplen la meta Tech',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            width: 530,
            fontSize: 15,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart-tech'));
        chart.draw(data, options);
    }

    //Gráfica que muestra el porcetanje de alumnas que cumplen la meta HSE
    function drawHSEChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Porcentaje'],
            ['1', sprintHse0],
            ['2', sprintHse1],
            ['3', sprintHse2],
            ['4', sprintHse3],
        ]);
        var options = {
            title: 'Porcentaje de alumnas que cumplen la meta HSE',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            width: 530,
            fontSize: 15,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart-hse'));
        chart.draw(data, options);
    }

    // Grafica para el NPS
    function drawNPSChart() {
        var NPSData = new google.visualization.DataTable();
        NPSData.addColumn('string', 'Estudiantes');
        NPSData.addColumn('number', 'Numero');
        NPSData.addRows([
            ['Promotoras', promoters],
            ['Detractoras', detractors],
            ['Pasivas', passive],
        ]);
        var options = {
            'title': 'Net Promote Score',
            'width': 530,
            'height': 400,
            'fontSize': 15,
            'colors': ['#00A86B', '#FF0000', '#d3d3d3']
        };
        var activeChart = new google.visualization.PieChart(document.getElementById('chart-nps'));
        activeChart.draw(NPSData, options);
    }

    // Gráfica de estudiantes satisfechas
    function drawRecommendChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Porcentaje'],
            ['1', arrayRecommend[0]],
            ['2', arrayRecommend[1]],
            ['3', arrayRecommend[2]],
            ['4', arrayRecommend[3]]
        ]);

        var options = {
            title: 'Porcentaje de estudiantes satisfechas',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            fontSize: 15,
            width: 530,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart-recommend'));
        chart.draw(data, options);
    }

    // gráfica de rating de jedi 
    function drawJediChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Puntaje'],
            ['1', arrayScoreJedi[0]],
            ['2', arrayScoreJedi[1]],
            ['3', arrayScoreJedi[2]],
            ['4', arrayScoreJedi[3]],
        ]);
        var options = {
            title: 'Puntaje Jedis',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            fontSize: 15,
            width: 530,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart-jedi'));
        chart.draw(data, options);
    }

    // gráfica de rating de teacher
    function drawTeacherChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Puntaje'],
            ['1', arrayScoreTeachers[0]],
            ['2', arrayScoreTeachers[1]],
            ['3', arrayScoreTeachers[2]],
            ['4', arrayScoreTeachers[3]],
        ]);
        var options = {
            title: 'Puntaje Teachers',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            fontSize: 15,
            width: 530,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart-teacher'));
        chart.draw(data, options);
    }

}