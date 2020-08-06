const cart = document.getElementById('cart');
const courses = document.getElementById('list-courses');
const listcourses = document.querySelector('#list-cart t-body');
const emptycartbutton = document.getElementById('empty-cart');

function loadeventlisteners() {
    courses.addEventListener('click', buycourse);
    courses.addEventListener('click', deletecourse);
    emptycartbutton.addEventListener('click', emptycart);
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

function buycourse(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-cart')) {
        const course = e.target.parentElement.parentElement;
        readDataCourse(course);
    }
}

function readDataCourse(course) {
    const infocourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.discount').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    insertincart(infocourse);
}

function insertincart(course) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>
    <img src="${course.image}" width=100>
    </td>
    <td>${course.title}</td>
    <td>${course.price}</td>
    <td><a href="#" class="delete-course" data-id="${course.id}">X</a></td>
    `;
    listcourses.appendChild(row);
    savecourseLocalStorage('course');
}

function deletecourse(e) {
    e.preventDefault();
    let course, courseID;
    if(e.target.classList.contains('delete-course')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseID = course.querySelector('a').getAttribute('data-id');
    }
    deletecourseLocalStorage(courseID);
}

function emptycart() {
    while (listcourses.firstChild) {
        listcourses.removeChild(listcourses.firstChild);
    }
    emptyLocalStorage();
    return false;
}

function savecourseLocalStorage(course) {
    let courses;
    courses = getcoursesLocalStorage();
    courses.push(course);
    localStorage.setitem('courses', JSON.stringify(course));
}

function getcoursesLocalStorage() {
    let coursesls;
    if(localStorage.getItem('courses'==null)) {
        coursesls = [];
    }
    else {
        coursesls = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesls;
}

function readLocalStorage() {
    let coursesls;
    coursesls = getcoursesLocalStorage();
    coursesls.forEach(function (course) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>
        <img src="${course.image}" width=100>
        </td>
        <td>${course.title}</td>
        <td>${course.price}</td>
        <td><a href="#" class="delete-course" data-id="${course.id}">X</a></td>
        `;
        listcourses.appendChild(row);
    });
}

function deletecourseLocalStorage(course) {
    let coursesls;
    coursesls = getcoursesLocalStorage();
    coursesls.forEach(function (coursels, index) {
        if(coursels.id===course) {
            coursels.splice(index, 1);
        }
    });
    localStorage.setitem('courses', JSON.stringify(course));
}

function emptyLocalStorage() {
    localStorage.clear();
}