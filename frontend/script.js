document.addEventListener('DOMContentLoaded', () => {
    const deviceForm = document.getElementById('add-device-form');
    const deviceList = document.getElementById('device-list');

    // Get device list from server and display it
    fetch('http://localhost:3000/api/devices')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched devices:', data); // Debug log
            data.forEach(device => addDeviceToTable(device));
        })
        .catch(error => {
            console.error('Error fetching devices:', error);
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
        const status = formData.get('status');

        const device = { owner, date, name, model, count, status };

        console.log('Submitting device:', device); // Debug log

        fetch('http://localhost:3000/api/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(device),
        })
            .then(response => {
                console.log('Response status:', response.status); // Debug log
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Device added:', data); // Debug log
                addDeviceToTable(data);
                deviceForm.reset();
                alert('Device added successfully!');
            })
            .catch(error => {
                console.error('Error adding device:', error);
                alert('Failed to add device.');
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

        const statusCell = document.createElement('td');
        statusCell.textContent = device.status;
        row.appendChild(statusCell);

        const deleteCell = document.createElement('td'); // Create new cell for delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteDevice(device.id));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        deviceList.appendChild(row);
    }
});
