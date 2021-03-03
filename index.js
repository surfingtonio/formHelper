"use strict";
exports.__esModule = true;
function captureForm() {
    var kv = [];
    var inputs = document.querySelectorAll('input,textarea,select');
    inputs.forEach(function (el) {
        if (el.name !== '')
            kv.push({ key: el.name, value: el.value });
    });
    return kv;
}
function generateBookmarklet(kv) {
    var fillForm = function (kv) {
        kv.forEach(function (item) {
            var el = document.querySelector("[name=" + item.key + "]");
            el.value = item.value;
            el.dispatchEvent(new Event('change', { bubbles: true }));
        });
    };
    var v = JSON.stringify(kv);
    var f = 'function f(e){e.forEach(function(e){var n=document.querySelector("[name="+e.key+"]");n.value=e.value,n.dispatchEvent(new Event("change",{bubbles:!0}))})}';
    return "var v=" + v + ";" + f + ";f(v)";
}
var kv = captureForm();
generateBookmarklet(kv);
