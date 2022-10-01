function allowsFirstFiveNumbers(arg: 1 | 2 | 3 | 4 | 5) {
  console.log(arg);
}

// allowsFirstFiveNumbers(10);

// let number = 1;
// allowsFirstFiveNumbers(number);

const number = 1;
allowsFirstFiveNumbers(number);

// const obj = { num: 1 };
// allowsFirstFiveNumbers(obj.num);

const obj = { num: 1 } as const;
allowsFirstFiveNumbers(obj.num);

// "as const" is a great tool for fixtured data, and places
// where you treat code as literals inline. "as const" also
// works with arrays:
