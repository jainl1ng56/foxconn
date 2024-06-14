document.addEventListener('DOMContentLoaded', () => {
    const deviceForm = document.getElementById('device-form');
    const deviceList = document.getElementById('device-list');
    const queryButton = document.getElementById('query-button');
    const totalButton = document.getElementById('total-button');
    const claerbutton = document.getElementById('clear-button');

    // Get devices table
    function fetchDevices() {
        fetch('/api/devices')
            .then(response => response.json())
            .then(data => {
                deviceList.innerHTML = ''; // clear table
                data.forEach(device => {
                    addDeviceToTable(device);
                });
                updateDeviceTableHeaders();
            });
    }

    // Update table title
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

    // inital device table
    fetchDevices();

    // add device
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
                fetchDevices(); // reload device table & Update table 內容
                deviceForm.reset();
            });
    });

    claerbutton.addEventListener('click', () => {
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
                
                // Update list title
                updateDeviceTableHeaders();

                data.forEach(device => {
                    addDeviceToTable(device);
                });
            });
    });

    // check total value
    totalButton.addEventListener('click', () => {
        // 先调用更新 total 的 API
        fetch('/api/updateTotal', {
            method: 'POST'
        })
        .then(response => response.text())
        .then(message => {
            console.log(message);
            // 更新成功后获取 total 表的数据
            fetch('/api/totals')
                .then(response => response.json())
                .then(data => {
                    deviceList.innerHTML = ''; // 清空表格
    
                    // 创建总数表格行
                    // 要修改 currentcont ->receivedcount
                    data.forEach(item => {
                        const row = document.createElement('tr');
    
                        row.innerHTML = `
                            <td>${item.name}</td>
                            <td>${item.model}</td>
                            <td>${item.totalcount}</td>
                            <td>${item.currentcount}</td>
                            <td>${item.NaQing}</td>
                            <td>${item.HuYao}</td>
                            <td>${item.GDL}</td>
                        `;
    
                        deviceList.appendChild(row);
                    });
    
                    // 更新表格标题为总数数据表格标题
                    const headers = document.querySelector('.device-list-container thead tr');
                    headers.innerHTML = `
                        <th>Name</th>
                        <th>Model</th>
                        <th>Total Count</th>
                        <th>Current Count</th>
                        <th>NaQing</th>
                        <th>HuYao</th>
                        <th>GDL</th>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching totals:', error);
                });
        })
        .catch(error => {
            console.error('Error updating total:', error);
        });
    });
    

    // add device in "devies" list
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
            if(confirm('Are you sure you want to delete this devices?')) {
                fetch(`/api/devices/${device.id}`, {
                    method: 'DELETE'
                }).then(() => {
                    row.remove();
                });
            }
        });
    }
});
