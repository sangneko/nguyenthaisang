document.addEventListener('DOMContentLoaded', function() {
    const questionsData = [
        // Dữ liệu câu hỏi của bạn từ file TA4.docx
        // Đảm bảo mỗi câu hỏi có 'question', 'options' và 'answer'
        // Ví dụ:
        {
            question: "The reason ____ I have continued to work for that company is the job security.", //
            options: ["at which", "which", "why", "for that"], //
            answer: "why"
        },
        {
            question: "To calm his angry girlfriend, John offered an apology ____ Jane did not accept.", //
            options: ["which", "who", "whom", "when"], //
            answer: "which"
        },
        {
            question: "____ failed will have to retake the exam next week.", //
            options: ["Those", "Those who", "Who", "Those which"], //
            answer: "Those who"
        },
        {
            question: "The woman ____ hair is long and curly is the new secretary, Mrs. Chan.", //
            options: ["who", "whose", "that", "which"], //
            answer: "whose"
        },
        {
            question: "____ is a quality all human beings have.", //
            options: ["Creativity may take many forms", "Creativity, may take many forms,", "Creativity which may take many forms,", "Creativity, which may take many forms"], //
            answer: "Creativity, which may take many forms"
        },
        {
            question: "New York is a place ____ people of many different cultures live and work together.", //
            options: ["where", "that", "which", "in that"], //
            answer: "where"
        },
        {
            question: "Women ____ work are happier than those ____ don't work.", //
            options: ["that / whom", "who / who", "whom / that", "whose / which"], //
            answer: "who / who"
        },
        {
            question: "____ used to be the tallest building in the world, is still a popular tourist attraction.", //
            options: ["The Empire State Building", "It is The Empire State Building, which", "The Empire State Building, that", "The Empire State Building, which"], //
            answer: "The Empire State Building, which"
        },
        {
            question: "The family ______ burnt in the fire was immediately given a suite in a hotel.", //
            options: ["which house", "the house of whom", "that house", "whose house"], //
            answer: "whose house"
        },
        {
            question: "This is the house ______ I lived when I first came to the US.", //
            options: ["in that", "in where", "where", "which in"], //
            answer: "where"
        },
        {
            question: "New York City, ______ millions of immigrants live, is sometimes called a Melting Pot.", //
            options: ["New York City, which", "New York City that", "New York City, where", "New York City"], //
            answer: "New York City, where"
        },
        {
            question: "______ small two-winged insects, can spread fatal diseases like malaria and dengue fever.", //
            options: ["Mosquitoes are", "Mosquitoes, which are", "Mosquitoes, that are", "They are mosquitoes4"], //
            answer: "Mosquitoes, which are"
        },
        {
            question: "He is the man ______ last week.", //
            options: ["I met", "which I met", "whose I met", "where I met"], //
            answer: "I met"
        },
        {
            question: "He is the man ______ I wanted to speak to and ______ name I'd forgotten.", //
            options: ["whose / whom", "that / which", "who / that", "whom / whose"], //
            answer: "whom / whose"
        },
        {
            question: "I did not like the book ______.", //
            options: ["whom John gave me", "when John gave me", "John gave me", "that John gave me it"], //
            answer: "John gave me"
        },
        {
            question: "______ in New York lead very busy lives.", //
            options: ["Those who live", "Who live", "Those live", "Those which live"], //
            answer: "Those who live"
        },
        {
            question: "The house ______ I grew up has just renovated.", //
            options: ["where", "in that", "which", "that"], //
            answer: "where"
        },
        {
            question: "My favorite month is always February ______ we celebrate Valentine's Day and Presidents' Day.", //
            options: ["which", "where", "why", "when"], //
            answer: "when"
        },
        {
            question: "Frank Zappa, ______ one of the most creative artists in rock 'n roll, came from California.", //
            options: ["was", "who was", "whom was", "that was"], //
            answer: "who was"
        },
        {
            question: "Michelle screamed when she saw the spider ______ dangling from the one clean bathroom towel.", //
            options: ["whom", "where", "that", "whose"], //
            answer: "that"
        },
        {
            question: "Brian said goodnight to his roommate ______ continued to play video games until his eyes were blurry with fatigue.", //
            options: ["Justin, whom", "Justin who", "Justin, who", "Justin, that"], //
            answer: "Justin, who"
        },
        {
            question: "The old man and his two dogs ______ were seriously burnt in the fire last week have gradually recovered.", //
            options: ["who", "that", "which", "whom"], //
            answer: "that"
        },
        {
            question: "If the trajectory of a satellite ______ slightly off at launch, it ______ worse as the flight progresses.", //
            options: ["is / will get", "are / get", "was / got", "were / would get"], //
            answer: "is / will get"
        },
        {
            question: "If a live sponge ______ into pieces, each piece ______ into a new sponge like the original one.", //
            options: ["break / turn", "broke / would turned", "is broken / will turn", "will break / turn"], //
            answer: "is broken / will turn"
        },
