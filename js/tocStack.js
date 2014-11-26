document.addEventListener('DOMContentLoaded', function () {
    var stack;

    stack = gajus.Swing.Stack();

    var numberCorrect = 0;

    var expectedValues = {
        "Is A a subset of B? A = {'abc','ab','a'}B = {'abc', 'ab',   'aa', 'aaa'}" : false,
        "b" : true,
        "c" : false,
        "d" : false,
        "e" : true,
        "f" : false,
        "g" : false,
        "h" : true,
        "i" : true,
        "j" : true
    };

    var userAnswers = {};

    [].forEach.call(document.querySelectorAll('.stack li'), function (targetElement) {
        card = stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
        card.inDeck = true;
    });

    window.onkeyup = function(e) {
        var key = e.keyCode ? e.keyCode : e.which;


        if(!card.inDeck) {
            return;
        }

        if(key == 39) {
            card.throwOut(100,100);
            card.inDeck = false;
        }
        else if(key == 37) {
            card.throwOut(-100,100);
            card.inDeck = false;
        }

        list = document.getElementsByClassName('in-deck');

        [].forEach.call(list, function (targetElement) {
            card = stack.getCard(targetElement);
        });
    };


    stack.on('throwout', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

        $text = e.target.innerText;

        if (e.throwDirection == 1) {

            userAnswers[$text] = false;
        }
        else {
            userAnswers[$text] = true;
        }

        e.target.classList.remove('in-deck');
        e.inDeck = false;

        findCorrectAnswers();
    });

    stack.on('throwin', function (e) {
        console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

        e.target.classList.add('in-deck');
    });

    var findCorrectAnswers = function() {
        numberCorrect = 0;
        for(var key in userAnswers) {
            if(userAnswers.hasOwnProperty(key)) {
                if (userAnswers[key] == expectedValues[key]) {
                    numberCorrect++;
                }
            }
        }

        console.log("Number Correct = " + numberCorrect);
    }

    $('button').click(function(){
        var number = findCorrectAnswers();
        $('.submit-copy').hide();
        $('button').hide();
        $('.score').append('You got ' + number + ' correct out of 10!');
    });
});

