# be-alit (🔥) [WIP]

Use the power of lit-html from HTML Markup.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

## Example 1a

```html
<ul be-alit='{
    "vm": ["He", "She", "They", "Other"],
    "eval": "onload",
}'  onload="html`${vm.map(i => html`<li>${i}</li>`)}`">
</ul>
```

This uses the [lit-html](https://www.npmjs.com/package/lit-html) engine to generate the inner content.

The eval specifier is optional (and is assumed to be the onload attribute if not specified).

If the issue of escape characters in the lit expression proves problematic, use a previous script tag:

## Example 1b

```html
<script nomodule>
    html`${vm.map(i => html`<li>${i}</li>`)}`
</script>
<ul be-alit='{
    "vm": ["He", "She", "They", "Other"],
}'>
</ul>
```

An alternative name (🔥) is supported, that makes it a bit less tedious and less errorprone to separate out the attributes so it is more semantic:

## Example 1c

```html
<ul 
    🔥-vm='["He", "She", "They", "Other"]' 
    🔥-eval=onload  
    onload="html`${vm.map(i => html`<li>${i}</li>`)}`">
</ul>
```

Passing the view model to the be-alit enhancement can be done via:

```JavaScript
oUL.beEnhanced.by.beAlit.vm = ["I", "You", "Us", "Them"];
```

## Example 2

*be-alit* can take over the reigns of binding, and tap into the power of [DSS](https://github.com/bahrus/trans-render/wiki/VIII.--Directed-Scoped-Specifiers-(DSS)).

For a somewhat "raw" example:

```html
<patient-chart>
    #shadow
        <medical-prescriptions 
            href="prescriptions.json" 
            enh-be-kvetching>
        </medical-prescriptions>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody 🔥='with ~medicalPrescriptions' onload="
                html`${vm.map(prescription => html`
                    <tr>
                        <td>${prescription.OrderText}</td>
                        <td>${prescription.Prescriber}</td>
                        <td>${prescription.Dosage}</td>
                        <td>${prescription.Freq}</td>
                    </tr>
                `)}
                `
            ">
            </tbody>
        </table>
        <be-hive></be-hive>
</patient-chart>
```


For a slightly more "polished syntax (with more depedencies)" [TODO]


```html
<patient-chart>
    #shadow
        <medical-prescriptions 
            href="prescriptions.json" 
            enh-be-fetching>
        </medical-prescriptions>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody be-alit='with ~ medicalPrescriptions.' onload="
                html`${vm.map(prescription => html`
                    <tr>
                        <td>${prescription.OrderText}</td>
                        <td>${prescription.Prescriber}</td>
                        <td>${prescription.Dosage}</td>
                        <td>${prescription.Freq}</td>
                    </tr>
                `)}
                `
            ">
            </tbody>
        </table>
        <be-hive></be-hive>
</patient-chart>
```

To bind to the patient-chart web component host: [TODO]

```html
<patient-chart>
    #shadow
        <medical-prescriptions 
            href="prescriptions.json"
            name=prescriptions
            enh-be-elevating='on change' 
            enh-be-fetching>
        </medical-prescriptions>
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody be-alit='with / prescriptions.' onload="
                html`${vm.map(prescription => html`
                    <tr>
                        <td>${prescription.OrderText}</td>
                        <td>${prescription.Prescriber}</td>
                        <td>${prescription.Dosage}</td>
                        <td>${prescription.Freq}</td>
                    </tr>
                `)}
                `
            ">
            </tbody>
        </table>
        <be-hive></be-hive>
</patient-chart>
```
