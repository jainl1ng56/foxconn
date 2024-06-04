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
});
