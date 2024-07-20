let studentData = JSON.parse(localStorage.getItem('students') || '[]');
let sno = 1;


function deleteStudent(index) {
  studentData.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(studentData));
  populateTable();
}

// Function to populate the table with data from local storage
function populateTable() {
  const tableBody = document.getElementById('student-table-body');
  tableBody.innerHTML = '';
  studentData.forEach((student, index) => {
    const tableRow = `
      <tr>
        <td>${index + 1}</td>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.fatherName}</td>
        <td>${student.email}</td>
        <td>${student.institute}</td>
        <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
      </tr>
    `;
    tableBody.innerHTML += tableRow;
  });
}

// Call the populateTable function when the page loads
populateTable();

document.getElementById('add-student-btn').addEventListener('click', () => {
  document.querySelector('.form-container').style.display = 'block';
});

document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const fatherName = document.getElementById('father-name').value;
  const email = document.getElementById('email').value;
  const institute = document.getElementById('institute').value;


  if (name && fatherName && email && institute) {
    const student = {
      id: `STU-${sno}`,
      name,
      fatherName,
      email,
      institute
    };

    studentData.push(student);
    localStorage.setItem('students', JSON.stringify(studentData));
    sno++;

    populateTable();

    document.getElementById('name').value = '';
    document.getElementById('father-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('institute').value = '';
    document.querySelector('.form-container').style.display = 'none';
  } else {
    alert('Please fill in all the fields!');
  }
});

