document.addEventListener('DOMContentLoaded', () => {
    const deviceForm = document.getElementById('device-form');
    const deviceList = document.getElementById('device-list');
    const queryButton = document.getElementById('query-button');

    // 获取设备列表并显示
    fetch('http://localhost:3000/api/devices')
        .then(response => response.json())
        .then(data => {
            data.forEach(device => {
                addDeviceToTable(device);
            });
        });

    // 添加设备
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

        fetch('http://localhost:3000/api/devices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(device)
        })
            .then(response => response.json())
            .then(newDevice => {
                addDeviceToTable(newDevice);
                deviceForm.reset();
            });
    });

    // 查询设备
    queryButton.addEventListener('click', () => {
        const formData = new FormData(deviceForm);
        const query = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            if (value) {
                query.append(key, value);
            }
        }

        fetch(`http://localhost:3000/api/search?${query.toString()}`)
            .then(response => response.json())
            .then(data => {
                deviceList.innerHTML = '';
                // 更新表格標題
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
                data.forEach(device => {
                    addDeviceToTable(device);
                });
            });
    });

    // 在表格中添加设备
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
            fetch(`http://localhost:3000/api/devices/${device.id}`, {
                method: 'DELETE'
            }).then(() => {
                row.remove();
            });
        });
    }

    // Total button event handler
    document.getElementById('total-button').addEventListener('click', function() {
        fetch('http://localhost:3000/api/totals')
            .then(response => response.json())
            .then(data => {
                const deviceListContainer = document.querySelector('.device-list-container');
                const deviceList = document.getElementById('device-list');

                // Clear the existing table body
                deviceList.innerHTML = '';

                // Create new rows for each item in the total data
                data.forEach(item => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.model}</td>
                        <td>${item.totalcount}</td>
                        <td>${item.currentcount}</td>
                    `;

                    deviceList.appendChild(row);
                });

                // Update table headers to match the total table
                const headers = document.querySelector('.device-list-container thead tr');
                headers.innerHTML = `
                    <th>Name</th>
                    <th>Model</th>
                    <th>Total Count</th>
                    <th>Current Count</th>
                `;
            })
            .catch(error => {
                console.error('Error fetching totals:', error);
            });
    });
});
