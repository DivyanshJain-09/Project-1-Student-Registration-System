//  selection form and body button
const form1 = document.querySelector("form")
const tableBody = document.querySelector("#stu-records")
//  load exiting students from local storage
window.addEventListener("load", () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach((student) => appendStudentToTable(student));
})

//  add event listener to the form
form1.addEventListener("submit", addDetails)

function addDetails(myEvent) {
    // Prevent form submission and page reload
    myEvent.preventDefault();

    // get input values
    const name = document.getElementById("stu-name").value.trim()
    const id = document.getElementById("stu-id").value.trim()
    const stuClass = document.getElementById("stu-class").value.trim()
    const phone = document.getElementById("stu-phone").value.trim()
    const email = document.getElementById("stu-email").value.trim()


    // validate the name must contains only letter and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
        alert("Name must contain only letters and spaces.");
        return;
    }
    // Ensure student ID is unique
    const students = JSON.parse(localStorage.getItem("students")) || [];
    if (students.some((student) => student.id === id)) {
        alert("Student ID already exists. Please use a unique ID.");
        return;
    }
    //   storing the students details
    const student = { name, id, stuClass, phone, email }
    // save to local storage
    students.push(student)
    localStorage.setItem("students", JSON.stringify(students))
    // append  student  to the table
    appendStudentToTable(student)
    //  clearing the input fields after click on button and the student details has been added
    form1.reset();

}
// append a student to a table
function appendStudentToTable(student) {
    // creating table row
    const tableRow = document.createElement("tr")
    tableRow.innerHTML = `
    <td>${student.name}</td>
    <td>${student.id}</td>
    <td>${student.stuClass}</td>
    <td>${student.phone}</td>
    <td>${student.email}</td>
    <td>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button></td>
      `;
    tableBody.appendChild(tableRow)
    // Add event listeners for edit and delete buttons specific to this row
    const editButton = tableRow.querySelector(".edit");
    const deleteButton = tableRow.querySelector(".delete");

    editButton.addEventListener("click", () => editDetails(student, tableRow));
    deleteButton.addEventListener("click", () => deleteDetails(student, tableRow));
    
}
//  edit students details 
function editDetails(student, tableRow) {
    document.getElementById("stu-name").value = student.name
    document.getElementById("stu-id").value = student.id
    document.getElementById("stu-class").value = student.stuClass
    document.getElementById("stu-phone").value = student.phone
    document.getElementById("stu-email").value = student.email
    // remove the student from local starage and table
    deleteDetails(student, tableRow)
}
// delete student details
function deleteDetails(student, tableRow) {
    const students = JSON.parse(localStorage.getItem("students")) || []
    const updatedStudents = students.filter((s) => s.id !== student.id)
    localStorage.setItem("students", JSON.stringify(updatedStudents))
    tableRow.remove()
}

//  limit input to 10 digits for phone number
const phoneInput = document.getElementById("stu-phone");
phoneInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 10);
});
//  limit input to 3 digits for  student id
const idInput = document.getElementById("stu-id");
idInput.addEventListener("input", function () {
    this.value = this.value.slice(0, 3);
});
// Limit  input to 5 digit for class 
const classInput = document.getElementById("stu-class");
classInput.addEventListener("input", function () {
    if (this.value.length > 5) {
        this.value = this.value.slice(0, 5);
    }
});
