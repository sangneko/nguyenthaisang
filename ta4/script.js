document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu câu hỏi được lấy từ TA4.docx
    const questionsData = [
        { question: "The reason ____ I have continued to work for that company is the job security.", options: ["at which", "which", "why", "for that"], answer: "why" },
        { question: "To calm his angry girlfriend, John offered an apology ____ Jane did not accept.", options: ["which", "who", "whom", "when"], answer: "which" },
        { question: "____ failed will have to retake the exam next week.", options: ["Those", "Those who", "Who", "Those which"], answer: "Those who" },
        { question: "The woman ____ hair is long and curly is the new secretary, Mrs. Chan.", options: ["who", "whose", "that", "which"], answer: "whose" },
        { question: "____ is a quality all human beings have.", options: ["Creativity may take many forms", "Creativity, may take many forms,", "Creativity which may take many forms,", "Creativity, which may take many forms"], answer: "Creativity, which may take many forms" },
        { question: "New York is a place ____ people of many different cultures live and work together.", options: ["where", "that", "which", "in that"], answer: "where" },
        { question: "Women ____ work are happier than those ____ don't work.", options: ["that / whom", "who / who", "whom / that", "whose / which"], answer: "who / who" },
        { question: "____ used to be the tallest building in the world, is still a popular tourist attraction.", options: ["The Empire State Building", "It is The Empire Building, which", "The Empire State Building, that", "The Empire State Building, which"], answer: "The Empire State Building, which" },
        { question: "The family ______ burnt in the fire was immediately given a suite in a hotel.", options: ["which house", "the house of whom", "that house", "whose house"], answer: "whose house" },
        { question: "This is the house ______ I lived when I first came to the US.", options: ["in that", "in where", "where", "which in"], answer: "where" },
        { question: "New York City, ______ millions of immigrants live, is sometimes called a Melting Pot.", options: ["New York City, which", "New York City that", "New York City, where", "New York City"], answer: "New York City, where" },
        { question: "______ small two-winged insects, can spread fatal diseases like malaria and dengue fever.", options: ["Mosquitoes are", "Mosquitoes, which are", "Mosquitoes, that are", "They are mosquitoes4"], answer: "Mosquitoes, which are" },
        { question: "He is the man ______ last week.", options: ["I met", "which I met", "whose I met", "where I met"], answer: "I met" },
        { question: "He is the man ______ I wanted to speak to and ______ name I'd forgotten.", options: ["whose / whom", "that / which", "who / that", "whom / whose"], answer: "whom / whose" },
        { question: "I did not like the book ______.", options: ["whom John gave me", "when John gave me", "John gave me", "that John gave me it"], answer: "John gave me" },
        { question: "______ in New York lead very busy lives.", options: ["Those who live", "Who live", "Those live", "Those which live"], answer: "Those who live" },
        { question: "The house ______ I grew up has just renovated.", options: ["where", "in that", "which", "that"], answer: "where" },
        { question: "My favorite month is always February ______ we celebrate Valentine's Day and Presidents' Day.", options: ["which", "where", "why", "when"], answer: "when" },
        { question: "Frank Zappa, ______ one of the most creative artists in rock 'n roll, came from California.", options: ["was", "who was", "whom was", "that was"], answer: "who was" },
        { question: "Michelle screamed when she saw the spider ______ dangling from the one clean bathroom towel.", options: ["whom", "where", "that", "whose"], answer: "that" },
        { question: "Brian said goodnight to his roommate ______ continued to play video games until his eyes were blurry with fatigue.", options: ["Justin, whom", "Justin who", "Justin, who", "Justin, that"], answer: "Justin, who" },
        { question: "The old man and his two dogs ______ were seriously burnt in the fire last week have gradually recovered.", options: ["who", "that", "which", "whom"], answer: "that" },
        { question: "If the trajectory of a satellite ______ slightly off at launch, it ______ worse as the flight progresses.", options: ["is / will get", "are / get", "was / got", "were / would get"], answer: "is / will get" },
        { question: "If a live sponge ______ into pieces, each piece ______ into a new sponge like the original one.", options: ["break / turn", "broke / would turned", "is broken / will turn", "will break / turn"], answer: "is broken / will turn" },
        { question: "If the temperatures ______ to below 0, this lake ______. ", options: ["will drop / freezes", "drop / froze", "dropped / freezes", "drop / freezes"], answer: "drop / freezes" },
        { question: "If Dora ______ to work before 7 tomorrow, she ______ you a ride.", options: ["will go / gives", "goes / will give", "go / give", "is going / will give"], answer: "goes / will give" },
        { question: "If you took the medication, you ______ too much.", options: ["will cough", "wouldn't cough", "will not cough", "would cough"], answer: "wouldn't cough" },
        { question: "If I ruled the world, ______ all of the wars.", options: ["I'd stop", "I'll stop", "I would have stopped", "I stopped"], answer: "I'd stop" },
        { question: "If Americans ______ fewer foods with sugar and salt, their general health ______ better.", options: ["eat / would be", "ate / will be", "ate / would be", "will eat / is"], answer: "ate / would be" },
        { question: "She ______ to the aerobics classes if her friend ______ her up in her car.", options: ["could go to / didn't pick", "couldn't go to / didn't pick", "couldn't go to / picked", "could go to / pick"], answer: "couldn't go to / picked" },
        { question: "I ______ more art if I ______ working part time to pay off my student loans.", options: ["can produce / am", "couldn't produce / was", "couldn't produce / wasn't", "could produce / wasn't"], answer: "could produce / wasn't" },
        { question: "If they had informed us of their arrival in advance, we ______ rooms for them.", options: ["would prepare", "would have prepared", "have prepared", "had prepared"], answer: "would have prepared" },
        { question: "If I hadn't been so nervous, I ______ the exam.", options: ["would pass", "will have passed", "would have passed", "had passed"], answer: "would have passed" },
        { question: "______ more carefully, he would not have had the accident yesterday.", options: ["If Peter drove", "Had Peter driven", "Only if Peter could drive", "Unless Peter had driven11"], answer: "Had Peter driven" },
        { question: "If it ______ last night the path wouldn't be wet and slippery now.", options: ["didn't rain", "wasn't raining", "hadn't been raining", "hadn't rained"], answer: "hadn't been raining" },
        { question: "I need new exercise equipment because I want to get ______.", options: ["fitty", "more fit", "fitter", "fitter than"], answer: "fitter" },
        { question: "We don't work together any more so I see him ______ than I used to.", options: ["frequently", "more frequently", "less frequently", "much frequently"], answer: "less frequently" },
        { question: "My boss ______ constantly ______ me in my last job. I hated it.", options: ["was / phoned", "was / called", "is / phoning", "was / phoning"], answer: "was / phoning" },
        { question: "My job is ______ boring every now and then. I'd like to do something ______ interesting.", options: ["much/many", "a bit/more", "little/much", "somewhat/more"], answer: "a bit/more" },
        { question: "Japan imports ______ oil from other countries. Its exports include cars and electronics.", options: ["a lot of", "a large number of", "several of", "a number of"], answer: "a lot of" },
        { question: "It's too noisy here. Shall we go somewhere ______?", options: ["a lot quiet", "more quiet", "quieter", "B & C are correct"], answer: "quieter" },
        { question: "The more difficult the test is, ______ he tries.", options: ["the harder", "the hardest", "the most hard", "the more hard"], answer: "the harder" },
        { question: "I think you should be ______ and say exactly what you think.", options: ["honester", "more honest", "most honest", "more honester"], answer: "more honest" },
        { question: "Do you know any planes which travel ______ than the speed of sound?", options: ["fastest", "fastlier", "fastly", "faster"], answer: "faster" },
        { question: "My bike is quite slow and I want to get a ______ one.", options: ["rapider", "faster", "faster than", "fastening"], answer: "faster" },
        { question: "Since we moved house, I've had to get up ______ for school than before.", options: ["early", "earliest", "more early", "earlier"], answer: "earlier" },
        { question: "I was born in ______ warm family. My parents are both ______ teachers of English. So, I am good at ______ English.", options: ["a / W / W", "the / the / an", "a / the / the", "the / W / an"], answer: "a / W / W" },
        { question: "Jim, ______ old friend of mine, used to work in ______ downtown Los Angeles. He had a good job in one of ______ biggest law firms in the city.", options: ["an / a / W", "a / the / W", "the / W / a", "an / W / the"], answer: "an / W / the" },
        { question: "______ Mount Everest is in ______ Himalayas. It is ______ tallest mount in the world.", options: ["W / an / the", "A / an / a", "the / W / W", "W / the / the"], answer: "W / the / the" },
        { question: "I happened to see Mary on ______ way ______ home.", options: ["W / the", "the / an", "a / the", "the / W"], answer: "the / W" },
        { question: "In ______ Britain ______ cars run on ______ left.", options: ["the / the / the", "W / W / a", "W / W / the", "W / the / the"], answer: "W / W / the" },
        { question: "She is ______ MC. She can help us to entertain ______ guests in our wedding.", options: ["an / the", "a / W", "the / W", "a / the"], answer: "an / the" },
        { question: "I do not go to ______ theater very often. I prefer ______ films to ______ plays.", options: ["a / the / the", "W / W / W", "the / the / the", "the / W / W"], answer: "the / W / W" },
        { question: "______ coffee is his favorite drink. He often has ______ coffee before he has ______ breakfast.", options: ["W / a / W", "The / W / the", "The / a / the", "W / the / a"], answer: "W / a / W" },
        { question: "My friend is ______ fireman. Let's ask him for ______ help.", options: ["a / W", "the / the", "an / the", "W / the"], answer: "a / W" },
        { question: "They left Hyde Park at ______ midday and went shopping at the commercial center in ______ afternoon.", options: ["the / the", "a / an", "the / an", "W / the"], answer: "W / the" },
        { question: "______ most children like ______ sweets.", options: ["The / the", "A / the", "W / W", "The / W"], answer: "W / W" },
        { question: "______ River Nile is ______ longest river of all.", options: ["W / W", "A / the", "The / the", "W / a"], answer: "The / the" },
        { question: "Many people voluntarily offer care for ______ elderly and ______ disabled.", options: ["the / the", "an / a", "an / a", "W / W"], answer: "the / the" },
        { question: "______ River Thames flows through London, ______ capital of England.", options: ["The / the", "A / a", "W / W", "The / a"], answer: "The / the" },
        { question: "______ Taylors decided that they would employ ______ architect to do ______ work.", options: ["The / a / the", "A / W / A", "W / the / a", "The / an / the"], answer: "The / an / the" },
        { question: "______ sun is a ball of fire in the sky that the Earth goes round. It gives us ______ heat and ______ light.", options: ["The / an / a", "The / W / W", "A / the / the", "W / a / a"], answer: "The / W / W" },
        { question: "She likes reading ______ books, collecting ______ stamps and going to ______ cinema.", options: ["the / W / W", "W / W / the", "W / the / W", "W / the / a"], answer: "W / W / the" },
        { question: "On ______ night of 14 April 1912, during its voyage, ______ Titanic hit ______ iceberg, and sank two hours and forty minutes later.", options: ["W / the / the", "the / the / an", "a / W / the", "a / a / the"], answer: "the / the / an" },
        { question: "The largest lake in the United States is ______ Lake Superior, one of ______ Great Lakes, located on the United States - Canada border.", options: ["a7 / a / W", "a / a", "W / the", "the / W"], answer: "W / the" },
        { question: "Ian is described as ______ honest and hard-working boy. He is also ______ most social and helpful in our class.", options: ["an / W", "an / the", "the / a", "a / a"], answer: "an / the" },
        { question: "That car can run at ______ speed of 18W miles ______ hour.", options: ["the / an", "a / the", "a / a", "the / an"], answer: "the / an" },
        { question: "My grandmother gave me ______ piano on my birthday, but what ______ pity, I cannot play ______ piano.", options: ["W / W / the", "the / the / a", "a / a / the", "the / W / a"], answer: "a / a / the" },
        { question: "We don't need ______ eggs. Just half a dozen.", options: ["a great deal of", "a large amount of", "many", "much"], answer: "many" },
        { question: "______ research has been done into the cause of cancer.", options: ["A couple of", "A small number of", "Plenty of", "A great number of"], answer: "Plenty of" },
        { question: "She decided not to go, for ______ reasons.", options: ["a number of", "much", "a large amount of", "little"], answer: "a number of" },
        { question: "We shouldn't eat ______ chocolate.", options: ["A lot of", "a great number of", "a large number of", "a large quantity of"], answer: "a large quantity of" },
        { question: "I can go out with you right now because I don't have ______ homework.", options: ["much", "many", "few", "some"], answer: "much" },
        { question: "When the boss ______ into the office, his secretary was typing, and the accountant was talking on the phone.", options: ["was walking", "had walked", "walked", "had been walking"], answer: "walked" },
        { question: "My grandfather ______ a very exciting life. When he was young, he ______ on the farm in the country, when there ______ a lot of cattles and meadows.", options: ["has / has lived / have been", "had / lived / have were", "was having / had lived / had been", "has had / is living / are"], answer: "had / lived / have were" },
        { question: "I ______ to visit you yesterday, but you ______ at home.", options: ["have come / are not", "had come / were not", "came / were not", "was coming / have not been"], answer: "came / were not" },
        { question: "He's not very well-known here, but he's ______ in his own country.", options: ["anyone", "nothing", "anything", "somebody"], answer: "somebody" },
        { question: "He hardly ever washes the dishes and he rarely, if ever, does ______ cleaning.", options: ["some", "any", "none", "no"], answer: "any" },
        { question: "I didn't know ______ about computers till I started this job.", options: ["anybody", "anything", "nothing", "something"], answer: "anything" },
        { question: "They do not have ______ pets as they are too busy to take care of animals.", options: ["some", "any", "a", "every"], answer: "any" },
        { question: "When you go by train, make sure you ______ an express, not a train that stops at all the stations.", options: ["got", "get", "would get", "should get"], answer: "get" },
        { question: "She never ______ when someone leaves her a message.", options: ["call back", "will call back", "has called back", "calls back"], answer: "calls back" },
        { question: "Don't give the chocolate to Helen. She ______ it.", options: ["hates", "is hating", "has hated", "hated"], answer: "hates" },
        { question: "Every time we ______ to that restaurant, my stomach gets upset.", options: ["will go", "went", "go", "have gone"], answer: "go" },
        { question: "I'm sure they ______ married and live happily ever afterwards.", options: ["will get", "have got", "are going", "got"], answer: "will get" },
        { question: "As soon as we ______ the news, we rushed to the hospital.", options: ["hear", "had heard", "were hearing", "have heard"], answer: "had heard" },
        { question: "We weren't hungry. We ______ just ______ lunch.", options: ["have / had", "have / eaten", "had / had", "had / been having"], answer: "had / had" },
        { question: "I knew Keith was angry about the report because Jenney ______ me the day before.", options: ["was warning", "warned", "has warned", "had warned"], answer: "had warned" },
        { question: "No one ______ your story when you tell them.", options: ["is going to believe", "will believe", "believe", "has believe"], answer: "will believe" },
        { question: "I ______ Noriko in town 2 days ago. She ______ a pink dress and an orange hat!", options: ["saw / was wearing", "see / wears", "saw / wore", "see / is wearing"], answer: "saw / was wearing" },
        { question: "Last night Section TV came out with a shock on air. The TV star, who ______ with Dan Walker, was suddenly replaced by Sally Nugent for the last half of the show.10", options: ["presents", "were presented", "have presented", "was presenting"], answer: "was presenting" },
        { question: "While Adam ______ his flock of sheep, he spent much of his time reading.", options: ["watched", "was watching", "was looking", "was seeing"], answer: "was watching" },
        { question: "When I arrived home, my father wasn't there. He ______ out.", options: ["has gone", "went", "goes", "had gone"], answer: "had gone" },
        { question: "I assumed you ______ paying for the repairs until last year.", options: ["had", "have been", "had been", "have never been"], answer: "had been" },
        { question: "\"Did you go to Hawaii for vacation?\" \"I ______ to go, but I got sick at the last minute\".", options: ["was planned", "had planning", "had been planning", "have planned"], answer: "had been planning" },
        { question: "I know you want to move everything quickly, but this box ______ heavier and heavier.", options: ["gets", "will get", "C. might get", "D. is getting"], answer: "is getting" },
        { question: "She is always ______ her pencil on the desk and it's getting on my nerves!", options: ["dropped", "dropping", "tapped", "tapping"], answer: "tapping" },
        { question: "Do you know our city? No, this is the first time I ______ here.", options: ["was", "came", "am coming", "D. have been"], answer: "D. have been" },
        { question: "______ to Australia? - Yes, I went there when I was a little boy.", options: ["did you ever go", "do you ever go", "have you ever been", "have you ever gone"], answer: "have you ever been" },
        { question: "Marcel and Abdre ______ friends of mine for more than ten years.", options: ["were", "had been", "have been", "are"], answer: "have been" }
    ];

    const quizForm = document.getElementById('quizForm');
    const submitButtonTop = document.getElementById('submitQuizTop');
    const submitButtonBottom = document.getElementById('submitQuizBottom');
    const resultsDiv = document.getElementById('results');
    const correctCountSpan = document.getElementById('correctCount');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const scoreSpan = document.getElementById('score');
    const feedbackDiv = document.getElementById('feedback');
    const retakeQuizButton = document.getElementById('retakeQuiz');
    const timeRemainingSpan = document.getElementById('timeRemaining');
    const questionNavigation = document.getElementById('questionNavigation');
    const quizArea = document.querySelector('.quiz-area'); // Get the scrollable area

    let currentQuestions = [];
    let userAnswers = {}; // Store user's selected answers (index -> value)
    let timeLeft = 60 * 60; // 60 minutes in seconds (adjust as needed)
    let timerInterval;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timeRemainingSpan.textContent = "Hết giờ!";
                checkQuiz(); // Automatically submit when time is up
                alert("Đã hết giờ làm bài! Bài của bạn đã được nộp tự động.");
            } else {
                timeLeft--;
                timeRemainingSpan.textContent = formatTime(timeLeft);
            }
        }, 1000);
    }

    function renderQuiz() {
        // Clear previous quiz and results
        quizForm.innerHTML = '';
        feedbackDiv.innerHTML = '';
        questionNavigation.innerHTML = '';
        resultsDiv.classList.add('results-hidden');
        submitButtonTop.style.display = 'block';
        submitButtonBottom.style.display = 'block';
        retakeQuizButton.style.display = 'none';

        // Reset timer
        clearInterval(timerInterval);
        timeLeft = 60 * 60; // Reset to 60 minutes
        timeRemainingSpan.textContent = formatTime(timeLeft);
        startTimer();

        // Reset user answers
        userAnswers = {};

        // Shuffle questions for the current quiz instance
        currentQuestions = [...questionsData]; // Create a copy
        shuffleArray(currentQuestions);

        totalQuestionsSpan.textContent = currentQuestions.length;

        currentQuestions.forEach((q, index) => {
            const questionNumber = index + 1;
            const questionId = `question-${questionNumber}`;

            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.id = questionId; // Add ID for navigation
            questionElement.innerHTML = `<p class="question-text">Câu ${questionNumber}. ${q.question}</p>`;

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            let shuffledOptions = [...q.options]; // Shuffle options for each question
            shuffleArray(shuffledOptions);

            shuffledOptions.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `<input type="radio" name="q${index}" value="${option}"> <span>${option}</span>`;
                optionsDiv.appendChild(label);
            });

            questionElement.appendChild(optionsDiv);
            quizForm.appendChild(questionElement);

            // Add event listener to update sidebar status
            optionsDiv.addEventListener('change', (event) => {
                userAnswers[index] = event.target.value;
                updateQuestionNavigationStatus(index, true);
            });

            // Create sidebar navigation item
            const navItem = document.createElement('div');
            navItem.classList.add('question-nav-item');
            navItem.textContent = questionNumber;
            navItem.dataset.questionIndex = index; // Store index for quick lookup
            navItem.addEventListener('click', () => {
                document.getElementById(questionId).scrollIntoView({ behavior: 'smooth', block: 'start' });
                updateCurrentQuestionHighlight(index); // Update highlight on click
            });
            questionNavigation.appendChild(navItem);
        });

        // Initialize highlights
        updateCurrentQuestionHighlight(0); // Highlight first question by default
        quizArea.addEventListener('scroll', throttle(highlightVisibleQuestion, 100)); // Listen for scroll on the quiz-area
    }

    // Function to update sidebar item status (answered)
    function updateQuestionNavigationStatus(index, answered = false) {
        const navItem = questionNavigation.querySelector(`[data-question-index="${index}"]`);
        if (navItem) {
            if (answered) {
                navItem.classList.add('answered');
            } else {
                navItem.classList.remove('answered');
            }
        }
    }

    // Function to highlight the current question in sidebar based on scroll
    let currentHighlightedIndex = -1;
    function highlightVisibleQuestion() {
        const questions = document.querySelectorAll('.question');
        let newHighlightedIndex = -1;

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const rect = question.getBoundingClientRect();

            // Check if the question is mostly visible in the viewport
            // Adjusted logic for better accuracy on scroll
            if (rect.top >= 0 && rect.top <= window.innerHeight * 0.4 || // Top part visible
                rect.bottom <= window.innerHeight && rect.bottom >= window.innerHeight * 0.6 || // Bottom part visible
                (rect.top < 0 && rect.bottom > window.innerHeight) // Entirely in view, but scroll is in middle
            ) {
                newHighlightedIndex = i;
                break; // Found the most visible question
            }
        }

        if (newHighlightedIndex !== currentHighlightedIndex) {
            updateCurrentQuestionHighlight(newHighlightedIndex);
            currentHighlightedIndex = newHighlightedIndex;
        }
    }

    function updateCurrentQuestionHighlight(newIndex) {
        // Remove 'current' class from previously highlighted item
        if (currentHighlightedIndex !== -1) {
            const prevNavItem = questionNavigation.querySelector(`[data-question-index="${currentHighlightedIndex}"]`);
            if (prevNavItem) {
                prevNavItem.classList.remove('current');
            }
        }
        // Add 'current' class to the new item
        if (newIndex !== -1) {
            const newNavItem = questionNavigation.querySelector(`[data-question-index="${newIndex}"]`);
            if (newNavItem) {
                newNavItem.classList.add('current');
            }
        }
    }

    // Throttle function to limit scroll event calls
    function throttle(func, delay) {
        let timeout = null;
        return function(...args) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    func.apply(this, args);
                    timeout = null;
                }, delay);
            }
        };
    }

    function checkQuiz() {
        clearInterval(timerInterval); // Stop the timer

        let correctAnswers = 0;
        feedbackDiv.innerHTML = ''; // Clear previous feedback

        // Disable all radio buttons
        const allRadioButtons = quizForm.querySelectorAll('input[type="radio"]');
        allRadioButtons.forEach(radio => radio.disabled = true);

        currentQuestions.forEach((q, index) => {
            const selectedOption = userAnswers[index]; // Get answer from userAnswers map
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');

            const questionText = document.createElement('p');
            questionText.innerHTML = `<strong>Câu ${index + 1}:</strong> ${q.question}`;
            feedbackItem.appendChild(questionText);

            if (selectedOption !== undefined) { // Check if an option was selected
                const userAnswerText = document.createElement('p');
                userAnswerText.innerHTML = `Đáp án của bạn: <span class="your-answer">${selectedOption}</span>`;
                feedbackItem.appendChild(userAnswerText);

                if (selectedOption === q.answer) {
                    correctAnswers++;
                    feedbackItem.classList.add('correct');
                } else {
                    feedbackItem.classList.add('incorrect');
                    const correctAnswerText = document.createElement('p');
                    correctAnswerText.innerHTML = `Đáp án đúng: <span class="correct-answer">${q.answer}</span>`;
                    feedbackItem.appendChild(correctAnswerText);
                }
            } else {
                feedbackItem.classList.add('incorrect');
                const noAnswerText = document.createElement('p');
                noAnswerText.textContent = "Bạn chưa chọn đáp án.";
                feedbackItem.appendChild(noAnswerText);
                const correctAnswerText = document.createElement('p');
                correctAnswerText.innerHTML = `Đáp án đúng: <span class="correct-answer">${q.answer}</span>`;
                feedbackItem.appendChild(correctAnswerText);
            }
            feedbackDiv.appendChild(feedbackItem);
        });

        correctCountSpan.textContent = correctAnswers;
        scoreSpan.textContent = (correctAnswers / currentQuestions.length * 10).toFixed(2); // Calculate score out of 10

        resultsDiv.classList.remove('results-hidden');
        submitButtonTop.style.display = 'none';
        submitButtonBottom.style.display = 'none';
        retakeQuizButton.style.display = 'block';

        // Scroll to results
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }

    submitButtonTop.addEventListener('click', checkQuiz);
    submitButtonBottom.addEventListener('click', checkQuiz);
    retakeQuizButton.addEventListener('click', renderQuiz);

    // Initial render of the quiz
    renderQuiz();
});
