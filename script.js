// Show Login and Registration Popups
function toggleLogin() {
    document.getElementById('login-popup').style.display = 'block';
}

function toggleRegister() {
    document.getElementById('register-popup').style.display = 'block';
}

// Register Hospital and Save Details
function registerHospital() {
    const name = document.getElementById('hospital-name-register').value;
    const address = document.getElementById('hospital-address-register').value;
    const equipment = document.getElementById('hospital-equipment-register').value;
    const contact = document.getElementById('emergency-contact-register').value;
    const email = document.getElementById('hospital-email-register').value;
    const password = document.getElementById('hospital-password-register').value;
    
    // Save hospital data
    localStorage.setItem('hospital-name', name);
    localStorage.setItem('hospital-address', address);
    localStorage.setItem('hospital-equipment', equipment);
    localStorage.setItem('emergency-contact', contact);
    
    alert(`Registered hospital: ${name}`);
    document.getElementById('register-popup').style.display = 'none';
}

// Submit emergency and notify AI Ambulance Portal
function submitEmergency() {
    const emergencyType = document.getElementById('emergency-type').value;
    alert(`Emergency Submitted: ${emergencyType}`);

    // Notify the AI Ambulance Portal with the emergency details
    alert(`Sending emergency to AI Ambulance Portal: ${emergencyType}`);
    
    document.getElementById('emergency-options-popup').style.display = 'none';
    trackAmbulance(emergencyType);
}

// AI Ambulance tracking and alert system
function trackAmbulance(emergencyType) {
    alert('Tracking AI ambulance...');
    
    // Simulate live location tracking
    setTimeout(() => {
        alert('AI Ambulance has reached the patient.');
        notifyHospital(emergencyType);
    }, 5000); // Simulating a 5-second delay for ambulance to "arrive"
}

// Notify hospital with emergency details
function notifyHospital(emergencyType) {
    alert(`Notifying hospital: Emergency - ${emergencyType}`);
    
    // Simulate fastest route detection based on emergency type
    let route = `Fastest route to nearest hospital for ${emergencyType}...`;
    alert(route);
}

