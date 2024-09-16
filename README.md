# be-alit (🎇) [TODO]

Use the power of lit-html from HTML Markup, without imposing any security constraints.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

# Part I Using the global registry

## Example 1a Simple list, canonical name [TODO]

```html
<script type=module>
    import {register} from 'be-alit/🎇.js';
    register('listerine', e => e.r = html `${e.vm.map(i => html`<li>${i}</li>`)}`);
</script>
<ul be-alit-vm='["He", "She", "They", "Other"]' be-alit-with=listerine></ul>
```

Our registered "listerine" literator is quite reusable.  Having defined it, we can reuse it throughout the application, as long as we pass in a view model that conforms to the same structure, and we want the output to match the same HTML pattern as well. 

This uses the [lit-html](https://www.npmjs.com/package/lit-html) engine to generate the inner content of list elements.

Editing JSON by hand is a bit error prone.  A [VS plugin](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) can help with this.

A framework can theoretically pass the view model:

```JavaScript
await whenDefined('be-enhanced');
oUL.beEnhanced.by.beAlit.vm = ["He", "She", "They", "Other"];
```

Since this is seemingly far too advanced for most frameworks to handle, we provide a mechanism for pulling in the view model, described down below.

It's a bit cumbersome to type be-alit repeatedly like we needed to do above.  That is the canonical name for this enhancement.  But in less formal settings, where clashes between emoji-loving enhancements can be avoided, we can use shorter syntax, by referencing a file such as [this one](https://github.com/bahrus/be-alit/blob/baseline/%F0%9F%8E%87.js) to register a shorter name:

## Example 1b - with 🎇 emoji [TODO]

```html
<script type=module>
    import {register} from 'be-alit/🎇.js';
    register('listerine', e => e.r = html `${e.vm.map(i => html`<li>${i}</li>`)}`);
</script>
<ul 🎇-vm='["He", "She", "They", "Other"]' 🎇-with=listerine></ul>
```

## Example 1c - locally scoped literator

In some cases, we might want to define a local html generator (that gets reused with each repeated instance of the DOM fragment.)  For that we need to define an id (or some other attribute or class or part) that is unique to the application, such as a GUID:

```html
<script blow-dry=remove type=module>
    import {within} from 'be-alit/🎇.js';
    within('#gvyZqWwRFEe+ADiKsAsSZQ', 'listerine', e => e.r = html `${e.vm.map(i => html`<li>${i}</li>`)}`);
</script>
<div id=gvyZqWwRFEe+ADiKsAsSZQ>
    <ul 🎇-vm='["He", "She", "They", "Other"]' 🎇-with=listerine></ul>
</div>
```

The "blow-dry=remove" attribute is there if working with declarative custom elements based on xtal-element, so that the script element doesn't get repeated with each instance.

If Shadow DOM doesn't wrap each instance, it is probably better to use an attribute other than the id to insert the guid, since id's are supposed to be unique within a Shadow DOM realm.

# Part II Pulling in the View Model

## Example 2a [TODO]

As mentioned above, most, it is seeming beyond any frameworks's ability in to pass values to the view model in the proscribed  way.  *be-alit* can take over the reigns of binding, and tap into the power of [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)).

For a somewhat "raw" example:

```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions 
            href="prescriptions.json?patient=zero" 
            enh-be-kvetching>
        </medical-prescriptions>
        <script blow-dry=remove type=module>
            import {within} from 'be-alit/🎇.js';
            within('UUicp3Dh0kqKHlnAAbtw4Q', 'orders', e => e.r = html`${vm.map(prescription => html`
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
            <tbody 🎇-with='orders from ~medicalPrescriptions'>
            </tbody>
        </table>
        <be-hive></be-hive>
    </template>
</patient-chart>
```

## Suggestions for naming

Due to the platform being negligent when it comes to supporting progressive enhancement, we had to give a name to our renderer.  In this case the name we gave was "orders".  We can't support anonymous inline JS expressions in our attributes, in other words.

Naming things is emotionally draining.  Coming up with a formulaic way of deriving the name of the rendering process from the name of the entity that is being rendered may be helpful for developer productivity.

The following table provides a suggestion for what such a formulaic approach might look like

|  Entity                 |  Suggested Renderer name  | Sample attribute                                         |
|-------------------------|---------------------------|----------------------------------------------------------|
| medicalPrescriptions    | prescriptionRenders       | 🎇-with='prescriptionRenders from medicalPrescriptions' |
| customers               | customerRenders           | 🎇-with='customerRenders from customers'                |


For a slightly more "polished syntax (with more dependencies)" [TODO]

## Example 2b

```html
<patient-chart>
    <template shadowrootmode=open>
        <medical-prescriptions 
            href="prescriptions.json?patient=zero" 
            enh-be-fetching>
        </medical-prescriptions>
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
            <tbody 🎇-with='prescriptionRenders from ~medicalPrescriptions'>
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
