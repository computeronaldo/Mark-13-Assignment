const inputDate = document.getElementById("bday-input");
const showBtn = document.getElementById("show-btn");
const infoEl = document.getElementById("result");

const reverseStr = (str) => {
  let reversedStr = str.split("").reverse().join("");
  return reversedStr;
};

const isPalindrome = (str) => {
  let reversal = reverseStr(str);
  return str === reversal;
};

const convertDateToStr = (date) => {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
};

const getAllDateFormats = (date) => {
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;

  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  const listOfDateStrings = getAllDateFormats(date);
  const palindromeExists = listOfDateStrings
    .map((dateStr) => {
      return isPalindrome(dateStr);
    })
    .some((item) => item === true);
  return palindromeExists;
};

const getNextDate = (date) => {
  const currentDate = new Date(
    Number(date.year),
    Number(date.month) - 1,
    Number(date.day)
  );
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  const nextDay = nextDate.getDate().toString();
  const nextMonth = (nextDate.getMonth() + 1).toString();
  const nextYear = nextDate.getFullYear().toString();

  const nextDateObject = {
    day: nextDay,
    month: nextMonth,
    year: nextYear,
  };

  return nextDateObject;
};

const getPrevDate = (date) => {
  const currentDate = new Date(
    Number(date.year),
    Number(date.month) - 1,
    Number(date.day)
  );
  const prevDate = new Date(currentDate);
  prevDate.setDate(currentDate.getDate() - 1);

  const prevDay = prevDate.getDate().toString();
  const prevMonth = (prevDate.getMonth() + 1).toString();
  const prevYear = prevDate.getFullYear().toString();

  const prevDateObject = {
    day: prevDay,
    month: prevMonth,
    year: prevYear,
  };

  return prevDateObject;
};

const getNextPalindromeDate = (date) => {
  let daysDifference = 0;

  let currentDate = date;
  while (!checkPalindromeForAllDateFormats(currentDate)) {
    daysDifference += 1;
    currentDate = getNextDate(currentDate);
  }

  return [daysDifference, currentDate];
};

const getPrevPalindromeDate = (date) => {
  let daysDifference = 0;

  let currentDate = date;
  while (!checkPalindromeForAllDateFormats(currentDate)) {
    daysDifference += 1;
    currentDate = getPrevDate(currentDate);
  }

  return [daysDifference, currentDate];
};

const clickHandler = () => {
  const bdayStr = inputDate.value;

  if (bdayStr !== "") {
    const [year, month, day] = bdayStr.split("-");
    const date = {
      day: Number(day),
      month: Number(month),
      year: Number(year),
    };

    const isPalindrome = checkPalindromeForAllDateFormats(date);
    if (isPalindrome) {
      infoEl.innerText = "Yay! your birthday is a palindrome";
    } else {
      const [daysDifferenceNext, nextDate] = getNextPalindromeDate(date);
      const [daysDifferencePrev, prevDate] = getPrevPalindromeDate(date);

      if (daysDifferenceNext > daysDifferencePrev) {
        infoEl.innerText = `Oops! your birthday isn't a palindrome and the closest palindrome date to your birth date was ${prevDate.day.padStart(
          2,
          "0"
        )}-${prevDate.month.padStart(2, "0")}-${prevDate.year}`;
      } else {
        infoEl.innerText = `Oops! your birthday isn't a palindrome and the closest palindrome date to your birth date will be ${nextDate.day.padStart(
          2,
          "0"
        )}-${nextDate.month.padStart(2, "0")}-${nextDate.year}`;
      }
    }
  } else {
    alert("Please select your birth date!!");
  }
};

showBtn.addEventListener("click", clickHandler);
