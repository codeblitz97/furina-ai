export function findBestMatch(word: string, wordList: string[]): string | null {
  let minDistance = Infinity;
  let closestMatch: string | null = null;

  // Iterate through the word list
  for (const listItem of wordList) {
    const distance = levenshteinDistance(word, listItem);

    // If the distance is smaller than the minimum distance found so far, update the closest match
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = listItem;
    }
  }

  return closestMatch;
}

// Function to calculate Levenshtein distance between two strings
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [];
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
      } else if (j === 0) {
        dp[i][j] = i;
      } else if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}
