function FormatDate(date:Date) {
  return new Intl.DateTimeFormat().format(new Date(date));
}

export default FormatDate;
