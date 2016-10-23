pulsing = false;

function stranger_wall(){
  var self = this,
      generating = false,
      started = false,
      loaded = false,
      container = $('#bulb_container'),
      bulb,
      generated = $('#generated'),
      result = $('#generated_word'),
      contact_btn = $('#generate_word_btn'),
      re_contact = $('#re_contact');
  self.table = function(){
    for (var i = 0; i < abc.length; i++) {
      container.append('<span class="bulb"></span>');
    }
    bulb = container.find('span');
    $.each( abc, function( i, val ) {
      if(this.hidden !== true) {
        bulb.eq(i).text(this.letter);
        bulb.eq(i).css('top', this.top);
        bulb.eq(i).css('left', this.left);
      } else {
        bulb.eq(i).text(this.letter);
        bulb.eq(i).hide();
      }
    });
    bulb.each(function(i){
      $(this).attr('id', 'bulb-'+i);
    });
  };
  self.siteAnimation = function(){
    $(window).load(function(){
      $('#pre_load_overlay').fadeOut();
      loaded = true;
      if(loaded === true && started === false) {
        setTimeout(function(){
          $('#bl_1').addClass('line_fill');
          setTimeout(function(){
            $('#bl_2').addClass('line_fill');
            setTimeout(function(){
              $('#bl_3').addClass('line_fill');

            }, 700);
          }, 700);
        }, 500);
        setTimeout(function(){
          bulb.each(function(i){
            if(i <= 7) {
              var that_bulb = $(this);
              setTimeout(function() {
                that_bulb.addClass('visible');
              }, i*50);
            }
          });
        }, 500);
        setTimeout(function(){
          bulb.each(function(i){
            if(i > 7 && i <= 16) {
              var that_bulb = $(this);
              setTimeout(function() {
                that_bulb.addClass('visible');
              }, i*50);
            }
          });
        }, 1000);
        setTimeout(function(){
          bulb.each(function(i){
            if(i > 16) {
              var that_bulb = $(this);
              setTimeout(function() {
                that_bulb.addClass('visible');
              }, i*50);
            }
          });
        }, 1300);
        setTimeout(function(){
          $('#user_panel').fadeIn(700);
        }, 3000);
      }
    });
  }
  self.showText = function(){
    if(generating === false) {
      generating = true;
      generated.addClass('text');
      result.html('');
      var uniqueRandoms = [];
      var numRandoms = words_list.length;
      function makeUniqueRandom() {
          // refill the array if needed
          if (!uniqueRandoms.length) {
              for (var i = 0; i < numRandoms; i++) {
                  uniqueRandoms.push(i);
              }
          }
          var index = Math.floor(Math.random() * uniqueRandoms.length);
          var val = uniqueRandoms[index];

          // now remove that value from the array
          uniqueRandoms.splice(index, 1);

          return val;

      }
      var random_word = words_list[makeUniqueRandom()];
      var chars = random_word.toLowerCase().split('');
      $.each( chars, function( i, val ) {
        bulb.each(function(){
          var this_text = $(this).text(),
              this_span = $(this);
          if(this_text === val) {
            setTimeout(function() {
              bulb.removeClass('active');
              this_span.addClass('active');
              if(i+1 == random_word.length) {
                re_contact.fadeIn();
                generating = false;
                self.generated();
              }
              setTimeout(function(){
                this_span.removeClass('active');
              }, 300);
              result.append('<span>'+this_text+'</span>');
            }, i*200);
          }
        });
      });
    }
  };
  self.generated = function(){
    function toggleSomething() {
      bulb.toggleClass('active');
      $('#bg_overlay').toggleClass('connecting');
      clearInterval(pulsing);
      pulsing = setInterval(toggleSomething, parseInt(Math.random() * randomWidth));
    }
    var randomWidth = 300;
    pulsing = setInterval(toggleSomething, 1000);
  };
  self.user_action = function(){
    var on_click = function(btn){
      $('#bg_overlay').addClass('connecting');
      btn.fadeOut(400);
      setTimeout(function(){
        generated.removeClass('animated');
        self.showText();
      }, 400);

    };
    contact_btn.on('tap', function(e){
      var that = $(this);
      e.preventDefault();
      on_click(that);
    });
    re_contact.on('tap', function(e){
      clearInterval(pulsing);
      bulb.removeClass('active');
      $('#bg_overlay').removeClass('connecting');
      var that = $(this);
      e.preventDefault();
      on_click(that);
    });
  };
  self.init = function(){
    self.table();
    self.siteAnimation();
    self.user_action();
  };
};
$(document).ready(function(){
  var mypage = new stranger_wall();
	mypage.init();

  $('a, button, input[type="submit"], .taphover').on('vmouseover', function(){
    $(this).addClass('hover');
  }).on('vmouseout', function(){
    $(this).removeClass('hover');
  });
});
$(window).load(function(){
  $('.when_loaded').addClass('visible');
});
