# be-alit (🔥)

Use the power of lit-html from HTML Markup.

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

## Example 1

```html
<ul be-alit='{
    "vm": ["He", "She", "They", "Other"],
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
    "vm": ["He", "She", "They", "Other"],
}'>
</ul>
```

Passing the view model to the be-alit enhancement can be done via:

```JavaScript
oUL.beEnhanced.by.beAlit.vm = ["I", "You", "Us", "Them"];
```

## Example 2

*be-alit* can also tap into the power of other similar be-enhanced binding custom enhancements.

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

"/" is a special character used to signify that we are referring to the host(ish).

In the examples below, we will encounter other, additional special symbols used in order to keep the statements small:


| Symbol      | Meaning              | Notes                                                                                        |
|-------------|----------------------|----------------------------------------------------------------------------------------------|
| /propName   |"Hostish"                     | Pulls in values from the specified property of the host. [TODO]                      |
| @propName   |Name attribute                | Pull in value from form element with matching name, listens for input events. [TODO] | 
| |propName   |Itemprop attribute            | If contenteditible, listens for input events.  Otherwise, uses be-value-added.[TODO] |
| #propName   |Id attribute                  | Match by id.    [TODO]                                                               |
| -prop-name  |Marker indicates prop         | Pulls in from prop specified by attribute marker (camel case).  [TODO]               |
| %propName   |Part attribute                | Pulls prop from adorned element with that part name. [TODO]                          |
| ~my-el:prop |Prop from peer custom element | Pulls in model from (brian-like, non visible) peer custom element.  [TODO]           |

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
