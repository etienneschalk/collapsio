function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomIntRangeFromArray(range) {
  return randomIntRange(range[0], range[1]);
}

function pickRandomly(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rgba(red, green, blue, alpha = 1) {
  if (alpha == 1)
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}

// https://dev.to/pldg/lazy-load-images-with-webpack-5e80
const lazyLoadImage = (imageName, img) => {
  import(
    /* webpackMode: "lazy-once" */
    `./images/${imageName}`
  )
    .then(src => img.src = src.default)
    .catch(err => console.error(err));
};

export default lazyLoadImage;

export {
  rgba,
  randomIntRange,
  randomIntRangeFromArray,
  pickRandomly,
  lazyLoadImage,
};