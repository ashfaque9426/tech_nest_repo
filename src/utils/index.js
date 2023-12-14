// for converting input string to camalCase
export function toCamelCase(inputString) {
    // Check if the input string contains spaces
    if (inputString.includes(' ')) {
        // Split the input string by spaces
        const words = inputString.split(' ');

        // Convert the first word to lowercase and capitalize the rest
        words[0] = words[0].toLowerCase();
        for (let i = 1; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
        }

        // Join the words and return the camelCase string
        return words.join('');
    } else {
        // If no spaces, return the input string in lowercase
        return inputString.toLowerCase();
    }
}

// for converting input string from camalCase to seperated by spaces.
export function fromCamelCase(inputString) {
    // Use a regular expression to insert a space before each capital letter
    const stringWithSpaces = inputString.replace(/([A-Z])/g, ' $1');

    // Convert the string to lowercase and trim leading space
    return stringWithSpaces.trim().toLowerCase();
}

// capitalize first letter from a string.
export function capitalizeFirstLetter(sentence) {
    const words = sentence.split(' ');

    const capitalizedWords = words.map(word => {
        // Capitalize the first letter of each word
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a sentence
    const capitalizedSentence = capitalizedWords.join(' ');

    return capitalizedSentence;
}

// function for bangladeshi time conversion
export function convertToBangladeshiDateTime(utcDateString) {
    // Create a Date object from the UTC string
    const utcDate = new Date(utcDateString);

    // Specify the options for formatting
    const options = {
        timeZone: 'Asia/Dhaka', // Set the time zone to Bangladesh (Asia/Dhaka)
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false // Use 24-hour format
    };

    // Convert the UTC date to the Bangladeshi time zone and format it
    const bangladeshiDateTime = utcDate.toLocaleString('en-US', options);

    return bangladeshiDateTime;
}

// formating number input with commas
export function formatNumberWithCommas(inputNumber) {
    // Use toLocaleString with options to format the number
    const formattedNumber = inputNumber.toLocaleString('en-US');
    return formattedNumber;
}
