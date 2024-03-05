# be-alit

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

```html
<ul be-alit='{
    "with": ["He", "She", "They", "Other"],
    "eval": "onload",
}'  onload="html`${vm.map(i => html`<li>${i}</li>`)}`">
</ul>
```

This uses the [lit-html](https://www.npmjs.com/package/lit-html) engine to generate the inner content.

The eval specifier is optional (and is assumed to be the onload attribute).

If the issue of escape characters in the lit expression proves problematic, use a previous script tag:

```html
<script nomodule>
    html`${vm.map(i => html`<li>${i}</li>`)}`
</script>
<ul be-alit='{
    "with": ["He", "She", "They", "Other"],
}'>
</ul>
```

Passing the view model to the be-alit enhancement can be done via:

```JavaScript
oUL.beEnhanced.by.beAlit.vm = ["I", "You", "Us", "Them"]
```

*be-alit* can also tap into the power of other similar be-enhanced binding custom enhancements:

```html
<patient-chart>
    #shadow
        <table>
            <thead>
                <th>Prescription</th>
                <th>Prescriber</th>
                <th>Dosage</th>
                <th>Frequency</th>
            </thead>
            <tbody be-alit='with / prescriptions' onload="
                html`${vm.map(prescription => html`
                    <tr>
                        <td>${prescription.OrderText}</td>
                        <td>${prescription.PhysicianOrNursePractioner}</td>
                        <td>${prescription.Dosage}</td>
                        <td>${prescription.Freq}</td>
                    </tr>
                `)}
                `
            ">
            </tbody>
        </table>
</patient-chart>
```
