let rowsData = [

];

let sortDirection = true;

const tableBody = document.getElementById('table-body');
const nameInput = document.getElementById('name-input');
const ageInput = document.getElementById('age-input');
const addRowBtn = document.getElementById('add-row-btn');

function renderTable() {
    tableBody.innerHTML = "";
    rowsData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editRow(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteRow(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

addRowBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value);

    if (!name || isNaN(age)) {
        alert("Please enter both Name and Age!");
        return;
    }

    rowsData.push({ name, age });
    nameInput.value = "";
    ageInput.value = "";
    renderTable();
});

function deleteRow(index) {
    rowsData.splice(index, 1);
    renderTable();
}

function editRow(index) {
    const newName = prompt("Edit Name:", rowsData[index].name);
    const newAge = prompt("Edit Age:", rowsData[index].age);

    if (newName && newName.trim() && !isNaN(parseInt(newAge))) {
        rowsData[index].name = newName.trim();
        rowsData[index].age = parseInt(newAge);
        renderTable();
    }
}

document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', () => {
        const key = header.getAttribute('data-key');
        
        rowsData.sort((a, b) => {
            if (typeof a[key] === 'string') {
                return sortDirection ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
            } else {
                return sortDirection ? a[key] - b[key] : b[key] - a[key];
            }
        });

        sortDirection = !sortDirection;
        renderTable();
    });
});

renderTable();