  $(document).ready(function () {
    $('input#caption').characterCounter();

    $('#post-content').val(`The post content will be auto filled in via a function in the front end javascript. This ensures that after the post content is filled in, the text area input on the form auto resizes to fit all the content in a neat fashion. I will have to figure out how to call a function on some front end javascript, but honestly I am not too worried about it. I can just get the value I put in at the start, save it, and reset iti here.`);
    M.textareaAutoResize($('#post-content'));
  });