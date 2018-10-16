const BaseComponent = require('@clubajax/base-component');
require('@clubajax/base-component/src/template');

class Icon extends BaseComponent {
	constructor () {
		super();
	}

	get templateString () {
		return `
<svg version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<path d="M1 5.1 L9 16 L9 24 L15 20   L15 16 L23 5.1" class="icon-funnel-path"/>
	<ellipse cx="12" cy="4" rx="11" ry="3" class="icon-funnel-ellipse"/>
</svg>
`;
	}
}


customElements.define('icon-funnel', Icon);

module.exports = Icon;
