var peopleArray = [];
var activeIndex = 0;
var oldActiveIndex = 0;
var fadeInterval = 2000;
$(document).ready(function(){
    var timer;
    $('#btnNext').on('click',function(){
        masterMover(advanceIndex);
        clearInterval(timer);
        timer = setInterval(function(){
            masterMover(advanceIndex);
        }, 2 * fadeInterval + 100);
    });
    $('#btnPrev').on('click',function(){
        masterMover(decrementIndex);
        clearInterval(timer);
        timer = setInterval(function(){
            masterMover(advanceIndex);
        }, 2 * fadeInterval + 100);
    });

    ajaxRequest();

    timer = setInterval(function(){
        masterMover(advanceIndex);
    }, 2 * fadeInterval + 100);

});
function ajaxRequest(){
    $.ajax({
            url: "/data",
            success: function(data){
                peopleArray = data.zeta;
                appendToDom();
                updateDom();
                updateIndexPoint();
            }
        });
}
function appendToDom(){
    for(var i = 0; i < peopleArray.length; i++){
        //person content
        $('#mainContent').append('<div class="person well" id="person'+i+'"></div>');
        var $el = $('#mainContent').children().last();
        $el.hide();
        $el.append('<img src="' + peopleArray[i].imageURL + '">');
        $el.append('<div>' + peopleArray[i].name + '</div>');
        $el.append('<div>' + peopleArray[i].github + '</div>');
        $el.append('<div>'+  peopleArray[i].shoutout + '</div>');

        //index points
        $('#indexPoints').append('<div class="index-point" id="index'+i+'"</div>');
    }
}
//runs all functions required to move 1 person on the carassel.
//pass in advanceIndex to move forward, decrement index to move backward.
function masterMover(moveIndex){
    $('#person' + oldActiveIndex).stop(true, true);
    $('#person' + activeIndex).stop(true, true);
    moveIndex();
    updateDom();
    updateIndexPoint();
}
//updates 'active' and 'innactive' css classes on dots
function updateIndexPoint(){
    $('.index-point').removeClass('selected-index');
    $('#index'+activeIndex).addClass('selected-index');
}
//updates person displayed on DOM to reflect new 'active' person
function updateDom() {
    $('#person' + oldActiveIndex).fadeOut(function () {
        //console.log('fadeout');
        $('#person' + activeIndex).fadeIn(fadeInterval, function(){
            $('.nav-button').fadeIn(fadeInterval);
        });
    });
}
//advances index by 1 when called
function advanceIndex(){
    if (activeIndex>=(peopleArray.length-1) ){
        oldActiveIndex=activeIndex;
        activeIndex=0;
    }else {
        oldActiveIndex=activeIndex;
        activeIndex++;
    }
}
//decrements index by 1 when called
function decrementIndex(){
    if(activeIndex<=0){
        oldActiveIndex=activeIndex;
        activeIndex = peopleArray.length-1;
        console.log(peopleArray.length-1);
    }else {
        oldActiveIndex=activeIndex;
        activeIndex--;
    }
}
