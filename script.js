const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const teens = [
  "",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const tens = [
  "",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function convertNumberToWords(num) {
  if (num === 0) {
    return "zero";
  }

  let wordForm = "";

  function convertLessThanThousand(n) {
    if (n >= 100) {
      wordForm += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n > 0) {
        wordForm += " and ";
      }
    }

    if (n >= 20) {
      wordForm += tens[Math.floor(n / 10)];
      const onesPlace = n % 10;
      if (onesPlace > 0) {
        wordForm += `-${ones[onesPlace]}`;
      }
    } else if (n > 0) {
      if (n === 10) {
        wordForm += "ten";
      } else if (n > 10) {
        wordForm += teens[n - 11];
      } else {
        wordForm += ones[n];
      }
    }
  }

  const millions = Math.floor(num / 1000000);
  if (millions > 0) {
    convertLessThanThousand(millions);
    wordForm += " million";
    num %= 1000000;
    if (num > 0) {
      wordForm += ", ";
    }
  }

  const thousands = Math.floor(num / 1000);
  if (thousands > 0) {
    convertLessThanThousand(thousands);
    wordForm += " thousand";
    num %= 1000;
    if (num > 0) {
      wordForm += ", ";
    }
  }

  convertLessThanThousand(num);

  return wordForm;
}

function convertAndDisplay() {
  const userInput = document.getElementById("userInput").value;
  const maxValue = userInput ? parseInt(userInput, 10) : 1000000;

  if (isNaN(maxValue) || maxValue <= 0 || maxValue > 1000000) {
    alert("Please enter a valid positive number up to 1,000,000.");
    document.body.style.cursor = "auto";
    return;
  }

  document.getElementById("loading").style.display = "block";
  document.body.style.cursor = "wait";
  document.getElementById("output").innerHTML = "";

  setTimeout(() => {
    let fullString = "";
    for (let num = 1; num <= maxValue; num++) {
      const wordForm = convertNumberToWords(num);
      fullString += wordForm;

      if (num < maxValue) {
        fullString += num % 10 === 0 ? "; " : ", ";
      }
    }

    document.getElementById("loading").style.display = "none";
    document.body.style.cursor = "auto";
    document.getElementById("output").innerHTML = fullString;
  }, 1000);
}

convertAndDisplay();
