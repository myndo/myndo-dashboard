window.MYNDO_DASHBOARD_START = {
    open_generate_dashboard : function(screen_generate) {
        screen_generate.style.display = "flex";
    },

    create_new_dashboard : function(screen_generate) {
        screen_generate.style.display = "none";
        alert("Nuova dashboard generata correttamente!");
    },

    close_new_dashboard : function(screen_generate) {
        screen_generate.style.display = "none";
    },

    filters_data_table : function(agency_filter, client_filter, brand_filter) {
        let table = document.getElementById("report_table_for_dashboard");	
        let rows = table.getElementsByTagName("tr"); 

        let agencyValue = agency_filter.value.toLowerCase();
        let clientValue = client_filter.value.toLowerCase();
        let brandValue = brand_filter.value.toLowerCase();

        for (let i = 1; i < rows.length; i++) { 
            let cells = rows[i].getElementsByTagName("td");
            if (cells.length === 0) continue; 

            let agencyText = cells[0].textContent.toLowerCase();
            let clientText = cells[1].textContent.toLowerCase();
            let brandText = cells[2].textContent.toLowerCase();

            if (
                (agencyValue && agencyText.includes(agencyValue)) ||
                (clientValue && clientText.includes(clientValue)) ||
                (brandValue && brandText.includes(brandValue))
            ) {
                rows[i].style.display = ""; 
            } else {
                rows[i].style.display = "none";
            }
        }
    },

    reset_filters_data_table : function(agency_filter, client_filter, brand_filter) {
        let table = document.getElementById("report_table_for_dashboard");	
        let rows = table.getElementsByTagName("tr"); 

        agency_filter.value = "Agenzia";
        client_filter.value = "Cliente";
        brand_filter.value = "Brand";

        for (let i = 1; i < rows.length; i++) { 
            rows[i].style.display = "";
        }
    },

    init : function() {
        let button_gen_dash = document.getElementById('button_for_generate_dashboard');
        let screen_generate = document.getElementById('new_dashboard_gen');
        let button_create_new_dashboard = document.getElementById('create_new_dashboard');
        let button_close_new_dashboard = document.getElementById('close_new_dashboard');
        let button_filter = document.getElementById('filter_for_table_dash');
        let agency_filter = document.getElementById('agency_filter');
        let client_filter = document.getElementById('client_filter');
        let brand_filter = document.getElementById('brand_filter');
        let reset_filter_button = document.getElementById('filter_for_table_dash_reset');
        let datas = [
            {
                "Agenzia" : "Agenzia A",
                "Cliente" : "Cliente X",
                "Brand" : "Brand 1",
                "Nome report" : "Report Q1 2024",
                "Investimento" : "€50.000",
                "Tipo report" : "Overall",
                "Ultimo update" : "01/03/2024",
                "Azioni" : "",
            },
            {
                "Agenzia" : "Agenzia B",
                "Cliente" : "Cliente Z",
                "Brand" : "Brand 2",
                "Nome report" : "Report Q2 2024",
                "Investimento" : "€53.000",
                "Tipo report" : "Overall",
                "Ultimo update" : "01/03/2025",
                "Azioni" : "",
            }
        ]

        button_filter.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.filters_data_table(agency_filter, client_filter, brand_filter);
        })

        reset_filter_button.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.reset_filters_data_table(agency_filter, client_filter, brand_filter);
        })

        button_close_new_dashboard.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.close_new_dashboard(screen_generate);
        })
        
        button_gen_dash.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.open_generate_dashboard(screen_generate);
        })

        window.addEventListener('click', function(e) {
            if (!button_gen_dash.contains(e.target) && !screen_generate.contains(e.target)) {
                screen_generate.style.display = "none";
            }
        })

        button_create_new_dashboard.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.create_new_dashboard(screen_generate);
        })

        let table = new DataTable('#report_table_for_dashboard', {
            paging: true,
            pageLength: 10,
            order: [[0, "asc"]],
            select: true,
            data: datas,
            columns: [
                {data: "Agenzia"},
                {data: "Cliente"},
                {data: "Brand"},
                {data: "Nome report"},
                {data: "Investimento"},
                {data: "Tipo report"},
                {data: "Ultimo update"},
                {data: "Azioni"}
            ]
        });

        document.addEventListener('DOMContentLoaded', function () {
            let screen_buttons = document.getElementById('attachment_buttons_table');
            let search_filter = document.getElementById('report_table_for_dashboard_filter');
            let input_search_filter = document.querySelector('#report_table_for_dashboard_filter > label > input')
            let label_search_filter = document.querySelector('#report_table_for_dashboard_filter > label')
            
            screen_buttons.appendChild(search_filter);
            input_search_filter.setAttribute('placeholder', 'Search...')
            label_search_filter.firstChild.remove();
        });
    }
}