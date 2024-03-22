export function processString(input: string): string[] {
  // Step 1: Remove symbols and make them lowercase
  const cleanedString = input.replace(/[^a-zA-Z\s]/g, '').toLowerCase();

  // Step 2: Split into alphabets
  const alphabets = cleanedString.split('');

  // Step 3: Process alphabets to form words
  const words: string[] = [];
  let currentWord = '';

  for (const char of alphabets) {
    // If current character is a space or empty string
    if (char === ' ' || char === '') {
      // If we have a word to add, add it to the words array
      if (currentWord !== '') {
        words.push(currentWord);
        currentWord = '';
      }
    } else {
      // Add current character to the current word
      currentWord += char;
    }
  }

  // Add the last word if it exists
  if (currentWord !== '') {
    words.push(currentWord);
  }

  // Step 4: Remove repetitive alphabets and keep the first occurrence
  const finalWords: string[] = [];
  for (const word of words) {
    let processedWord = '';
    for (const char of word) {
      if (processedWord.indexOf(char) === -1) {
        processedWord += char;
      }
    }
    finalWords.push(processedWord);
  }

  return finalWords;
}
