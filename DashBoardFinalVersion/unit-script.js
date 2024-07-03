document.addEventListener('DOMContentLoaded', function() {
    const userNomeCognome = localStorage.getItem('userNomeCognome');
    const userRuolo = localStorage.getItem('userRuolo');

    if (userNomeCognome && userRuolo) {
        document.getElementById('userNomeCognome').textContent = userNomeCognome;
        document.getElementById('userRuolo').textContent = userRuolo;

        const infoText = document.getElementById('infoText');
        const employeeList = document.getElementById('employeeList');

        // Lista dipendenti
        const employees = ['Aprea Maichol', 'Cesarini Andrea Michel', 'Legramanti Giulia'];

        // Aggiungi l'utente loggato alla lista se non presente
        if (!employees.includes(userNomeCognome)) {
            employees.push(userNomeCognome);
        }

        // Immagini di profilo predefinite
        const defaultProfilePics = [
            'fpfs/BadPfp1.png',
            'fpfs/BadPfp2.png',
            'fpfs/BadPfp3.png',
            'fpfs/GoodPfp1.png',
            'fpfs/GoodPfp2.png',
            'fpfs/GoodPfp3.png',
            'fpfs/BestPfp1.png',
            'fpfs/BestPfp2.png',
            'fpfs/BestPfp3.png',
        ];

        // Funzione per ottenere un'immagine di profilo predefinita casuale
        function getRandomProfilePic() {
            const randomIndex = Math.floor(Math.random() * defaultProfilePics.length);
            return defaultProfilePics[randomIndex];
        }

        // Funzione per ottenere o impostare l'immagine di profilo dell'utente corrente
        function getCurrentUserProfilePic() {
            let profilePic = localStorage.getItem('userProfilePic');
            if (!profilePic) {
                profilePic = getRandomProfilePic();
                localStorage.setItem('userProfilePic', profilePic);
            }
            return profilePic;
        }

        // Funzione per aggiornare l'immagine di profilo
        function updateProfilePicture(newProfilePic) {
            profileImage.src = newProfilePic;
            localStorage.setItem('userProfilePic', newProfilePic);
            
            // Aggiorna l'avatar dell'utente corrente nella lista dei dipendenti
            const currentUserAvatar = document.querySelector('.employee-row[data-employee="' + userNomeCognome + '"] .employee-avatar');
            if (currentUserAvatar) {
                currentUserAvatar.src = newProfilePic;
            }

            // Mostra il pulsante di rimozione per le immagini personalizzate
            updateProfileImageAction();
        }

        // Funzione per aggiornare l'azione del pulsante dell'immagine di profilo
        function updateProfileImageAction() {
            const profileImageAction = document.getElementById('profileImageAction');
            const isDefaultImage = defaultProfilePics.includes(profileImage.src);

            if (isDefaultImage) {
                profileImageAction.onclick = () => imageUpload.click();
            } else {
                profileImageAction.onclick = removeProfilePicture;
            }
        }

        // Funzione per rimuovere l'immagine di profilo
        function removeProfilePicture() {
            const defaultPic = getRandomProfilePic();
            updateProfilePicture(defaultPic);
        }

        // Imposta l'immagine di profilo iniziale e aggiorna l'azione dell'immagine di profilo
        const profileImage = document.getElementById('profileImage');
        profileImage.src = getCurrentUserProfilePic();
        updateProfileImageAction();

// Aggiungi l'utente loggato alla lista se non presente
        if (!employees.includes(userNomeCognome)) {
            employees.push(userNomeCognome);
        }

        // Funzione per creare la riga del dipendente con avatar
        function createEmployeeRow(name, role, isCurrentUser) {
            const avatarSrc = isCurrentUser ? getCurrentUserProfilePic() : getRandomProfilePic();
            return `
                <div class="employee-row" data-employee="${name}">
                    <div class="employee-info">
                        <img src="${avatarSrc}" alt="${name}" class="employee-avatar">
                        <div class="employee-details">
                            <h3 class="employee-name">${name}${isCurrentUser ? ' (IO)' : ''}</h3>
                            <p class="employee-role">${role}</p>
                        </div>
                    </div>
                    <div class="stats-container">
                        <div class="stat assenze">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Assenze</div>
                        </div>
                        <div class="stat smart">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Smart</div>
                        </div>
                        <div class="stat ferie">
                            <div class="stat-value">0</div>
                            <div class="stat-label">Ferie</div>
                        </div>
                    </div>
                    <button class="details-button">Dettagli &gt;</button>
                </div>
            `;
        }

        // Popola la lista dei dipendenti
        if (userRuolo === 'Dipendente') {
            infoText.textContent = 'I dati dei collaboratori saranno visualizzabili solo dal Datore di Lavoro e dai Manager';
            employeeList.innerHTML = createEmployeeRow(userNomeCognome, userRuolo, true);
        } else {
            infoText.textContent = 'Visualizzazione completa dei dati dei collaboratori';
            // Crea una lista con l'utente loggato per primo
            const employeeNames = [userNomeCognome, ...employees.filter(name => name !== userNomeCognome)];
            employeeList.innerHTML = employeeNames.map(name =>
                createEmployeeRow(name, name === userNomeCognome ? userRuolo : (name === 'Aprea Maichol' ? 'Datore di lavoro' : 'Dipendente'), name === userNomeCognome)
            ).join('');
        }
        // Funzione per generare o recuperare statistiche dallo storage locale
        function getOrGenerateStats(employeeName, period) {
            const storageKey = `${employeeName}_stats_${period}`;
            let stats = JSON.parse(localStorage.getItem(storageKey));

            if (!stats) {
                stats = generateRandomStats(period);
                localStorage.setItem(storageKey, JSON.stringify(stats));
            }

            return stats;
        }

        // Aggiorna le statistiche dei dipendenti
        function updateEmployeeStats(period) {
            const employeeRows = document.querySelectorAll('.employee-row');
            employeeRows.forEach(row => {
                const name = row.getAttribute('data-employee');
                const employeeData = getOrGenerateStats(name, period);
                row.querySelector('.assenze .stat-value').textContent = formatStatValue(employeeData.assenze);
                row.querySelector('.smart .stat-value').textContent = formatStatValue(employeeData.smart);
                row.querySelector('.ferie .stat-value').textContent = formatStatValue(employeeData.ferie);
            });
        }

        // Formatta il valore della statistica con segno + o -
        function formatStatValue(value) {
            return value >= 0 ? '+' + value : value.toString();
        }

        // Crea il dropdown del periodo
        const periodDropdown = document.createElement('div');
        periodDropdown.className = 'dropdown';
        periodDropdown.innerHTML = `
            <button class="dropbtn" id="periodDropdown">OGGI <i class="fas fa-chevron-down"></i></button>
            <div class="dropdown-content">
                <a href="#" data-period="oggi">OGGI</a>
                <a href="#" data-period="settimana">QUESTA SETTIMANA</a>
                <a href="#" data-period="mese">QUESTO MESE</a>
                <a href="#" data-period="anno">QUEST'ANNO</a>
            </div>
        `;
        document.querySelector('.unit-container').insertBefore(periodDropdown, employeeList);

        // Listener per il dropdown del periodo
        periodDropdown.querySelector('.dropdown-content').addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const period = e.target.getAttribute('data-period');
                document.getElementById('periodDropdown').innerHTML = e.target.textContent + ' <i class="fas fa-chevron-down"></i>';
                updateEmployeeStats(period);
            }
        });

        // Inizializza la pagina
        updateEmployeeStats('oggi');

        // Aggiungi listener ai pulsanti dei dettagli
        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', () => {
                const employeeName = button.closest('.employee-row').getAttribute('data-employee');
                const employeeRole = button.closest('.employee-row').querySelector('.employee-role').textContent;
                const employeeImage = button.closest('.employee-row').querySelector('.employee-avatar').src;
                
                // Memorizza le informazioni del dipendente nel localStorage
                localStorage.setItem('selectedEmployee', employeeName);
                localStorage.setItem('selectedEmployeeRole', employeeRole);
                localStorage.setItem('selectedEmployeeImage', employeeImage);
                
                // Naviga alla pagina dei dettagli del dipendente
                window.location.href = 'employee-details-html.html';
            });
        });

        // Gestione del caricamento dell'immagine del profilo
        const imageUpload = document.getElementById('imageUpload');
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    updateProfilePicture(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

    } else {
        // Se i dati non sono presenti, reindirizza alla pagina di login
        window.location.href = 'login.html';
    }
});

