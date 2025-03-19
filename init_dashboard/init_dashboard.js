window.MYNDO_DASHBOARD_START = {
    open_generate_dashboard : function(screen_generate) {
        // Serve per aprire il pop-up per la generazione di una nuova dasboard
        screen_generate.style.display = "flex";
    },

    create_new_dashboard : function(screen_generate) {
        // Serve per generare la nuova dashboard
        screen_generate.style.display = "none";
        alert("New dashboard generated!");
    },

    close_new_dashboard : function(screen_generate) {
        // Serve per chiudere il pop-up per la generazione di una nuova dashboard
        screen_generate.style.display = "none";
    },

    filters_data_table : function(agency_filter, client_filter, brand_filter) {
        // Serve per i tre filtri in alto che interagiscono con la tabella (Agenzia, Cliente, Brand)
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
        // Serve per resettare i filtri (Agenzia, Cliente, Brand) e ricaricare tutte le voci della tabella
        let table = document.getElementById("report_table_for_dashboard");	
        let rows = table.getElementsByTagName("tr"); 

        agency_filter.value = "Agency";
        client_filter.value = "Client";
        brand_filter.value = "Brand";

        for (let i = 1; i < rows.length; i++) { 
            rows[i].style.display = "";
        }
    },

    delete_rows_table : function(table, id) {
        // Serve per eliminare le righe dalla tabella (Con il bottone rosso delle righe)
        let row = table.row($(`button[id="${id}"]`).closest('tr'));
        row.remove().draw(); 
    },

    edit_rows_table : function(table, id) {
        // Serve per modificare le righe della tabella (Con il bottone della matitina delle righe)
        let row = table.row($(`button[id="${id}"]`).closest('tr'));
        let data = row.data(); 

        let nuovoNome = prompt("Edit report name:", data["Report name"]);
        if (nuovoNome !== null) {
            data["Report name"] = nuovoNome; 
            row.data(data).draw(); 
        }
    },

    view_dashboard_of_row : function(edit_rows, delete_rows, event) {
        // Serve per vedere le dashboard delle righe, funziona al click sulle righe della tabella
        let openable = true;
        for (let edit of edit_rows) {
            if (edit.contains(event.target)) {
                openable = false;
            }
        }
        for (let del of delete_rows) {
            if (del.contains(event.target)) {
                openable = false;
            }
        }

        if (openable == true) {
            // Inserire dentro questo if le operazioni di apertura
            alert("View dashboard");
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
        let agencySet = new Set();
        let clientSet = new Set();
        let brandSet = new Set();
        // Dashboard nell'array di oggetti (righe della tabella)
        let datas = [
            {
                "id": 1,
                "Agency": "Agenzia A",
                "Client": "Cliente X",
                "Brand": "Brand 1",
                "Report name": "Report Q1 2024",
                "Investment": "€50.000",
                "Report type": "Overall",
                "Last update": "01/03/2024",
                "Actions": ""
            },
            {
                "id": 2,
                "Agency": "Agenzia B",
                "Client": "Cliente Z",
                "Brand": "Brand 2",
                "Report name": "Report Q2 2024",
                "Investment": "€53.000",
                "Report type": "Overall",
                "Last update": "01/03/2025",
                "Actions": ""
            },
            {
                "id": 3,
                "Agency": "Agenzia C",
                "Client": "Cliente Z",
                "Brand": "Brand 3",
                "Report name": "Report Q3 2024",
                "Investment": "€55.000",
                "Report type": "Overall",
                "Last update": "01/03/2025",
                "Actions": ""
            }
        ];

        // Caricamento delle options nei filtri (Agenzia, Cliente, Brand)
        for (let dat of datas) {
            if (dat["Agency"] && !agencySet.has(dat["Agency"])) {
                agencySet.add(dat["Agency"]);
                let new_option = document.createElement('option');
                new_option.innerHTML = dat["Agency"];
                agency_filter.appendChild(new_option);
            }

            if (dat["Client"] && !clientSet.has(dat["Client"])) {
                clientSet.add(dat["Client"]);
                let new_option = document.createElement('option');
                new_option.innerHTML = dat["Client"];
                client_filter.appendChild(new_option);
            }

            if (dat["Brand"] && !brandSet.has(dat["Brand"])) {
                brandSet.add(dat["Brand"]);
                let new_option = document.createElement('option');
                new_option.innerHTML = dat["Brand"];
                brand_filter.appendChild(new_option);
            }
        }

        // Evento al click del bottone "Filtra"
        button_filter.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.filters_data_table(agency_filter, client_filter, brand_filter);
        })

        // Evento al click del bottone "Reset Filter"
        reset_filter_button.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.reset_filters_data_table(agency_filter, client_filter, brand_filter);
        })

        // Evento al click del bottone "Chiudi" per la creazione di una nuova dashboard
        button_close_new_dashboard.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.close_new_dashboard(screen_generate);
        })
        
        // Evento al click del bottone "Genera report" per l'apertura del pop-up
        button_gen_dash.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.open_generate_dashboard(screen_generate);
        })

        // Evento al click sulla finestra in generale (Serve per far chiudere il pop-up al click esterno)
        window.addEventListener('click', function(e) {
            if (!button_gen_dash.contains(e.target) && !screen_generate.contains(e.target)) {
                window.MYNDO_DASHBOARD_START.close_new_dashboard(screen_generate);
            }
        })

        // Evento al click del bottone "Genera report" (Servirebbe per creare la nuova dashboard)
        button_create_new_dashboard.addEventListener('click', function() {
            window.MYNDO_DASHBOARD_START.create_new_dashboard(screen_generate);
        })

        // Creazione della tabella
        let table = new DataTable('#report_table_for_dashboard', {
            searching: true,
            paging: true,
            pageLength: 10,
            order: [[0, "asc"]],
            select: true,
            data: datas,
            columns: [
                {data: "Agency"},
                {data: "Client"},
                {data: "Brand"},
                {data: "Report name"},
                {data: "Investment"},
                {data: "Report type"},
                {data: "Last update"},
                {
                    data: 'Actions',
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                        <div class = "action_column_for_table">
                            <button class="button_for_report_dash edit_line_table_td" id="${row.id}" title="Modifica">
                                <svg width = "17px" height = "17px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1498 7.93997L8.27978 19.81C7.21978 20.88 4.04977 21.3699 3.32977 20.6599C2.60977 19.9499 3.11978 16.78 4.17978 15.71L16.0498 3.84C16.5979 3.31801 17.3283 3.03097 18.0851 3.04019C18.842 3.04942 19.5652 3.35418 20.1004 3.88938C20.6356 4.42457 20.9403 5.14781 20.9496 5.90463C20.9588 6.66146 20.6718 7.39189 20.1498 7.93997V7.93997Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                Edit line
                                </button>
                            <button class="button_for_report_dash button_for_report_dash_red delete_line_table_td" id="${row.id}" title="Elimina">
                                <svg width = "17px" height = "17px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M0 8L6 2H16V14H6L0 8ZM6.79289 6.20711L8.58579 8L6.79289 9.79289L8.20711 11.2071L10 9.41421L11.7929 11.2071L13.2071 9.79289L11.4142 8L13.2071 6.20711L11.7929 4.79289L10 6.58579L8.20711 4.79289L6.79289 6.20711Z" fill="#fff"></path> </g></svg>
                                Delete line
                            </button>
                        </div>
                        `;
                    }
                }
            ]
        });

        // Sposto il pulsante di search in un div esterno al caricamento della pagina ed elimino la scritta "Search..."
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

        // Evento al click del pulsante di edit delle righe
        for (let edit_row of edit_rows) {
            edit_row.addEventListener('click', function() {
                window.MYNDO_DASHBOARD_START.edit_rows_table(table, edit_row.id);
            })
        }

        // Evento al click del pulsante di delete delle righe
        for (let delete_row of delete_rows) {
            delete_row.addEventListener('click', function() {
                window.MYNDO_DASHBOARD_START.delete_rows_table(table, delete_row.id);
            })
        }

        let rows_of_table = document.querySelectorAll('#report_table_for_dashboard > tbody > tr');

        // Evento al click delle righe
        for (let row of rows_of_table) {
            row.addEventListener('click', function(event) {
                window.MYNDO_DASHBOARD_START.view_dashboard_of_row(edit_rows, delete_rows, event);
            })
        }
    }
}