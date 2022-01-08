// Array of all the questions and choices to populate the questions. This might be saved in some JSON file or a database and we would have to read the data in.
const all_questions = [{
    question_string: "What color is the sky?",
    choices: {
        correct: "Blue",
        wrong: ["Pink", "Orange", "Green"]
    }
}, {
    question_string: "Which of the following elements aren’t introduced in HTML5?",
    choices: {
        correct: "<input>",
        wrong: ["<article>", "<footer>", "<hgroup>"]
    }
}, {
    question_string: "How many wheels are there on a tricycle?",
    choices: {
        correct: "Three",
        wrong: ["One", "Two", "Four"]
    }
}, {
    question_string: 'Who is the main character of Harry Potter?',
    choices: {
        correct: "Harry Potter",
        wrong: ["Hermione Granger", "Ron Weasley", "Voldemort"]
    }
}, {
    question_string: 'Sohan started a business with a capital of Rs. 80000. After 6 months Mohan joined as a partner by investing Rs. 65000. After one year they earned total profit Rs. 20000. What is share of Sohan in the profit?',
    choices: {
        correct: "Rs. 5777.7",
        wrong: ["Rs. 5222.2", "Rs. 6222.2", "Rs. 6777.7"]
    }
}, {
    question_string: ' What is the difference in the place value of 5 in the numeral 754853?',
    choices: {
        correct: "49950",
        wrong: ["45000", "49940", "49500"]
    }
}, {
    question_string: 'What is the compound interest on Rs. 2500 for 2 years at rate of interest 4% per annum?',
    choices: {
        correct: "Rs. 204",
        wrong: ["Rs. 180", "Rs. 210", "Rs. 220"]
    }
}, {
    question_string: 'Find the value of the expression:\n' +
        '\n' +
        '1+1/ (1+1/ (1+1/ (1+1 /x)))',
    choices: {
        correct: "(5x+3)/(3x+2)",
        wrong: ["(7x+3)/(5x+2)", "(3x+3)/(7x+2)", "(11x+3)/(9x+2)"]
    }
}, {
    question_string: 'The day on 5th April of a year will be the same day on 5th of which month of the same year?',
    choices: {
        correct: "5th July",
        wrong: ["5th August", "5th June", "5th October"]
    }
},{
    question_string: 'A man swimming in a river which is flowing at 3^1/2 Boat and streams 34 km/hr finds that in a given time he can swim twice as far downstream as he can swim upstream. What will be his speed in still water?',
    choices: {
        correct: "10.5 km/hr",
        wrong: ["9.5 km/hr", "10 lm/hr", "11 km/hr"]
    }
}];

// An object for a Quiz, which will contain Question objects.
const Quiz = function(quiz_name) {
    // Private fields for an instance of a Quiz object.
    this.quiz_name = quiz_name;

    // This one will contain an array of Question objects in the order that the questions will be presented.
    this.questions = [];
}

// A function that you can enact on an instance of a quiz object. This function is called add_question() and takes in a Question object which it will add to the questions field.
Quiz.prototype.add_question = function(question) {
    // Randomly choose where to add question
    const index_to_add_question = Math.floor(Math.random() * this.questions.length);
    this.questions.splice(index_to_add_question, 0, question);
}

// A function that you can enact on an instance of a quiz object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the quiz in.
Quiz.prototype.render = function(container) {
    // For when we're out of scope
    const self = this;

    // Hide the quiz results modal
    $('#quiz-results').hide();

    // Write the name of the quiz
    $('#quiz-name').text(this.quiz_name);

    // Create a container for questions
    const question_container = $('<div>').attr('id', 'question').insertAfter('#quiz-name');

    // Helper function for changing the question and updating the buttons
    function change_question() {
        self.questions[current_question_index].render(question_container);
        $('#prev-question-button').prop('disabled', current_question_index === 0);
        $('#next-question-button').prop('disabled', current_question_index === self.questions.length - 1);


        // Determine if all questions have been answered
        let all_questions_answered = true;
        for (let i = 0; i < self.questions.length; i++) {
            if (self.questions[i].user_choice_index === null) {
                all_questions_answered = false;
                break;
            }
        }
        $('#submit-button').prop('disabled', !all_questions_answered);
    }

    // Render the first question

    let current_question_index = 0;
    change_question();

    // Add listener for the previous question button
    $('#prev-question-button').click(function() {
        if (current_question_index > 0) {
            current_question_index--;
            change_question();
        }
    });

    // Add listener for the next question button
    $('#next-question-button').click(function() {
        if (current_question_index < self.questions.length - 1) {
            current_question_index++;
            change_question();
        }
    });

    // Add listener for the submit answers button
    $('#submit-button').click(function() {
        // Determine how many questions the user got right
        let score = 0;
        for (let i = 0; i < self.questions.length; i++) {
            if (self.questions[i].user_choice_index === self.questions[i].correct_choice_index) {
                score++;
            }

            $('#quiz-retry-button').click(function(reset) {
                quiz.render(quiz_container);
            });

        }



        // Display the score with the appropriate message
        let percentage = score / self.questions.length;
        console.log(percentage);
        let message;
        if (percentage === 1) {
            message = 'Great job!'
        } else if (percentage >= .75) {
            message = 'You did alright.'
        } else if (percentage >= .5) {
            message = 'Better luck next time.'
        } else {
            message = 'Maybe you should try a little harder.'
        }
        $('#quiz-results-message').text(message);
        $('#quiz-results-score').html('You got <b>' + score + '/' + self.questions.length + '</b> questions correct.');
        $('#quiz-results').slideDown();
        $('#submit-button').slideUp();
        $('#next-question-button').slideUp();
        $('#prev-question-button').slideUp();
        $('#quiz-retry-button').sideDown();

    });

    // Add a listener on the questions container to listen for user select changes. This is for determining whether we can submit answers or not.
    question_container.bind('user-select-change', function() {
        let all_questions_answered = true;
        for (let i = 0; i < self.questions.length; i++) {
            if (self.questions[i].user_choice_index === null) {
                all_questions_answered = false;
                break;
            }
        }
        $('#submit-button').prop('disabled', !all_questions_answered);
    });
}

