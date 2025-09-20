# be-alit (🎇)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/be-alit)
[![NPM version](https://badge.fury.io/js/be-alit.png)](http://badge.fury.io/js/be-alit)
[![Playwright Tests](https://github.com/bahrus/be-alit/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/be-alit/actions/workflows/CI.yml)

Use the power of lit-html from HTML Markup, without imposing any security constraints.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

*be-alit* is a custom element enhancement that provides rendering capabilities based on lit-html.  It is one of a family of renderers, based on the common enhancement base class [be-render-neutral](https://github.com/bahrus/be-render-neutral).  Other members include [be-preactive](https://github.com/bahrus/be-preactive).


## Example 1a - Simple list

```html
<ul>
    <script nomodule id=pronouns be-alit-vm='["He", "She", "They", "Other"]'>
        html `${vm.map(i => html`<li>${i}</li>`)}`;
    </script>
</ul>

<script>
    setTimeout(() => {
        pronouns.beEnhanced.beAlit.vm = ["I", "You", "Us", "Them"];
    }, 2000);
</script>
```

This uses the [lit-html](https://www.npmjs.com/package/lit-html) engine to generate the inner content, namely the  list (li) elements.

Editing JSON by hand is a bit error prone.  A [VS plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) can help with this.

A framework can theoretically pass in the view model:

```JavaScript
await whenDefined('be-enhanced');
oScript.beEnhanced.by.beAlit.vm = ["He", "She", "They", "Other"];
```

# Part II Pulling in the View Model

## Example 2a

As suggested above, it is seemingly beyond most frameworks's ability to pass values to the view model in the proscribed  way.  So *be-alit* can take over the reigns of binding, and tap into the power of [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)).


```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions id=meds
            href="prescriptions.json?patient=zero" 
            enh-be-kvetching>
        </medical-prescriptions>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody>
                <script
                    nomodule 
                    be-alit-with='#meds::load' 
                    blow-dry-preserve=renderer blow-dry-remove=siblings>
                    html`${vm.map(prescription => html`
                        <tr itemscope=treatment-order .ish=${prescription}>
                            <td>${prescription.OrderText}</td>
                            <td>
                                <button disabled 🕹️=orderItem>Order Item</button>
                                <div>${prescription.Prescriber}</div>
                            </td>
                            <td>${prescription.Dosage}</td>
                            <td>${prescription.Freq}</td>
                        </tr>
                    `)}`;
                </script>
            </tbody>
        </table>
        <be-hive -id></be-hive>
    </template>
</patient-chart>
```

blow-dry-preserve and the blowDryRemove processing instructions are completely optional settings, that are utilized by [https://github.com/bahrus/xtal-element](xtal-element) to take an optimized "snapshot" of a (partly) server-rendered web component, and extract out the things that aren't needed in the template that needs cloning repeatedly.

## Alternative (shorter) name.

be-alit is the canonical name of this enhancement.  But it is easy as pie to define alternative names.  This package provides one such suggestion:

## Example 2b

```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions 
            href="prescriptions.json?patient=zero" 
            enh-be-kvetching>
        </medical-prescriptions>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody >
                <script nomodule 🎇-with='~medicalPrescriptions'>
                    ${vm.map(prescription => html`
                        <tr itemscope=treatment-order .ish=${prescription}>
                            <td>${prescription.OrderText}</td>
                            <td>
                                <button disabled 🕹️=orderItem>Order Item</button>
                                <div>${prescription.Prescriber}</div>
                            </td>
                            <td>${prescription.Dosage}</td>
                            <td>${prescription.Freq}</td>
                        </tr>
                    `)}
                    `;
                </script>
            </tbody>
        </table>
        <be-hive></be-hive>
    </template>
</patient-chart>
```

To bind to the patient-chart web component host:

## Example 2c

```html
<patient-chart>
    <template shadowrootmode=open>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody>
                <script nomodule  🎇-with='/prescriptions'>...</script>
            </tbody>
        </table>
        <be-hive></be-hive>
    </template>
</patient-chart>
```

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Install Python 3 or later.
5.  Open command window to folder where you cloned this repo.
6.  > npm install
7.  > npm run serve
8.  Open http://localhost:8000/demo in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-alit/be-alit.js';

```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-alit';
</script>
```


