// Bar Chart
const ctxBar = document.getElementById('projectBarChart').getContext('2d');
const projectBarChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Total Projects', 'Active Projects', 'Completed Projects'],
        datasets: [{
            label: 'Projects',
            data: [50, 30, 20],
            backgroundColor: [
                'rgba(90, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Line Chart
const ctxLine = document.getElementById('projectLineChart').getContext('2d');
const projectLineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Projects Over Time',
            data: [10, 20, 30, 25, 35, 50],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Donut Chart 1
const ctxDonut1 = document.getElementById('donutChart1').getContext('2d');
const donutChart1 = new Chart(ctxDonut1, {
    type: 'doughnut',
    data: {
        labels: ['Category A', 'Category B', 'Category C'],
        datasets: [{
            label: 'Donut Chart 1',
            data: [30, 50, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

// Donut Chart 2
const ctxDonut2 = document.getElementById('donutChart2').getContext('2d');
const donutChart2 = new Chart(ctxDonut2, {
    type: 'doughnut',
    data: {
        labels: ['Category D', 'Category E', 'Category F'],
        datasets: [{
            label: 'Donut Chart 2',
            data: [40, 30, 30],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});

// Donut Chart 3
const ctxDonut3 = document.getElementById('donutChart3').getContext('2d');
const donutChart3 = new Chart(ctxDonut3, {
    type: 'doughnut',
    data: {
        labels: ['Category G', 'Category H', 'Category I'],
        datasets: [{
            label: 'Donut Chart 3',
            data: [20, 50, 30],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true
    }
});