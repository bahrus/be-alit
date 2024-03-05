# be-alit

Attribute equivalent of [litter-g](https://github.com/bahrus/litter-g).

```html
<ul be-alit='{
    "eval": "onload",
    "vm": ["He", "She", "They", "Other"],
    
}' onload="html`${vm.map(i => html`<li>${i}</li>`)}`">
</ul>
```