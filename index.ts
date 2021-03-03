import { KeyValuePair } from './interfaces/KeyValuePair';

function captureForm(): KeyValuePair[] {
    const kv : KeyValuePair[] = [];
    const inputs = document.querySelectorAll('input,textarea,select');
    inputs.forEach((el: HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement) => {
        if(el.name !== '')
            kv.push({ key: el.name, value: el.value });
    })
    return kv;
}

function generateBookmarklet(kv: KeyValuePair[]) : string {
    const fillForm = function(kv: KeyValuePair[]) : void {
        kv.forEach(item => {
            const el : HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement = document.querySelector(`[name=${item.key}]`);
            el.value = item.value;
            el.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

    const v = JSON.stringify(kv);
    const f = 'function f(e){e.forEach(function(e){var n=document.querySelector("[name="+e.key+"]");n.value=e.value,n.dispatchEvent(new Event("change",{bubbles:!0}))})}'
    return `var v=${v};${f};f(v)`;
}

const kv = captureForm();
generateBookmarklet(kv);