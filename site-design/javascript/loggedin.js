function dropdownOpen() {
    const dropdown_arrow = $("#dropdown-arrow");
    dropdown_arrow.text("arrow_drop_up");
    return;
}

function dropdownClose() {
    const dropdown_arrow = $("#dropdown-arrow");
    dropdown_arrow.text("arrow_drop_down");
    return;
}

$(document).ready(function () {
    $(".dropdown-trigger").dropdown({
        inDuration: 250,
        outDuration: 250,
        coverTrigger: false,
        onOpenStart: dropdownOpen,
        onCloseStart: dropdownClose,
        hover: false
    });
})