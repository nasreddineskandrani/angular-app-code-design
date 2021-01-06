const currentMinus2 = new Date();
currentMinus2.setDate(currentMinus2.getDate() - 2);

export const mockSales = {
  data: [
    {
      date: "2020-01-01",
      cash: "1532",
      nb: 30
    },
    {
      date: "2020-02-01",
      cash: "1688",
      nb: 10
    },
    {
      date: "2020-03-01",
      cash: "120",
      nb: 3
    },
    {
      date: currentMinus2,
      cash: "320",
      nb: 13
    }
  ],
  currency: "US$"
};

export const mockConferences = {
  data: [
    {
      date: "2020-05-01",
      cash: "1532",
      nb: 30
    },
    {
      date: currentMinus2,
      cash: "150",
      nb: 1
    }
  ],
  currency: "US$"
};
