const calcCheckDigit = (isbn13: number[]) => {
  let s = 0;
  for (let i = 0; i < 12; i++) {
    const coef = i % 2 == 0 ? 1 : 3;
    s += coef * isbn13[i];
  }

  return (10 - (s % 10)) % 10;
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export const genIsbn13 = (): string => {
  const isbn = [
    9,
    7,
    8,
    ...Array.from({ length: 9 }).map(() => getRandomInt(0, 9)),
  ];
  isbn.push(calcCheckDigit(isbn));
  return isbn.join("");
};
