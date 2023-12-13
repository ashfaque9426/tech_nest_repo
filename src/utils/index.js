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