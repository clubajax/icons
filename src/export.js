const BaseComponent = require('@clubajax/base-component');

class Icon extends BaseComponent {
	get templateString () {
		return `
<svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g>
        <polygon points="61,64 3,64 3,22 22,22 22,30 11,30 11,56 53,56 53,30 42,30 42,22 61,22"/>
    </g>
    <g>
        <polygon points="45,16 32,0 19,16 28,16 28,40 36,40 36,16"/>
    </g>
</svg>
`;
	}
}


customElements.define('icon-export', Icon);

module.exports = Icon;