// An object for a Question, which contains the question, the correct choice, and wrong choices. This block is the constructor.
let Question = function(question_string, correct_choice, wrong_choices) {
    // Private fields for an instance of a Question object.
    this.question_string = question_string;
    this.choices = [];
    this.user_choice_index = null; // Index of the user's choice selection

    // Random assign the correct choice an index
    this.correct_choice_index = Math.floor(Math.random(0, wrong_choices.length + 1));

    // Fill in this.choices with the choices
    let number_of_choices = wrong_choices.length + 1;
    for (let i = 0; i < number_of_choices; i++) {
        if (i === this.correct_choice_index) {
            this.choices[i] = correct_choice;
        } else {
            // Randomly pick a wrong choice to put in this index
            let wrong_choice_index = Math.floor(Math.random(0, wrong_choices.length));
            this.choices[i] = wrong_choices[wrong_choice_index];

            // Remove the wrong choice from the wrong choice array so that we don't pick it again
            wrong_choices.splice(wrong_choice_index, 1);
        }
    }
}

// A function that you can enact on an instance of a question object. This function is called render() and takes in a variable called the container, which is the <div> that I will render the question in. This question will "return" with the score when the question has been answered.
Question.prototype.render = function(container) {
    // For when we're out of scope
    let self = this;

    // Fill out the question label
    let question_string_h2;
    if (container.children('h2').length === 0) {
        question_string_h2 = $('<h2>').appendTo(container);
    } else {
        question_string_h2 = container.children('h2').first();
    }
    question_string_h2.text(this.question_string);

    // Clear any radio buttons and create new ones
    if (container.children('input[type=radio]').length > 0) {
        container.children('input[type=radio]').each(function() {
            let radio_button_id = $(this).attr('id');
            $(this).remove();
            container.children('label[for=' + radio_button_id + ']').remove();
        });
    }
    for (let i = 0; i < this.choices.length; i++) {
        // Create the radio button
        const choice_radio_button = $('<input>')
            .attr('id', 'choices-' + i)
            .attr('type', 'radio')
            .attr('name', 'choices')
            .attr('value', 'choices-' + i)
            .attr('checked', i === this.user_choice_index)
            .appendTo(container);

        // Create the label
        const choice_label = $('<label>')
            .text(this.choices[i])
            .attr('for', 'choices-' + i)
            .appendTo(container);
    }

    // Add a listener for the radio button to change which one the user has clicked on
    $('input[name=choices]').change(function(index) {
        const selected_radio_button_value = $('input[name=choices]:checked').val();

        // Change the user choice index
        self.user_choice_index = parseInt(selected_radio_button_value.substr(selected_radio_button_value.length - 1, 1));

        // Trigger a user-select-change
        container.trigger('user-select-change');
    });
}

// "Main method" which will create all the objects and render the Quiz.
$(document).ready(function() {
    // Create an instance of the Quiz object
    const quiz = new Quiz('Subject Name: ');

    // Create Question objects from all_questions and add them to the Quiz object
    for (let i = 0; i < all_questions.length; i++) {
        // Create a new Question object
        const question = new Question(all_questions[i].question_string, all_questions[i].choices.correct, all_questions[i].choices.wrong);

        // Add the question to the instance of the Quiz object that we created previously
        quiz.add_question(question);
    }

    // Render the quiz
    const quiz_container = $('#quiz');
    quiz.render(quiz_container);
});