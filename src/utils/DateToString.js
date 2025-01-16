const DateDiff = (mydate) => {
  let currentTime = new Date();
  let month = currentTime.getMonth() + 1;
  let day = currentTime.getDate();
  let year = currentTime.getFullYear();
  let today = month + "/" + day + "/" + year;

  let d1 = new Date(mydate);
  let d2 = new Date(today);

  let df = d2 - d1;
  let dfDay = Math.round(df / 24 / 60 / 60 / 1000);
  return dfDay;
};

const NumToStr = (day) => {
  switch (day) {
    case 1:
      return "یک";
    case 2:
      return "دو";
    case 3:
      return "سه";
    case 4:
      return "چهار";
    case 5:
      return "پنج";
    case 6:
      return "شش";
    case 7:
      return "هفت";
    case 8:
      return "هشت";
    case 9:
      return "نه";
    case 10:
      return "ده";
    case 11:
      return "یازده";
    case 12:
      return "دوازده";
  }
};
export const DateToString = (date) => {
  //date : "2024-06-05T13:28:58.842+00:00"
  // const currentDay = new Date().getDay();
  // const currentMonth = new Date().getMonth();
  // const currentYear = new Date().getFullYear();

  // const day = new Date(date).getDay();
  // const month = new Date(date).getMonth();
  // const year = new Date(date).getFullYear();

  const currentHour = new Date().getHours();
  const hour = new Date(date).getHours();
  const diffDay = DateDiff(date);

  if (diffDay >= 730) {
    return "بیش از دو سال قبل";
  }
  if (diffDay >= 365) {
    return "یک سال قبل";
  }
  if (diffDay < 365 && diffDay >= 180) {
    return "بیش از شش ماه اخیر";
  }
  if (diffDay < 365 && diffDay >= 60) {
    return "بیش از دو ماه اخیر";
  }
  if (diffDay < 60 && diffDay >= 30) {
    return "بیش از یک ماه اخیر";
  }
  if (diffDay < 30 && diffDay >= 14) {
    return "یک ماه اخیر";
  }

  if (diffDay < 14 && diffDay >= 7) {
    return "حدود دو هفته قبل";
  }

  if (diffDay < 7 && diffDay >= 3) {
    return "یک هفته اخیر";
  }
  if (diffDay == 2) {
    return "دو روز قبل";
  }
  if (diffDay == 1) {
    return "دیروز";
  }

  if (diffDay < 1) {
    if (currentHour - hour > 12) {
      return "امروز";
    }
    if (currentHour - hour >= 1) {
      return ` ${NumToStr(currentHour - hour)} ساعت گذشته`;
    }
    return `لحظاتی قبل`;
  }
};

// console.log(DateToString("2024-12-19T10:28:58.842+00:00"));