function generateRandomStats(period) {
    if (period === 'oggi') {
        return generateDailyStats();
    }

    let maxRange;
    switch (period) {
        case 'settimana':
            return generateWeeklyStats();
        case 'mese':
            maxRange = 10;
            break;
        case 'anno':
            maxRange = 70;
            break;
        default:
            maxRange = 1;
    }

    return {
        assenze: getRandomInt(0, maxRange),
        smart: getRandomInt(0, maxRange),
        ferie: getRandomInt(0, maxRange)
    };
}

function generateWeeklyStats() {
    let remaining = 5;
    const stats = {
        assenze: 0,
        smart: 0,
        ferie: 0
    };

    const keys = Object.keys(stats);
    for (let i = 0; i < 2; i++) {
        const value = getRandomInt(0, remaining);
        stats[keys[i]] = value;
        remaining -= value;
    }

    stats[keys[2]] = remaining;

    // Shuffle the values to avoid bias
    const shuffled = Object.entries(stats).sort(() => Math.random() - 0.5);
    return Object.fromEntries(shuffled);
}

function generateDailyStats() {
    const stats = {
        assenze: 0,
        smart: 0,
        ferie: 0
    };

    const randomIndex = Math.floor(Math.random() * 3);
    const keys = Object.keys(stats);
    stats[keys[randomIndex]] = 1;

    return stats;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

