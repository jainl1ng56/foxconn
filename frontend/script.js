document.addEventListener('DOMContentLoaded', () => {
    const deviceForm = document.getElementById('device-form');
    const deviceList = document.getElementById('device-list');
    const queryButton = document.getElementById('query-button');
    const totalButton = document.getElementById('total-button');
    const clearButton = document.getElementById('clear-button');

    // Fetch devices table
    function fetchDevices() {
        fetch('/api/devices')
            .then(response => response.json())
            .then(data => {
                deviceList.innerHTML = ''; // clear table
                data.forEach(device => {
                    addDeviceToTable(device);
                });
                updateDeviceTableHeaders();
            })
            .catch(error => {
                console.error('Error fetching devices:', error);
                alert('Error fetching devices');
            });
    }

    // Update table headers
    function updateDeviceTableHeaders() {
        const headers = document.querySelector('.device-list-container thead tr');
        headers.innerHTML = `
            <th>Owner</th>
            <th>Date</th>
            <th>Device Name</th>
            <th>Device Model</th>
            <th>Count</th>
            <th>Project</th>
            <th>Location</th>
            <th>Action</th>
        `;
    }

    // Initial device table load
    fetchDevices();

    // Add device
    deviceForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(deviceForm);
        const device = {
            owner: formData.get('owner'),
            date: formData.get('date'),
            name: formData.get('name'),
            model: formData.get('model'),
            count: formData.get('count'),
            project: formData.get('project'),
            location: formData.get('location')
        };

        fetch('/api/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(device)
        })
            .then(response => response.json())
            .then(newDevice => {
                fetchDevices(); // reload device table & Update table content
                deviceForm.reset();
            })
            .catch(error => {
                console.error('Error adding device:', error);
                alert('Error adding device');
            });
    });

    clearButton.addEventListener('click', () => {
        deviceForm.reset();
    });

    // Query device
    queryButton.addEventListener('click', () => {
        const formData = new FormData(deviceForm);
        const query = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            if (value) {
                query.append(key, value);
            }
        }

        fetch(`/api/search?${query.toString()}`)
            .then(response => response.json())
            .then(data => {
                deviceList.innerHTML = '';
                
                // Update list headers
                updateDeviceTableHeaders();

                data.forEach(device => {
                    addDeviceToTable(device);
                });
            })
            .catch(error => {
                console.error('Error searching devices:', error);
                alert('Error searching devices');
            });
    });

    // Check total value
    totalButton.addEventListener('click', () => {
        // First call update total API
        fetch('/api/updateTotal', {
            method: 'POST'
        })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            // After updating, fetch total table data
            fetch('/api/totals')
                .then(response => response.json())
                .then(data => {
                    deviceList.innerHTML = ''; // Clear table
    
                    // Create total table rows
                    data.forEach(item => {
                        const row = document.createElement('tr');
    
                        row.innerHTML = `
                            <td>${item.name}</td>
                            <td>${item.model}</td>
                            <td>${item.totalcount}</td>
                            <td>${item.receivedcount}</td>
                            <td>${item.NaQing}</td>
                            <td>${item.HuYao}</td>
                            <td>${item.GDL}</td>
                        `;
    
                        deviceList.appendChild(row);
                    });
    
                    // Update table headers to total data headers
                    const headers = document.querySelector('.device-list-container thead tr');
                    headers.innerHTML = `
                        <th>Name</th>
                        <th>Model</th>
                        <th>Total Count</th>
                        <th>Received Count</th>
                        <th>NaQing</th>
                        <th>HuYao</th>
                        <th>GDL</th>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching totals:', error);
                    alert('Error fetching totals');
                });
        })
        .catch(error => {
            console.error('Error updating total:', error);
            alert('Error updating total');
        });
    });
    
    // Add device to the table
    function addDeviceToTable(device) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${device.owner}</td>
            <td>${new Date(device.date).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
            <td>${device.name}</td>
            <td>${device.model}</td>
            <td>${device.count}</td>
            <td>${device.project}</td>
            <td>${device.location}</td>
            <td><button data-id="${device.id}">Delete</button></td>
        `;
        deviceList.appendChild(row);

        row.querySelector('button').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this device?')) {
                fetch(`/api/devices/${device.id}`, {
                    method: 'DELETE'
                }).then(() => {
                    row.remove();
                }).catch(error => {
                    console.error('Error deleting device:', error);
                    alert('Error deleting device');
                });
            }
        });
    }
});