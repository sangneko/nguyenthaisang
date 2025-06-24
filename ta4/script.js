document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu câu hỏi được lấy từ TA4.docx
    const questionsData = [
        { question: "The reason ____ I have continued to work for that company is the job security.", options: ["at which", "which", "why", "for that"], answer: "why" }, [cite: 1, 2]
        { question: "To calm his angry girlfriend, John offered an apology ____ Jane did not accept.", options: ["which", "who", "whom", "when"], answer: "which" }, [cite: 3]
        { question: "____ failed will have to retake the exam next week.", options: ["Those", "Those who", "Who", "Those which"], answer: "Those who" }, [cite: 4]
        { question: "The woman ____ hair is long and curly is the new secretary, Mrs. Chan.", options: ["who", "whose", "that", "which"], answer: "whose" }, [cite: 5]
        { question: "____ is a quality all human beings have.", options: ["Creativity may take many forms", "Creativity, may take many forms,", "Creativity which may take many forms,", "Creativity, which may take many forms"], answer: "Creativity, which may take many forms" }, [cite: 6]
        { question: "New York is a place ____ people of many different cultures live and work together.", options: ["where", "that", "which", "in that"], answer: "where" }, [cite: 7]
        { question: "Women ____ work are happier than those ____ don't work.", options: ["that / whom", "who / who", "whom / that", "whose / which"], answer: "who / who" }, [cite: 8]
        { question: "____ used to be the tallest building in the world, is still a popular tourist attraction.", options: ["The Empire State Building", "It is The Empire State Building, which", "The Empire State Building, that", "The Empire State Building, which"], answer: "The Empire State Building, which" }, [cite: 9]
        { question: "The family ______ burnt in the fire was immediately given a suite in a hotel.", options: ["which house", "the house of whom", "that house", "whose house"], answer: "whose house" }, [cite: 10]
        { question: "This is the house ______ I lived when I first came to the US.", options: ["in that", "in where", "where", "which in"], answer: "where" }, [cite: 11]
        { question: "New York City, ______ millions of immigrants live, is sometimes called a Melting Pot.", options: ["New York City, which", "New York City that", "New York City, where", "New York City"], answer: "New York City, where" }, [cite: 12]
        { question: "______ small two-winged insects, can spread fatal diseases like malaria and dengue fever.", options: ["Mosquitoes are", "Mosquitoes, which are", "Mosquitoes, that are", "They are mosquitoes4"], answer: "Mosquitoes, which are" }, [cite: 13]
        { question: "He is the man ______ last week.", options: ["I met", "which I met", "whose I met", "where I met"], answer: "I met" }, [cite: 14]
        { question: "He is the man ______ I wanted to speak to and ______ name I'd forgotten.", options: ["whose / whom", "that / which", "who / that", "whom / whose"], answer: "whom / whose" }, [cite: 15]
        { question: "I did not like the book ______.", options: ["whom John gave me", "when John gave me", "John gave me", "that John gave me it"], answer: "John gave me" }, [cite: 16]
        { question: "______ in New York lead very busy lives.", options: ["Those who live", "Who live", "Those live", "Those which live"], answer: "Those who live" }, [cite: 17]
        { question: "The house ______ I grew up has just renovated.", options: ["where", "in that", "which", "that"], answer: "where" }, [cite: 18]
        { question: "My favorite month is always February ______ we celebrate Valentine's Day and Presidents' Day.", options: ["which", "where", "why", "when"], answer: "when" }, [cite: 19]
        { question: "Frank Zappa, ______ one of the most creative artists in rock 'n roll, came from California.", options: ["was", "who was", "whom was", "that was"], answer: "who was" }, [cite: 20]
        { question: "Michelle screamed when she saw the spider ______ dangling from the one clean bathroom towel.", options: ["whom", "where", "that", "whose"], answer: "that" }, [cite: 21]
        { question: "Brian said goodnight to his roommate ______ continued to play video games until his eyes were blurry with fatigue.", options: ["Justin, whom", "Justin who", "Justin, who", "Justin, that"], answer: "Justin, who" }, [cite: 22]
        { question: "The old man and his two dogs ______ were seriously burnt in the fire last week have gradually recovered.", options: ["who", "that", "which", "whom"], answer: "that" }, [cite: 23]
        { question: "If the trajectory of a satellite ______ slightly off at launch, it ______ worse as the flight progresses.", options: ["is / will get", "are / get", "was / got", "were / would get"], answer: "is / will get" }, [cite: 24]
        { question: "If a live sponge ______ into pieces, each piece ______ into a new sponge like the original one.", options: ["break / turn", "broke / would turned", "is broken / will turn", "will break / turn"], answer: "is broken / will turn" }, [cite: 25]
        { question: "If the temperatures ______ to below 0, this lake ______.", options: ["will drop / freezes", "drop / froze", "dropped / freezes", "drop / freezes"], answer: "drop / freezes" }, [cite: 26]
        { question: "If Dora ______ to work before 7 tomorrow, she ______ you a ride.", options: ["will go / gives", "goes / will give", "go / give", "is going / will give"], answer: "goes / will give" }, [cite: 27]
        { question: "If you took the medication, you ______ too much.", options: ["will cough", "wouldn't cough", "will not cough", "would cough"], answer: "wouldn't cough" }, [cite: 28]
        { question: "If I ruled the world, ______ all of the wars.", options: ["I'd stop", "I'll stop", "I would have stopped", "I stopped"], answer: "I'd stop" }, [cite: 29]
        { question: "If Americans ______ fewer foods with sugar and salt, their general health ______ better.", options: ["eat / would be", "ate / will be", "ate / would be", "will eat / is"], answer: "ate / would be" }, [cite: 30]
        { question: "She ______ to the aerobics classes if her friend ______ her up in her car.", options: ["could go to / didn't pick", "couldn't go to / didn't pick", "couldn't go to / picked", "could go to / pick"], answer: "couldn't go to / picked" }, [cite: 31]
        { question: "I ______ more art if I ______ working part time to pay off my student loans.", options: ["can produce / am", "couldn't produce / was", "couldn't produce / wasn't", "could produce / wasn't"], answer: "could produce / wasn't" }, [cite: 32]
        { question: "If they had informed us of their arrival in advance, we ______ rooms for them.", options: ["would prepare", "would have prepared", "have prepared", "had prepared"], answer: "would have prepared" }, [cite: 33]
        { question: "If I hadn't been so nervous, I ______ the exam.", options: ["would pass", "will have passed", "would have passed", "had passed"], answer: "would have passed" }, [cite: 34]
        { question: "______ more carefully, he would not have had the accident yesterday.", options: ["If Peter drove", "Had Peter driven", "Only if Peter could drive", "Unless Peter had driven11"], answer: "Had Peter driven" }, [cite: 35]
        { question: "If it ______ last night the path wouldn't be wet and slippery now.", options: ["didn't rain", "wasn't raining", "hadn't been raining", "hadn't rained"], answer: "hadn't been raining" }, [cite: 36]
        { question: "I need new exercise equipment because I want to get ______.", options: ["fitty", "more fit", "fitter", "fitter than"], answer: "fitter" }, [cite: 37]
        { question: "We don't work together any more so I see him ______ than I used to.", options: ["frequently", "more frequently", "less frequently", "much frequently"], answer: "less frequently" }, [cite: 38]
        { question: "My boss ______ constantly ______ me in my last job.", options: ["was / phoned", "was / called", "is / phoning", "was / phoning"], answer: "was / phoning" }, [cite: 39]
        { question: "My job is ______ boring every now and then.", options: ["much/many", "a bit/more", "little/much", "somewhat/more"], answer: "a bit/more" }, [cite: 40]
        { question: "Japan imports ______ oil from other countries.", options: ["a lot of", "a large number of", "several of", "a number of"], answer: "a lot of" }, [cite: 41]
        { question: "It's too noisy here. Shall we go somewhere ______?", options: ["a lot quiet", "more quiet", "quieter", "B & C are correct"], answer: "quieter" }, [cite: 42]
        { question: "The more difficult the test is, ______ he tries.", options: ["the harder", "the hardest", "the most hard", "the more hard"], answer: "the harder" }, [cite: 43]
        { question: "I think you should be ______ and say exactly what you think.", options: ["honester", "more honest", "most honest", "more honester"], answer: "more honest" }, [cite: 44]
        { question: "Do you know any planes which travel ______ than the speed of sound?", options: ["fastest", "fastlier", "fastly", "faster"], answer: "faster" }, [cite: 45]
        { question: "My bike is quite slow and I want to get a ______ one.", options: ["rapider", "faster", "faster than", "fastening"], answer: "faster" }, [cite: 46]
        { question: "Since we moved house, I've had to get up ______ for school than before.", options: ["early", "earliest", "more early", "earlier"], answer: "earlier" }, [cite: 47]
        { question: "I was born in ______ warm family. My parents are both ______ teachers of English. So, I am good at ______ English.", options: ["a / W / W", "the / the / an", "a / the / the", "the / W / an"], answer: "a / W / W" }, [cite: 48, 49]
        { question: "Jim, ______ old friend of mine, used to work in ______ downtown Los Angeles. He had a good job in one of ______ biggest law firms in the city.", options: ["an / a / W", "a / the / W", "the / W / a", "an / W / the"], answer: "an / W / the" }, [cite: 50, 51]
        { question: "______ Mount Everest is in ______ Himalayas. It is ______ tallest mount in the world.", options: ["W / an / the", "A / an / a", "the / W / W", "W / the / the"], answer: "W / the / the" }, [cite: 52]
        { question: "I happened to see Mary on ______ way ______ home.", options: ["W / the", "the / an", "a / the", "the / W"], answer: "the / W" }, [cite: 53]
        { question: "In ______ Britain ______ cars run on ______ left.", options: ["the / the / the", "W / W / a", "W / W / the", "W / the / the"], answer: "W / W / the" }, [cite: 54]
        { question: "She is ______ MC. She can help us to entertain ______ guests in our wedding.", options: ["an / the", "a / W", "the / W", "a / the"], answer: "an / the" }, [cite: 55, 56]
        { question: "I do not go to ______ theater very often. I prefer ______ films to ______ plays.", options: ["a / the / the", "W / W / W", "the / the / the", "the / W / W"], answer: "the / W / W" }, [cite: 57]
        { question: "______ coffee is his favorite drink. He often has ______ coffee before he has ______ breakfast.", options: ["W / a / W", "The / W / the", "The / a / the", "W / the / a"], answer: "W / a / W" }, [cite: 58, 59]
        { question: "My friend is ______ fireman. Let's ask him for ______ help.", options: ["a / W", "the / the", "an / the", "W / the"], answer: "a / W" }, [cite: 60]
        { question: "They left Hyde Park at ______ midday and went shopping at the commercial center in ______ afternoon.", options: ["the / the", "a / an", "the / an", "W / the"], answer: "W / the" }, [cite: 61]
        { question: "______ most children like ______ sweets.", options: ["The / the", "A / the", "W / W", "The / W"], answer: "W / W" }, [cite: 62]
        { question: "______ River Nile is ______ longest river of all.", options: ["W / W", "A / the", "The / the", "W / a"], answer: "The / the" }, [cite: 63]
        { question: "Many people voluntarily offer care for ______ elderly and ______ disabled.", options: ["the / the", "an / a", "an / a", "W / W"], answer: "the / the" }, [cite: 64]
        { question: "______ River Thames flows through London, ______ capital of England.", options: ["The / the", "A / a", "W / W", "The / a"], answer: "The / the" }, [cite: 65]
        { question: "______ Taylors decided that they would employ ______ architect to do ______ work.", options: ["The / a / the", "A / W / A", "W / the / a", "The / an / the"], answer: "The / an / the" }, [cite: 66]
        { question: "______ sun is a ball of fire in the sky that the Earth goes round. It gives us ______ heat and ______ light.", options: ["The / an / a", "The / W / W", "A / the / the", "W / a / a"], answer: "The / W / W" }, [cite: 67]
        { question: "She likes reading ______ books, collecting ______ stamps and going to ______ cinema.", options: ["the / W / W", "W / W / the", "W / the / W", "W / the / a"], answer: "W / W / the" }, [cite: 68]
        { question: "On ______ night of 14 April 1912, during its voyage, ______ Titanic hit ______ iceberg, and sank two hours and forty minutes later.", options: ["W / the / the", "the / the / an", "a / W / the", "a / a / the"], answer: "the / the / an" }, [cite: 69]
        { question: "The largest lake in the United States is ______ Lake Superior, one of ______ Great Lakes, located on the United States - Canada border.", options: ["a7 / a / W", "a / a", "W / the", "the / W"], answer: "W / the" }, [cite: 70]
        { question: "Ian is described as ______ honest and hard-working boy. He is also ______ most social and helpful in our class.", options: ["an / W", "an / the", "the / a", "a / a"], answer: "an / the" }, [cite: 71, 72]
        { question: "That car can run at ______ speed of 18W miles ______ hour.", options: ["the / an", "a / the", "a / a", "the / an"], answer: "the / an" }, [cite: 73]
        { question: "My grandmother gave me ______ piano on my birthday, but what ______ pity, I cannot play ______ piano.", options: ["W / W / the", "the / the / a", "a / a / the", "the / W / a"], answer: "a / a / the" }, [cite: 74]
        { question: "We don't need ______ eggs. Just half a dozen.", options: ["a great deal of", "a large amount of", "many", "much"], answer: "many" }, [cite: 75]
        { question: "______ research has been done into the cause of cancer.", options: ["A couple of", "A small number of", "Plenty of", "A great number of"], answer: "Plenty of" }, [cite: 76]
        { question: "She decided not to go, for ______ reasons.", options: ["a number of", "much", "a large amount of", "little"], answer: "a number of" }, [cite: 77]
        { question: "We shouldn't eat ______ chocolate.", options: ["A lot of", "a great number of", "a large number of", "a large quantity of"], answer: "a large quantity of" }, [cite: 78]
        { question: "I can go out with you right now because I don't have ______ homework.", options: ["much", "many", "few", "some"], answer: "much" }, [cite: 79]
        { question: "When the boss ______ into the office, his secretary was typing, and the accountant was talking on the phone.", options: ["was walking", "had walked", "walked", "had been walking"], answer: "walked" }, [cite: 80]
        { question: "My grandfather ______ a very exciting life. When he was young, he ______ on the farm in the country, when there ______ a lot of cattles and meadows.", options: ["has / has lived / have been", "had / lived / have were", "was having / had lived / had been", "has had / is living / are"], answer: "had / lived / have were" }, [cite: 81, 82]
        { question: "I ______ to visit you yesterday, but you ______ at home.", options: ["have come / are not", "had come / were not", "came / were not", "was coming / have not been"], answer: "came / were not" }, [cite: 83]
        { question: "He's not very well-known here, but he's ______ in his own country.", options: ["anyone", "nothing", "anything", "somebody"], answer: "somebody" }, [cite: 84]
        { question: "He hardly ever washes the dishes and he rarely, if ever, does ______ cleaning.", options: ["some", "any", "none", "no"], answer: "any" }, [cite: 85]
        { question: "I didn't know ______ about computers till I started this job.", options: ["anybody", "anything", "nothing", "something"], answer: "anything" }, [cite: 86]
        { question: "They do not have ______ pets as they are too busy to take care of animals.", options: ["some", "any", "a", "every"], answer: "any" }, [cite: 87]
        { question: "When you go by train, make sure you ______ an express, not a train that stops at all the stations.", options: ["got", "get", "would get", "should get"], answer: "get" }, [cite: 88]
        { question: "She never ______ when someone leaves her a message.", options: ["call back", "will call back", "has called back", "calls back"], answer: "calls back" }, [cite: 89]
        { question: "Don't give the chocolate to Helen. She ______ it.", options: ["hates", "is hating", "has hated", "hated"], answer: "hates" }, [cite: 90]
        { question: "Every time we ______ to that restaurant, my stomach gets upset.", options: ["will go", "went", "go", "have gone"], answer: "go" }, [cite: 91]
        { question: "I'm sure they ______ married and live happily ever afterwards.", options: ["will get", "have got", "are going", "got"], answer: "will get" }, [cite: 92]
        { question: "As soon as we ______ the news, we rushed to the hospital.", options: ["hear", "had heard", "were hearing", "have heard"], answer: "had heard" }, [cite: 93]
        { question: "We weren't hungry. We ______ just ______ lunch.", options: ["have / had", "have / eaten", "had / had", "had / been having"], answer: "had / had" }, [cite: 94]
        { question: "I knew Keith was angry about the report because Jenney ______ me the day before.", options: ["was warning", "warned", "has warned", "had warned"], answer: "had warned" }, [cite: 95]
        { question: "No one ______ your story when you tell them.", options: ["is going to believe", "will believe", "believe", "has believe"], answer: "will believe" }, [cite: 96]
        { question: "I ______ Noriko in town 2 days ago. She ______ a pink dress and an orange hat!", options: ["saw / was wearing", "see / wears", "saw / wore", "see / is wearing"], answer: "saw / was wearing" }, [cite: 97]
        { question: "Last night Section TV came out with a shock on air. The TV star, who ______ with Dan Walker, was suddenly replaced by Sally Nugent for the last half of the show.", options: ["presents", "were presented", "have presented", "was presenting"], answer: "was presenting" }, [cite: 98]
        { question: "While Adam ______ his flock of sheep, he spent much of his time reading.", options: ["watched", "was watching", "was looking", "was seeing"], answer: "was watching" }, [cite: 99]
        { question: "When I arrived home, my father wasn't there. He ______ out.", options: ["has gone", "went", "goes", "had gone"], answer: "had gone" }, [cite: 100]
        { question: "I assumed you ______ paying for the repairs until last year.", options: ["had", "have been", "had been", "have never been"], answer: "had been" }, [cite: 101]
        { question: "\"Did you go to Hawaii for vacation?\" \"I ______ to go, but I got sick at the last minute\".", options: ["was planned", "had planning", "had been planning", "have planned"], answer: "had been planning" }, [cite: 102, 103]
        { question: "I know you want to move everything quickly, but this box ______ heavier and heavier.", options: ["gets", "will get", "might get", "is getting"], answer: "is getting" }, [cite: 104]
        { question: "She is always ______ her pencil on the desk and it's getting on my nerves!", options: ["dropped", "dropping", "tapped", "tapping"], answer: "tapping" }, [cite: 105]
        { question: "Do you know our city? No, this is the first time I ______ here.", options: ["was", "came", "am coming", "D. have been"], answer: "have been" }, [cite: 106]
        { question: "______ to Australia? - Yes, I went there when I was a little boy.", options: ["did you ever go", "do you ever go", "have you ever been", "have you ever gone"], answer: "have you ever been" }, [cite: 107, 108]
        { question: "Marcel and Abdre ______ friends of mine for more than ten years.", options: ["were", "had been", "have been", "are"], answer: "have been" } [cite: 109]
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

    let currentQuestions = [];
    let userAnswers = {}; // Store user's selected answers
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
        // Clear previous quiz
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

        // Shuffle questions for the current quiz
        currentQuestions = [...questionsData]; // Create a copy to shuffle
        shuffleArray(currentQuestions);

        totalQuestionsSpan.textContent = currentQuestions.length;

        currentQuestions.forEach((q, index) => {
            const questionNumber = index + 1;
            const questionId = `question-${questionNumber}`;

            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.id = questionId; // Add ID for navigation
            questionElement.innerHTML = `<p>Câu ${questionNumber}. ${q.question}</p>`;

            const optionsDiv = document.createElement('div');
            optionsDiv.classList.add('options');

            let shuffledOptions = [...q.options]; // Create a copy of options to shuffle
            shuffleArray(shuffledOptions);

            shuffledOptions.forEach(option => {
                const label = document.createElement('label');
                // Use a span to wrap the option text for styling purposes
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
                document.getElementById(questionId).scrollIntoView({ behavior: 'smooth' });
                updateCurrentQuestionHighlight(index);
            });
            questionNavigation.appendChild(navItem);
        });

        // Highlight the first question as current
        updateCurrentQuestionHighlight(0);
        // Add scroll event listener to update current question highlight
        document.querySelector('.questions-container').addEventListener('scroll', throttle(highlightVisibleQuestion, 100));
    }

    // Function to update sidebar item status (answered/current)
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
            // Check if at least 50% of the question is visible in the viewport
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2 || rect.bottom <= window.innerHeight && rect.bottom >= window.innerHeight / 2) {
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
