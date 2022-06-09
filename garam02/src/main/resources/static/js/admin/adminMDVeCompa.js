function setAdMDVeStatic(yearMonth, arrInM, arrOutM, allInM, allOutM, allM, gas, ave, arrVe) {

    const tmpStEnd = getStDEnD(yearMonth);
    console.log(arrVe);

    LoadingWithMask()
        .then(setDe)
        .then(setChart)
        .then(setChart0)
        .then(setChart1)
        .then(setChart2)
        .then(closeLoadingWithMask);

    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart
            .canvas
            .parentNode
            .querySelector('div');

        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
            tooltipEl.style.borderRadius = '3px';
            tooltipEl.style.color = 'white';
            tooltipEl.style.opacity = 1;
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.transform = 'translate(-50%, 0)';
            tooltipEl.style.transition = 'all .1s ease';

            const table = document.createElement('table');
            table.style.margin = '0px';
            table.style.width = '100px';

            tooltipEl.appendChild(table);
            chart
                .canvas
                .parentNode
                .appendChild(tooltipEl);
        }

        return tooltipEl;
    };

    const externalTooltipHandler = (context) => {
        // Tooltip Element
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        // Set Text
        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip
                .body
                .map(b => b.lines);

            const tableHead = document.createElement('thead');

            titleLines.forEach(title => {
                const tr = document.createElement('tr');
                tr.style.borderWidth = 0;

                const th = document.createElement('th');
                th.style.borderWidth = 0;
                const text = document.createTextNode(title);

                th.appendChild(text);
                tr.appendChild(th);
                tableHead.appendChild(tr);
            });

            const tableBody = document.createElement('tbody');
            bodyLines.forEach((body, i) => {
                const colors = tooltip.labelColors[i];

                const span = document.createElement('span');
                span.style.background = colors.backgroundColor;
                span.style.borderColor = colors.borderColor;
                span.style.borderWidth = '2px';
                span.style.marginRight = '10px';
                span.style.height = '10px';
                span.style.width = '10px';
                span.style.display = 'inline-block';

                const tr = document.createElement('tr');
                tr.style.backgroundColor = 'inherit';
                tr.style.borderWidth = 0;

                const td = document.createElement('td');
                td.style.borderWidth = 0;

                const text = document.createTextNode(body);

                td.appendChild(span);
                td.appendChild(text);
                tr.appendChild(td);
                tableBody.appendChild(tr);
            });

            const tableRoot = tooltipEl.querySelector('table');

            // Remove old children
            while (tableRoot.firstChild) {
                tableRoot
                    .firstChild
                    .remove();
            }

            // Add new children
            tableRoot.appendChild(tableHead);
            tableRoot.appendChild(tableBody);
        }

        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding +
                'px';
    };

    function setDe(result) {
        return new Promise(function (resolve, reject) {
            $('#staticVeYearMonth').val(yearMonth);

            $('#veStaticVe').text(arrVe[1]);
            $('#veStaticBrand').text(arrVe[2]);
            $('#veStaticGrade').text(arrVe[3]);
            $('#veStaticNum').text(arrVe[4] + '인승');
            $('#veStaticRegD').text(
                arrVe[5].split('-')[0] + "년 " + arrVe[5].split('-')[1] + "월 등록"
            );

            $('#veStaticGas').text(gas);

            $('#veStaticInM').text(allInM);
            $('#veStaticOutM').text(allOutM);
            $('#veStaticAllM').text(allM);

            let htmlsInM = ``;
            if (ave[0] > 0) {
                htmlsInM = `<i class="fa-solid fa-caret-up"></i>` + AddComma(ave[0]);
                $('#veStaticInMAve').attr('class', 'vtup');
            } else {
                htmlsInM = `<i class="fa-solid fa-caret-down"></i>` + AddComma(ave[0]);
                $('#veStaticInMAve').attr('class', 'vtdown');
            }

            let htmlsOutM = ``;
            if (ave[1] > 0) {
                htmlsOutM = `<i class="fa-solid fa-caret-up"></i>` + AddComma(ave[1]);
                $('#veStaticOutMAve').attr('class', 'vtup');
            } else {
                htmlsOutM = `<i class="fa-solid fa-caret-down"></i>` + AddComma(ave[1]);
                $('#veStaticOutMAve').attr('class', 'vtdown');
            }

            let htmlsAllM = ``;
            if (ave[2] > 0) {
                htmlsAllM = `<i class="fa-solid fa-caret-up"></i>` + AddComma(ave[2]);
                $('#veStaticAllMAve').attr('class', 'vtup');
            } else {
                htmlsAllM = `<i class="fa-solid fa-caret-down"></i>` + AddComma(ave[2]);
                $('#veStaticAllMAve').attr('class', 'vtdown');
            }

            let htmlsGasM = ``;
            if (ave[3] > 0) {
                htmlsGasM = `<i class="fa-solid fa-caret-up"></i>` + ave[3];
                $('#veStaticGasAve').attr('class', 'vtup');
            } else {
                htmlsGasM = `<i class="fa-solid fa-caret-down"></i>` + ave[3];
                $('#veStaticGasAve').attr('class', 'vtdown');
            }

            $('#veStaticInMAve').html(htmlsInM);
            $('#veStaticOutMAve').html(htmlsOutM);
            $('#veStaticAllMAve').html(htmlsAllM);
            $('#veStaticGasAve').html(htmlsGasM);

            resolve();
        })
    }
    function setChart(result) {
        return new Promise(function (resolve, reject) {
            $('#staticVe00').html(
                `<canvas id="chartVeS0" width="1078" height="284"></canvas>`
            );
            $('#staticVe01').html(`<canvas id="chartVeS1"></canvas>`);
            $('#staticVe02').html(`<canvas id="chartVeS2"></canvas>`);
            // $('#staticVe03').html(`<canvas id="chartVeS3" height="90"></canvas>`);
            // $('#staticVe04').html(`<canvas id="chartVeS4" height="90"></canvas>`);
            resolve();
        })
    }
    function setChart0(result) {
        return new Promise(function (resolve, reject) {

            const data = {
                labels: [
                    '1월',
                    '2월',
                    '3월',
                    '4월',
                    '5월',
                    '6월',
                    '7월',
                    '8월',
                    '9월',
                    '10월',
                    '11월',
                    '12월'
                ],
                datasets: [
                    {
                        type: 'line',
                        label: '총 수익',
                        backgroundColor: 'rgba(68, 114, 196, 0.2)',
                        borderColor: 'rgb(68, 114, 196)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: [
                            80,
                            40,
                            50,
                            25,
                            37,
                            70,
                            65,
                            42,
                            44,
                            21,
                            11,
                            32
                        ]
                    }, {
                        type: 'line',
                        label: '총 수익',
                        backgroundColor: 'rgb(237, 125, 49, 0.2)',
                        borderColor: 'rgb(237, 125, 49, 1)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: [
                            12,
                            55,
                            23,
                            43,
                            53,
                            35,
                            22,
                            23,
                            87,
                            44,
                            33,
                            23
                        ]
                    }, {
                        type: 'line',
                        label: '총 수익',
                        backgroundColor: 'rgba(112, 173, 71, 0.2)',
                        borderColor: 'rgba(112, 173, 71, 1)',
                        // barPercentage: 0.5, barThickness: 6, maxBarThickness: 8, minBarLength: 2,
                        data: [
                            16,
                            68,
                            64,
                            34,
                            54,
                            76,
                            25,
                            33,
                            50,
                            80,
                            66,
                            45
                        ]
                    }
                ]
            };

            const config = {
                data: data,
                options: {
                    responsive: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeS0'), config);
            resolve();
        })
    }
    function setChart1(result) {
        return new Promise(function (resolve, reject) {

            const data = {
                labels: [
                    '정기운행', '일반운행', '학생단체', '거래처'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: arrInM,
                        backgroundColor: [
                            '#4472c4', '#517cc8', '#5e85cc', '#6b8fd0'
                        ],
                        hoverOffset: 4
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    interaction: {
                        mode: 'point',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            position: 'nearest',
                            external: externalTooltipHandler
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeS1'), config);
            resolve();
        })
    }
    function setChart2(result) {
        return new Promise(function (resolve, reject) {
            const data = {
                labels: [
                    '급여',
                    '유류비',
                    '대출',
                    '차량보험',
                    '정비',
                    '사고'
                ],
                datasets: [
                    {
                        label: 'My First Dataset',
                        data: arrOutM,
                        backgroundColor: [
                            '#ed7d31',
                            '#ee8741',
                            '#f09150',
                            '#f19b60',
                            '#f2a46f',
                            '#f4ae7f'
                        ],
                        hoverOffset: 4
                    }
                ]
            };

            const config = {
                type: 'doughnut',
                data: data,
                options: {
                    interaction: {
                        mode: 'point',
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false,
                            position: 'nearest',
                            external: externalTooltipHandler
                        }
                    }
                }
            };

            const myChart = new Chart($('#chartVeS2'), config);
            resolve();
        })
    }
}