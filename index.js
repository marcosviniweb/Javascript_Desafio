const headers = ['First Name', 'Last Name', 'Maiden Name', 'Age', 'Gender', 'Email', 'Phone'];

function createTableHeader(headers) {
    const row = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = header;
        row.appendChild(th);
    });
    return row;
}

async function fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }

    return await response.json();
}

function createTableRow(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.maidenName}</td>
        <td>${user.age}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
    `;
    return row;
}

async function main() {
    const apiURL = 'https://dummyjson.com/users';
    const table = document.querySelector('table');
    const tableBody = document.querySelector('table tbody');
    const tableHead = document.querySelector('table thead');
    const searchInput = document.querySelector('.form-control');
    const searchButton = document.querySelector('#button-addon1');

    tableBody.innerHTML = '';
    tableHead.innerHTML = '';

    const headerRow = createTableHeader(headers);
    tableHead.appendChild(headerRow);

    try {
        const loadingMessage = document.createElement('tr');
        loadingMessage.innerHTML = '<td colspan="7">Carregando...</td>';
        tableBody.appendChild(loadingMessage);

        const data = await fetchData(apiURL);

        tableBody.removeChild(loadingMessage);

        const allUsers = data.users;

        function displayUsers(users) {
            tableBody.innerHTML = '';
            users.forEach(user => {
                const row = createTableRow(user);
                tableBody.appendChild(row);
            });
        }

        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const filteredUsers = allUsers.filter(user => {
                return (
                    user.firstName.toLowerCase().includes(searchTerm) ||
                    user.lastName.toLowerCase().includes(searchTerm) ||
                    user.maidenName.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm) ||
                    user.phone.toLowerCase().includes(searchTerm)
                );
            });
            displayUsers(filteredUsers);
        });

        displayUsers(allUsers);

    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
    }
}

main();


