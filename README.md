# betting-host

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

## Details

a javascript program to calculate the dividends for a
simplified form of [Tote betting](http://en.wikipedia.org/wiki/Parimutuel_betting)
for Tabcorp.



## Table of Contents

- [Running program](#running program)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Running program

#### step1: download repo from github
```
$ git clone https://github.com/Qinchengqiang/betting-host.git
```
#### step2: setup 

env: `node --v14.15`, `npm --v6.14`)
```
$ cd betting-host/
/betting-host $ nvm use v14
/betting-host $ npm install
```

#### step3: get output file `output.txt`

```
/betting-host $ npm start
```
command `npm start` is to read `stdin` from file `src/file.txt`, then write the
dividends into `src/output.txt`

you can also see followings command lines
```
...File reading is done.

Win:2:$2.61
Place:2:$1.06
Place:3:$1.27
Place:1:$2.13
Exacta:2,3:$2.43

...finished calculation and saved.
...File writing is done.
```
input file `file.txt` 
```
Bet:W:1:3
Bet:W:2:4
Bet:W:3:5
Bet:W:4:5
Bet:W:1:16
Bet:W:2:8
Bet:W:3:22
Bet:W:4:57
Bet:W:1:42
Bet:W:2:98
Bet:W:3:63
Bet:W:4:15
Bet:P:1:31
Bet:P:2:89
Bet:P:3:28
Bet:P:4:72
Bet:P:1:40
Bet:P:2:16
Bet:P:3:82
Bet:P:4:52
Bet:P:1:18
Bet:P:2:74
Bet:P:3:39
Bet:P:4:105
Bet:E:1,2:13
Bet:E:2,3:98
Bet:E:1,3:82
Bet:E:3,2:27
Bet:E:1,2:5
Bet:E:2,3:61
Bet:E:1,3:28
Bet:E:3,2:25
Bet:E:1,2:81
Bet:E:2,3:47
Bet:E:1,3:93
Bet:E:3,2:51
Result:2:3:1
```
outcome file `output.txt`
```
Win:2:$2.61
Place:2:$1.06
Place:3:$1.27
Place:1:$2.13
Exacta:2,3:$2.43
```

## Github

## Maintainers

[@Steven](https://github.com/Qinchengqiang)

## Contributing

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2022 Steven Qin
