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

    delete_rows_table : function(table, id) {
        let row = table.row($(`button[id="${id}"]`).closest('tr'));
        row.remove().draw(); 
    },

    edit_rows_table : function(table, id) {
        let row = table.row($(`button[id="${id}"]`).closest('tr'));
        let data = row.data(); 

        let nuovoNome = prompt("Modifica il nome del report:", data["Nome report"]);
        if (nuovoNome !== null) {
            data["Nome report"] = nuovoNome; 
            row.data(data).draw(); 
        }
    },

    view_dashboard_of_row : function() {
        alert("View dashboard");
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
        let agencySet = new Set();
        let clientSet = new Set();
        let brandSet = new Set();
        let datas = [
            {
                "id": 1,
                "Agenzia": "Agenzia A",
                "Cliente": "Cliente X",
                "Brand": "Brand 1",
                "Nome report": "Report Q1 2024",
                "Investimento": "€50.000",
                "Tipo report": "Overall",
                "Ultimo update": "01/03/2024",
                "Azioni": ""
            },
            {
                "id": 2,
                "Agenzia": "Agenzia B",
                "Cliente": "Cliente Z",
                "Brand": "Brand 2",
                "Nome report": "Report Q2 2024",
                "Investimento": "€53.000",
                "Tipo report": "Overall",
                "Ultimo update": "01/03/2025",
                "Azioni": ""
            },
            {
                "id": 3,
                "Agenzia": "Agenzia C",
                "Cliente": "Cliente Z",
                "Brand": "Brand 3",
                "Nome report": "Report Q3 2024",
                "Investimento": "€55.000",
                "Tipo report": "Overall",
                "Ultimo update": "01/03/2025",
                "Azioni": ""
            }
        ];

        for (let dat of datas) {
            if (dat["Agenzia"] && !agencySet.has(dat["Agenzia"])) {
                agencySet.add(dat["Agenzia"]);
                let new_option = document.createElement('option');
                new_option.innerHTML = dat["Agenzia"];
                agency_filter.appendChild(new_option);
            }

            if (dat["Cliente"] && !clientSet.has(dat["Cliente"])) {
                clientSet.add(dat["Cliente"]);
                let new_option = document.createElement('option');
                new_option.innerHTML = dat["Cliente"];
                client_filter.appendChild(new_option);
            }

            if (dat["Brand"] && !brandSet.has(dat["Brand"])) {
                brandSet.add(dat["Brand"]);
                let new_option = document.createElement('option');
                new_option.innerHTML = dat["Brand"];
                brand_filter.appendChild(new_option);
            }
        }

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
                window.MYNDO_DASHBOARD_START.close_new_dashboard(screen_generate);
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
                {
                    data: 'Azioni',
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                        <div class = "action_column_for_table">
                            <button class="button_for_report_dash edit_line_table_td" id="${row.id}" title="Modifica">
                                <svg width = "20px" height = "20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                Edit line
                                </button>
                            <button class="button_for_report_dash button_for_report_dash_red delete_line_table_td" id="${row.id}" title="Elimina">
                                <svg width = "20px" height = "20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8L6 2H16V14H6L0 8ZM6.79289 6.20711L8.58579 8L6.79289 9.79289L8.20711 11.2071L10 9.41421L11.7929 11.2071L13.2071 9.79289L11.4142 8L13.2071 6.20711L11.7929 4.79289L10 6.58579L8.20711 4.79289L6.79289 6.20711Z" fill="#fff"></path> </g></svg>
                                Delete line
                            </button>
                        </div>
                        `;
                    }
                }
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
        
        let edit_rows = document.querySelectorAll('.edit_line_table_td');
        let delete_rows = document.querySelectorAll('.delete_line_table_td');

        for (let edit_row of edit_rows) {
            edit_row.addEventListener('click', function() {
                window.MYNDO_DASHBOARD_START.edit_rows_table(table, edit_row.id);
            })
        }

        for (let delete_row of delete_rows) {
            delete_row.addEventListener('click', function() {
                window.MYNDO_DASHBOARD_START.delete_rows_table(table, delete_row.id);
            })
        }

        let rows_of_table = document.querySelectorAll('#report_table_for_dashboard > tbody > tr');

        for (let row of rows_of_table) {
            row.addEventListener('click', function() {
                window.MYNDO_DASHBOARD_START.view_dashboard_of_row();
            })
        }
    }
}