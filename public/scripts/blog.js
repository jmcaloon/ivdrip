$(document).ready(function(){
  $('.toggler').on('click', function(){
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

  });

  //When a tag is clicked, hide posts that don't have that tag
  $(".tag").on("click", function(){
    let tag = $(this).attr('class').split(' ')[1];

    $(".blog-post").each(function(){
      $(this).show();
      if (!($(this).hasClass(tag))){
        $(this).hide();
      }
    });
  });
  //Show all posts regardless of tag
  $(".show-all").on("click", function(){
    $(".blog-post").each(function(){
      $(this).show();
    });
  });

  $('.search-box').on('keyup', function(){
    let searchTerm = $(this).val().toLowerCase();
    $(".blog-post").each(function(){
      $(this).attr('data-text', $(this).text().toLowerCase());
      if ($(this).filter('[data-text *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
        $(this).show();
      } else {
        $(this).hide();
      }

    });

  });
});
