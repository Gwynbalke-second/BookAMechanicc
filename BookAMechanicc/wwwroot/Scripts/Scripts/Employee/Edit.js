$(document).ready(function () {
    
    $("#@Html.NameFor(m => m.Designation)").val('@Model.Designation').change();
    
});
function openMsg(name) {
    //$("#" + name + "").val("'" + id + "'").change();
    alert(name);
    
}
