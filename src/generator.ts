function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

abstract class WordGenerator {
  private transitionMatrix: Record<string, Record<string, number>> = {};
  private order: number;

  public constructor(order: number, words: string[]) {
    this.order = order;
    words.forEach((word) => {
      this.addWordToMatrix(word.trim());
    });
  }

  private addWordToMatrix(word: string): void {
    word = this.addPrefix(word);
    for (let i = 0; i < word.length - this.order; i++) {
      const currentNgram = word.slice(i, i + this.order);
      const nextChar = word[i + this.order];
      if (!this.transitionMatrix[currentNgram]) {
        this.transitionMatrix[currentNgram] = {};
      }
      if (!this.transitionMatrix[currentNgram][nextChar]) {
        this.transitionMatrix[currentNgram][nextChar] = 1;
      } else {
        this.transitionMatrix[currentNgram][nextChar]++;
      }
    }
  }

  public generateWord(
    seed: string,
    minWordLength: number,
    maxWordLength: number
  ): string {
    const wordLength = getRandomIntInclusive(minWordLength, maxWordLength);
    let word = this.addPrefix(seed);
    let currentNgram = word.slice(-this.order);

    while (word.length < wordLength + this.order) {
      if (!this.transitionMatrix[currentNgram]) {
        console.log("No transitions possible: '", currentNgram, "'");
        break; // No more transitions possible
      }

      const nextCharOptions = Object.keys(this.transitionMatrix[currentNgram]);
      const probabilities = nextCharOptions.map(
        (nextChar) => this.transitionMatrix[currentNgram][nextChar]
      );
      const nextCharIndex = this.chooseWithProbability(probabilities);
      const nextChar = nextCharOptions[nextCharIndex];

      word += nextChar;
      currentNgram = (currentNgram + nextChar).slice(-this.order);
    }

    return word.substring(this.order);
  }

  // Create a random seed of the given length
  private addPrefix(word: string): string {
    const prefix = "^".repeat(this.order);
    return prefix + word.toLowerCase();
  }

  // Choose an index with a given probability distribution
  private chooseWithProbability(probabilities: number[]): number {
    const sum = probabilities.reduce((acc, prob) => acc + prob, 0);
    const randomValue = Math.random() * sum;
    let cumulativeProb = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProb += probabilities[i];
      if (randomValue <= cumulativeProb) {
        return i;
      }
    }

    // This should not happen under normal circumstances
    return probabilities.length - 1;
  }
}

export default WordGenerator;
