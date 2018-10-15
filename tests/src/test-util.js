(function () {
	const dom = window.dom,
		on = window.on,
		color = window.color,
		chartUtil = window.chartUtil;

	function getLabelNodes (chart) {
		return dom.queryAll(chart, '.chart-label');
	}

	function getLabelCount (chart) {
		return getLabelNodes(chart).length;
	}

	function getLabels (chart) {
		return getLabelNodes(chart).map(node => node.textContent).join(',');
	}

	function getBarValueSizes (chart) {
		const bars = getBarValueNodes(chart);
		return bars.map(bar => dom.box(bar));
	}

	function getPositions (chart) {
		const isColumns = chart.currentSeries.getAttribute('orientation') === 'vertical';
		const total = chart.axis.range.total;
		return getBarValueNodes(chart).map((node) => {
			if (node.classList.contains('dot')) {
				if (isColumns) {
					return `${Math.round(parseFloat(node.style.bottom) * total)}%`;
				}
				return `${Math.round(parseFloat(node.style.left) * total)}%`;
			}
		});
	}

	function getBarCount (node) {
		return dom.queryAll(node, '.chart-bar').length;
	}

	function getNodeCount (node, className) {
		const list = dom.queryAll(node, className);
		return list ? list.length : 0;
	}

	function getBarValueNodes (chart) {
		return dom.queryAll(chart, '.chart-bar-value');
	}

	function getBarNodes (chart) {
		return dom.queryAll(chart, '.chart-bar');
	}

	function getTicks (chart) {
		return dom.queryAll(chart, '.tick span').filter(n => dom.style(n.parentNode, 'opacity')).map(t => t.textContent).join(',');
	}

	function getColors (chart) {
		return color.rgbToHex(getBarValueNodes(chart).map(node => node.style.backgroundColor)).join(',');
	}

	function getLineColors (chart) {
		return color.rgbToHex(dom.queryAll(chart, 'path').map(node => dom.style(node, 'stroke'))).join(',');
	}

	function getDefaultColors (amount = color.length, noJoin) {
		const result = [];
		for (let i = 0; i < amount; i++) {
			result.push(color[i]);
		}
		if (noJoin) {
			return result.map(clr => clr.toLowerCase());
		}
		return result.join(',').toLowerCase();
	}

	function getBarSizes (chart) {
		const isCol = chart.orientation === 'vertical';
		const dim = isCol ? 'offsetHeight' : 'offsetWidth';
		const sw = dom.query(chart, 'base-series')[dim];
		return getBarValueNodes(chart).map((node) => {
			const w = node[dim];
			return w / sw;
		});
	}

	function getBarPercentages (chart) {
		const isCol = chart.orientation === 'vertical';
		const dim = isCol ? 'height' : 'width';
		const range = chart.axis.range.total;
		return getBarValueNodes(chart).map((node) => {
			const num = (parseFloat(node.style[dim]) * range).toFixed(0);
			return `${num}%`;
		});
	}

	function tooltip (chart, index, seriesIndex) {
		on.emit(chart.plot, 'mouseenter');
		let bar;
		if (index !== undefined) {
			// pie uses index attributes
			const si = seriesIndex !== null ? `[series-index="${seriesIndex}"]` : '';
			bar = dom.query(chart, `.chart-bar-value[index="${index}"], .chart-path-value[index="${index}"]${si}`);
			if (!bar) {
				// nothing else does, but an indexed array works everywhere else
				bar = dom.queryAll(chart, 'path, .chart-bar-value')[index || 0];
			}
		} else {
			bar = dom.query(chart, 'path, .chart-bar-value');
		}
		on.emit(bar, 'mousemove');
	}

	function getTooltip () {
		const node = dom.query('.data-chart-tooltip');
		return {
			label: dom.query(node, 'header').textContent,
			value: parseInt(dom.query(node, 'section .value').textContent) * .01,
			percentage: dom.query(node, 'section .value').textContent,
			color: window.color.rgbToHex(dom.query(node, 'section .swatch').style.backgroundColor)
		}
	}

	function getChartElements (chart) {
		return dom.queryAll(chart, '.chart-path-value, .chart-bar-value');
	}

	function getLegendText (chart) {
		return dom.queryAll(chart, 'label span').map(node => node.textContent).join(', ');
	}

	function getLegendColors (chart) {
		return color.rgbToHex(dom.queryAll(chart, 'label .swatch').map(node => node.style.backgroundColor)).join(',');
	}

	function getMarkers (chart) {
		return dom.queryAll(chart, 'circle');
	}

	function getMarkersPos (chart) {
		return getMarkers(chart).map(n => parseInt(n.getAttribute('cy'))).join(',');
	}

	function copy (obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	function delay () {
		return new Promise((resolve) => {
			setTimeout(resolve, 1);
		});
	}

	//

	function testTooltip (chart, data) {
		// console.log('testTooltip', data);
		getChartElements(chart).forEach(function (el) {
			const index = parseInt(el.getAttribute('index'));
			const si = el.getAttribute('series-index');
			const seriesIndex = si === null ? null : parseInt(si);
			tooltip(chart, index, seriesIndex);
			const tip = getTooltip();
			const clr = data.colors ? data.colors : tu.getDefaultColors(data.labels.length, true);

			//console.log('tip', seriesIndex, index,  tip);

			if (data.seriesLabels) {
				expect(Math.round(tip.value * 100)).to.equal(data.series[seriesIndex][index] * 100);
				expect(tip.label).to.equal(data.seriesLabels[seriesIndex] + '/' + data.labels[index]);
				expect(tip.color).to.equal(clr[seriesIndex]);
			} else {
				expect(Math.round(tip.value * 100)).to.equal(Math.round(data.series[0][index] * 100));
				if (data.tooltips) {
					expect(tip.label).to.equal(data.tooltips[index]);
				} else {
					expect(tip.label).to.equal(data.labels[index]);
				}
				expect(tip.color).to.equal(clr[index]);
			}


		});
	}

	function testColumns (chart, data) {
		const range = chart.axis.range.max;
		const series = !data.types ? data.series : data.series.filter((s, i) => {
			return data.types[i] === 'columns';
		});

		const sawValues = chartUtil.sawLoop(series);
		getBarValueNodes(chart).forEach((n, i) => {
			const h = dom.style(n, 'height');
			const v = Math.round(h * range * 10) * .01;
			expect(v.toFixed(2)).to.equal(sawValues[i].toFixed(2));
		});
	}

	function testBars (chart, data) {
		const range = chart.axis.range.max;
		const series = !data.types ? data.series : data.series.filter((s, i) => {
			return data.types[i] === 'bars';
		});

		const sawValues = chartUtil.sawLoop(series);
		getBarValueNodes(chart).forEach((n, i) => {
			const h = dom.style(n, 'width');
			const v = Math.round(h * range * 10) * .01;
			expect(v.toFixed(2)).to.equal(sawValues[i].toFixed(2));
		});
	}

	function mark (ctx, x, y) {
		const dotDia = 2;
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.ellipse(x, y, dotDia, dotDia, 45 * Math.PI / 180, 0, 2 * Math.PI);
		ctx.fill();
	}

	function getPoint (canvas, x, y) {
		const ctx = canvas.getContext('2d');
		const data = ctx.getImageData(x, y, 1, 1).data;
		//mark(ctx, x, y);
		return color.rgbToHex(...data);
	}

	function testPoints (canvas, color, points) {
		for (let i = 0; i < points.length; i += 2) {
			const x = points[i];
			const y = points[i + 1];
			expect(getPoint(canvas, x, y)).to.equal(color);
		}
	}

	window.tu = {
		getPositions,
		getDefaultColors,
		getBarPercentages,
		getBarSizes,
		getBarValueSizes,
		getBarCount,
		getLabels,
		getLabelNodes,
		getLabelCount,
		getNodeCount,
		getBarValueNodes,
		getBarNodes,
		getTicks,
		getColors,
		getLineColors,
		delay,
		copy,
		tooltip,
		getTooltip,
		testTooltip,
		getLegendText,
		getLegendColors,
		getMarkers,
		getMarkersPos,
		testColumns,
		testBars
	};
}());