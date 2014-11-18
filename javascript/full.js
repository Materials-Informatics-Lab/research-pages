function HeaderOrder( $obj ){
  if( $obj.is(":header") ){
    tag = $obj.prop("tagName");
    return parseInt( tag[1] );
  }else{
    return parseInt( 10 );
  }
}

var toprank = 2;

function Wrap_H_Section(){
  $('article :header').each( function( i,d ){
    // Add section classed container for Fullpage
    $(this).before( "<div class='section'></div>")

    hrank = HeaderOrder($(this))

    if (hrank <= toprank){
    var sec = $(this).prev()

      $(sec).nextAll().each( function(i,d){
          if ( HeaderOrder( $(this) ) > toprank || i == 0 ){
            $(this).appendTo( $(sec) );
          } else {
              return false;
          }
      });
    };
  });
} //Wrap_H_Section()

// The blog post header, wrap only the children


function Present() {

    // Add fullpage element to the top of the body
    $('body').prepend('<div id="fullpage"></div>')
    var pres = $('#fullpage');

    // #controls  :: include header.html
    $('#controls').clone().prependTo( $(pres) )
    $('#fullpage #controls').css('position','fixed')
                            .css('z-index','10')
                            .css('top', '40px')
                            .css('right', '40px')

    $('.section').each( function(){
      $(this).clone().appendTo( $(pres) );
    })


    $('#fullpage').fullpage({
           normalScrollElements: '#controls, iframe'
    });
};

function fullpageinit(){
  $('head').append(
    '<link rel="stylesheet" href="http://cdn.jsdelivr.net/jquery.fullpage/2.4.1/jquery.fullPage.min.css">'
  )
  Present();
  // Change button behavior to reload
  $('#fp-start').attr('onclick','window.location.reload()');
}

// Initialize slides
$(document).ready( function (){
  if ($('.section').length == 0){
      $('.post header').children().wrapAll("<div class='section'></div>");
    Wrap_H_Section();
}
});


/**
**/
// Make a "section" div element before
