document.addEventListener('DOMContentLoaded', () => {
    const deviceSelectForm = document.getElementById('device-select');
    const detailList = document.getElementById('detail-list');
    const queryButton = document.getElementById('query-button');
    const clearButton = document.getElementById('clear-button');

    // Clear form and detail list
    clearButton.addEventListener('click', () => {
        deviceSelectForm.reset();
        detailList.innerHTML = '';
    });

    // Query device details
    queryButton.addEventListener('click', () => {
        const formData = new FormData(deviceSelectForm);
        const query = new URLSearchParams();

        for (const [key, value] of formData.entries()) {
            if (value) {
                query.append(key, value);
            }
        }

        fetch(`/api/deviceDetails?${query.toString()}`)
            .then(response => response.json())
            .then(data => {
                detailList.innerHTML = ''; // Clear previous results
                data.forEach(device => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${device.name}</td>
                        <td>${device.serial_number}</td>
                        <td>${device.location}</td>
                    `;
                    detailList.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching device details:', error);
                alert('Error fetching device details');
            });
    });
});
