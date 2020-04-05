
/* global withHtml */

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
		<link rel="stylesheet" type="text/css" href='/base/test/test-local.css' css-inherit-local />
		<link rel="stylesheet" type="text/css" href='/base/test/test.css' />
			<style>
				div.t{
					background-color: red;
				}
			</style>
			<style css-inherit-local>
				div.t {
					color: green;
				}
			</style>
			<div  class='t'>outside test</div>
			<span class='u'>outside test2</span>
			<x-sauron>
				<css-inherit></css-inherit>
				<div  class='t'>inside test</div>
				<span class='u'>inside test2</span>
			</x-sauron>
		</div>
	`}, function (element) {
		it('trivial', function () {
			expect(true).toBeTruthy();
		});

		it('should inherit', function (done) {
			setTimeout(() => {
				const sauron = element().querySelector('x-sauron');
				expect(sauron.e('div')).not.toBeNull();
				expect(sauron.e('span')).not.toBeNull();

				// On root element
				expect(c(element().querySelector('div')).backgroundColor).toBe('rgb(255, 0, 0)');
				expect(c(element().querySelector('span')).backgroundColor).toBe('rgb(0, 128, 0)');

				// Inside shadowRoot
				expect(c(sauron.e('div')).backgroundColor).toBe('rgb(255, 0, 0)');
				expect(c(sauron.e('span')).backgroundColor).toBe('rgb(0, 128, 0)');
				done();
			}, 100);
		});

		it('should not inherit tagged "local"', function (done) {
			setTimeout(() => {
				const sauron = element().querySelector('x-sauron');

				// On root element
				expect(c(element().querySelector('div')).color).toBe('rgb(0, 128, 0)');
				expect(c(element().querySelector('span')).color).toBe('rgb(138, 43, 226)');

				// Inside shadowRoot: not inherited
				expect(c(sauron.e('div')).color).toBe('rgb(0, 0, 0)');
				expect(c(sauron.e('span')).color).toBe('rgb(0, 0, 0)');
				done();
			}, 100);
		});
	});
});