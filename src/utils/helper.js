export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


export const getInitials = (name) => {
  if (!name || typeof name !== 'string') return "";

  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const firstInitial = words[0][0] || "";
  const lastInitial = words[words.length - 1][0] || "";

  return (firstInitial + lastInitial).toUpperCase();
};


export const addThousandsSeperator=(num)=>{
  if(num==null || isNaN(num)) return "";

  const [integerPart,franctionalPart]=num.toString().split(".");
  const formattedInteger=integerPart.replace(/\B(?=(\d{3})+(?!\d))/g,",");

  return franctionalPart
  ? `${formattedInteger}.${franctionalPart}`
  :formattedInteger;
};


import moment from 'moment';
export const prepareExpenseBarChartData = (data = []) => {
  const dateMap = {};

  data.forEach((item) => {
    const date = moment(item.date).format("D MMM"); // e.g., "7 Aug"
    if (dateMap[date]) {
      dateMap[date] += item.amount;
    } else {
      dateMap[date] = item.amount;
    }
  });

  // Convert to array and sort by date
  return Object.entries(dateMap)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => moment(a.date, "D MMM") - moment(b.date, "D MMM"));
};


export const prepareIncomeBarChartData = (data = []) => {
  const grouped = {};

  data.forEach(item => {
    const dateKey = moment(item.date).format("YYYY-MM-DD");
    if (!grouped[dateKey]) {
      grouped[dateKey] = 0;
    }
    grouped[dateKey] += Number(item.amount || 0);
  });

  const chartData = Object.entries(grouped).map(([date, amount]) => ({
    date: moment(date).format("Do MMM"), // only for display
    amount,
  }));

  return chartData.sort((a, b) => new Date(a.date) - new Date(b.date));
};


export const prepareExpenseLineChartData = (data = []) => {
  // Step 1: Sort by date (oldest first)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Step 2: Aggregate amounts by date
  const grouped = {};
  sortedData.forEach(item => {
    const dateKey = moment(item.date).format("YYYY-MM-DD"); // consistent key
    if (!grouped[dateKey]) {
      grouped[dateKey] = 0;
    }
    grouped[dateKey] += Number(item.amount || 0); // sum expenses for that date
  });

  // Step 3: Convert grouped data into array format for chart
  let chartData = Object.entries(grouped).map(([date, totalAmount]) => ({
    month: moment(date).format("Do MMM"),
    amount: totalAmount
  }));

  // Step 4: Keep only last 30 days
  if (chartData.length > 30) {
    chartData = chartData.slice(chartData.length - 30);
  }

  return chartData;
};
