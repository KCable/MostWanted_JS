
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
    switch (traitsToSearchForString) {

        case "gender":
            const genderToSearchForString = prompt('Please enter the the gender of the person you are searching for.\nAcceptable answers are:\nmale \nfemale');
            let traitsSearchResults = people.filter(person => (person.gender.toLowerCase() === genderToSearchForString.toLowerCase()));
            return traitsSearchResults;

        case "dob":
            const dobToSearchForString = prompt('Please enter the the date of birth of the person you are searching for.\nPlease enter MM/DD/YYYY');
            traitsSearchResults = people.filter(person => (person.dob.toLowerCase() === dobToSearchForString.toLowerCase()));
            return traitsSearchResults;
            
        case "height":
            const heightToSearchForString = prompt('Please enter the the height of the person you are searching for.\nPlease enter height in inches.');
            traitsSearchResults = people.filter(person => (person.height.toLowerCase() === heightToSearchForString.toLowerCase() ));
            return traitsSearchResults;
         
        case "weight":
            const weightToSearchForString = prompt('Please enter the the weight of the person you are searching for.\nPlease enter weight in pounds.');
            traitsSearchResults = people.filter(person => (person.weight.toLowerCase() === weightToSearchForString.toLowerCase()));
            return traitsSearchResults;
         
        case "eye color":
            const eyeColorToSearchForString = prompt('Please enter the the eye color of the person you are searching for.\nAcceptable answers are:\nbrown\nblue\nblack\ngreen\nhazel\n');
            traitsSearchResults = people.filter(person => (person.eyeColor.toLowerCase() === eyeColorToSearchForString.toLowerCase()));
            return traitsSearchResults;

        case "occupation":
            const occupationToSearchForString = prompt('Please enter the the occupation of the person you are searching for.\nAcceptable answers are:\ndoctor\nassistant\npolitician\nnurse\nlandscaper\nprogrammer\narchitect\nstudent ');
            traitsSearchResults = people.filter(person => (person.occupation.toLowerCase() === occupationToSearchForString.toLowerCase()));
            return traitsSearchResults;
            
        default:
            alert('Invalid input. Please try again.');
    }}

    function displayFamily (person){
        
        let spouseResult = person.currentSpouse;
        let parentsResults = person.parents;
        let siblings = [];
    
        for(let i = 0; i < spouseResult.length; i++){
        let d = spouseResult[i]; `Person: ${person.firstName} ${person.lastName} + ", ";};`;
        }
        for(let i = 0; i < parentsResults.length; i++){
        let p = parentsResults[i]; `Person: ${person.firstName} ${person.lastName} + ", ";};`;
        }
        for(let i = 0; i < siblings.length; i++){
        let s = siblings[i]; `Person: ${person.firstName} ${person.lastName} + ", ";};`;
        }
        

        return results
    }
    
  
    function displayParents(obj, array = []) {
        displayParents = descendants;
        let subArray = person.parents;
        array = [obj];
        
        //  Base Case -- Terminating Condition (end of branch)
        if (subArray.length === 0){
            return array;
        }
        
        //  Recursive Case -- Branch has sub-branches, search continues
        for (let i = 0; i < subArray.length; i ++) {
            array = array.concat(
                recursiveFindParents(subArray[i])
                );
            }
           
        return array;
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
            alert();allinfo
            break;

        case "family":
            let displayFamily = (person, people);
            alert();displayFamily
            break;

        case "descendants":
            let descendants= [];
            descendants = (person)
            alert(descendants.length);
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