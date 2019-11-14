import * as $ from 'jquery';
import 'jquery-sparkline';
import { debounce } from 'lodash';
import { COLORS } from '../../constants/colors';

export default (function () {
	

  // ------------------------------------------------------
  // @Dashboard Sparklines
  // ------------------------------------------------------

  const drawSparklines = () => {
    if ($('#sparklinedash').length > 0) {
		var vals = new Array(8);
		for(var i = 0; i < vals.length; i++){
			vals[i] = Math.floor(Math.random()*100);
		}
      $('#sparklinedash').sparkline(vals, {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#4caf50',
      });
    }

    if ($('#sparklinedash2').length > 0) {
		var vals = new Array(15);
		for(var i = 0; i < vals.length; i++){
			vals[i] = Math.floor(Math.random()*2);
		}
      $('#sparklinedash2').sparkline(vals, {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#9675ce',
      });
    }
	
	if ($('#sparklinedash3').length > 0) {
		var vals = new Array(8);
		for(var i = 0; i < vals.length; i++){
			vals[i] = Math.floor(Math.random()*20);
		}
      $('#sparklinedash3').sparkline(vals, {
        type: 'bar',
        height: '20',
        barWidth: '3',
        resize: true,
        barSpacing: '3',
        barColor: '#03a9f3',
      });
    }

    if ($('#sparklinedash4').length > 0) {
		var vals = new Array(10);
		for(var i = 0; i < vals.length; i++){
			vals[i] = Math.floor(Math.random()*20);
		}
      $('#sparklinedash4').sparkline(vals, {
        type: 'line',
        height: '25',
		width: '60',
        resize: true,
        lineColor: '#f96262',
      });
    }
  };

  drawSparklines();

  // Redraw sparklines on resize
  $(window).resize(debounce(drawSparklines, 150));

  // ------------------------------------------------------
  // @Other Sparklines
  // ------------------------------------------------------

	var mrefreshinterval = 100; // update display every 500ms
    var lastmousex=-1; 
    var lastmousey=-1;
    var lastmousetime;
    var mousetravel = 0;
    var mpoints = [];
    var mpoints_max = 60;
	var i = 0;
    $('html').mousemove(function(e) {
        var mousex = e.pageX;
        var mousey = e.pageY;
        if (lastmousex > -1) {
            mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
        }
        lastmousex = mousex;
        lastmousey = mousey;
    });
    var mdraw = function() {
        var md = new Date();
        var timenow = md.getTime();
        if (lastmousetime && lastmousetime!=timenow) {
            var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
            mpoints.push(pps);
            if (mpoints.length > mpoints_max)
                mpoints.splice(0,1);
            mousetravel = 0;
            i++;
			if(i >= 10){
				$('#mousespeed').sparkline(mpoints, { width: mpoints.length, tooltipSuffix: ' pixels per second' });
				i = 0;
			}
		}
        lastmousetime = timenow;
        setTimeout(mdraw, mrefreshinterval);
    }
    // We could use setInterval instead, but I prefer to do it this way
    setTimeout(mdraw, mrefreshinterval); 
	

  $('#sparkline').sparkline(
    [5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7],
    {
      type: 'line',
      resize: true,
      height: '20',
    }
  );

  $('#compositebar').sparkline(
    'html',
    {
      type: 'bar',
      resize: true,
      barColor: '#aaf',
      height: '20',
    }
  );

  $('#compositebar').sparkline(
    [4, 1, 5, 7, 9, 9, 8, 7, 6, 6, 4, 7, 8, 4, 3, 2, 2, 5, 6, 7],
    {
      composite: true,
      fillColor: false,
      lineColor: 'red',
      resize: true,
      height: '20',
    }
  );

  $('#normalline').sparkline(
    'html',
    {
      fillColor: false,
      normalRangeMin: -1,
      resize: true,
      normalRangeMax: 8,
      height: '20',
    }
  );

  $('.sparktristate').sparkline(
    'html',
    {
      type: 'tristate',
      resize: true,
      height: '20',
    }
  );

  $('.sparktristatecols').sparkline(
    'html',
    {
      type: 'tristate',
      colorMap: {
        '-2': '#fa7',
        resize: true,
        '2': '#44f',
        height: '20',
      },
    }
  );

  const values    = [5, 4, 5, -2, 0, 3, -5, 6, 7, 9, 9, 5, -3, -2, 2, -4];
  const valuesAlt = [1, 1, 0, 1, -1, -1, 1, -1, 0, 0, 1, 1];

  $('.sparkline').sparkline(values, {
    type: 'line',
    barWidth: 4,
    barSpacing: 5,
    fillColor: '',
    lineColor: COLORS['red-500'],
    lineWidth: 2,
    spotRadius: 3,
    spotColor: COLORS['red-500'],
    maxSpotColor: COLORS['red-500'],
    minSpotColor: COLORS['red-500'],
    highlightSpotColor: COLORS['red-500'],
    highlightLineColor: '',
    tooltipSuffix: ' Bzzt',
    tooltipPrefix: 'Hello ',
    width: 100,
    height: undefined,
    barColor: '9f0',
    negBarColor: 'ff0',
    stackedBarColor: ['ff0', '9f0', '999', 'f60'],
    sliceColors: ['ff0', '9f0', '000', 'f60'],
    offset: '30',
    borderWidth: 1,
    borderColor: '000',
  });

  $('.sparkbar').sparkline(values, {
    type: 'bar',
    barWidth: 4,
    barSpacing: 1,
    fillColor: '',
    lineColor: COLORS['deep-purple-500'],
    tooltipSuffix: 'Celsius',
    width: 100,
    barColor: '39f',
    negBarColor: COLORS['deep-purple-500'],
    stackedBarColor: ['ff0', '9f0', '999', 'f60'],
    sliceColors: ['ff0', '9f0', '000', 'f60'],
    offset: '30',
    borderWidth: 1,
    borderColor: '000',
  });

  $('.sparktri').sparkline(valuesAlt, {
    type: 'tristate',
    barWidth: 4,
    barSpacing: 1,
    fillColor: '',
    lineColor: COLORS['light-blue-500'],
    tooltipSuffix: 'Celsius',
    width: 100,
    barColor: COLORS['light-blue-500'],
    posBarColor: COLORS['light-blue-500'],
    negBarColor: 'f90',
    zeroBarColor: '000',
    stackedBarColor: ['ff0', '9f0', '999', 'f60'],
    sliceColors: ['ff0', '9f0', '000', 'f60'],
    offset: '30',
    borderWidth: 1,
    borderColor: '000',
  });

  $('.sparkdisc').sparkline(values, {
    type: 'discrete',
    barWidth: 4,
    barSpacing: 5,
    fillColor: '',
    lineColor: '9f0',
    tooltipSuffix: 'Celsius',
    width: 100,
    barColor: '9f0',

    negBarColor: 'f90',

    stackedBarColor: ['ff0', '9f0', '999', 'f60'],
    sliceColors: ['ff0', '9f0', '000', 'f60'],
    offset: '30',
    borderWidth: 1,
    borderColor: '000',
  });

  $('.sparkbull').sparkline(values, {
    type: 'bullet',
    barWidth: 4,
    barSpacing: 5,
    fillColor: '',
    lineColor: COLORS['amber-500'],
    tooltipSuffix: 'Celsius',
    height: 'auto',
    width: 'auto',
    targetWidth: 'auto',
    barColor: COLORS['amber-500'],
    negBarColor: 'ff0',
    stackedBarColor: ['ff0', '9f0', '999', 'f60'],
    sliceColors: ['ff0', '9f0', '000', 'f60'],
    offset: '30',
    borderWidth: 1,
    borderColor: '000',
  });

  $('.sparkbox').sparkline(values, {
    type: 'box',
    barWidth: 4,
    barSpacing: 5,
    fillColor: '',
    lineColor: '9f0',
    tooltipSuffix: 'Celsius',
    width: 100,
    barColor: '9f0',
    negBarColor: 'ff0',
    stackedBarColor: ['ff0', '9f0', '999', 'f60'],
    sliceColors: ['ff0', '9f0', '000', 'f60'],
    offset: '30',
    borderWidth: 1,
    borderColor: '000',
  });
}())
