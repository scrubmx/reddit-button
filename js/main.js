;(function($, window, undefined){

    'use strict';

    $(function(){

        function getChartLabels() {
            var labels = [];
            for (var i=0; i<66; i++) { labels[i] = '' }

            return labels;
        }

        function drawLineChart(canvasId, data) {
            var context = $(canvasId).get(0).getContext('2d');

            new Chart(context).Line(
                { labels: getChartLabels(), datasets: data },
                { bezierCurve: false, responsive: true }
            );
        }

        function createDataset(data, color) {
            return {
                fillColor: 'rgba('+color+',0.2)',
                strokeColor: 'rgba('+color+',1)',
                pointColor: 'rgba('+color+',1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba('+color+',1)',
                data: data
            }
        }

        $.get('./data/click_data.csv', function(csv){
            var data = $.csv.toArrays(csv);

            var purple = [];
            var blue   = [];
            var green  = [];
            var yellow = [];
            var orange = [];
            var red    = [];

            // Remove the headers
            data.splice(0, 1);

            $.map(data, function(row){
                purple.push(+row[1]);
                blue.push(+row[2]);
                green.push(+row[3]);
                yellow.push(+row[4]);
                orange.push(+row[5]);
                red.push(+row[6]);
            });

            var purpleData = createDataset(purple, '204,153,204');
            var blueData   = createDataset(blue, '102,153,204');
            var greenData  = createDataset(green, '153,204,153');
            var yellowData = createDataset(yellow, '255,204,102');
            var orangeData = createDataset(orange, '249,145,87');
            var redData    = createDataset(red, '242,119,122');

            drawLineChart('#chart', [ blueData, greenData, yellowData, orangeData, redData ]);
            drawLineChart('#purple', [ purpleData ]);
            drawLineChart('#blue', [ blueData ]);
            drawLineChart('#green', [ greenData ]);
            drawLineChart('#yellow', [ yellowData ]);
            drawLineChart('#orange', [ orangeData ]);
            drawLineChart('#red', [ redData ]);

        });

    });

})(jQuery, window);