var form = document.getElementById("studentForm");
var list = document.getElementById("studentList");
var message = document.getElementById("message");


/// ADD STUDENT

form.addEventListener("submit", function(event) {

    event.preventDefault();

    var formData = new FormData();

    formData.append("name", form.elements["name"].value);
    formData.append("rollNO", form.elements["rollNO"].value);
    formData.append("className", form.elements["className"].value);
    formData.append("email", form.elements["email"].value);

    fetch("add_student.php", {
        method: "POST",
        body: formData
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        console.log("Add Student:", data);

        if (data.success === true) {

            message.textContent = "Student added successfully";

            form.reset();

            loadStudents();

        } else {

            message.textContent = data.message;

        }

    })
    .catch(function(error) {

        console.log("Add Student Error:", error);

        message.textContent = "Error adding student";

    });

});


// =========================
// LOAD STUDENTS
// =========================

function loadStudents() {

    fetch("get_student.php")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        console.log("Students:", data);

        list.innerHTML = "";

        if (data.success === true) {

            if (data.students.length === 0) {

                var emptyRow = document.createElement("tr");

                var emptyCell = document.createElement("td");

                emptyCell.colSpan = 6;
                emptyCell.textContent = "No students found";

                emptyRow.appendChild(emptyCell);
                list.appendChild(emptyRow);

                return;
            }

            data.students.forEach(function(student) {

                var row = document.createElement("tr");


                // ID
                var idCell = document.createElement("td");
                idCell.textContent = student.id;


                // Name
                var nameCell = document.createElement("td");
                nameCell.textContent = student.name;


                // Roll No
                var rollCell = document.createElement("td");
                rollCell.textContent = student.rollNO;


                // Class
                var classCell = document.createElement("td");
                classCell.textContent = student.className;


                // Email
                var emailCell = document.createElement("td");
                emailCell.textContent = student.email;


                // Action
                var actionCell = document.createElement("td");

                var deleteButton = document.createElement("button");

                deleteButton.textContent = "Delete";
                deleteButton.className = "delete-btn";
                deleteButton.type = "button";

                deleteButton.addEventListener("click", function() {
                    deleteStudent(student.id);
                });

                actionCell.appendChild(deleteButton);


                // Add cells to row
                row.appendChild(idCell);
                row.appendChild(nameCell);
                row.appendChild(rollCell);
                row.appendChild(classCell);
                row.appendChild(emailCell);
                row.appendChild(actionCell);


                // Add row to table
                list.appendChild(row);

            });

        } else {

            message.textContent = data.message || "Unable to load students";

        }

    })
    .catch(function(error) {

        console.log("Load Error:", error);

        message.textContent = "Unable to load students";

    });

}


// =========================
// DELETE STUDENT
// =========================

function deleteStudent(id) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    fetch("delete_student.php?id=" + encodeURIComponent(id))
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        console.log("Delete Student:", data);

        if (data.success === true) {

            message.textContent = "Student deleted successfully";

            loadStudents();

        } else {

            message.textContent = data.message || "Student could not be deleted";

        }

    })
    .catch(function(error) {

        console.log("Delete Error:", error);

        message.textContent = "Error deleting student";

    });

}


// =========================
// LOAD STUDENTS WHEN PAGE OPENS
// =========================

loadStudents();
console.log("SCRIPT JS IS WORKING");