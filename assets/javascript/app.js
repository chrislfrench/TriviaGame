(function() {
  var questions = [{
    question: "What is Monica'a biggest pet peeve?",
    choices: ["  Animals dressed as humans", "  Using the guest soap", "  Animals in the apartment", "  Not doing the dishes", "  Moving furniture without her permission"],
    correctAnswer: 0
  }, {
    question: "According to Chandler, what phenomenon scares the bejeezus out of him?",
    choices: ["  Bigfoot", "  Deja Vu", "  Earthquakes", "  Aliens", "  Michael Flatley, Lord of the Dance."],
    correctAnswer: 4
  }, {
    question: "Monica and I have a grandmother who died. You both went to her funeral. Name that grandmother!",
    choices: ["  Julia", "  Althea", "  Ruth", "  Janice", "  Susan"],
    correctAnswer: 1
  }, {
    question: "Every week, the TV Guide comes to Chandler and Joey's apartment. What name appears on the address label?",
    choices: ["  Chandler Bing", "  Gunther", "  Ross Gellar", "  Miss Chanandler Bong", "  Joey"],
    correctAnswer: 3
  }, {
    question: "Joey had an imaginary childhood friend. His name was?",
    choices: ["  Harvey", "  Maurice", "  Captain Howdy", "  Frank", "  Jodie"],
    correctAnswer: 4
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $("#quiz"); //Quiz div object
  var count = 0;

  var number = 100;
  
  var intervalId;

  // setTimeout(fiveSeconds, 1000 * 5);
  // setTimeout(tenSeconds, 1000 * 10);
  // setTimeout(timeUp, 1000 * 15);
  
  // Display initial question
  displayNext();
  run();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    number = 100;
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  
  
  function createQuestionElement(index) {
    var questionElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    questionElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    questionElement.append(question);
    
    var radioButtons = createRadios(index);
    questionElement.append(radioButtons);
    
    return questionElement;

  }


  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
 	// starts timer for the question. 
  function run() {
   intervalId = setInterval(decrement, 100);
  }

   function decrement() {

      //  Decrease number by one.
   number--;

      //  Show the time remaining in the #show-number tag.
   $("#show-number").html("<h2>" + "Time remaining to answer: " + number + "</h2>");

   if (number <= 0) {

   		 reset();

   }
   	// resets the counter back to 100 and moves on to the next question.
   function reset () {

   		questionCounter++;
   		number = 100;
   		displayNext();

   }
      
  }

  // run();	


  // Displays next requested element
  function displayNext() {
  	// run();
    quiz.fadeOut(function() {
      $('#question').remove();


      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();	

console.log("js page is attached");