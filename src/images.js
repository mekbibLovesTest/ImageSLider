
// eslint-disable-next-line no-undef
const path = require.context("./images", false, /\.jpg$/);
const imagesArray = path.keys().map(path);

export default imagesArray;
