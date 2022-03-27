import {
  readLineByLine,
  writeFile,
  extractBetString,
  convertToBetsObject,
  calcMap,
} from "./tools/index";

export const calculateDividends = async () => {
  try {
    const lines = await readLineByLine(__dirname + "/file.txt");
    const extractedLines = lines.map((item) => extractBetString(item));

    const betsObject = convertToBetsObject(extractedLines);
    // console.log(extractedLines);
    // console.log(betsObject);

    if (betsObject.Result.length !== 1) throw Error("there should be 1 result.");

    const win_dividend = calcMap.W(betsObject.Bet.W, betsObject.Result[0]);
    const place_dividend = calcMap.P(betsObject.Bet.P, betsObject.Result[0]);
    const exacta_dividend = calcMap.E(betsObject.Bet.E, betsObject.Result[0]);

    await writeFile(`${win_dividend}${place_dividend}${exacta_dividend}`, __dirname + "/output.txt")
    console.log(`${win_dividend}${place_dividend}${exacta_dividend}`);
  } catch (e) {
    console.error(e);
  }
};

export default calculateDividends;
