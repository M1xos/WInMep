const modeToggle = document.getElementById('modeToggle');
const body = document.body;
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

document.addEventListener('DOMContentLoaded', function() {
    const employeeName = localStorage.getItem('selectedEmployee');
    const employeeImage = localStorage.getItem('selectedEmployeeImage');

    if (employeeName && employeeImage) {
        document.getElementById('employeeName').textContent = employeeName;
        document.getElementById('employeeImage').src = employeeImage;
    } else {
        window.location.href = 'Unit.html';
    }

    // Function to get employee data from localStorage
    function getEmployeeData(period) {
        const key = `${employeeName}_stats_${period}`;
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }
        return { assenze: 0, smart: 0, ferie: 0 };
    }

    // Update data table
    function updateDataTable(period) {
        const data = getEmployeeData(period);
        document.getElementById('assenzeValue').textContent = data.assenze;
        document.getElementById('smartWorkingValue').textContent = data.smart;
        document.getElementById('ferieValue').textContent = data.ferie;
    }

    // Get text color based on mode
    function getTextColor() {
        return body.classList.contains('dark-mode') ? '#ffffff' : '#000000';
    }

    // Update charts
    function updateCharts() {
        updateDataTable('giorno');
        updateColumnChart();
        updatePieChart();
        updateRadarChart();
    }

    // Column chart (weekly data)
    function updateColumnChart() {
        const data = getEmployeeData('settimana');
        const ctx = document.querySelector('#columnChart canvas').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Assenze', 'Smart Working', 'Ferie'],
                datasets: [{
                    data: [data.assenze, data.smart, data.ferie],
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
                        text: 'Dati Settimanali',
                        color: getTextColor()
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        ticks: { color: getTextColor() }
                    },
                    x: { 
                        ticks: { color: getTextColor() }
                    }
                }
            }
        });
    }

    // Pie chart (monthly data)
    function updatePieChart() {
        const data = getEmployeeData('mese');
        const ctx = document.querySelector('#pieChart canvas').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Assenze', 'Smart Working', 'Ferie'],
                datasets: [{
                    data: [data.assenze, data.smart, data.ferie],
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
                        position: 'bottom',
                        labels: { color: getTextColor() }
                    },
                }
            }
        });
    }

    // Radar chart (yearly data)
    function updateRadarChart() {
        const data = getEmployeeData('anno');
        const ctx = document.querySelector('#radarChart canvas').getContext('2d');

        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['Assenze', 'Smart Working', 'Ferie'],
                datasets: [{
                    data: [data.assenze, data.smart, data.ferie],
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
                        position: 'bottom',
                        labels: { color: getTextColor() }
                    }
                },
                scales: {
                    r: {
                        pointLabels: {
                            display: true,
                            centerPointLabels: true,
                            color: getTextColor()
                        },
                        ticks: { color: getTextColor() }
                    }
                }
            }  
        });
    }

    // Event listener for period dropdown
    document.querySelector('.dropdown-content').addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const period = e.target.getAttribute('data-period');
            document.getElementById('periodDropdown').innerHTML = e.target.textContent + ' <i class="fas fa-chevron-up"></i>';
            updateDataTable(period);
        }
    });

    // Initialize the page
    updateCharts();
});