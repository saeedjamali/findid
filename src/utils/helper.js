export const memberToK = (member) => {
  if (member < 1000) {
    return member;
  }

  if (member < 1000000) {
    return member % 1000 == 0
      ? member / 1000 + "K"
      : (member / 1000).toFixed(2) + "K";
  }

  if (member < 1000000000) {
    return member % 1000000 == 0
      ? member / 1000000 + "M"
      : (member / 1000000).toFixed(2) + "M";
  }
  if (member < 1000000000000) {
    return member % 1000000000 == 0
      ? member / 1000000000 + "B"
      : (member / 1000000000).toFixed(2) + "B";
  }
  if (member < 1000000000000000) {
    return member % 1000000000000 == 0
      ? member / 1000000000000 + "T"
      : (member / 1000000000000).toFixed(2) + "T";
  }
  return member;
};
