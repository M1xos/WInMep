const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
const dropbtn = document.querySelector('.dropbtn');
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('.sidebar');
 
modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
    updateCharts();
});
 
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    adjustProfileOnCollapse();
});
const data = {
    oggi: { assenze: 3, smartWorking: 18, ferie: 10 },
    settimana: { assenze: 19, smartWorking: 75, ferie: 52 },
    mese: { assenze: 50, smartWorking: 130, ferie: 102 },
    anno: { assenze: 240, smartWorking: 780, ferie: 612 }
};
 
function updateCharts(period = 'oggi') {
    updateDataTable(period);
}
 
/*pfp start js*/
 
// Profile image management
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');
const profileImageAction = document.getElementById('profileImageAction');
const defaultProfileImages = [
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
 
function getRandomProfileImage() {
    const randomIndex = Math.floor(Math.random() * defaultProfileImages.length);
    return defaultProfileImages[randomIndex];
}
 
function setRandomProfileImage() {
    profileImage.src = getRandomProfileImage();
    profileImageAction.innerHTML = '<i class="fas fa-camera"></i>';
    profileImageAction.classList.remove('remove');
    profileImageAction.setAttribute('for', 'imageUpload');
}
 
function setCustomProfileImage(imageDataUrl) {
    profileImage.src = imageDataUrl;
    localStorage.setItem('customProfileImage', imageDataUrl);
    profileImageAction.innerHTML = '<i class="fas fa-times"></i>';
    profileImageAction.classList.add('remove');
    profileImageAction.removeAttribute('for');
}
 
// Load profile image on page load
document.addEventListener('DOMContentLoaded', () => {
    const customProfileImage = localStorage.getItem('customProfileImage');
    if (customProfileImage) {
        setCustomProfileImage(customProfileImage);
    } else {
        setRandomProfileImage();
    }
});
 
// Handle file upload
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setCustomProfileImage(e.target.result);
        }
        reader.readAsDataURL(file);
    }
});
 
// Handle remove custom profile image
profileImageAction.addEventListener('click', (e) => {
    if (profileImageAction.classList.contains('remove')) {
        e.preventDefault();
        localStorage.removeItem('customProfileImage');
        setRandomProfileImage();
    }
});
 
function adjustProfileOnCollapse() {
    const profile = document.querySelector('.profile');
    const profileImageContainer = document.querySelector('.profile-image-container');
   
    if (sidebar.classList.contains('collapsed')) {
        profile.style.flexDirection = 'column';
        profile.style.alignItems = 'center';
        profileImageContainer.style.width = '40px';
        profileImageContainer.style.height = '40px';
        profileImageContainer.style.margin = '0 auto 10px';
    } else {
        profile.style.flexDirection = '';
        profile.style.alignItems = '';
        profileImageContainer.style.width = '';
        profileImageContainer.style.height = '';
        profileImageContainer.style.margin = '';
    }
}
document.addEventListener('DOMContentLoaded', adjustProfileOnCollapse);
 
 
/*fpf end js*/
 
function updateDataTable(period) {
    const tableData = data[period];
    document.getElementById('assenzeValue').textContent = tableData.assenze;
    document.getElementById('smartWorkingValue').textContent = tableData.smartWorking;
    document.getElementById('ferieValue').textContent = tableData.ferie;
}
 
dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const period = e.target.getAttribute('data-period');
        dropbtn.innerHTML = e.target.textContent + ' <i class="fas fa-chevron-up"></i>';
        updateCharts(period);
    });
});
 
function createColumnChart() {
    const ctx = document.querySelector('#columnChart canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Assenze', 'Smart Working', 'Ferie'],
            datasets: [{
                data: [19, 75, 52],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Questa Settimana',
                    color: '#ffffff',
                    font: { size: 16 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#ffffff' }
                },
                x: { ticks: { color: '#ffffff' } }
            }
        }
    });
}
 
function createPieChart() {
    const ctx = document.querySelector('#pieChart canvas').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Assenze', 'Smart Working', 'Ferie'],
            datasets: [{
                data: [19, 75, 52],
                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: { color: '#ffffff' }
                },
                title: {
                    display: true,
                    text: 'Questa Settimana',
                    color: '#ffffff',
                    font: { size: 16 }
                }
            }
        }
    });
}
 
function createLineChart() {
    const ctx = document.querySelector('#lineChart canvas').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'],
            datasets: [{
                label: 'Assenze',
                data: [12, 19, 3, 5, 2, 3],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true
            }, {
                label: 'Smart Working',
                data: [5, 15, 10, 30, 22, 3],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true
            }, {
                label: 'Ferie',
                data: [2, 3, 20, 5, 1, 4],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: { color: '#ffffff' }
                },
                title: {
                    display: true,
                    text: 'Primo Semestre',
                    color: '#ffffff',
                    font: { size: 16 }
                }
            },
            scales: {
                y: { ticks: { color: '#ffffff' } },
                x: { ticks: { color: '#ffffff' } }
            }
        }
    });
}
 
function initCharts() {
    createColumnChart();
    createPieChart();
    createLineChart();
}
 

// Initialize the dashboard
updateCharts();
initCharts();
// Cache per i gradienti
const gradientCache = new Map();

function createRadialGradient3(context, c1, c2, c3) {
    const chartArea = context.chart.chartArea;
    if (!chartArea) {
        return null;
    }

    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    const cacheKey = `${c1}-${c2}-${c3}-${chartWidth}-${chartHeight}`;

    if (gradientCache.has(cacheKey)) {
        return gradientCache.get(cacheKey);
    }

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const r = Math.min(
        (chartArea.right - chartArea.left) / 2,
        (chartArea.bottom - chartArea.top) / 2
    );
    const ctx = context.chart.ctx;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, r);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(0.5, c2);
    gradient.addColorStop(1, c3);

    gradientCache.set(cacheKey, gradient);
    return gradient;
}

function applyGradientToChart(chart, colors) {
    const datasets = chart.data.datasets;

    datasets.forEach((dataset, index) => {
        const color = Array.isArray(colors) ? colors[index % colors.length] : colors;
        
        if (chart.config.type === 'pie' || chart.config.type === 'doughnut') {
            dataset.backgroundColor = dataset.data.map((_, i) => {
                return function(context) {
                    return createRadialGradient3(context, 
                        color[i % color.length][0], 
                        color[i % color.length][1], 
                        color[i % color.length][2]);
                };
            });
        } else {
            dataset.backgroundColor = function(context) {
                return createRadialGradient3(context, color[0], color[1], color[2]);
            };
        }
    });

    chart.update();
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [`rgba(${r},${g},${b},0.8)`, `rgba(${r},${g},${b},0.5)`, `rgba(${r},${g},${b},0.2)`];
}

function applyGradientsToAllCharts() {
    const chartElements = document.querySelectorAll('.chart');
    
    chartElements.forEach(chartElement => {
        const chartId = chartElement.id;
        const chartInstance = Chart.getChart(chartElement.querySelector('canvas'));
        
        if (chartInstance) {
            let colors;
            
            switch(chartInstance.config.type) {
                case 'pie':
                case 'doughnut':
                    colors = chartInstance.data.labels.map(() => getRandomColor());
                    break;
                default:
                    colors = getRandomColor();
            }
            
            applyGradientToChart(chartInstance, colors);
        }
    });
}

// Chiamare questa funzione dopo che tutti i grafici sono stati inizializzati
document.addEventListener('DOMContentLoaded', () => {
    // Assicurati che tutti i grafici siano stati creati prima di chiamare questa funzione
    setTimeout(applyGradientsToAllCharts, 100);
});