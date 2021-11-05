# @jehon/css-inherit

[![Test](https://github.com/jehon/css-inherit/actions/workflows/test.yml/badge.svg)](https://github.com/jehon/css-inherit/actions/workflows/test.yml)

When using web components without a framework, I get the problem that the styles from the host are not copied into the shadow of the component. That's per design.

Using this tag allow styles from host to be imported into the shadow root of your component

## Usage

```lang=js
   this.shadowRoot.innerHTML += '<jehon-css-inherit></jehon-css-inherit>
```

## Parameters

|parameter | explanation
|----------|----------------
|jehon-css-inherit-local | exclude that style tag from import
