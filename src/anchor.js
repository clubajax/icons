const BaseComponent = require('@clubajax/base-component');

class Icon extends BaseComponent {
	get templateString () {
		return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	<g class="line-only">
		<circle cx="12" cy="4" r="2"/>
		<path d="M 12 6, 12 24"/>
		<path d="M 6 10, 18 10"/>
		<path d="M 2,16 C 8 24, 16,24 22,16" />
	</g>
</svg>
`;
	}
}

module.exports = BaseComponent.define('icon-anchor', Icon, {});
