var students = data['CDMX']['2017-2']['students'];
var studentsScoresArray = [];
var studentsTechScore = []
var studentsHseScore = []
studentsArray = []
studentsTargetTech = []
studentsTargetHse = []

for (var i = 0; i < students.length; i++) {
    var sprints = students[i]['sprints'].length;
    for (var j = 0; j < sprints; j++) {
        if (students[i]['active'] === true) {
            studentsTechScore.push(students[i]['sprints'][j]['score']['tech'])
        }
    }
}

for (var i = 0; i < studentsTechScore.length; i++) {
    if (studentsTechScore[i] > 1280) {
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
percentajePassedTotal = (percentagePassedHse + percentagePassedTech) / 2
percentajeNotPassedTotal = 100 - percentajePassedTotal

/*
var sprint1 = [];
var sprint2 = [];
var sprint3 = [];
var sprint4 = [];

for (var i in students) {

    console.log(students[i]['sprints'][0]['score']['tech'])
}



    sprint1.push(students[i]['sprints'][0]['score'].tech 
    sprint2.push(students[i]['sprints'][1]['score'].tech 
    sprint3.push(students[i]['sprints'][2]['score'].tech 
    sprint4.push(students[i]['sprints'][3]['score'].tech 
}
TotalSprint = [sprint1, sprint2, sprint3, sprint4]

console.log(TotalArray)
*/