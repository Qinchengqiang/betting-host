import fs from "fs";
import readline from "readline";
import { once } from "events";
import os from "os";
import _ from "lodash";

export async function readLineByLine(fileUrl) {
  try {
    const lines = [];

    const rl = readline.createInterface({
      input: fs.createReadStream(fileUrl),
      output: process.stdout,
      terminal: false,
    });

    rl.on("line", (line) => {
      lines.push(line);
    });

    await once(rl, "close");
    console.log("...File reading is done.\n");

    return lines;
  } catch (err) {
    console.error(err);
  }
}

export function writeFile(content, fileUrl) {
  try {
    fs.writeFile(fileUrl, content, err => {
        if (err) throw err;
        console.log("...File writing is done.\n");
      }
    );
  } catch (err) {
    console.error(err);
  }
}

export function extractBetString(betString) {
  try {
    return betString.trim().split(":");
  } catch (err) {
    console.error(err);
  }
}

export function isValidBet(betArray) {
  if (betArray.length !== 4) return false;
  const isValidProduct = ["W", "P", "E"].indexOf(betArray[1]) !== -1;
  // ... more verification
  return (
    betArray[0] === "Bet" && isValidProduct && _.isNumber(Number(betArray[3]))
  );
}

export function isValidResult(resArray) {
  if (resArray.length !== 4) return false;
  return (
    resArray[0] === "Result" &&
    _.isNumber(Number(resArray[1])) &&
    _.isNumber(Number(resArray[2])) &&
    _.isNumber(Number(resArray[3]))
  );
}

export const convertToBetsObject = (extractedLines) => {
  const betsObject = {
    Bet: {
      W: [],
      P: [],
      E: [],
    },
    Result: [],
  };
  extractedLines.forEach(item => {
    if (isValidBet(item)) {
      betsObject[item[0]][item[1]].push(item)
    } else if (isValidResult(item)) {
      betsObject[item[0]].push(item)
    } else {
      throw Error("invalid format for bets or result.");
    }
  });
  return betsObject
}

const _calWinDividend = (bets, results) => {
  try {
    if (bets.length === 0) return '';
    const winner = results[1]
    const correctBetsPool = bets.filter(bet => bet[2] === winner).map(item => Number(item[3]))
        .reduce((partialSum, a) => partialSum + a, 0);
    const winPool = bets.map(item => Number(item[3])).reduce((partialSum, a) => partialSum + a, 0);
    const dividend = correctBetsPool > 0 ? (winPool * 0.85) / correctBetsPool : 0

    // console.log('win', dividend)
    return `Win:${winner}:$${dividend.toFixed(2)}`+ os.EOL
  } catch (e) {
    console.error(e);
  }
}

const _calPlaceDividend = (bets, results) => {
  try {
    if (bets.length === 0) return '';
    const placeList = [results[1], results[2], results[3]]
    const placePool = bets.map(item => Number(item[3])).reduce((partialSum, a) => partialSum + a, 0);

    const firstPlacePool = bets.filter(bet => bet[2] === placeList[0]).map(item => Number(item[3]))
        .reduce((partialSum, a) => partialSum + a, 0);
    const secondPlacePool = bets.filter(bet => bet[2] === placeList[1]).map(item => Number(item[3]))
        .reduce((partialSum, a) => partialSum + a, 0);
    const thirdPlacePool = bets.filter(bet => bet[2] === placeList[2]).map(item => Number(item[3]))
        .reduce((partialSum, a) => partialSum + a, 0);

    const firstPlaceDividend = firstPlacePool > 0 ? (placePool * 0.88) / 3 / firstPlacePool : 0
    const secondPlaceDividend = secondPlacePool > 0 ? (placePool * 0.88) / 3 / secondPlacePool : 0
    const thirdPlaceDividend = thirdPlacePool > 0 ? (placePool * 0.88) / 3 / thirdPlacePool : 0

    // console.log(firstPlaceDividend, secondPlaceDividend, thirdPlaceDividend)
    return `Place:${placeList[0]}:$${firstPlaceDividend.toFixed(2)}`+ os.EOL
        + `Place:${placeList[1]}:$${secondPlaceDividend.toFixed(2)}` + os.EOL
        + `Place:${placeList[2]}:$${thirdPlaceDividend.toFixed(2)}` + os.EOL
  } catch (e) {
    console.error(e);
  }
}

const _calExactaDividend = (bets, results) => {
  try {
    if (bets.length === 0) return '';
    const exactaResult = `${results[1]},${results[2]}`
    const correctBetsPool = bets.filter(bet => bet[2] === exactaResult).map(item => Number(item[3]))
        .reduce((partialSum, a) => partialSum + a, 0);
    const winPool = bets.map(item => Number(item[3])).reduce((partialSum, a) => partialSum + a, 0);
    const dividend = correctBetsPool > 0 ? (winPool * 0.82) / correctBetsPool : 0

    // console.log('Exacta', dividend)
    return `Exacta:${exactaResult}:$${dividend.toFixed(2)}`+ os.EOL

  } catch (e) {
    console.error(e);
  }
}

export const calcMap = {
  W: _calWinDividend,
  P: _calPlaceDividend,
  E: _calExactaDividend
}
