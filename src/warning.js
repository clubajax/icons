const BaseComponent = require('@clubajax/base-component');

class Icon extends BaseComponent {
	get templateString () {
		return `
<svg version="1.1" viewBox="0 0 24 24" width="100%" height="100%" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
</svg>
`;
	}
}


customElements.define('icon-warning', Icon);

module.exports = Icon;
