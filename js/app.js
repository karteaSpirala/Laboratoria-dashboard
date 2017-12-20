var classroomTab = document.getElementById('classroom');
var feedbackTab = document.getElementById('feedback');
var studentsTab = document.getElementById('students');
var teachersTab = document.getElementById('teachers');
var getIndex = document.getElementById('filter');

//Función para mostrar el contenido de la tab seleccionada y ocultar las demás
function showHide(e) {
    e.preventDefault();
    var selectedTab = e.target.dataset.selectedtab;
    if (selectedTab === 'tab-aula') {
        var tab = document.getElementsByTagName('button')
        for (var i = 0; i < tab.length; i++) {
            tab[i].classList.replace('active', 'tab')
        }
        this.classList.replace('tab', 'active')
        classroomTab.style.display = 'block';
        feedbackTab.style.display = 'none';
        studentsTab.style.display = 'none';
        teachersTab.style.display = 'none';
    } else if (selectedTab === 'tab-feedback') {
        var tab = document.getElementsByTagName('button')
        for (var i = 0; i < tab.length; i++) {
            tab[i].classList.replace('active', 'tab')
        }
        classroomTab.style.display = 'none';
        feedbackTab.style.display = 'block';
        studentsTab.style.display = 'none';
        teachersTab.style.display = 'none';
        this.classList.replace('tab', 'active')
    } else if (selectedTab === 'tab-alumnas') {
        var tab = document.getElementsByTagName('button')
        for (var i = 0; i < tab.length; i++) {
            tab[i].classList.replace('active', 'tab')
        }
        classroomTab.style.display = 'none';
        feedbackTab.style.display = 'none';
        studentsTab.style.display = 'block';
        teachersTab.style.display = 'none';
        this.classList.replace('tab', 'active')
    } else if (selectedTab === 'tab-profesores') {
        var tab = document.getElementsByTagName('button')
        for (var i = 0; i < tab.length; i++) {
            tab[i].classList.replace('active', 'tab')
        }
        classroomTab.style.display = 'none';
        feedbackTab.style.display = 'none';
        studentsTab.style.display = 'none';
        teachersTab.style.display = 'block';
        this.classList.replace('tab', 'active')
    }
}

//Función para recargar la página, acceder a cada tab y crear un evento para cada una de ellas.
function pageLoad() {
    classroomTab.style.display = 'none';
    feedbackTab.style.display = 'none';
    studentsTab.style.display = 'none';
    teachersTab.style.display = 'none';
    var tabElements = document.getElementsByClassName('tab');
    for (var i = 0; i < tabElements.length; i++) {
        tabElements[i].addEventListener('click', showHide);
    }
}
pageLoad();
//Variable para asignarle evento al select
getIndex.addEventListener('change', select);

function select(e) {
    e.preventDefault();
    classroomTab.style.display = 'block';
    feedbackTab.style.display = 'none';
    studentsTab.style.display = 'none';
    teachersTab.style.display = 'none';
    var tab = document.getElementsByTagName('button')
    for (var i = 0; i < tab.length; i++) {
        tab[i].classList.replace('active', 'tab')
    }
    tab[0].classList.replace('tab', 'active')
    var selectedIndex = (event.target.selectedIndex);
    var searchInput = document.getElementById('search-input');
    searchInput.style.display = 'inline-block';
    var teachers = document.getElementById('container');
    teachers.style.display = 'inline-block';
    var city = event.target[selectedIndex].dataset.city;
    var classyear = event.target[selectedIndex].dataset.classyear;
    var titleData = document.getElementById('title-data')
    titleData.style.display = 'block';

    /*var ratings = data[city][classyear]['ratings'];
    var arrayScoreTeachers = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayScoreTeachers.push(ratings[i].teacher)
    }

    teacherAvgNumber = eval(arrayScoreTeachers.join('+')) / arrayScoreTeachers.length


    var teacherAvg = document.getElementById('teacher-avg')
    teacherAvg[0].innerText = teacherAvgNumber
*/
    getData(city, classyear);

}

//Función para acceder a los datos
function getData(city, classyear) {
    var students = data[city][classyear]['students'];
    document.getElementById("student-container").innerHTML = "";
    var sprints = data[city][classyear]['students'][0]['sprints'].length
    for (var i = 0; i < students.length; i++) {
        var name = students[i]['name'];
        var photo = students[i]['photo'];
        var status = students[i]['active'];
        var studentTech = []
        var studentHse = []
        var tech = 0
        var hse = 0
        if (status === true) {
            status = 'Activa';
            var sprints = students[i]['sprints'].length
            for (var j = 0; j < sprints; j++) {
                studentTech.push(students[i]['sprints'][j]['score']['tech'])
            }
            var studentTechAvg = eval(studentTech.join('+'))
            var maxScoreTech = 1800 * sprints
            studentTechAvg = (studentTechAvg * 100) / maxScoreTech
            tech = studentTechAvg.toFixed(2)

            for (var j = 0; j < sprints; j++) {
                studentHse.push(students[i]['sprints'][j]['score']['hse'])
            }
            var studentHseAvg = eval(studentHse.join('+'))
            var maxScoreHse = 1200 * sprints
            studentHseAvg = (studentHseAvg * 100) / maxScoreHse
            hse = studentHseAvg.toFixed(2)

        } else if (status === false) {
            status = 'Inactiva';
            tech = ''
            hse = ''
        }
        paintStudents(name, photo, status, tech, hse);

    }
}


//Función para mostrar a las estudiantes según la opción seleccionada en el select
function paintStudents(name, photo, status, tech, hse) {
    var studentContainer = document.getElementById('student-container');
    var studentName = document.createElement('p');
    var studentPhoto = document.createElement('img');
    studentPhoto.classList.add('photo-size');
    var studentStatus = document.createElement('p');
    var studentDiv = document.createElement('div');
    var studentLink = document.createElement('a');
    var techText = document.createElement('p')
    var hseText = document.createElement('p')
    if (tech.length !== 0) {
        techText.innerText = 'Puntaje técnico: ' + tech + '%'
    }
    if (hse.length !== 0) {
        hseText.innerText = 'Puntaje HSE: ' + hse + '%'
    }
    //hseText.innerText = hse
    studentDiv.classList.add('container-students');
    studentPhoto.src = photo;
    studentLink.href = 'views/perfil-alumna/index.html';
    studentName.innerText = name;
    studentStatus.innerText = status
    studentContainer.appendChild(studentDiv);
    studentDiv.appendChild(studentLink);
    studentLink.appendChild(studentPhoto);
    studentDiv.appendChild(studentName);
    studentDiv.appendChild(studentStatus);
    studentDiv.appendChild(techText)
    studentDiv.appendChild(hseText)
}

//Función para hacer la búsqueda de estudiantes
var searchStudent = document.forms['search-student'].querySelector('input');
searchStudent.addEventListener('keyup', searching)

function searching(e) {
    e.preventDefault()
    var searched = e.target.value.toLowerCase();
    studentArray = Array.from(document.getElementsByClassName('container-students'));
    studentArray.forEach(function(eachStudent) {
        var studentName = eachStudent.children[1].textContent;
        if (studentName.toLowerCase().indexOf(searched) !== -1) {
            eachStudent.style.display = 'inline-block';
        } else {
            eachStudent.style.display = 'none';
        }
    })
}