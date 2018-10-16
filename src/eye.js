const BaseComponent = require('@clubajax/base-component');
const dom = require('@clubajax/dom');

class Icon extends BaseComponent {

	connected () {
		this.render();
		this.connected = () => {};
	}

	render (hover) {
		const s = this.offsetHeight >= this.offsetWidth ? this.offsetHeight : this.offsetWidth;
		let w = s;
		let h = s;
		const ow = w;
		const oh = h;
		const lineColor = hover ? this['hover-color'] : this['color'] || '#444';
		const lineWidth = 5 * w / 100; // at 100px, the line should be 5px;
		const crossed = this.strike;

		if (!this.canvas) {
			this.canvas = dom('canvas', {
				width: w,
				height: w
			}, this);
		}

		const ctx = this.canvas.getContext('2d');
		ctx.clearRect(0, 0, ow, oh);

		let currentX;
		let currentY;

		function style (lw = lineWidth, lc = lineColor, fill = 'transparent') {
			ctx.beginPath();
			ctx.lineJoin = 'miter';
			ctx.lineWidth = lw;
			ctx.strokeStyle = lc;
			ctx.fillStyle = fill;
		}

		function endStyle () {
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}

		function handle (x, y, r = 5, clr = 'rgba(255,0,0,0.3)', stroke) {
			// x, y, radiusX, radiusY
			setTimeout(() => {
				style();
				ctx.ellipse(x, y, r, r, 45 * Math.PI / 180, 0, 2 * Math.PI);
				ctx.fill();
				if (stroke) {
					ctx.lineWidth = lineWidth;
					ctx.strokeStyle = stroke;
					ctx.stroke();
				}
			}, 1);
		}

		function circle (x, y, r = 5) {
			ctx.ellipse(x, y, r, r, 45 * Math.PI / 180, 0, 2 * Math.PI);
		}

		function lineHandle (x1, y1, x2, y2) {
			setTimeout(() => {
				style();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
			}, 1);
		}

		function move (x, y) {
			currentX = x;
			currentY = y;
			ctx.moveTo(x, y);
		}

		function c (cp1x, cp1y, cp2x, cp2y, x1, y1) {
			// lineHandle(currentX, currentY, cp1x, cp1y);
			// lineHandle(x1, y1, cp2x, cp2y);
			// handle(cp1x, cp1y);
			// handle(cp2x, cp2y);

			ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x1, y1);
			currentX = x1;
			currentY = y1;
		}

		w -= lineWidth * 2;
		h -= lineWidth * 2;

		const eh = w / 3.5;
		const slope = w / 3.5;

		const p1 = {
			x: lineWidth,
			y: h / 2 + lineWidth
		};
		const p2 = {
			x: w / 2 + lineWidth,
			y: h / 2 + lineWidth - eh
		};
		const p3 = {
			x: w + lineWidth,
			y: h / 2 + lineWidth
		};
		const p4 = {
			x: w / 2 + lineWidth,
			y: h / 2 + lineWidth + eh
		};

		const l1 = {
			x: w * .1 + lineWidth,
			y: h + lineWidth
		};
		const l2 = {
			x: w * .9 + lineWidth,
			y: lineWidth
		};

		if (crossed) {
			// mask
			ctx.moveTo(0, 0);

			ctx.lineTo(l2.x + lineWidth / 2, lineWidth);
			ctx.lineTo(l1.x + lineWidth / 2, oh - lineWidth);
			ctx.lineTo(l1.x + lineWidth * 2, oh - lineWidth);
			ctx.lineTo(l2.x + lineWidth * 2, lineWidth);

			ctx.lineTo(ow, 0);
			ctx.lineTo(ow, oh);
			ctx.lineTo(0, oh);
			ctx.lineTo(0, 0);

			ctx.closePath();
			//ctx.fill(); ctx.rect(w/2, h/2, w/2, h/2);
			ctx.clip();
		}


		style();

		ctx.moveTo(p1.x, p1.y);

		c(p1.x, p1.y, p2.x - slope, p2.y, p2.x, p2.y);
		c(p2.x + slope, p2.y, p3.x, p3.y, p3.x, p3.y);

		c(p3.x, p3.y, p4.x + slope, p4.y, p4.x, p4.y);
		c(p4.x - slope, p4.y, p1.x, p1.y, p1.x, p1.y);

		endStyle();

		style();
		circle(w / 2 + lineWidth, h / 2 + lineWidth, eh * .6);
		endStyle();

		endStyle();


		if (crossed) {
			// strike-through line
			style();
			move(l1.x, l1.y);
			ctx.lineTo(l2.x, l2.y);
			endStyle();
		}

		this.connect();
	}

	connect () {
		this.onDomReady(() => {
			if (this.parentNode.localName === 'button') {
				this.on(this.parentNode, 'mouseenter', () => {
					this.render(true);
				});
				this.on(this.parentNode, 'mouseleave', () => {
					this.render(false);
				});
			}
		});
		this.connect = () => {};
	}
}

module.exports = BaseComponent.define('icon-eye', Icon, {
	props: ['color', 'hover-color'],
	bools: ['strike']
});