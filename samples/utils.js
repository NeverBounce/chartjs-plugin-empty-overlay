var Samples = window.Samples || {};
Samples.utils = {
	defaultBarOptions: function() {
		return {
			responsive: false,
			legend: {
				position: 'top'
			},
			animation: {
				duration: 2000
			}
		};
	},

	generateBarData: function() {
		var datasets = [];
		var labels = [];
		var ilen = 4;
		var jlen = 4;
		var dataset;
		var i, j;

		for (i=0; i<ilen; ++i) {
			dataset = {data: [], backgroundColor: [], label: 'DS' + i};
			for (j=0; j<jlen; ++j) {
				dataset.data.push(Math.round(Math.random() * 100));
				dataset.backgroundColor.push(
					'rgba(' +
						(((j+i+1)*16)%256) + ',' +
						(((j+i+2)*32)%256) + ',' +
						(((j+i+3)*64)%256) + ', 0.32)'
				);
			}

			datasets.push(dataset);
		}

		for (j=0; j<jlen; ++j) {
			labels.push('D' + i);
		}

		return {
			datasets: datasets,
			labels: labels
		};
	},

    defaultLineOptions: function() {
        return {
            responsive: true,
            legend: {
                position: 'top'
            },
            animation: {
                duration: 2000
            }
        };
    },

    generateLineData: function() {
        var datasets = [];
        var labels = [];
        var ilen = 3;
        var jlen = 3;
        var dataset;
        var i, j;

        for (i=0; i<ilen; ++i) {
            dataset = {data: [], backgroundColor: [], label: 'DS' + i};
            for (j=0; j<jlen; ++j) {
                dataset.data.push(Math.round(Math.random() * 100));
            }

            let color = (((j+i+1)*16)%256) + ',' +
                (((j+i+2)*32)%256) + ',' +
                (((j+i+3)*64)%256);

            dataset.borderColor = 'rgba(' + color + ', .68)';
            dataset.backgroundColor = 'rgba(' + color + ', 0.32)';

            datasets.push(dataset);
        }

        for (j=0; j<jlen; ++j) {
            labels.push(j);
        }

        return {
            datasets: datasets,
            labels: labels
        };
    },

    generateLineDataZero: function() {
        var datasets = [];
        var labels = [];
        var ilen = 3;
        var jlen = 3;
        var dataset;
        var i, j;

        for (i=0; i<ilen; ++i) {
            dataset = {data: [], backgroundColor: [], label: 'DS' + i};
            for (j=0; j<jlen; ++j) {
                dataset.data.push(0);
            }

            let color = (((j+i+1)*16)%256) + ',' +
                (((j+i+2)*32)%256) + ',' +
                (((j+i+3)*64)%256);

            dataset.borderColor = 'rgba(' + color + ', .68)';
            dataset.backgroundColor = 'rgba(' + color + ', 0.32)';

            datasets.push(dataset);
        }

        for (j=0; j<jlen; ++j) {
            labels.push(j);
        }

        return {
            datasets: datasets,
            labels: labels
        };
    },

    generateLineNoData: function() {
        var datasets = [];
        var labels = [];
        var ilen = 0;
        var jlen = 0;
        var dataset;
        var i, j;

        for (i=0; i<ilen; ++i) {
            dataset = {data: [], backgroundColor: [], label: 'DS' + i};
            for (j=0; j<jlen; ++j) {
                // dataset.data.push(Math.round(Math.random() * 100));
                dataset.data.push(0);
            }

            let color = (((j+i+1)*16)%256) + ',' +
                (((j+i+2)*32)%256) + ',' +
                (((j+i+3)*64)%256);

            dataset.borderColor = 'rgba(' + color + ', .68)';
            dataset.backgroundColor = 'rgba(' + color + ', 0.32)';

            datasets.push(dataset);
        }

        for (j=0; j<jlen; ++j) {
            labels.push(j);
        }

        return {
            datasets: [],
            labels: labels
        };
    },
};
