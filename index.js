import calculateDividends from "./src";

calculateDividends().then(
  () => console.log("...finished calculation and saved."),
  (err) => console.log(err)
);
