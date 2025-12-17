
document.addEventListener('DOMContentLoaded', function() {
    // Load device data
    fetch('data.json')
        .then(response => response.json())
        .then(devices => {
            renderDevices(devices);
            setupFilters(devices);
        })
        .catch(error => console.error('Error loading data:', error));

    function renderDevices(devices) {
        const deviceList = document.getElementById('device-list');
        deviceList.innerHTML = '';

        devices.forEach(device => {
            const deviceCard = document.createElement('div');
            deviceCard.className = 'device-card';
            deviceCard.innerHTML = `
                <div class="device-header">
                    <h3>${device.name}</h3>
                    <div class="device-price">${device.price}</div>
                </div>
                <div class="device-features">
                    <div class="feature-row">
                        <span class="feature-label">Display:</span>
                        <span class="feature-value">${device.display}</span>
                    </div>
                    <div class="feature-row">
                        <span class="feature-label">Size:</span>
                        <span class="feature-value">${device.size}</span>
                    </div>
                    <div class="feature-row">
                        <span class="feature-label">Waterproof:</span>
                        <span class="feature-value">${device.waterproof ? 'Yes' : 'No'}</span>
                    </div>
                    <div class="feature-row">
                        <span class="feature-label">Note-Taking:</span>
                        <span class="feature-value">${device.note_taking ? 'Yes' : 'No'}</span>
                    </div>
                    <div class="feature-row">
                        <span class="feature-label">Connectivity:</span>
                        <span class="feature-value">${device.connectivity}</span>
                    </div>
                </div>
                <div class="device-summary">
                    <div class="summary-title">Pros:</div>
                    <div class="summary-content">${device.pros.join(', ')}</div>
                </div>
                <div class="device-summary">
                    <div class="summary-title">Cons:</div>
                    <div class="summary-content">${device.cons.join(', ')}</div>
                </div>
            `;
            deviceList.appendChild(deviceCard);
        });
    }

    function setupFilters(devices) {
        const filters = document.querySelectorAll('.feature-filter');
        
        filters.forEach(filter => {
            filter.addEventListener('change', () => {
                const activeFilters = Array.from(document.querySelectorAll('.feature-filter:checked'))
                    .map(f => ({ feature: f.dataset.feature, value: f.value }));
                
                const filteredDevices = devices.filter(device => {
                    return activeFilters.every(filter => {
                        if (filter.feature === 'display') {
                            return device.display.toLowerCase().includes(filter.value.toLowerCase());
                        }
                        if (filter.feature === 'size') {
                            return device.size.toLowerCase().includes(filter.value.toLowerCase());
                        }
                        if (filter.feature === 'waterproof') {
                            return device.waterproof === (filter.value === 'true');
                        }
                        if (filter.feature === 'note-taking') {
                            return device.note_taking === (filter.value === 'true');
                        }
                        if (filter.feature === 'connectivity') {
                            return device.connectivity.toLowerCase().includes(filter.value.toLowerCase());
                        }
                        return true;
                    });
                });
                
                renderDevices(filteredDevices);
            });
        });
    }
});
