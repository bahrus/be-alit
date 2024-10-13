# be-alit (🎇) [TODO]

Use the power of lit-html from HTML Markup, without imposing any security constraints.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).


## Example 1a - Simple list, canonical name, without lit-html [TODO]

```html
<script type=module blow-dry-remove blocking=render>
    const html = String.raw;
    (await import('be-alit/🎇.js'))
    .w('#pronouns')
    .p(vm => html `${vm.map(i => html`<li>${i}</li>`)}`);
</script>
<ul id=pronouns 🎇-vm='["He", "She", "They", "Other"]'></ul>
```

> [!NOTE]
> Originally, I was going to support built-in inline event handlers for a more elegant solution.  However, the powers that be chose to not accommodate that approach, when applying minimal security measures, hence the solution that is before us.

> [!NOTE]
> This code will work, but it is vulnerable to xss attacks -- the attribute be-alit-vm can contain dangerous HTML (like script tags). lit-html to the rescue!

## Example 1b - Simple list, canonical name, with lit-html [TODO]

```html
<script type=module blow-dry-remove blocking=render>
    import {html} from 'lit-html';
    (await import('be-alit/🎇.js'))
    .w('#pronouns')
    .p(vm => html `${vm.map(i => html`<li>${i}</li>`)}`);
</script>
<ul id=pronouns 🎇-vm='["He", "She", "They", "Other"]'></ul>
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

As mentioned above, it is seemingly beyond any frameworks's ability to pass values to the view model in the proscribed  way.  So*be-alit* can take over the reigns of binding, and tap into the power of [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)).

For a somewhat "raw" example:

```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions 
            href="prescriptions.json?patient=zero" 
            enh-be-kvetching>
        </medical-prescriptions>
        <script type=module blocking=render blow-dry=remove >
            import {html} from 'lit-html';
            (await import('be-alit/🎇.js'))
            .w('[🎇-with="~medicalPrescriptions"]')
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
            <tbody 🎇-with='~medicalPrescriptions'>
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
        <script type=module blocking=render blow-dry=remove>
            import {html} from 'lit-html';
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