// Handle chat with AI support
function sendMessage() {
    const input = document.getElementById('chat-input').value;
    const chatMessages = document.getElementById('chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'You: ' + input;
    chatMessages.appendChild(messageDiv);
    
    document.getElementById('chat-input').value = '';
    
    // Simulate AI bot response
    setTimeout(() => {
        const botResponse = document.createElement('div');
        botResponse.textContent = 'AI Bot: Your ambulance is on the way.';
        chatMessages.appendChild(botResponse);
    }, 1000);
}

function callAIBot() {
    alert('Calling AI Bot...');
}

// Hospital Login and Redirect to Dashboard
function loginHospital() {
    const email = document.getElementById('hospital-email').value;
    const password = document.getElementById('hospital-password').value;
    
    // Simulate authentication and login
    alert(`Logged in with ${email}`);
    
    // Redirect to the hospital dashboard page
    window.location.href = 'dashboard.html';
}

// Show emergency popup
function openEmergencyPopup() {
    document.getElementById('emergency-options-popup').style.display = 'block';
}
let currentEmergency = null;
let ambulanceAssigned = false;

// Simulate receiving an emergency alert
function submitEmergency() {
    const emergencyType = document.getElementById('emergency-type').value;
    alert(`Emergency Submitted: ${emergencyType}`);

    // Send request to AI Ambulance Portal
    localStorage.setItem('emergency-case', emergencyType);
    localStorage.setItem('emergency-status', 'new');
    localStorage.setItem('emergency-location', '123 Fake Street, City'); // Simulated location

    document.getElementById('emergency-options-popup').style.display = 'none';

    // Notify the AI Ambulance Portal
    alert('Emergency sent to AI Ambulance Portal');
}

// AI Ambulance Portal - Check for incoming emergency requests
function checkForEmergency() {
    const emergencyStatus = localStorage.getItem('emergency-status');
    if (emergencyStatus === 'new') {
        const emergencyType = localStorage.getItem('emergency-case');
        document.getElementById('incoming-emergency').innerHTML = `<p>New Emergency: ${emergencyType}</p>`;
        document.getElementById('accept-emergency-btn').style.display = 'block';
        document.getElementById('decline-emergency-btn').style.display = 'block';
    }
}

// AI Ambulance Portal - Accept emergency and start tracking
function acceptEmergency() {
    currentEmergency = localStorage.getItem('emergency-case');
    localStorage.setItem('emergency-status', 'accepted');
    ambulanceAssigned = true;

    document.getElementById('incoming-emergency').innerHTML = `<p>Emergency Accepted: ${currentEmergency}</p>`;
    document.getElementById('accept-emergency-btn').style.display = 'none';
    document.getElementById('decline-emergency-btn').style.display = 'none';

    document.getElementById('live-tracking').style.display = 'block';
    trackPatient();
}

// Decline Emergency
function declineEmergency() {
    localStorage.setItem('emergency-status', 'declined');
    document.getElementById('incoming-emergency').innerHTML = `<p>Emergency Declined</p>`;
    document.getElementById('accept-emergency-btn').style.display = 'none';
    document.getElementById('decline-emergency-btn').style.display = 'none';
}

// Simulate tracking patient's live location and calculating fastest route
function trackPatient() {
    const patientLocation = localStorage.getItem('emergency-location');
    document.getElementById('patient-location').innerHTML = `Patient Location: ${patientLocation}`;

    // Simulate calculating the fastest route to a hospital with the required equipment
    setTimeout(() => {
        const route = calculateFastestRoute(currentEmergency);
        document.getElementById('fastest-route').innerHTML = route;
        notifyHospitalArrival();
    }, 3000); // Simulated 3-second delay for route calculation
}

// Calculate the fastest route to a hospital with the necessary equipment
function calculateFastestRoute(emergencyType) {
    const hospitals = [
        { name: 'City Hospital', equipment: ['heart_attack', 'stroke'] },
        { name: 'County General', equipment: ['pregnancy', 'accident'] },
    ];

    let selectedHospital = null;
    for (let hospital of hospitals) {
        if (hospital.equipment.includes(emergencyType)) {
            selectedHospital = hospital;
            break;
        }
    }

    if (selectedHospital) {
        return `Fastest route to ${selectedHospital.name}`;
    } else {
        return 'No hospitals nearby have the required equipment. Looking for alternatives...';
    }
}

// Notify the hospital upon arrival (without alert popups)
function notifyHospitalArrival() {
    if (!localStorage.getItem('hospital-notified')) {
        const hospitalName = document.getElementById('fastest-route').textContent.split(' to ')[1];
        if (hospitalName) {
            localStorage.setItem('hospital-notification', `Patient arrived at ${hospitalName}`);
        }
        // Set a flag to prevent repeated notifications
        localStorage.setItem('hospital-notified', 'true');
    }
}

// Hospital Dashboard - Check for arrival notifications (without popups)
function checkHospitalNotifications() {
    const notification = localStorage.getItem('hospital-notification');
    if (notification) {
        // Update the hospital dashboard with the notification instead of showing a popup
        document.getElementById('incoming-patients').innerHTML = `<p>${notification}</p>`;
        
        // Clear the notification after displaying it
        localStorage.removeItem('hospital-notification');
        localStorage.removeItem('hospital-notified');
    }
}
function checkHospitalNotifications() {
    const notification = localStorage.getItem('hospital-notification');
    if (notification) {
        document.getElementById('incoming-patients').innerHTML = `<p>${notification}</p>`;

        // Check if the user has interacted with the page before playing the sound
        document.addEventListener('click', function playSoundAfterInteraction() {
            const audio = document.getElementById('alert-sound');
            if (audio) {
                audio.play().catch(error => console.error("Audio playback error: ", error));
            }
            // Remove the event listener after the sound plays
            document.removeEventListener('click', playSoundAfterInteraction);
        });

        // Clear the notification after displaying it
        localStorage.removeItem('hospital-notification');
        localStorage.removeItem('hospital-notified');
    }
}




// Regularly check for emergency requests in the ambulance portal
setInterval(checkForEmergency, 2000);

// Regularly check for hospital notifications
setInterval(checkHospitalNotifications, 5000);
