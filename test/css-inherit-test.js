
class XSauron extends HTMLElement {
	// One Ring to *bring them all* and in the darkness bind them
	// In the Land of Mordor where the *Shadows* lie

	constructor(...args) {
		super(...args);
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = '';
	}

	connectedCallback() {
		// Move all into the Shadows
		if (this.innerHTML > '') {
			this.shadowRoot.innerHTML = this.innerHTML;
			this.innerHTML = '';
		}
	}

	e(sel) {
		const e = this.shadowRoot.querySelectorAll(sel);
		if (e.length != 1) {
			throw `Non-unique result for ${sel}: ${e.length}`;
		}
		return e[0];
	}
}

customElements.define('x-sauron', XSauron);

function c(el) {
	return window.getComputedStyle(el);
}

function sauron(element) {
	return element.querySelector('x-sauron');
}

describe('css-inherit', function () {
	it('trivial', function () {
		expect(true).toBeTruthy();
	});

	withHtml({
		title: 'test', html: `
		<div>
			<link rel="stylesheet" type="text/css" href='/base/test/test.css' />
			<style>
				div {
					background-color: red;
				}
			</style>
			<div>outside test</div>
			<span>outside test2</span>
			<x-sauron>
				<x-css-inherit></x-css-inherit>
				<div>inside test</div>
				<span>inside test2</span>
			</x-sauron>
		</div>
	`}, function (element) {
		it('trivial', function (done) {
			expect(true).toBeTruthy();
			setTimeout(() => {
				const sauron = element().querySelector('x-sauron');
				expect(sauron.e('div')).not.toBeNull();
				expect(sauron.e('span')).not.toBeNull();

				expect(c(sauron.e('div')).backgroundColor).toBe('rgb(255, 0, 0)');
				expect(c(sauron.e('span')).backgroundColor).toBe('rgb(0, 128, 0)');
				done();
			}, 100)
		});
	})
});