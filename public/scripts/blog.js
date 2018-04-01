$(document).ready(function(){
  $('button').on('click', function(){
    //Show more of a post when "more" button is clicked
    if ($(this).hasClass('more')) {
      let text = $(this).prev()
      text.css('height', 'auto');
      let fullHeight = text.height();
      text.animate({height: text.height()}, 500);
      $(this).html('Less');
      $(this).removeClass('more').addClass('less')
    }
    //Show less of a post when "less" button is clicked
    else if ($(this).hasClass('less')){
      let text = $(this).prev()
      text.css('height', '6em');
      let shorterHeight = text.height();
      text.animate({height: shorterHeight}, 500);
      $(this).html('More');
      $(this).removeClass('less').addClass('more')
    }

  })
});
