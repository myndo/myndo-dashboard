window.MYNDO_DASHBOARD = {
    init : function() {
        let title_schedule = document.getElementById('titleSchedule');
        let edit_title_text = document.getElementById('newTitleInput');
        let save_button_title = document.getElementById('saveTitleButton');
        let edit_button_title = document.getElementById('editTitleButton');

        save_button_title.addEventListener('click', function() {
            let new_title = edit_title_text.value;
            title_schedule.innerHTML = new_title;
            save_button_title.style.display = "none";
            edit_title_text.style.display = "none";
            edit_button_title.style.display = "flex";
            title_schedule.style.display = "flex";
        });

        edit_button_title.addEventListener('click', function() {
            save_button_title.style.display = "flex";
            edit_title_text.style.display = "flex";
            edit_button_title.style.display = "none";
            title_schedule.style.display = "none";
        })

        let custom_metric = document.getElementById('createCustomMetric');
        let screen_custom_metric = document.getElementById('customContainerMetric');
        let save_custom_metric = document.getElementById('saveCustomMetric');
        let magic_wand = document.getElementById('magicWand');
        let sidebar_metric = document.getElementById('sideBarDash');
        let save_report_button = document.getElementById('saveReport');
        let sidebar_save_report = document.getElementById('saveReportBar');
        let button_settings_data = document.getElementById('settingsData');
        let screen_settings_data = document.getElementById('settingsDataBar');
        let button_options_design = document.getElementById('optionsDesign');
        let screen_options_design = document.getElementById('optionsDesignBar');
        let menu_bar_options = document.querySelectorAll('.menuBar');
        let buttons_right = document.querySelectorAll('.menuButton');

        // menubar_for_title
        // menubar_for_graph

        // upper_part
        // bottom_part

        let menubar_title = document.getElementById('menubar_for_title');
        let menubar_graph = document.getElementById('menubar_for_graph');

        let upper_part = document.getElementById('upper_part');
        let bottom_part = document.getElementById('bottom_part');

        menubar_title.addEventListener('click', function() {
            upper_part.style.display = "flex";
            bottom_part.style.display = "flex";
        })

        menubar_graph.addEventListener('click', function() {
            upper_part.style.display = "none";
            bottom_part.style.display = "flex";
        })

        custom_metric.addEventListener('click', function() {
            screen_custom_metric.style.display = "block";
        })

        button_options_design.addEventListener('click', function(e) {
            screen_options_design.style.minWidth = 300 + "px";
            screen_options_design.style.maxWidth = 300 + "px";
            screen_options_design.style.padding = 20 + "px";
            button_options_design.style.marginRight = 290 + "px";
            let closestMenuBar = e.target.closest('.menuButton');
            if (closestMenuBar) {
                closestMenuBar.style.backgroundColor = "#005d6d";
            }
        })

        save_custom_metric.addEventListener('click', function() {
            screen_custom_metric.style.display = "none";
        })

        save_report_button.addEventListener('click', function(e) {
            sidebar_save_report.style.minWidth = 300 + "px";
            sidebar_save_report.style.maxWidth = 300 + "px";
            sidebar_save_report.style.padding = 20 + "px";
            save_report_button.style.marginRight = 290 + "px";
            let closestMenuBar = e.target.closest('.menuButton');
            if (closestMenuBar) {
                closestMenuBar.style.backgroundColor = "#005d6d";
            }
        })

        function reset_button_color(button) {
            let color = "#0097B2";
            button.style.backgroundColor = color;
        }

        window.addEventListener('click', function(e) {
            if (!screen_custom_metric.contains(e.target) && !magic_wand.contains(e.target) && !sidebar_metric.contains(e.target) && !event.target.closest('.modifyWithSidebar')) {
                if (screen_custom_metric.style.display !== "none") {
                    screen_custom_metric.style.display = "none";
                } else {
                    magic_wand.style.marginRight = 0 + "px";
                    sidebar_metric.style.minWidth = 0 + "px";
                    sidebar_metric.style.maxWidth = 0 + "px";
                    sidebar_metric.style.padding = 0 + "px";
                }
                reset_button_color(magic_wand);
            }

            if (sidebar_save_report.style.marginRight !== 0 + "px" && !save_report_button.contains(e.target) && !sidebar_save_report.contains(e.target)) {

                save_report_button.style.marginRight = 0 + "px";
                sidebar_save_report.style.minWidth = 0 + "px";
                sidebar_save_report.style.maxWidth = 0 + "px";
                sidebar_save_report.style.padding = 0 + "px";
                reset_button_color(save_report_button);
            }

            if (sidebar_metric.contains(e.target) && !custom_metric.contains(e.target)) {
                screen_custom_metric.style.display = "none";
            }
        });

        magic_wand.addEventListener('click', function(e) {
            sidebar_metric.style.minWidth = 300 + "px";
            sidebar_metric.style.maxWidth = 300 + "px";
            sidebar_metric.style.padding = 20 + "px";
            magic_wand.style.marginRight = 290 + "px";
            let closestMenuBar = e.target.closest('.menuButton');
            if (closestMenuBar) {
                closestMenuBar.style.backgroundColor = "#005d6d";
            }
        })

        for (let menu of menu_bar_options) {
            menu.addEventListener('click', function() {
                for (let m of menu_bar_options) {
                    m.classList.remove('activeMenuBar');
                }
                menu.classList.add('activeMenuBar');
            })
        }

        const colorArea = document.getElementById('colorArea');
        const colorSelector = document.getElementById('colorSelector');
        const hueSlider = document.getElementById('hueSlider');
        const opacitySlider = document.getElementById('opacitySlider');
        const hexInput = document.getElementById('hexInput');
        
        let currentHue = 300;
        let currentSaturation = 70;
        let currentLightness = 60;
        let currentOpacity = 100;
        
        function updateColorDisplay() {
            colorArea.style.backgroundImage = `linear-gradient(to bottom, transparent, black), 
                linear-gradient(to right, white, hsl(${currentHue}, 100%, 50%))`;
            
            const color = `hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%)`;
            
            opacitySlider.style.backgroundColor = color;
            
            const hexColor = hslToHex(currentHue, currentSaturation, currentLightness);
            hexInput.value = hexColor;
            
            document.querySelector('.opacity-value').textContent = `${currentOpacity}%`;
        }
        
        function hslToHex(h, s, l) {
            h /= 360;
            s /= 100;
            l /= 100;
            
            let r, g, b;
            
            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            
            const toHex = x => {
                const hex = Math.round(x * 255).toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
        }
        
        hueSlider.addEventListener('input', function() {
            currentHue = parseInt(this.value);
            updateColorDisplay();
        });
        
        opacitySlider.addEventListener('input', function() {
            currentOpacity = parseInt(this.value);
            updateColorDisplay();
        });
        
        let isDragging = false;
        
        colorArea.addEventListener('mousedown', startColorSelection);
        document.addEventListener('mousemove', moveColorSelector);
        document.addEventListener('mouseup', () => { isDragging = false; });
        
        colorArea.addEventListener('touchstart', startColorSelection);
        document.addEventListener('touchmove', moveColorSelector);
        document.addEventListener('touchend', () => { isDragging = false; });
        
        function startColorSelection(e) {
            isDragging = true;
            updateColorFromPosition(e);
        }
        
        function moveColorSelector(e) {
            if (!isDragging) return;
            updateColorFromPosition(e);
        }
        
        function updateColorFromPosition(e) {
            e.preventDefault();
            
            const rect = colorArea.getBoundingClientRect();
            let clientX, clientY;
            
            if (e.type.includes('touch')) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            
            const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
            const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
            
            colorSelector.style.left = `${x}px`;
            colorSelector.style.top = `${y}px`;
            
            currentSaturation = (x / rect.width) * 100;
            currentLightness = 100 - (y / rect.height) * 100;
            
            updateColorDisplay();
        }
        
        hexInput.addEventListener('change', function() {
            updateColorDisplay();
        });
        
        document.querySelectorAll('.color-swatch, .guide-color').forEach(swatch => {
            swatch.addEventListener('click', function() {
                hexInput.value = getComputedStyle(this).backgroundColor;
                updateColorDisplay();
            });
        });
        
        document.querySelectorAll('.color-sample').forEach(sample => {
            sample.addEventListener('click', function() {
                document.querySelectorAll('.color-sample').forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        updateColorDisplay();

        document.addEventListener('DOMContentLoaded', function() {
            const dateRangeSelect = document.getElementById('dateRangeSelect');
            const datePicker = document.getElementById('datePicker');
            const selectedDateRange = document.getElementById('selectedDateRange');
            const startDateInput = document.getElementById('startDate');
            const endDateInput = document.getElementById('endDate');
            const periodOptions = document.querySelectorAll('.period-option');
            const applyBtn = document.getElementById('applyBtn');
            const cancelBtn = document.getElementById('cancelBtn');
            
            function formatDate(date) {
                const months = ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'];
                const d = new Date(date);
                return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            }
            
            dateRangeSelect.addEventListener('click', function() {
                datePicker.classList.toggle('activeDatePicker');
            });
            
            document.addEventListener('click', function(event) {
                const isClickInside = dateRangeSelect.contains(event.target) || datePicker.contains(event.target);
                if (!isClickInside && datePicker.classList.contains('activeDatePicker')) {
                datePicker.classList.remove('activeDatePicker');
                }
            });
            
            periodOptions.forEach(option => {
                option.addEventListener('click', function() {
                periodOptions.forEach(opt => opt.classList.remove('activeDatePicker'));
                this.classList.add('activeDatePicker');
                
                const today = new Date();
                let startDate = new Date();
                let endDate = new Date();
                
                switch(this.dataset.period) {
                    case 'today':
                    break;
                    case 'yesterday':
                    startDate.setDate(today.getDate() - 1);
                    endDate.setDate(today.getDate() - 1);
                    break;
                    case 'thisMonth':
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                    endDate = new Date(today.getFullYear(), today.getMonth(), 5);
                    break;
                    case 'lastMonth':
                    startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                    break;
                    case 'thisYear':
                    startDate = new Date(today.getFullYear(), 0, 1);
                    endDate = new Date(today.getFullYear(), 11, 31);
                    break;
                    case 'custom':
                    return;
                }
                
                startDateInput.value = startDate.toISOString().split('T')[0];
                endDateInput.value = endDate.toISOString().split('T')[0];
                });
            });
            
            applyBtn.addEventListener('click', function() {
                const startDate = new Date(startDateInput.value);
                const endDate = new Date(endDateInput.value);
                
                if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                alert('Date non valide. Riprova.');
                return;
                }
                
                if (startDate > endDate) {
                alert('La data di inizio deve essere precedente alla data di fine.');
                return;
                }
                
                const activeOption = document.querySelector('.period-option.activeDatePicker');
                let label = 'Personalizzato:';
                
                if (activeOption && activeOption.dataset.period !== 'custom') {
                switch(activeOption.dataset.period) {
                    case 'today':
                    label = 'Oggi:';
                    break;
                    case 'yesterday':
                    label = 'Ieri:';
                    break;
                    case 'thisMonth':
                    label = 'Questo mese:';
                    break;
                    case 'lastMonth':
                    label = 'Mese scorso:';
                    break;
                    case 'thisYear':
                    label = 'Quest\'anno:';
                    break;
                }
                }
                
                selectedDateRange.textContent = `${label} ${formatDate(startDate)} – ${formatDate(endDate)}`;
                
                datePicker.classList.remove('activeDatePicker');
            });
            
            cancelBtn.addEventListener('click', function() {
                datePicker.classList.remove('activeDatePicker');
            });
            });

            document.addEventListener('DOMContentLoaded', function() {
            const dropdownButton = document.querySelector('.dropdown-button');
            const dropdownContent = document.querySelector('.dropdown-content');
            
            dropdownButton.addEventListener('click', function() {
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });
            
            window.addEventListener('click', function(event) {
                if (!event.target.matches('.dropdown-button') && !event.target.closest('.dropdown-button')) {
                dropdownContent.style.display = 'none';
                }
            });
            
            dropdownContent.style.display = 'none';
            });
window.onload = function () {
    let arrayA = [
        { x: new Date(2017, 0, 1), y: 10 },
        { x: new Date(2017, 1, 1), y: 30 },
        { x: new Date(2017, 2, 1), y: 40 },
        { x: new Date(2017, 3, 1), y: 28 },
        { x: new Date(2017, 4, 1), y: 44 },
        { x: new Date(2017, 5, 1), y: 43 },
        { x: new Date(2017, 6, 1), y: 27 },
        { x: new Date(2017, 7, 1), y: 33 },
        { x: new Date(2017, 8, 1), y: 39 },
        { x: new Date(2017, 9, 1), y: 13 },
        { x: new Date(2017, 10, 1), y: 30 },
        { x: new Date(2017, 11, 1), y: 42 }
    ];

    let arrayB = [
        { x: new Date(2017, 0, 1), y: 13 },
        { x: new Date(2017, 1, 1), y: 34 },
        { x: new Date(2017, 2, 1), y: 45 },
        { x: new Date(2017, 3, 1), y: 26 },
        { x: new Date(2017, 4, 1), y: 43 },
        { x: new Date(2017, 5, 1), y: 42 },
        { x: new Date(2017, 6, 1), y: 28 },
        { x: new Date(2017, 7, 1), y: 39 },
        { x: new Date(2017, 8, 1), y: 31 },
        { x: new Date(2017, 9, 1), y: 16 },
        { x: new Date(2017, 10, 1), y: 37 },
        { x: new Date(2017, 11, 1), y: 49 }
    ];

    let arrayD = arrayA.map((point, index) => ({
        x: point.x,
        y: (point.y + arrayB[index].y) / 2,
        color: "#0097b2"
    }));

    let filterGraphic = document.querySelectorAll('.filterButtonDash');

    for (let fil of filterGraphic) {
        fil.addEventListener('click', function () {

            for (let a of filterGraphic) {
                a.classList.remove('activeFilterDash')
            }

            fil.classList.add('activeFilterDash');

            if (fil.value == "Days") {
                for (let i = 0; i < arrayA.length; i++) {
                    arrayA[i].x = new Date(2017, 0, i + 1);
                    arrayB[i].x = new Date(2017, 0, i + 1);
                }

                arrayD = arrayA.map((point, index) => ({
                    x: point.x,
                    y: (point.y + arrayB[index].y) / 2,
                    color: "#0097b2"
                }));

                chart.options.axisX.valueFormatString = "DD";
                chart.options.axisX.intervalType = "day";
                chart.options.axisX.interval = 1;
                chart.options.data[0].dataPoints = arrayD;
                chart.options.data[1].dataPoints = arrayA;
                chart.options.data[2].dataPoints = arrayB;

                chart.render();
            }

            
            if (fil.value == "Weeks") {
                for (let i = 0; i < arrayA.length; i++) {
                    arrayA[i].x = new Date(2017, i, i * 7);
                    arrayB[i].x = new Date(2017, i, i * 7);
                }

                arrayD = arrayA.map((point, index) => ({
                    x: point.x,
                    y: (point.y + arrayB[index].y) / 2,
                    color: "#0097b2"
                }));

                chart.options.axisX.valueFormatString = "MMM";
                chart.options.axisX.intervalType = "month";
                chart.options.axisX.interval = 1;
                chart.options.data[0].dataPoints = arrayD;
                chart.options.data[1].dataPoints = arrayA;
                chart.options.data[2].dataPoints = arrayB;

                chart.render();
            }

            if (fil.value == "Months") {
                for (let i = 0; i < arrayA.length; i++) {
                    arrayA[i].x = new Date(2017, i, 1);
                    arrayB[i].x = new Date(2017, i, 1);
                }

                arrayD = arrayA.map((point, index) => ({
                    x: point.x,
                    y: (point.y + arrayB[index].y) / 2,
                    color: "#0097b2"
                }));

                chart.options.axisX.valueFormatString = "MMM";
                chart.options.axisX.intervalType = "month";
                chart.options.axisX.interval = 1;
                chart.options.data[0].dataPoints = arrayD;
                chart.options.data[1].dataPoints = arrayA;
                chart.options.data[2].dataPoints = arrayB;

                chart.render();
            }

            

            if (fil.value == "Years") {
                for (let i = 0; i < arrayA.length; i++) {
                    arrayA[i].x = new Date(2014 + i, 0, 1);
                    arrayB[i].x = new Date(2014 + i, 0, 1);
                }

                arrayD = arrayA.map((point, index) => ({
                    x: point.x,
                    y: (point.y + arrayB[index].y) / 2,
                    color: "#0097b2"
                }));

                chart.options.axisX.valueFormatString = "YYYY";
                chart.options.axisX.intervalType = "year";
                chart.options.axisX.interval = 1;
                chart.options.data[0].dataPoints = arrayD;
                chart.options.data[1].dataPoints = arrayA;
                chart.options.data[2].dataPoints = arrayB;

                chart.render();
            }
        });
    }

    let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Trend by result",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "Poppins",
            padding: {
                top: 5,  
                bottom: 30,  
                left: 0,    
                right: 0    
            },
            horizontalAlign: "left",
        },
        axisX: {
            valueFormatString: "MMM",
            title: "Time",
            interval: 1,
            intervalType: "month",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            },
            fontSize: 14,
            fontWeight: 800,
            fontFamily: "Poppins",
            paddingBottom: 20,
        },
        axisY: {
            title: "Percentage",
            includeZero: true,
            crosshair: {
                enabled: true
            },
            fontSize: 14,
            fontWeight: 800,
            fontFamily: "Poppins",
            paddingBottom: 20,
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "left",
            itemclick: toogleDataSeries
        },
        data: [
            {
                type: "column",
                showInLegend: true,
                name: "Media",
                markerType: "square",
                lineColor: "rgb(8 182 174)",
                markerColor: "rgb(8 182 174)",
                xValueFormatString: "DD MMM, YYYY",
                color: "#F08080",
                dataPoints: arrayD
            },
            {
                type: "line",
                showInLegend: true,
                name: "Azienda B",
                lineColor: "rgb(60 106 113)",
                markerColor: "rgb(60 106 113)",
                dataPoints: arrayA
            },
            {
                type: "line",
                showInLegend: true,
                name: "Azienda C",
                lineColor: "rgb(8 182 174)",
                markerColor: "rgb(8 182 174)",
                dataPoints: arrayB
            }
        ]
    });

    chart.render();

        function toogleDataSeries(e) {
            if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }

        window.exportChart = function (type) {
            if (type === "excel") {
                exportToExcel(chart);
            } else if (type === "csv") {
                exportToCSV(chart);
            }
        };

        function exportToExcel(chart) {
            let data = chart.options.data[0].dataPoints;
            let ws_data = [["Date", "Number of Visits"]];
            data.forEach(point => {
                ws_data.push([
                    point.x.toLocaleDateString(),
                    point.y
                ]);
            });

            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet(ws_data);
            XLSX.utils.book_append_sheet(wb, ws, "Chart Data");

            XLSX.writeFile(wb, "chart_data.xlsx");
        }

        function exportToCSV(chart) {
            let data = chart.options.data[0].dataPoints;
            let csvContent = "data:text/csv;charset=utf-8,Date,Number of Visits\n";

            data.forEach(point => {
                csvContent += `${point.x.toLocaleDateString()},${point.y}\n`;
            });

            let encodedUri = encodeURI(csvContent);
            let link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "chart_data.csv");
            document.body.appendChild(link);

            link.click();
            document.body.removeChild(link);
        }

        var chartA = new CanvasJS.Chart("chartContainerCircle", {
            animationEnabled: true,
            title: {
                text: "Channel Mix",
                fontSize: 18,
                fontWeight: 700,
                padding: {
                    top: 2,  
                    bottom: 0,
                    left: 0,    
                    right: 0   
                },
                fontFamily: "Poppins",
                horizontalAlign: "left"
            },
            data: [{
                type: "doughnut",
                startAngle: 60,
                innerRadius: "60%", 
                radius: "80%",
                indexLabelFontSize: 17,
                indexLabel: "{label} - #percent%",
                indexLabelFontSize: 14, 
                indexLabelFontFamily: "Poppins", 
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                dataPoints: [
                    { y: 20, label: "Dooh", color: "#d9d9d9" },
                    { y: 20, label: "Social", color: "#a6a6a6" },
                    { y: 20, label: "Search", color: "#6edfda" },
                    { y: 20, label: "Display", color: "#07c8c0" },
                    { y: 20, label: "Programmatic", color: "#045c6a" },
                ]
            }]
        });

        chartA.render();

        

        let select_graph = document.getElementById('select_for_graph_dashboard');
        let new_title_input = document.getElementById('new_title_graph');
        let font_select = document.getElementById('font_for_graph_dash');
        let font_weight_select = document.getElementById('font_weight_for_graph_dash');
        let font_size_select = document.getElementById('font_size_for_graph_dash');
        let dog_graph = document.getElementById('editDoughnutButton');
        let lin_graph = document.getElementById('editLineeButton');
        let dog = document.getElementById('containerDoughnutGraph');
        let lin = document.getElementById('containerLineeGraph');

        select_graph.style.display = "none";

        dog_graph.addEventListener('click', function(e) {
            screen_options_design.style.minWidth = 300 + "px";
            screen_options_design.style.maxWidth = 300 + "px";
            screen_options_design.style.padding = 20 + "px";
            button_options_design.style.marginRight = 290 + "px";
            let closestMenuBar = e.target.closest('.menuButton');
            if (closestMenuBar) {
                closestMenuBar.style.backgroundColor = "#005d6d";
            }
            select_graph.value = "graph-1";
            new_title_input.value = chartA.options.title.text;
            font_select.value = (chartA.options.title.fontFamily).replace(/['"]/g, "");
            font_weight_select.value = chartA.options.title.fontWeight;
            font_size_select.value = chartA.options.title.fontSize;
            dog.style.border = "1px solid #0097B2";
            lin.style.border = "none";
        })

        lin_graph.addEventListener('click', function(e) {
            screen_options_design.style.minWidth = 300 + "px";
            screen_options_design.style.maxWidth = 300 + "px";
            screen_options_design.style.padding = 20 + "px";
            button_options_design.style.marginRight = 290 + "px";
            let closestMenuBar = e.target.closest('.menuButton');
            if (closestMenuBar) {
                closestMenuBar.style.backgroundColor = "#005d6d";
            }
            select_graph.value = "graph-2";
            new_title_input.value = chart.options.title.text;
            font_select.value = (chart.options.title.fontFamily).replace(/['"]/g, "");
            font_weight_select.value = chart.options.title.fontWeight;
            font_size_select.value = chart.options.title.fontSize;
            dog.style.border = "none";
            lin.style.border = "1px solid #0097B2";
        })

        window.addEventListener('click', function(e) {
            if (screen_options_design.style.marginRight !== 0 + "px" && !button_options_design.contains(e.target) && !screen_options_design.contains(e.target) && !dog_graph.contains(e.target) && !lin_graph.contains(e.target)) {
                button_options_design.style.marginRight = 0 + "px";
                screen_options_design.style.minWidth = 0 + "px";
                screen_options_design.style.maxWidth = 0 + "px";
                screen_options_design.style.padding = 0 + "px";
                reset_button_color(button_options_design);
                dog.style.border = "none";
                lin.style.border = "none";
            }
        })

        let colorSamples = document.querySelectorAll('.color-sample');
        let colorSwatches = document.querySelectorAll('.color-swatch');

        function changeChartColor(color) {
            if (select_graph.value == "graph-2") {
                chart.options.title.fontColor = color; 
                chart.render();
            } else {
                chartA.options.title.fontColor = color;
                chartA.render();
            }
        }

        colorSamples.forEach(function(sample) {
            sample.addEventListener('click', function() {
                let color = sample.style.backgroundColor; 
                changeChartColor(color);
            });
        });

        colorSwatches.forEach(function(swatch) {
            swatch.addEventListener('click', function() {
                let color = swatch.style.backgroundColor; 
                changeChartColor(color); 
            });
        });

        let hueSlider = document.getElementById('hueSlider');
        let opacitySlider = document.getElementById('opacitySlider');
        let hexInput = document.getElementById('hexInput');
        let opacityValue = document.querySelector('.opacity-value');
        let colorArea = document.querySelector('.color-area');

        hueSlider.addEventListener('input', function () {
            currentHue = parseInt(this.value);
            updateColorDisplay();
        });

        opacitySlider.addEventListener('input', function () {
            currentOpacity = parseInt(this.value);
            updateColorDisplay();
        });

        function updateColorDisplay() {
            colorArea.style.backgroundImage = `linear-gradient(to bottom, transparent, black), 
                linear-gradient(to right, white, hsl(${currentHue}, 100%, 50%))`;

            const color = `hsl(${currentHue}, ${currentSaturation}%, ${currentLightness}%)`;

            opacitySlider.style.backgroundColor = color;

            const hexColor = hslToHex(currentHue, currentSaturation, currentLightness);
            hexInput.value = hexColor;

            opacityValue.textContent = `${currentOpacity}%`;

            updateGraphColor();
        }

        function updateGraphColor() {
            const color = hslToHex(currentHue, currentSaturation, currentLightness);
            if (select_graph.value == "graph-2") {
                chart.options.title.fontColor = color;
                chart.render();
            } else {
                chartA.options.title.fontColor = color;
                chartA.render();
            }
        }

        function initializeSliders() {
            hueSlider.value = currentHue;
            opacitySlider.value = currentOpacity;
            updateColorDisplay();
        }

        let guideColors = document.querySelectorAll('.guide-color');

        guideColors.forEach(function(colorDiv) {
            colorDiv.addEventListener('click', function() {
                let color = colorDiv.style.backgroundColor;
                changeChartColor(color);
            });
        });

        function changeChartColor(color) {
            if (select_graph.value == "graph-2") {
                chart.options.title.fontColor = color;
                chart.render();
            } else {
                chartA.options.title.fontColor = color;
                chartA.render();
            }
        }

        select_graph.addEventListener('change', function() {
            new_title_input.value = (select_graph.value == "graph-2") ? chart.options.title.text : chartA.options.title.text;
            font_select.value = ((select_graph.value == "graph-2") ? chart.options.title.fontFamily : chartA.options.title.fontFamily).replace(/['"]/g, "");
            font_weight_select.value = (select_graph.value == "graph-2") ? chart.options.title.fontWeight : chartA.options.title.fontWeight;
            font_size_select.value = (select_graph.value == "graph-2") ? chart.options.title.fontSize : chartA.options.title.fontSize;
        })

        new_title_input.addEventListener('keydown', function(e) {
            if (e.key == "Enter") {
                if (select_graph.value == "graph-2") {
                    chart.options.title.text = new_title_input.value;
                    chart.render();
                } else {
                    chartA.options.title.text = new_title_input.value;
                    chartA.render();
                }
            }
        })

        font_size_select.addEventListener('change', function () {
            let selectedSize = font_size_select.value;

            if (select_graph.value === "graph-2") {
                chart.options.title.fontSize = parseInt(selectedSize); 
                chart.render();
            } else {
                chartA.options.title.fontSize = parseInt(selectedSize);
                chartA.render();
            }
        });

        font_select.addEventListener('change', function() {
            let selectedFont = `"${font_select.value}"`;

            if (select_graph.value == "graph-2") {
                chart.options.title.fontFamily = selectedFont;
                chart.render();
            } else {
                chartA.options.title.fontFamily = selectedFont;
                chartA.render();
            }
        })

        font_weight_select.addEventListener('change', function () {
            let selectedWeight = font_weight_select.value;

            if (select_graph.value === "graph-2") {
                chart.options.title.fontWeight = selectedWeight;
                chart.render();
            } else {
                chartA.options.title.fontWeight = selectedWeight;
                chartA.render();
            }
        });
    };

    window.exportChart = function (type) {
        if (type === "excel") {
            exportToExcel(chart);
        } else if (type === "csv") {
            exportToCSV(chart);
        }
    }

    function exportToExcel(chart) {
        let data = chart.options.data[0].dataPoints;
        let ws_data = [["Date", "Number of Visits"]];
        data.forEach(point => {
            ws_data.push([
                point.x.toLocaleDateString(), 
                point.y
            ]);
        });

        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, "Chart Data");

        XLSX.writeFile(wb, "chart_data.xlsx");
    }

    function exportToCSV(chart) {
        let data = chart.options.data[0].dataPoints;
        let csvContent = "data:text/csv;charset=utf-8,Date,Number of Visits\n";

        data.forEach(point => {
            csvContent += `${point.x.toLocaleDateString()},${point.y}\n`;
        });

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "chart_data.csv");
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);
    }
        let title_kpis = document.getElementById('titleKpis');
        let edit_kpis_text = document.getElementById('newTitleInputKpis');
        let save_button_kpis = document.getElementById('saveTitleButtonKpis');
        let edit_button_kpis = document.getElementById('editTitleButtonKpis');

        save_button_kpis.addEventListener('click', function() {
            let new_title = edit_kpis_text.value;
            title_kpis.innerHTML = new_title;
            save_button_kpis.style.display = "none";
            edit_kpis_text.style.display = "none";
            edit_button_kpis.style.display = "flex";
            title_kpis.style.display = "flex";
        });

        edit_button_kpis.addEventListener('click', function() {
            save_button_kpis.style.display = "flex";
            edit_kpis_text.style.display = "flex";
            edit_button_kpis.style.display = "none";
            title_kpis.style.display = "none";
        })

        document.addEventListener('DOMContentLoaded', function() {
        let buttonDash = document.querySelectorAll('.button-dash');
        let dropdownDash = document.querySelectorAll('.dropdown-dash');

        buttonDash.forEach(button => {
                button.addEventListener('click', function(event) {
                    event.stopPropagation(); 

                    const dropdown = this.nextElementSibling; 

                    if (dropdown && dropdown.classList.contains('dropdown-dash')) {
                        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                    }
                });
            });

            window.addEventListener('click', function() {
                document.querySelectorAll('.dropdown-dash').forEach(dropdown => {
                    dropdown.style.display = 'none';
                });
            });
        });

        let kpis_datas_button = document.querySelectorAll('.modifyWithSidebar');

        for (let kpis_button of kpis_datas_button) {
            kpis_button.addEventListener('click', function(event) {
                event.stopPropagation(); // Impedisce che il click si propaghi a `window`
                sidebar_metric.style.maxWidth = 300 + "px";
                sidebar_metric.style.minWidth = 300 + "px";
                sidebar_metric.style.padding = 20 + "px";
                magic_wand.style.marginRight = 290 + "px";
                magic_wand.style.backgroundColor = "#005d6d";
            });
        }

        let title_table = document.getElementById('titleTable');
        let edit_table_text = document.getElementById('newTitleInputTable');
        let save_button_table = document.getElementById('saveTitleButtonTable');
        let edit_button_table = document.getElementById('editTitleButtonTable');

        save_button_table.addEventListener('click', function() {
            let new_title = edit_table_text.value;
            title_table.innerHTML = new_title;
            save_button_table.style.display = "none";
            edit_table_text.style.display = "none";
            edit_button_table.style.display = "flex";
            title_table.style.display = "flex";
        });

        edit_button_table.addEventListener('click', function() {
            save_button_table.style.display = "flex";
            edit_table_text.style.display = "flex";
            edit_button_table.style.display = "none";
            title_table.style.display = "none";
        })

        let kpiFilterDash = document.querySelectorAll('.customMenu');

        for (let kpif of kpiFilterDash) {
            kpif.addEventListener('click', function() {
                for (let k of kpiFilterDash) {
                    k.classList.remove('activeCardDash');
                }

                kpif.classList.add('activeCardDash');
            })
        }

        
        let tableFilterDash = document.querySelectorAll('.tableFilterDash');

        for (let tabf of tableFilterDash) {
            tabf.addEventListener('click', function() {
                for (let t of tableFilterDash) {
                    t.classList.remove('strangeActiveCardDash');
                }
                
                tabf.classList.add('strangeActiveCardDash');
            })
        }

        window.addEventListener('load', function() {

            let datas = [
                {
                    "Channel type": "TikTok",
                    "Investment": 3200,
                    "Click": 432,
                    "Impression": 1200000,
                    "Views": 27000,
                    "Conversion": 39800
                },
                {
                    "Channel type": "Social",
                    "Investment": 3000,
                    "Click": 300,
                    "Impression": 1000120,
                    "Views": 1000120,
                    "Conversion": 12
                },
                {
                    "Channel type": "Display",
                    "Investment": 3000,
                    "Click": 300,
                    "Impression": 1000120,
                    "Views": 1000120,
                    "Conversion": 12
                },
                {
                    "Channel type": "Programmatic",
                    "Investment": 3000,
                    "Click": 300,
                    "Impression": 1000120,
                    "Views": 1000120,
                    "Conversion": 12
                },
                {
                    "Channel type": "Search",
                    "Investment": 3000,
                    "Click": 300,
                    "Impression": 1000120,
                    "Views": 1000120,
                    "Conversion": 12
                }
            ]

            let total_row = {
                "Channel type": "TOTAL",
                "Investment": 0,
                "Click": 0,
                "Impression": 0,
                "Views": 0,
                "Conversion": 0
            }

            for (let a of datas) {
                if (a["Investment"]) {
                    total_row["Investment"] += a["Investment"];
                }
                
                if (a["Click"]) {
                    total_row["Click"] += a["Click"];
                }
                
                if (a["Impression"]) {
                    total_row["Impression"] += a["Impression"];
                }
                
                if (a["Views"]) {
                    total_row["Views"] += a["Views"];
                }
                
                if (a["Conversion"]) {
                    total_row["Conversion"] += a["Conversion"];
                }
            }

            datas.push(total_row);

            let table = new DataTable('#dataTableDash', {
                paging: true,
                pageLength: 10,
                order: [[0, "asc"]],
                select: true,
                data: datas,
                columns: [
                    {data: "Channel type"},
                    {data: "Investment"},
                    {data: "Click"},
                    {data: "Impression"},
                    {data: "Views"},
                    {data: "Conversion"},
                ],
                createdRow: function(row, data, dataIndex) {
                    if (data["Channel type"] == "TOTAL") {
                        row.classList.add('total-row');
                    }
                }
            });
            let searchFilter = document.querySelector('#dataTableDash_filter');
            let showFilter = document.querySelector('#dataTableDash_length');
            let bottomPart = document.querySelector('#tableBottomPart');
            let botPart = document.querySelector('#dataTableDash_info');
            let searchDisplay = document.querySelector('#tableBotShowFilt');

            console.log(searchFilter);

            searchFilter.classList.add("Filter_for_table_dash");
            let search_filter_placeholder = document.querySelector(".dataTables_filter > label > input");
            if (search_filter_placeholder) {
                search_filter_placeholder.setAttribute("placeholder", "Search");
            }

            let filterLabel = document.querySelector("#dataTableDash_filter label");
            if (filterLabel) {
                filterLabel.childNodes.forEach(node => {
                    if (node.nodeType === 3) { 
                        node.remove(); 
                    }
                });
            }

            let toggle_button = document.getElementById('toggle_filter_column_dash');
            let menu_filter_column = document.getElementById('datatable_column_view_dash');
            toggle_button.addEventListener('click', function() {
                menu_filter_column.style.display = "block";
            })

            bottomPart.appendChild(searchFilter);
            showFilter.style.display = "none";

            document.querySelectorAll(".toggle-column").forEach(function(checkbox) {
                checkbox.addEventListener("change", function() {
                    var columnIndex = this.getAttribute("data-column"); 
                    var column = table.column(columnIndex); 
                    column.visible(this.checked); 
                });
            });

            window.addEventListener('click', function(e) {
                if (!toggle_button.contains(e.target) && !menu_filter_column.contains(e.target)) {
                    menu_filter_column.style.display = "none";
                }
            })
        })

        let edit_button = document.getElementById('buttonForEdit');
        let pencil_edit = document.querySelectorAll('.editPencilDash');

        for (let pencil of pencil_edit) {
            pencil.style.display = "none";
        }

        let pencil_open_or_close = -1;

        edit_button.addEventListener('click', function() {
            pencil_open_or_close = pencil_open_or_close * -1;
            for (let pencil of pencil_edit) {
                if (pencil_open_or_close == 1) {
                    pencil.style.display = "flex";
                    edit_button.title = "Normal views";
                    edit_button.innerHTML = '<svg width = "25px" height = "25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#fff" d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160z"></path></g></svg>';
                } else {
                    pencil.style.display = "none";
                    edit_button.title = "Editor views";
                    edit_button.innerHTML = '<svg width = "25px" height = "25px" viewBox="0 0 64 64" data-name="Icon Set - Black" id="Icon_Set_-_Black" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs> <style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:8px;}.cls-2{fill:#fffff;}</style> </defs> <g id="Slider"> <line class="cls-1" x1="10" x2="54" y1="16" y2="16"></line> <line class="cls-1" x1="10" x2="54" y1="32" y2="32"></line> <line class="cls-1" x1="10" x2="54" y1="48" y2="48"></line> <path d="M20,8a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z"></path> <path d="M44,24a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z"></path> <path d="M20,40a8,8,0,1,0,8,8,8,8,0,0,0-8-8Z"></path> <circle class="cls-2" cx="20" cy="16" r="3"></circle> <circle class="cls-2" cx="44" cy="32" r="3"></circle> <circle class="cls-2" cx="20" cy="48" r="3"></circle> </g> </g></svg>';
                }
            }
        })
    }
}