export const isSelected = (arr, id) => {
  return arr.some((item) => item === id);
};

export const sorting = (arr, basetag) => {
  if (basetag === "imdbVotes") {
    arr.sort((a, b) => a[basetag].split(",")[0] - b[basetag].split(",")[0]);
  }
  if (basetag === "Released") {
    arr.sort(
      (a, b) => new Date(a[basetag]).getTime() - new Date(b[basetag]).getTime()
    );
  }
  if (basetag === "Runtime") {
    arr.sort((a, b) => a[basetag].split(" ")[0] - b[basetag].split(" ")[0]);
  }
  if (basetag === "Alphabetical") {
    arr.sort((a, b) => a.Title.localeCompare(b.Title));
  }
  return arr.sort((a, b) => a[basetag] - b[basetag]);
};

export const isRepeat = (arr, id) => {
  return arr.some((item) => item.imdbID === id);
};
