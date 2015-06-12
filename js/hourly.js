;(function($, window, undefined){

    'use strict';

    $(function(){

        function getChartLabels() {
            var labels = [];
            for (var i=0; i<1566; i++) {
                switch(i){
                    case 0    : labels[i] = 'April'; break;
                    case 733  : labels[i] = 'May';   break;
                    case 1466 : labels[i] = 'June';  break;
                    default   : labels[i] = '';      break;
                }
            }

            return labels;
        }

        function drawLineChart(canvasId, data) {
            var context = $(canvasId).get(0).getContext('2d');

            new Chart(context).Line(
                { labels: getChartLabels(), datasets: data },
                {
                    bezierCurve: false,
                    responsive: true,
                    showTooltips: false,
                    pointDot: false,
                    animation: false,
                    scaleShowVerticalLines: false
                }
            );
        }

        function hexToRgb(hex, alpha) {
            alpha = typeof alpha !== 'undefined' ? alpha : 1;

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            return 'rgba('+
                    parseInt(result[1], 16) + ',' +
                    parseInt(result[2], 16) + ',' +
                    parseInt(result[3], 16) + ',' +
                    alpha + ')';
        }

        function createDataset(data, color) {
            return {
                fillColor: hexToRgb(color, 0.0),
                strokeColor: color,
                pointColor: color,
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: color,
                data: data
            }
        }

        $.get('./data/hourly.csv', function(csv){
            var data = $.csv.toArrays(csv);

            var purple = [];
            var blue   = [];
            var green  = [];
            var yellow = [];
            var orange = [];
            var red    = [];

            data.splice(0, 1); // Remove the headers

            $.map(data, function(row){
                purple.push(+row[1]);
                blue.push(+row[2]);
                green.push(+row[3]);
                yellow.push(+row[4]);
                orange.push(+row[5]);
                red.push(+row[6]);
            });

            var purpleData = createDataset(purple, '#CC99CC');
            var blueData   = createDataset(blue, '#6699CC');
            var greenData  = createDataset(green, '#99CC99');
            var yellowData = createDataset(yellow, '#FFCC66');
            var orangeData = createDataset(orange, '#F99157');
            var redData    = createDataset(red, '#F2777A');

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