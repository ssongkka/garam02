$(document).ready(function () {
    ex();
});

function ex() {
    return new Promise(function (resolve, reject) {
        const labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June'
        ];

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                    data: [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70
                    ]
                }, {
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                    data: [
                        10,
                        20,
                        30,
                        40,
                        50,
                        60,
                        70
                    ]
                }
            ]
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                layout: {
                    padding: {
                        left: 50
                    }
                }
            }
        };

        const myChart = new Chart($('#myChart'), config);
        resolve();
    })
}
