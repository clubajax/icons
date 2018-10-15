const BaseComponent = require('@clubajax/base-component');

class Icon extends BaseComponent {
	get templateString () {
		return `
<svg version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<polygon style="stroke-width:0" points="10,0 14,0 14,10 24,10 24,14 14,14 14,24 10,24 10,14 0,14 0,10 10,10"/>
</svg>
`;
	}
}

module.exports = BaseComponent.define('icon-add', Icon, {});
