const BaseComponent = require('@clubajax/base-component');

class Icon extends BaseComponent {
	get templateString () {
		return `
<svg version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g transform="translate(15.5 -3) rotate(45) scale(.9)">
<polygon points="0,20 8,20 8,0 12,0 12,24 0,24 "/>
</g>
</svg>
`;
	}
}

customElements.define('icon-check', Icon);

module.exports = Icon;
