# be-alit (🎇) [TODO]

Use the power of lit-html from HTML Markup, without imposing any security constraints.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).


## Example 1a - Simple list

```html
<ul be-alit-vm='["He", "She", "They", "Other"]'>
    <script>
        document.currentScript.renderer = (vm, html) => html `${vm.map(i => html`<li>${i}</li>`)}`;
    </script>
</ul>
```

This uses the [lit-html](https://www.npmjs.com/package/lit-html) engine to generate the inner content of list elements.

Editing JSON by hand is a bit error prone.  A [VS plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) can help with this.

A framework can theoretically pass in the view model:

```JavaScript
await whenDefined('be-enhanced');
oUL.beEnhanced.by.beAlit.vm = ["He", "She", "They", "Other"];
```

Since this is seemingly far too advanced for most frameworks to handle, we provide a mechanism for pulling in the view model, described below.


# Part II Pulling in the View Model

## Example 2a [TODO]

As mentioned above, it is seemingly beyond any frameworks's ability to pass values to the view model in the proscribed  way.  So *be-alit* can take over the reigns of binding, and tap into the power of [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)).


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
            <tbody be-alit-with='~medicalPrescriptions'>
                <script blow-dry=remove>
                    document.currentScript.renderer = (vm, html) => html`${vm.map(prescription => html`
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
        <be-hive></be-hive>
    </template>
</patient-chart>
```

blow-dry-remove is a completely optional setting, that is utilized by [https://githuc.com/bahrus/xtal-element](xtal-element) to take an optimized "snapshot" of a (partly) server-rendered web component, and extract out the things that aren't needed in the template that needs cloning repeatedly.

## Alternative (shorter) name.

be-alit is the canonical name of this enhancement.  But it is easy as pie to define alternative names.  This package provides one such suggestion:

## Example 2b [TODO]

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
            <tbody 🎇-with='~medicalPrescriptions'>
                <script blow-dry=remove>
                    document.currentScript.renderer = (vm, html) => html`${vm.map(prescription => html`
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
        <be-hive></be-hive>
    </template>
</patient-chart>
```

To bind to the patient-chart web component host:

## Example 2c [TODO]

```html
<patient-chart>
    <template shadowrootmode=open>
        <table id=UUicp3Dh0kqKHlnAAbtw4Q>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody 🎇-with='prescriptionRenders from /prescriptions'>
            </tbody>
        </table>
        <be-hive></be-hive>
    </template>
</patient-chart>
```
