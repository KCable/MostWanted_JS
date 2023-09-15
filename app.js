
function app(people) {
    displayWelcome();
    runSearchAndMenu(people);
    return exitOrRestart(people);
}

function displayWelcome() {
    alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
    const searchResults = searchPeopleDataSet(people);

    if (searchResults.length > 1) {
        displayPeople('Search Results', searchResults);
    }
    else if (searchResults.length === 1) {
        const person = searchResults[0];
        mainMenu(person, people);
    }
    else {
        alert('No one was found in the search.');
    }
}

function searchPeopleDataSet(people) {

    const searchTypeChoice = validatedPrompt(
        'Please enter in what type of search you would like to perform.',
        ['id', 'name', 'traits']
    );

    let results = [];
    switch (searchTypeChoice) {
        case 'id':
            results = searchById(people);
            break;
        case 'name':
            results = searchByName(people);
            break;
        case 'traits':
            results = searchByTraits(people);
            
            break;
        default:
            return searchPeopleDataSet(people);
    }

    return results;
}

function searchById(people) {
    const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
    const idToSearchForInt = parseInt(idToSearchForString);
    const idFilterResults = people.filter(person => person.id === idToSearchForInt);
    return idFilterResults;
}

function searchByName(people) {
    const firstNameToSearchFor = prompt('Please enter the the first name of the person you are searching for.');
    const lastNameToSearchFor = prompt('Please enter the the last name of the person you are searching for.');
    const fullNameSearchResults = people.filter(person => (person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() && person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase()));
    return fullNameSearchResults;
}

function searchByTraits(people) {
    const traitsToSearchForString = prompt('Please enter the the trait of the person you are searching for.\nAcceptable answers are:\ngender\ndate of birth\nheight\nweight\neye color\noccupation');
    let traitsSearchResults=[]
    switch (traitsToSearchForString) {

        case "gender":
            const genderToSearchForString = prompt('Please enter the the gender of the person you are searching for.\nAcceptable answers are:\nmale \nfemale');
            traitsSearchResults = people.filter(person => (person.gender.toLowerCase() === genderToSearchForString.toLowerCase()));
            break;

        case "dob":
            const dobToSearchForString = prompt('Please enter the the date of birth of the person you are searching for.\nPlease enter MM/DD/YYYY');
            traitsSearchResults = people.filter(person => (person.dob === dobToSearchForString));
            break;
            
        case "height":
            const heightToSearchForString = prompt('Please enter the the height of the person you are searching for.\nPlease enter height in inches.');
            traitsSearchResults = people.filter(person => (person.height === heightToSearchForString));
            break;
         
        case "weight":
            const weightToSearchForString = prompt('Please enter the the weight of the person you are searching for.\nPlease enter weight in pounds.');
            traitsSearchResults = people.filter(person => (person.weight === weightToSearchForString));
            break;
         
        case "eye color":
            const eyeColorToSearchForString = prompt('Please enter the the eye color of the person you are searching for.\nAcceptable answers are:\nbrown\nblue\nblack\ngreen\nhazel\n');
            traitsSearchResults = people.filter(person => (person.eyeColor.toLowerCase() === eyeColorToSearchForString.toLowerCase()));
            break;

        case "occupation":
            const occupationToSearchForString = prompt('Please enter the the occupation of the person you are searching for.\nAcceptable answers are:\ndoctor\nassistant\npolitician\nnurse\nlandscaper\nprogrammer\narchitect\nstudent ');
            traitsSearchResults = people.filter(person => 
            (person.occupation.toLowerCase() === occupationToSearchForString.toLowerCase()));
            break;
            
        default:
            alert('Invalid input. Please try again.');
    }
    displayPeople("traitResults", traitsSearchResults);
    let traitPrompt = validatedPrompt(
        'Do you want to search again?',
        ['yes', 'no']);
        if(traitPrompt == "yes") {
        traitsSearchResults = searchByTraits(traitsSearchResults);
        }
        return traitsSearchResults
    }


    function displayFamily (person, people){
        
        let spouseResult = people.filter(a => 
            (a.id == person.currentSpouse));

        let siblings = people.filter(a => 
            (a.parents.toString() === person.parents.toString() && a.id != person.id));

        let parentsResults = people.filter(a => (person.parents.includes(a.id)));

        let results = "Spouse: " 
        for(let i = 0; i < spouseResult.length; i++){
        let d = spouseResult[i]; 
        results += d.firstName + " " + d.lastName + ", ";
        }
        console.log(results)
        results += "\nParents: "
        for(let i = 0; i < parentsResults.length; i++){
        let p = parentsResults[i]; 
        results += p.firstName + " " + p.lastName + ", ";
        }
        console.log(results)
        results += "\nSiblings: "
        for(let i = 0; i < siblings.length; i++){
        let s = siblings[i];
        results += s.firstName + " " + s.lastName + ", \n";
        }
        console.log(results)
        return results
    }
    
 
    function displayDescendants (person, people, results) {
    let children = people.filter(a => a.parents.includes(person.id) && a.id != person.id);
    for(let i = 0; i < children.length; i++){
    let c = children[i];
    results +=c.firstName + " " + c.lastName + ", "+
    displayDescendants(c, people, results);};
    console.log(results);
    return results;
    }

function mainMenu(person, people) {

    const mainMenuUserActionChoice = validatedPrompt(
        `Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
        ['info', 'family', 'descendants', 'quit']
    );
    
    let results = [];
    switch (mainMenuUserActionChoice) {
        case "info":
            let allinfo = ""; 
            for (let x in person) {
            allinfo += x + ": " + person[x] + "\n";};
            alert(allinfo);
            break;

        case "family":
            let family = displayFamily(person, people);
            console.log(family);
            alert(family);
            break;

        case "descendants":
            let descendants = displayDescendants(person, people, "");
            alert("descendants: "+ descendants);
            break;

        case "quit":
            return;

        default:
            alert('Invalid input. Please try again.');
    

    return results;
    }
}



function displayPeople(displayTitle, peopleToDisplay) {
    const formatedPeopleDisplayText = peopleToDisplay.map(person => `${person.firstName} ${person.lastName}`).join('\n');
    alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}

function validatedPrompt(message, acceptableAnswers) {
    acceptableAnswers = acceptableAnswers.map(aa => aa.toLowerCase());

    const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')}`;

    const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

    if (acceptableAnswers.includes(userResponse)) {
        return userResponse;
    }
    else {
        alert(`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers.map(aa => `\n-> ${aa}`).join('')} \n\nPlease try again.`);
        return validatedPrompt(message, acceptableAnswers);
    }
}

function exitOrRestart(people) {
    const userExitOrRestartChoice = validatedPrompt(
        'Would you like to exit or restart?',
        ['exit', 'restart']
    );

    switch (userExitOrRestartChoice) {
        case 'exit':
            return;
        case 'restart':
            return app(people);
        default:
            alert('Invalid input. Please try again.');
            return exitOrRestart(people);
    }

}