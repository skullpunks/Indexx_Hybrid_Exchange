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

export const PackData = [
  //   {
  //     id: '1',
  //     mcp:"5%",
  //     name: 'Starter',
  //     photo: green,
  //     price: '300',
  //     // coins: "50",
  //     coins: calculateINEXDrop(
  //       {
  //         price: 300,
  //         feesPercentage: packFeesPercentage['Starter Pack'],
  //         inexDrop: INEXDrop['Starter Pack'],
  //       },
  //       currentINEXRate
  //     ).toString(),
  //     features: [
  //       `${calculateINEXDrop(
  //         {
  //           price: 300,
  //           feesPercentage: packFeesPercentage['Starter Pack'],
  //           inexDrop: INEXDrop['Starter Pack'],
  //         },
  //         currentINEXRate
  //       )} INEX Tokens ($ ${currentINEXRate} each)`,
  //       'Crypto Beginner Ebooks',
  //     ],
  //     level: 'normal',
  //     flip: false,
  //   },
  //   {
  //     id: '2',
  //     name: 'Excel',
  //     photo: orange,
  //     price: '500',
  //     //coins: "150",
  //     coins: calculateINEXDrop(
  //       {
  //         price: 500,
  //         feesPercentage: packFeesPercentage['Excel Pack'],
  //         inexDrop: INEXDrop['Excel Pack'],
  //       },
  //       currentINEXRate
  //     ).toString(),
  //     features: [
  //       `${calculateINEXDrop(
  //         {
  //           price: 300,
  //           feesPercentage: packFeesPercentage['Excel Pack'],
  //           inexDrop: INEXDrop['Excel Pack'],
  //         },
  //         currentINEXRate
  //       )} INEX Tokens ($ ${currentINEXRate} each)`,
  //       'Crypto Beginner Ebooks',
  //       'Crypto Advanced Ebooks',
  //     ],
  //     level: 'normal',
  //     flip: false,
  //   },
  //   {
  //     id: '3',
  //     name: 'Pro',
  //     photo: purple,
  //     price: '700',
  //     //coins: "250",
  //     coins: calculateINEXDrop(
  //       {
  //         price: 700,
  //         feesPercentage: packFeesPercentage['Pro Pack'],
  //         inexDrop: INEXDrop['Pro Pack'],
  //       },
  //       currentINEXRate
  //     ).toString(),
  //     features: [
  //       `${calculateINEXDrop(
  //         {
  //           price: 700,
  //           feesPercentage: packFeesPercentage['Pro Pack'],
  //           inexDrop: INEXDrop['Pro Pack'],
  //         },
  //         currentINEXRate
  //       ).toString()}`,
  //       'Crypto Beginner Ebook',
  //       'Crypto Advanced Ebook',
  //       'Stocks Beginner Ebook',
  //       'Educational Crypto Courses',
  //       '(Exclusive to Indexx Academy)',
  //     ],
  //     level: 'normal',
  //     flip: true,
  //   },
  //
  {
    id: '1',
    name: 'Royal',
    photo: royal,
    price: '15,000',
    coins: '7500',
    mcp: '8%',
    benefits: '$65,661.81',
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
      'Indexx Hive College Subscription',
      'Crypto Beginner Ebooks',
      'Crypto Advanced Ebooks',
      'Educational Crypto Course',
      'Indexx Exchange Course',
      'Indexx Swap Course',
      '(Exclusive to Indexx Academy)',
      'Private Hive Walkthrough',
      'Private Coaching and Guidance',
      'Discount on Indexx Shop Products',
      'Free XNFT Gifts',
      'MLM %Commission',
      'Premium Support (1 on 1)',
    ],
    level: 'Captain Bee',
    flip: true,
  },
  {
    id: '2',
    name: 'Platinum',
    photo: platinum,
    price: '9,000',
    coins: '4500',
    mcp: '7%',
    benefits: '$27,611.83',
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
      'Indexx Hive College Subscription',
      'Crypto Beginner Ebooks',
      'Crypto Advanced Ebooks',
      'Educational Crypto Course',
      'Indexx Exchange Course',
      'Indexx Swap Course',
      '(Exclusive to Indexx Academy)',
      'Private Hive Walkthrough',
      'Private Coaching and Guidance',
      'Discount on Indexx Shop Products',
      'Free XNFT Gifts',
      'MLM %Commission',
      'Premium Support (1 on 1)',
    ],
    level: 'Captain Bee',
    flip: true,
  },
  {
    id: '3',
    name: 'Gold',
    photo: gold,
    price: '5,500',
    mcp: '6%',
    benefits: '$10,347.87',
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
      'Indexx Hive College Subscription',
      'Crypto Beginner Ebooks',
      'Crypto Advanced Ebooks',
      'Educational Crypto Course',
      'Indexx Exchange Course',
      'Indexx Swap Course',
      '(Exclusive to Indexx Academy)',
      'Private Hive Walkthrough',
      'Private Coaching and Guidance',
      'Discount on Indexx Shop Products',
    ],
    level: 'Captain Bee',
    flip: true,
  },
  {
    id: '4',
    name: 'Copper',
    photo: copper,
    price: '3,500',
    //coins: "1500",
    mcp: '5.5%',
    benefits: '$5,864.59',
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
      'Indexx Hive College Subscription',
      'Crypto Beginner Ebooks',
      'Crypto Advanced Ebooks',
      'Educational Crypto Course',
      'Indexx Exchange Course',
      'Indexx Swap Course',
      '(Exclusive to Indexx Academy)',
      'Private Hive Walkthrough',
      'Discount on Indexx Shop Product',
    ],
    level: 'Captain Bee',
    flip: true,
  },
  {
    id: '5',
    name: 'Captain',
    photo: blue,
    price: '1,500',
    //coins: "500",
    mcp: '5%',
    benefits: '$3,862.55',
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
      'Indexx Hive College Subscription',
      'Crypto Beginner Ebooks',
      'Crypto Advanced Ebooks',
      'Educational Crypto Courses',
      '(Exclusive to Indexx Academy)',
      'Private Hive Walkthrough',
    ],
    level: 'Captain Bee',
    flip: true,
  },
];
