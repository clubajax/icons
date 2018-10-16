const BaseComponent = require('@clubajax/base-component');

class Icon extends BaseComponent {
	get templateString () {
		return `
<svg version="1.1" viewBox="0 0 20 20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<polygon style="stroke-width:0" ref="poly"/>
</svg>
`;
	}

	domReady () {

		const H = 10; // half of canvas
		const F = 20; // full canvas

		const w = 5; // arrow half width
		const h = 4; // arrow half height
		const t = 1.5; // line half thickness

		const points = [];


		// top point
		points.push([H, 0]);
		points.push([H + w, h]);
		points.push([H + t, h]);

		points.push([H + t, H - t]);

		// right point
		points.push([F - h, H - t]);
		points.push([F - h, H - w]);
		points.push([F, H]);
		points.push([F - h, H + w]);
		points.push([F - h, H + t]);

		points.push([H + t, H + t]);

		// bottom point
		points.push([H + t, F - h]);
		points.push([H + w, F - h]);
		points.push([H, F]);
		points.push([H - w, F - h]);
		points.push([H - t, F - h]);

		points.push([H - t, H + t]);

		// left point
		points.push([h, H + t]);
		points.push([h, H + w]);
		points.push([0, H]);
		points.push([h, H - w]);
		points.push([h, H - t]);

		points.push([H - t, H - t]);

		// finish top arrow
		points.push([H - t, h]);
		points.push([H - w, h]);


		points.map((pair) => {
			return pair.join(',');
		});

		this.poly.setAttribute('points', points.join(' '));
	}
}

customElements.define('icon-move', Icon);

module.exports = Icon;

// <path d="M0 0hFvFH0z" fill="none"/>
// 	<path d="M9 16.2L4.8 Hl-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>