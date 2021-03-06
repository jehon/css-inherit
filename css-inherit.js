
class CssInherit extends HTMLElement {
	connectedCallback() {
		this.update();
	}

	update() {
		// Reset
		this.innerHTML = '';

		// Get the enclosing shadowRoot
		const firstShadowRoot = this.getRootNode();

		// Enclosing parent
		let enclosingParent = firstShadowRoot.host;
		if (!enclosingParent) {
			return;
		}
		// The parent root (shadowRoot or document, whatever)
		const parentShadowRoot = enclosingParent.getRootNode();

		// Let's take all style / link that are not 'local'(attribute)
		parentShadowRoot.querySelectorAll('style:not([css-inherit-local]), link:not([css-inherit-local])').forEach(el => {
			const node = el.cloneNode(true);
			// Add this inside our innerHTML
			this.insertAdjacentElement('beforeend', node);
		});
	}
}

customElements.define('css-inherit', CssInherit);
