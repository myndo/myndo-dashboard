exports._create_doughnut = function() {
    let data = this.dataSources.getData();
    this.chart = new CanvasJS.Chart(this.container, {
        animationEnabled: true,
        title: {
            text: "Channel Mix",
            horizontalAlign: "left"
        },
        data: [{
            type: this.graphType,
            startAngle: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: this._convert_data(this.dimension, this.metric, data)
        }]
    });

    this.chart.render();
}