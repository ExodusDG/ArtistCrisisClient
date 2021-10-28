/* PHRASE HTML BUILD */

var wrapperHeight = $('.image__list p').height() + 30;

$('.image__wrapper').attr('style', 'height:' + wrapperHeight + 'px;')

allPhrases = []

$.getJSON("phrase.json", function(json) {
    allPhrases = json;

    $.each(allPhrases, function(key, value) {
        $('.image__list').prepend('<p>' + value + '</p>')
    });
});


/* END */

$('.triangle__logo').click(function() {
    $('.triangle_text_wrapper').toggleClass('show')
})

$('.phrase__spin').click(function() {
    rouletteSpin()
})

infoUpdate()
var id;
var spinCount;
var spinTimer;

function infoUpdate() {
    var userInfo = [];

    $.ajax({
        url: 'http://localhost:3000/info',
        method: 'get',
        dataType: 'json',
        async: false,
        data: { text: 'Текст' },
        success: function(data) {
            userInfo = data;
        }
    });
    id = userInfo[0].id
    spinCount = userInfo[0].spins
    spinTimer = userInfo[0].timer


    if (spinCount == 0) {
        $('#spins__count').text(spinCount)
    } else {
        console.log(spinCount)
        $('#spins__count').text(spinCount)
    }


}


console.log('TIMER: ' + spinTimer + ' | ' + 'Count: ' + spinCount)

if (spinCount == 0) {
    $('.spin__count').text('You have no spins left! Wait ' + spinTimer + ' hours')
}

$('#spins__count').text(spinCount);

/* ROULETTE SPIN */

function rouletteSpin() {

    if (spinCount == 0) {
        $('.spin__count').text('You have no spins left! Wait ' + spinTimer + ' hours')
        return false;
    } else {
        var phraseCount = $('.image__list > p').length - 1;
        var randPhrase = Math.floor(Math.random() * (phraseCount - 1 + 1)) + 1;

        console.log(randPhrase)
        var translateWidth = -wrapperHeight * randPhrase;

        setTimeout(() => {
            $('.image__list').attr('style', 'transform: translateY(' + translateWidth + 'px);')
        }, 0);

        spinCount = spinCount - 1;

        if (spinCount < 0) {
            spinCount == 0
        }

        $.ajax({
            url: 'http://localhost:3000/spinchange',
            method: 'get',
            dataType: 'json',
            async: false,
            data: {
                spins: spinCount,
                id: id
            },
            success: function(data) {
                console.log(data)
            }
        });
        infoUpdate()
    }
}