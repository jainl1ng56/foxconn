document.addEventListener('DOMContentLoaded', () => {
    const deviceForm = document.getElementById('device-form');
    const deviceList = document.getElementById('device-list');
    const queryButton = document.getElementById('query-button');

    // Get device list from server and display it
    fetch('http://localhost:3000/api/devices')
        .then(response => response.json())
        .then(data => {
            data.forEach(device => addDeviceToTable(device));
        });

    // Handle form submission to add new device
    deviceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(deviceForm);
        const owner = formData.get('owner');
        const date = formData.get('date');
        const name = formData.get('device-name');
        const model = formData.get('device-model');
        const count = formData.get('count');
        const project = formData.get('project');
        const location = formData.get('location');

        const device = { owner, date, name, model, count, project, location };

        fetch('http://localhost:3000/api/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(device),
        })
            .then(response => response.json())
            .then(data => {
                addDeviceToTable(data);
                deviceForm.reset();
                alert('Device added successfully!');
            })
            .catch(error => {
                console.error('Error adding device:', error);
                alert('Failed to add device.');
            });
    });

    // Handle form submission to search devices
    queryButton.addEventListener('click', () => {
        const formData = new FormData(deviceForm);
        const params = new URLSearchParams();
        formData.forEach((value, key) => {
            if (value) {
                params.append(key, value);
            }
        });

        fetch(`http://localhost:3000/api/search?${params.toString()}`)
            .then(response => response.json())
            .then(data => {
                deviceList.innerHTML = ''; // Clear current device list
                data.forEach(device => addDeviceToTable(device));
            })
            .catch(error => {
                console.error('Error searching devices:', error);
                alert('Failed to search devices.');
            });
    });

    // Function to delete device
    function deleteDevice(id) {
        fetch(`http://localhost:3000/api/devices/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    alert('Device deleted successfully!');
                    location.reload(); // Refresh page after deletion
                } else {
                    throw new Error('Failed to delete device');
                }
            })
            .catch(error => {
                console.error('Error deleting device:', error);
                alert('Failed to delete device.');
            });
    }

    // Function to add device to table
    function addDeviceToTable(device) {
        const row = document.createElement('tr');

        const ownerCell = document.createElement('td');
        ownerCell.textContent = device.owner;
        row.appendChild(ownerCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = device.date;
        row.appendChild(dateCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = device.name;
        row.appendChild(nameCell);

        const modelCell = document.createElement('td');
        modelCell.textContent = device.model;
        row.appendChild(modelCell);

        const countCell = document.createElement('td');
        countCell.textContent = device.count;
        row.appendChild(countCell);

        const projectCell = document.createElement('td');
        projectCell.textContent = device.project;
        row.appendChild(projectCell);

        const locationCell = document.createElement('td');
        locationCell.textContent = device.location;
        row.appendChild(locationCell);

        const deleteCell = document.createElement('td'); // Create new cell for delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteDevice(device.id));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        deviceList.appendChild(row);
    }
});
