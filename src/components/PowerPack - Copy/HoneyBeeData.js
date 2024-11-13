import orange from '../../assets/powerpack/Orange ribbon.svg';
import royal from '../../assets/powerpack/unnamed (6).png';
import blue from '../../assets/powerpack/blue hat.svg';
import copper from '../../assets/powerpack/copper hat.svg';
import gold from '../../assets/powerpack/gold hat.svg';
import green from '../../assets/powerpack/green Ribbon 1.svg';
import platinum from '../../assets/powerpack/platinum hat.svg';
import purple from '../../assets/powerpack/purple ribbon.svg';

// Function to calculate the INEX drop
function calculateINEXDrop(packInfo, inexRate) {
  const { price, feesPercentage, inexDrop } = packInfo;
  const feesAmount = (feesPercentage / 100) * price;
  const remainingValue = price - feesAmount;
  let tokens = remainingValue / inexRate;
  return Math.round(tokens); // Round to nearest whole number
}

const currentINEXRate = 2; // Replace with the actual rate

const packFeesPercentage = {
  'Starter Pack': 33.33,
  'Excel Pack': 40.0,
  'Pro Pack': 35.71,
  'Captain Pack': 33.33,
  'Copper Pack': 12.86,
  'Gold Pack': 9.09,
  'Platinum Pack': 5.56,
  'Royal Pack': 3.33,
};

const INEXDrop = {
  'Starter Pack': 50,
  'Excel Pack': 150,
  'Pro Pack': 250,
  'Captain Pack': 500,
  'Copper Pack': 1500,
  'Gold Pack': 2500,
  'Platinum Pack': 4500,
  'Royal Pack': 7500,
};

export const HoneyPackData = [
  {
    id: '1',
    name: 'Master',
    photo: royal,
    price: '10,000',
    coins: '7500',
    mcp: '6%',
    benefits: '$40,489.35',
    coins: calculateINEXDrop(
      {
        price: 15000,
        feesPercentage: packFeesPercentage['Royal Pack'],
        inexDrop: INEXDrop['Royal Pack'],
      },
      currentINEXRate
    ).toString(),
    features: [
      `${calculateINEXDrop(
        {
          price: 15000,
          feesPercentage: packFeesPercentage['Royal Pack'],
          inexDrop: INEXDrop['Royal Pack'],
        },
        currentINEXRate
      ).toString()}`,
      'MCP:6%',
      '24-Months Benefits: $40,489.35',
      'Crypto Ebooks: $500',
      'Crypto Courses: $1,000',
      'Free Lotto Tickets: $10,000',
      'Indexx Hive Membership',
    ],
    level: 'Hive Captain',
    flip: true,
  },
  {
    id: '2',
    name: 'Pro',
    photo: platinum,
    price: '5,000',
    coins: '4500',
    mcp: '5%',
    benefits: '$16,125.50',
    coins: calculateINEXDrop(
      {
        price: 9000,
        feesPercentage: packFeesPercentage['Platinum Pack'],
        inexDrop: INEXDrop['Platinum Pack'],
      },
      currentINEXRate
    ).toString(),
    features: [
      `${calculateINEXDrop(
        {
          price: 9000,
          feesPercentage: packFeesPercentage['Platinum Pack'],
          inexDrop: INEXDrop['Platinum Pack'],
        },
        currentINEXRate
      ).toString()}`,
      'MCP:5%',
      '24-Months Benefits: $16,125.50 ',
      'Crypto Ebooks: $500',
      'Crypto Courses: $1,000',
      'Free Lotto Tickets: $5,000',
      'Indexx Hive Membership',
    ],
    level: 'Hive Captain',
    flip: true,
  },
  {
    id: '3',
    name: 'Excel',
    photo: gold,
    price: '2,000',
    mcp: '4%',
    benefits: '$5,123.51',
    coins: calculateINEXDrop(
      {
        price: 5500,
        feesPercentage: packFeesPercentage['Gold Pack'],
        inexDrop: INEXDrop['Gold Pack'],
      },
      currentINEXRate
    ).toString(),
    features: [
      `${calculateINEXDrop(
        {
          price: 5500,
          feesPercentage: packFeesPercentage['Gold Pack'],
          inexDrop: INEXDrop['Gold Pack'],
        },
        currentINEXRate
      ).toString()}`,
      'MCP:4%',
      '24-Months Benefits: $40,489.35',
      'Crypto Ebooks: $500',
      'Crypto Courses: $1,000',
      'Free Lotto Tickets: $2,000',
      'Indexx Hive Membership',
    ],
    level: 'Hive Captain',
    flip: true,
  },
  {
    id: '4',
    name: 'Prime',
    photo: copper,
    price: '1,000',
    //coins: "1500",
    mcp: '3%',
    benefits: '$2,032.79',
    coins: calculateINEXDrop(
      {
        price: 3500,
        feesPercentage: packFeesPercentage['Copper Pack'],
        inexDrop: INEXDrop['Copper Pack'],
      },
      currentINEXRate
    ).toString(),
    features: [
      `${calculateINEXDrop(
        {
          price: 3500,
          feesPercentage: packFeesPercentage['Copper Pack'],
          inexDrop: INEXDrop['Copper Pack'],
        },
        currentINEXRate
      ).toString()}`,
      'MCP:3%',
      '24-Months Benefits: $40,489.35',
      'Crypto Ebooks: $500',
      'Crypto Courses: $1,000',
      'Free Lotto Tickets: $1,000',
      'Indexx Hive Membership',
    ],
    level: 'Hive Captain',
    flip: true,
  },
  {
    id: '5',
    name: 'Starter',
    photo: blue,
    price: '500',
    //coins: "500",
    mcp: '2.5%',
    benefits: '$904.36',
    coins: calculateINEXDrop(
      {
        price: 1500,
        feesPercentage: packFeesPercentage['Captain Pack'],
        inexDrop: INEXDrop['Captain Pack'],
      },
      currentINEXRate
    ).toString(),
    features: [
      `${calculateINEXDrop(
        {
          price: 1500,
          feesPercentage: packFeesPercentage['Captain Pack'],
          inexDrop: INEXDrop['Captain Pack'],
        },
        currentINEXRate
      ).toString()}`,
      'MCP:2.5%',
      '24-Months Benefits: $40,489.35 ',
      'Crypto Ebooks: $500',
      'Crypto Courses: $1,000',
      'Free Lotto Tickets: $500',
      'Indexx Hive Membership',
    ],
    level: 'Hive Captain',
    flip: true,
  },
];
