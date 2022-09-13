/* TODO: Frage 17: date.js mit $ */
$(document).ready(function () {
    $('.input-daterange').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        calendarWeeks: true,
        clearBtn: true,
        disableTouchKeyboard: true,
    });
});