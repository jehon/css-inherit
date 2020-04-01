
class CssInherit extends HTMLElement {
	connectedCallback() {
		this.update();
	}

	update() {
		// Reset
		this.innerHTML = '';

		// Get the enclosing parent root
		let root = this
			// Enclosing parent shadow-dom
			.getRootNode({ composed: false })
			// Enclosing parent
			.host
			// The parent root
			.getRootNode({ composed: false });

		// Let's take all style / link that are not 'local'(attribute)
		root.querySelectorAll('style:not([local]), link:not([local])').forEach(el => {
			const node = el.cloneNode(true);
			// Add this inside our innerHTML
			this.insertAdjacentElement('beforeend', node);
		});
	}
}

customElements.define('x-css-inherit', CssInherit);
