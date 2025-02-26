var dataSources = {
    getData: function(a) {
        if (a == "Weekly") return 
            [
                { y: 20, label: "Dooh", color: "#d9d9d9" },
                { y: 20, label: "Social", color: "#a6a6a6" },
                { y: 20, label: "Search", color: "#6edfda" },
                { y: 20, label: "Display", color: "#07c8c0" },
                { y: 20, label: "Programmatic", color: "#045c6a" },
            ]
    }
}

function graphDashboard(container, graphType, dataSources, page) {
    this.container = container;
    this.graphType = graphType;
    this.dataSources = dataSources;
    this.page = page;
}

graphDashboard.prototype(
    render: function() {
        console.log("AAAA");
    },
    init: function() {
        if (graphType == "doughnut") {
            return this._create_doughnut();
        }
    },
    _create_doughnut: function() {
        this.chart = new CanvasJS.Chart(this.container, {
            animationEnabled: true,
            title: {
                text: "Ehannel Mix",
                horizontalAlign: "left"
            },
            data: [{
                type: this.graphType,
                startAngle: 60,
                indexLabelFontSize: 17,
                indexLabel: "{label} - #percent%",
                toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                dataPoints: this.dataSources.getData
            }]
        });
    }
)
var chart = new myndo.graphDashboard('#aaa', "doughnut", dataSources, null);