// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// The first parameter is a number (no two organisms should have the same number).
// The second parameter is an array of 15 DNA bases.
const pAequorFactory = (number, array) => {
  return {
    _specimenNum: number,
    _dna: array,
    // responsible for randomly selecting a base in the object’s dna property and changing the current base to a different base:
    mutate() {
      this._dna[Math.floor(Math.random() * 15)] = returnRandBase();
      return this._dna;
    },
    // compute how many bases are identical and in the same locations:
    compareDNA(pAequor) {
      let identicalBaseCounter = 0;
      for (let i = 0; i < pAequor._dna.length; i++) {
        if (this._dna[i] === pAequor._dna[i]) {
          identicalBaseCounter++;
        }
      }
      const percentage = Math.floor((identicalBaseCounter / 15) * 100);
      return console.log(
        `specimen #${this._specimenNum} and specimen #${pAequor._specimenNum} have ${percentage}% DNA in common.`
      );
    },
    willLikelySurvive() {
      const arrayOfCsAndGs = this._dna.filter(
        (base) => base === "C" || base === "G"
      );
      return arrayOfCsAndGs.length / 15 >= 0.6;
    },
    complementStrand() {
      const newStrand = [];
      for (const base of this._dna) {
        switch (base) {
          case "A":
            newStrand.push("T");
            break;
          case "T":
            newStrand.push("A");
            break;
          case "C":
            newStrand.push("G");
            break;
          case "G":
            newStrand.push("C");
            break;
          default:
            console.log("There is something wrong...");
            break;
        }
      }
      return newStrand;
    },
  };
};

// Creating 30 specimens...
let specimensCollection = [];
let count = 0;
let specimen;

do {
  count++;
  specimen = pAequorFactory(count, mockUpStrand());
  console.log(specimen.willLikelySurvive());
  if (specimen.willLikelySurvive()) {
    specimensCollection.push(specimen);
  }
} while (specimensCollection.length < 30);

console.log(specimensCollection);

// find the two most related instances of pAequor, based on complementary DNA strand
for (let i = 0; i + 1 < specimensCollection.length; i++) {
  specimensCollection[i]._dna = specimensCollection[i].complementStrand();
  for (let j = i + 1; j < specimensCollection.length; j++) {
    specimensCollection[i].compareDNA(specimensCollection[j]);
  }
}
