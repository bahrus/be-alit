# be-alit (🎇) [TODO]

Use the power of lit-html from HTML Markup, without imposing any security constraints.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

# Part I Using the global registry



## Example 1a Simple list, canonical name [TODO]

```html
<script type=module>
    import {register} from 'be-alit/🎇.js';
    register('listerine', vm => html `${vm.map(i => html`<li>${i}</li>`)}`);
</script>
<ul be-alit-vm='["He", "She", "They", "Other"]' be-alit-with=listerine></ul>
```

> [!NOTE]
> Originally, I was going to support built-in inline event handlers for a more elegant solution.  However, the powers that be chose to not accommodate that approach, when applying minimal security measures, hence the solution that is before us.

Our registered "listerine" literator is quite reusable.  Having defined it, we can reuse it throughout the application, as long as we pass in a view model that conforms to the same structure, and we want the output to match the same HTML pattern as well. 

This uses the [lit-html](https://www.npmjs.com/package/lit-html) engine to generate the inner content of list elements.

Editing JSON by hand is a bit error prone.  A [VS plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) can help with this.

A framework can theoretically pass in the view model:

```JavaScript
await whenDefined('be-enhanced');
oUL.beEnhanced.by.beAlit.vm = ["He", "She", "They", "Other"];
```

Since this is seemingly far too advanced for most frameworks to handle, we provide a mechanism for pulling in the view model, described down below.

BTW, it's a bit cumbersome to type be-alit repeatedly like we needed to do above.  That is the canonical name for this enhancement.  But in less formal settings, where clashes between emoji-loving enhancements can be avoided, we can use shorter syntax, by referencing a file such as [this one](https://github.com/bahrus/be-alit/blob/baseline/%F0%9F%8E%87.js) to register a shorter name:

## Example 1b - with 🎇 emoji [TODO]

```html
<script type=module>
    import {register} from 'be-alit/🎇.js';
    register('listerine', vm => html `${vm.map(i => html`<li>${i}</li>`)}`);
</script>
<ul 🎇-vm='["He", "She", "They", "Other"]' 🎇-with=listerine></ul>
```

## Example 1c - locally scoped literator [TODO]

In some cases, we might want to define a local html generator (that gets reused with each repeated instance of the DOM fragment).  For that, we need adorn the element with just enough markup to ensure we apply the correct renderer without applying to elements we don't intend.  The safest route would be to use the id attribute (or some other attribute or class or part token) whose value is unique within the application, such as a GUID:

```html
<script blow-dry-remove type=module blocking=render>
    (await import('be-alit/🎇.js'))
    .w('#gvyZqWwRFEeADiKsAsSZQ')
    .p(vm => html `${vm.map(i => html`<li>${i}</li>`)}`);
</script>
<div>
    <ul id=gvyZqWwRFEeADiKsAsSZQ 🎇-vm='["He", "She", "They", "Other"]'></ul>
</div>
```

The "blow-dry-remove" attribute is there if working with declarative custom elements based on [xtal-element](https://github.com/bahrus/xtal-element), so that the script element doesn't get repeated with each instance.


# Part II Pulling in the View Model

## Example 2a [TODO]

As mentioned above, it is seemingly beyond any frameworks's ability to pass values to the view model in the proscribed  way.  So*be-alit* can take over the reigns of binding, and tap into the power of [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)).

For a somewhat "raw" example:

```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions 
            href="prescriptions.json?patient=zero" 
            enh-be-kvetching>
        </medical-prescriptions>
        <script blow-dry=remove type=module>
            (await import('be-alit/🎇.js'))
            .w('UUicp3Dh0kqKHlnAAbtw4Q')
            .p(vm => html`${vm.map(prescription => html`
                <tr itemscope=treatment-order .ish=${prescription}>
                    <td>${prescription.OrderText}</td>
                    <td>
                        <button disabled 🕹️=orderItem>Order Item</button>
                        <div>${prescription.Prescriber}</div>
                    </td>
                    <td>${prescription.Dosage}</td>
                    <td>${prescription.Freq}</td>
                </tr>
            `)}`);
        </script>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody  id=UUicp3Dh0kqKHlnAAbtw4Q 🎇-with='~medicalPrescriptions'>
            </tbody>
        </table>
        <be-hive></be-hive>
    </template>
</patient-chart>
```

For a slightly more "polished syntax (with more dependencies)" 

## Example 2b [TODO]

```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions 
            href="prescriptions.json?patient=zero" 
            enh-be-fetching>
        </medical-prescriptions>
        <script blow-dry=remove type=module>
            (await import('be-alit/🎇.js'))
            .w('UUicp3Dh0kqKHlnAAbtw4Q')
            .p(vm => html`${vm.map(prescription => html`
                <tr itemscope=treatment-order .ish=${prescription}>
                    <td>${prescription.OrderText}</td>
                    <td>
                        <button disabled 🕹️=orderItem>Order Item</button>
                        <div>${prescription.Prescriber}</div>
                    </td>
                    <td>${prescription.Dosage}</td>
                    <td>${prescription.Freq}</td>
                </tr>
            `)}`);
        </script>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody id=UUicp3Dh0kqKHlnAAbtw4Q 🎇-with='~medicalPrescriptions'>
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
        <script blow-dry=remove type=module>
            import {within} from 'be-alit/🎇.js';
            within('UUicp3Dh0kqKHlnAAbtw4Q', 'prescriptionRenders', e => e.r = html`${vm.map(prescription => html`
                <tr itemscope=treatment-order>
                    <td>${prescription.OrderText}</td>
                    <td>
                        <button disabled 🕹️=orderItem>Order Item</button>
                        <div>${prescription.Prescriber}</div>
                    </td>
                    <td>${prescription.Dosage}</td>
                    <td>${prescription.Freq}</td>
                </tr>
            `)}`);
        </script>
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
