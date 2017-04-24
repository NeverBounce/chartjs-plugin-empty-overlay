var Samples = window.Samples || {};

var generateDataSet = function(ilen, jlen, zeroValues) {
    var datasets = [];
    var dataset;
    var i, j;

    for (i = 0; i < ilen; ++i) {
        dataset = {data: [], backgroundColor: [], label: 'DS' + i};
        for (j = 0; j < jlen; ++j) {
            if (zeroValues)
                dataset.data.push(0);
            else
                dataset.data.push(Math.round(Math.random() * 100));
        }

        let color = (((j + i + 1) * 16) % 256) + ',' +
            (((j + i + 2) * 32) % 256) + ',' +
            (((j + i + 3) * 64) % 256);

        dataset.borderColor = 'rgba(' + color + ', .68)';
        dataset.backgroundColor = 'rgba(' + color + ', 0.32)';

        datasets.push(dataset);
    }

    return datasets;
};

Samples.utils = {

    defaultLineOptions: function() {
        return {
            responsive: true,
            legend: {
                position: 'top',
            },
            animation: {
                duration: 2000,
            },
        };
    },

    generateLineData: function() {
        var labels = [];
        var ilen = 3;
        var jlen = 3;
        var datasets = generateDataSet(ilen, jlen);

        for (var j = 0; j < jlen; ++j) {
            labels.push(j);
        }

        return {
            datasets: datasets,
            labels: labels,
        };
    },

    generateLineDataZero: function() {
        var labels = [];
        var ilen = 3;
        var jlen = 3;
        var datasets = generateDataSet(ilen, jlen, true);

        for (var j = 0; j < jlen; ++j) {
            labels.push(j);
        }

        return {
            datasets: datasets,
            labels: labels,
        };
    },

    generateLineNoData: function() {
        return {
            datasets: [],
            labels: [],
        };
    },
};
