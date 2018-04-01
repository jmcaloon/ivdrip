$(document).ready(function(){

  $('.search-box').on('keyup', function(){

    let searchTerm = $(this).val().toLowerCase();

    //find playlists that match search term, hide those that don't
    $('.playlist').each(function(){
      $(this).attr('data-lowercase-name', $(this).text().toLowerCase());
      if ($(this).filter('[data-lowercase-name *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
          $(this).parent().show();
      } else {
          $(this).parent().hide();
      }

    });

  });

});
