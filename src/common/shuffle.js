export const shuffle = (arr) => arr.sort(() => (Math.random() > .5) ? 1 : -1);