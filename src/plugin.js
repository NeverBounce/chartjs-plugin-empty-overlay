'use strict';

(function () {

    var Chart = window.Chart;
    var helpers = Chart.helpers;

    Chart.defaults.global.emptyOverlay = {
        enabled: true,
        message: 'No data available',
        fillStyle: 'rgba(100,100,100,0.3)',
        fontColor: 'rgba(100,100,100,1.0)',
        fontStroke: 'rgba(255,255,255,0.6)',
        fontStrokeWidth: '3',
        fontSize: 'auto',
    };

    /**
     * Checks if the chart is currently empty
     * @param datasets
     * @param model
     * @returns {boolean}
     */
    function isChartEmpty(datasets, model) {
        // Check for non existent datasets
        if (!datasets || datasets.length < 1)
            model.isEmpty = true;

        // Filter down the datasets to determine if they contain non zero values
        var filtered = datasets.map(function (element) {
            var fltr = element.data.filter(function (ele) {
                // Support data expressed as x,y coordinates as well as y only values
                return ele.x ? (ele.x > 0) : (ele > 0);
            });
            return fltr.length > 0
        }).filter(function (element) {
            return element;
        });

        return (model.isEmpty = filtered.length < 1);
    }

    Chart.EmptyOverlay = Chart.Element.extend({

        position: 'chartArea',

        initialize: function (config) {
            helpers.extend(this, config);
        },

        // Shared Methods
        isHorizontal: function () {
            return this.options.position === 'top' || this.options.position === 'bottom';
        },

        // Actually draw the legend on the canvas
        draw: function () {
            var me = this;
            var ctx = me.ctx;

            var globalDefault = Chart.defaults.global;
            var emptyOpts = me.options;
            var chartArea = me.chart.chartArea,
                x = chartArea.left,
                y = chartArea.top,
                width = chartArea.right - chartArea.left,
                height = chartArea.bottom - chartArea.top,
                textX = (x / 2) + (width / 2),
                textY = y + (height / 2),
                itemOrDefault = helpers.getValueOrDefault,
                message = emptyOpts.message,
                fontSizeOpt = itemOrDefault(emptyOpts.fontSize, globalDefault.defaultFontSize),
                fontSize = (fontSizeOpt === 'auto' ? (Math.sqrt(width)) : fontSizeOpt),
                fontStyle = itemOrDefault(emptyOpts.fontStyle, globalDefault.defaultFontStyle),
                fontFamily = itemOrDefault(emptyOpts.fontFamily, globalDefault.defaultFontFamily),
                labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);

            ctx.fillStyle = itemOrDefault(emptyOpts.fillStyle, globalDefault.defaultColor);
            ctx.fillRect(x, y, width, height);

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = labelFont;
            ctx.lineWidth = emptyOpts.fontStrokeWidth;
            ctx.miterLimit = 2;
            ctx.strokeStyle = emptyOpts.fontStroke;
            ctx.strokeText(message, textX, textY, width);

            ctx.fillStyle = itemOrDefault(emptyOpts.fontColor, globalDefault.defaultFontColor);
            ctx.fillText(message, textX, textY, width);
        },
    });

    function createNewEmptyOverlay(chartInstance, emptyOpts) {
        var emptyOverlay = new Chart.EmptyOverlay({
            ctx: chartInstance.chart.ctx,
            options: emptyOpts,
            originalConfig: chartInstance.config,
            chart: chartInstance,
            isEmpty: false,
        });
        chartInstance.emptyOverlay = emptyOverlay;
    }

    // Register the emptyOverlay plugin
    Chart.plugins.register({
        beforeInit: function (chartInstance) {

            // Merge config
            var emptyOpts = chartInstance.options.emptyOverlay || {};
            emptyOpts = helpers.configMerge(Chart.defaults.global.emptyOverlay, emptyOpts);

            // Add config and create object
            createNewEmptyOverlay(chartInstance, emptyOpts);
        },

        beforeUpdate: function (chartInstance) {
            var empty = isChartEmpty(chartInstance.config.data.datasets, chartInstance.emptyOverlay);
            if (empty) {
                chartInstance.config.data.datasets = [];
                chartInstance.config.data.labels = [];
            }
        },

        afterDatasetsDraw: function (chartInstance) {

            // Merge config
            var emptyOpts = chartInstance.options.emptyOverlay || {};
            emptyOpts = helpers.configMerge(Chart.defaults.global.emptyOverlay, emptyOpts);

            // Add config and create object if needed
            if (!chartInstance.emptyOverlay)
                createNewEmptyOverlay(chartInstance, emptyOpts);
            else
                chartInstance.emptyOverlay.options = emptyOpts;

            // Check if this is enabled and chart is empty
            if (emptyOpts.enabled && chartInstance.emptyOverlay.isEmpty) {

                // Check if it's already rendered
                if (!chartInstance.emptyOverlayBox) {
                    chartInstance.emptyOverlayBox = true;
                    Chart.layoutService.addBox(chartInstance, chartInstance.emptyOverlay);
                }
            } else if (chartInstance.emptyOverlayBox) {
                Chart.layoutService.removeBox(chartInstance, chartInstance.emptyOverlay);
                delete chartInstance.emptyOverlayBox;
            }
        }
    });
}());
