document.addEventListener('DOMContentLoaded', () => {
    const deviceSelectForm = document.getElementById('device-select');
    const detailList = document.getElementById('detail-list');
    const queryButton = document.getElementById('query-button');
    const clearButton = document.getElementById('clear-button');
    const modal = document.getElementById('modifyModal');
    const span = document.getElementsByClassName('close')[0];
    const modifyForm = document.getElementById('modify-form');
    const modifyId = document.getElementById('modify-id');
    const modifyLocation = document.getElementById('modify-location');
    const modifyOwner = document.getElementById('modify-owner');

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
                        <td>${device.owner}</td>
                        <td><button class="modify-button" data-id="${device.id}">Modify</button></td>
                    `;
                    detailList.appendChild(row);

                    // Add event listener to modify button
                    row.querySelector('.modify-button').addEventListener('click', () => {
                        modifyId.value = device.id;
                        modifyLocation.value = device.location;
                        modifyOwner.value = device.owner;
                        modal.style.display = 'block';
                    });
                });
            })
            .catch(error => {
                console.error('Error fetching device details:', error);
                alert('Error fetching device details');
            });
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Handle modify form submission
    modifyForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(modifyForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/api/modifyDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            alert(result.message || 'Device information updated successfully'); // Ensure a fallback message
            modal.style.display = 'none';
            queryButton.click(); // Refresh the device list
        })
        .catch(error => {
            console.error('Error modifying device:', error);
            alert('Error modifying device');
        });
    });

    // Go back function
    function goBack() {
        window.location.href = 'index.html'; // Ensure this points to your main page
    }
    
    // Attach goBack function to window to make it accessible globally
    window.goBack = goBack;
});
