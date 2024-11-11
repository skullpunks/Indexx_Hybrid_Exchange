import orange from '../../assets/powerpack/Orange ribbon.svg';
import royal from '../../assets/powerpack/unnamed (6).png';
import blue from '../../assets/powerpack/blue hat.svg';
import copper from '../../assets/powerpack/copper hat.svg';
import gold from '../../assets/powerpack/gold hat.svg';
import green from '../../assets/powerpack/green Ribbon 1.svg';
import platinum from '../../assets/powerpack/platinum hat.svg';
import purple from '../../assets/powerpack/purple ribbon.svg';

import action1 from '../../assets/honey-bee-action/01.png';
import action2 from '../../assets/honey-bee-action/02.png';
import action3 from '../../assets/honey-bee-action/03.png';
import action4 from '../../assets/honey-bee-action/04.png';
import action5 from '../../assets/honey-bee-action/05.png';

import token1 from '../../assets/honey-bee-token/01.png';
import token2 from '../../assets/honey-bee-token/02.png';
import token3 from '../../assets/honey-bee-token/03.png';
import token4 from '../../assets/honey-bee-token/04.png';
import token5 from '../../assets/honey-bee-token/05.png';

import crypto1 from '../../assets/captain-crypto-pack/01.svg';
import crypto2 from '../../assets/captain-crypto-pack/02.svg';
import crypto3 from '../../assets/captain-crypto-pack/03.svg';
import crypto4 from '../../assets/captain-crypto-pack/04.svg';
import crypto5 from '../../assets/captain-crypto-pack/05.svg';

import power1 from '../../assets/captain-bee-power/01.svg';
import power2 from '../../assets/captain-bee-power/02.svg';
import power3 from '../../assets/captain-bee-power/03.svg';
import power4 from '../../assets/captain-bee-power/04.svg';
import power5 from '../../assets/captain-bee-power/05.svg';

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
      // 'Indexx Hive College Subscription',
      // 'Crypto Beginner Ebooks',
      // 'Crypto Advanced Ebooks',
      // 'Educational Crypto Course',
      // 'Indexx Exchange Course',
      // 'Indexx Swap Course',
      // '(Exclusive to Indexx Academy)',
      // 'Private Hive Walkthrough',
      // 'Private Coaching and Guidance',
      // 'Discount on Indexx Shop Products',
      // 'Free XNFT Gifts',
      // 'MLM %Commission',
      // 'Premium Support (1 on 1)',
      'MCP: 8%',
      'Total Earnings: $65,661',
      '24-Month Bonus: $2,250',
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
      // 'Indexx Hive College Subscription',
      // 'Crypto Beginner Ebooks',
      // 'Crypto Advanced Ebooks',
      // 'Educational Crypto Course',
      // 'Indexx Exchange Course',
      // 'Indexx Swap Course',
      // '(Exclusive to Indexx Academy)',
      // 'Private Hive Walkthrough',
      // 'Private Coaching and Guidance',
      // 'Discount on Indexx Shop Products',
      // 'Free XNFT Gifts',
      // 'MLM %Commission',
      // 'Premium Support (1 on 1)',
      'MCP: 7%',
      'Total Earnings: $27,611.83',
      '24-Month Bonus: $2250',
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
      // 'Indexx Hive College Subscription',
      // 'Crypto Beginner Ebooks',
      // 'Crypto Advanced Ebooks',
      // 'Educational Crypto Course',
      // 'Indexx Exchange Course',
      // 'Indexx Swap Course',
      // '(Exclusive to Indexx Academy)',
      // 'Private Hive Walkthrough',
      // 'Private Coaching and Guidance',
      // 'Discount on Indexx Shop Products',
      'MCP: 6%',
      'Total Earnings: $10,347.87',
      '24-Month Bonus: $2250',
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
      // 'Indexx Hive College Subscription',
      // 'Crypto Beginner Ebooks',
      // 'Crypto Advanced Ebooks',
      // 'Educational Crypto Course',
      // 'Indexx Exchange Course',
      // 'Indexx Swap Course',
      // '(Exclusive to Indexx Academy)',
      // 'Private Hive Walkthrough',
      // 'Discount on Indexx Shop Product',
      'MCP: 5.5%',
      'Total Earnings: $5,864.59',
      '24-Month Bonus: $2250',
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
      // 'Indexx Hive College Subscription',
      // 'Crypto Beginner Ebooks',
      // 'Crypto Advanced Ebooks',
      // 'Educational Crypto Courses',
      // '(Exclusive to Indexx Academy)',
      // 'Private Hive Walkthrough',
      'MCP: 5%',
      'Total Earnings: $3,862.55',
      '24-Month Bonus: $2250',
      'Crypto Ebooks: $500',
      'Crypto Courses: $1,000',
      'Free Lotto Tickets: $500',
      'Indexx Hive Membership',
    ],
    level: 'Hive Captain',
    flip: true,
  },
];

export const HoneyBeeActionData = [
  {
    id: 1,
    name: 'Master',
    photo: action1,
    price: '$10,000',
    amount: '$20,000',
    percentage: '200% ',
    type: 'Action Pack',
    heading:
      'Designed for Hive Members, the Action Pack Master offer opportunities for investment and education',
    subHeading1: '1. Academy, Action Master',
    subPara1:
      'Hive Members can access educational resources through the Action Master section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: '2. Investment, Master Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },

  {
    id: 2,
    name: 'Pro',
    photo: action2,
    price: '$7,000',
    amount: '$12,600',
    percentage: '180%',
    type: 'Action Pack',
    heading:
      'Designed for Hive Members, the Action Pack Master offer opportunities for investment and education',
    subHeading1: '1. Academy, Action Pro',
    subPara1:
      'Hive Members can access educational resources through the Action Pro section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: '2. Investment, Pro Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 1,
    name: 'Excel',
    photo: action3,
    price: '$5,000',
    amount: '$8,000',
    percentage: '160%',
    type: 'Action Pack',
    heading:
      'Designed for Hive Members, the Action Pack Excel offer opportunities for investment and education',
    subHeading1: 'Academy, Action Excel',
    subPara1:
      'Hive Members can access educational resources through the Action Excel section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: 'Investment, Excel Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 1,
    name: 'Prime',
    photo: action4,
    price: '$2,000',
    amount: '$2,800',
    percentage: '140%',
    type: 'Action Pack',
    heading:
      'Designed for Hive Members, the Action Pack Prime offer opportunities for investment and education',
    subHeading1: 'Academy, Action Prime',
    subPara1:
      'Hive Members can access educational resources through the Action Prime section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: 'Investment, Prime Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 1,
    name: 'Starter',
    photo: action5,
    price: '$1,000',
    amount: '$1,200',
    percentage: '120%',
    type: 'Action Pack',
    heading:
      'Designed for Hive Members, the Action Pack Starter offer opportunities for investment and education',
    subHeading1: 'Academy, Action Starter',
    subPara1:
      'Hive Members can access educational resources through the Action Starter section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: 'Investment, Starter Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
];

export const HoneyBeeTokenData = [
  {
    id: 1,
    name: 'Monster',
    photo: token1,
    price: '$25,000',
    amount: '$37,500 - $75,000',
    percentage: '150%-300%',
    type: 'Token Pack',
    heading:
      'Designed for Hive Members, the Action Pack Monster offer opportunities for investment and education',
    subHeading1: 'Academy, Action Monster',
    subPara1:
      'Hive Members can access educational resources through the Action Pack Monster section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: 'Investment, Monster Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 2,
    name: 'Extra',
    photo: token2,
    price: '$15,000',
    amount: '$21,700 - $44,950',
    percentage: '140%-290%',
    type: 'Token Pack',
    heading:
      'Designed for Hive Members, the Action Pack Extra offer opportunities for investment and education',
    subHeading1: '1. Academy, Action Extra',
    subPara1:
      'Hive Members can access educational resources through the Token Pack Extra section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: '2. Investment, Extra Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 1,
    name: 'Wallet',
    photo: token3,
    price: '$10,000',
    amount: '$13,650 - $29,400',
    percentage: '130%-280%',
    type: 'Token Pack',
    heading:
      'Designed for Hive Members, the Action Pack Wallet offer opportunities for investment and education',
    subHeading1: '1. Academy, Action Wallet',
    subPara1:
      'Hive Members can access educational resources through the Token Pack Wallet section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: '2. Investment, Wallet Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 1,
    name: 'Coin',
    photo: token4,
    price: '$6,500',
    amount: '$7,800 - $17,550',
    percentage: '120%-270%',
    type: 'Token Pack',
    heading:
      'Designed for Hive Members, the Action Pack Coin offer opportunities for investment and education',
    subHeading1: '1. Academy, Action Coin',
    subPara1:
      'Hive Members can access educational resources through the Token Pack Coin section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: '2. Investment, Coin Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
  {
    id: 1,
    name: 'Digi',
    photo: token5,
    price: '$3,500',
    amount: '$3,850 - $7,000',
    percentage: '110%-200%',
    type: 'Token Pack',
    heading:
      'Designed for Hive Members, the Action Pack Digi offer opportunities for investment and education',
    subHeading1: '1. Academy, Action Digi',
    subPara1:
      'Hive Members can access educational resources through the Token Pack Digi section of our Indexx Academy. Improve your trading skills and knowledge with our curated courses and materials.',
    subHeading2: '2. Investment, Digi Return:',
    subPara2:
      ' Invest confidently knowing that your funds are managed by our expert algorithms, aimed at maximizing returns. While Hive Members may not participate in the Colony Network, they can still benefit from lucrative returns on their investments.',
  },
];

export const CaptainBeeCryptoData = [
  {
    id: 1,
    name: 'Whale',
    photo: crypto1,
    price: '$25,000',
    amount: '$37,500 - $75,000',
    percentage: '150%-300%',
    type: 'Crypto Pack',
    heading:
      'The Crypto Pack Whale  caters to Hive Captains with a focus on cryptocurrency investments',
    subHeading1: '1. Academy, Crypto Whale',
    subPara1:
      'Gain access to our Indexx Academy Crypto Whale section, offering specialized courses and e-books tailored for mastering cryptocurrency trading.',
    subHeading2: '2. Investment, Whale Return',
    subPara2:
      'Your investment is strategically allocated across various fast growing cryptocurrencies, including BTC, ETH, IN500, and SOL tokens. These investments are meticulously managed by our algorithms, ensuring optimal returns. By leveraging our expertise and advanced algorithms, you can expect significant returns on your investment over the 2-year period.',
  },
  {
    id: 2,
    name: 'Satoshi',
    photo: crypto2,
    price: '$15,000',
    amount: '$21,700 - $44,950',
    percentage: '140%-290%',
    type: 'Crypto Pack',
    heading:
      'The Crypto Pack  Satoshi  caters to Hive Captains with a focus on cryptocurrency investments',
    subHeading1: '1. Academy, Crypto Satoshi',
    subPara1:
      'Gain access to our Indexx Academy Crypto Satoshi section, offering specialized courses and e-books tailored for mastering cryptocurrency trading.',
    subHeading2: '2. Investment, Satoshi Return',
    subPara2:
      'Your investment is strategically allocated across various cryptocurrencies, including BTC, ETH, IN500, and SOL tokens. These investments are meticulously managed by our algorithms, ensuring optimal returns. By leveraging our expertise and advanced algorithms, you can expect significant returns on your investment over the 2-year period.',
  },
  {
    id: 1,
    name: 'Genius',
    photo: crypto3,
    price: '$10,000',
    amount: '$13,650 - $29,400',
    percentage: '130%-280%',
    type: 'Crypto Pack',
    heading:
      'The Crypto Pack  Genius  caters to Hive Captains with a focus on cryptocurrency investments',
    subHeading1: '1. Academy, Crypto Genius',
    subPara1:
      'Gain access to our Indexx Academy Crypto Genius section, offering specialized courses and e-books tailored for mastering cryptocurrency trading.',
    subHeading2: '2. Investment, Genius Return',
    subPara2:
      'Your investment is strategically allocated across various cryptocurrencies, including BTC, ETH, IN500, and SOL tokens. These investments are meticulously managed by our algorithms, ensuring optimal returns. By leveraging our expertise and advanced algorithms, you can expect significant returns on your investment over the 2-year period.',
  },
  {
    id: 1,
    name: 'Bit',
    photo: crypto4,
    price: '$6,500',
    amount: '$7,800 - $17,550',
    percentage: '120%-270%',
    type: 'Crypto Pack',
    heading:
      'The Crypto Pack  Bit  caters to Hive Captains with a focus on cryptocurrency investments',
    subHeading1: '1. Academy, Crypto Genius',
    subPara1:
      'Gain access to our Indexx Academy Crypto Bit section, offering specialized courses and e-books tailored for mastering cryptocurrency trading.',
    subHeading2: '2. Investment, Genius Return',
    subPara2:
      'Your investment is strategically allocated across various cryptocurrencies, including BTC, ETH, IN500, and SOL tokens. These investments are meticulously managed by our algorithms, ensuring optimal returns. By leveraging our expertise and advanced algorithms, you can expect significant returns on your investment over the 2-year period.',
  },
  {
    id: 1,
    name: 'Block',
    photo: crypto5,
    price: '$3,500',
    amount: '$3,850 - $7,000',
    percentage: '110%-200%',
    type: 'Crypto Pack',
    heading:
      'The Crypto Pack  Block  caters to Hive Captains with a focus on cryptocurrency investments',
    subHeading1: '1. Academy, Crypto Block',
    subPara1:
      'Gain access to our Indexx Academy Crypto Bit section, offering specialized courses and e-books tailored for mastering cryptocurrency trading.',
    subHeading2: '2. Investment, Block Return',
    subPara2:
      'Your investment is strategically allocated across various cryptocurrencies, including BTC, ETH, IN500, and SOL tokens. These investments are meticulously managed by our algorithms, ensuring optimal returns. By leveraging our expertise and advanced algorithms, you can expect significant returns on your investment over the 2-year period.',
  },
];

export const CaptainBeePowerData = [
  {
    id: 1,
    name: 'Royal',
    photo: power1,
    price: '$10,000',
    amount: '$24,000',
    percentage: '240%',
    type: 'Power Pack',
    heading:
      'The Power Pack Royal offers two major components for Hive Captains',
    subHeading1: '1. Academy, Power Royal',
    subPara1:
      'This section provides access to our comprehensive educational platform, the Indexx Academy. Here, Hive Captains can enhance their trading skills with specialized courses and e-books covering all levels of crypto, forex, and stock trading.',
    subHeading2: '2. Investment, Royal Return',
    subPara2:
      'With the Power Pack Royal , your investment is allocated towards our expertly managed trading algorithms, meticulously crafted to deliver high returns. We utilize cutting-edge AI technology and collaborate with renowned trading veterans like BlackRock for stock trading. The Royal Return signifies the lucrative rewards you can expect after 2 years of investing.',
  },
  {
    id: 2,
    name: 'Platinum',
    photo: power2,
    price: '$7,000',
    amount: '$15,100',
    percentage: '216%',
    type: 'Power Pack',
    heading:
      'The Power Pack Platinum offers two major components for Hive Captains',
    subHeading1: '1. Academy, Power Platinum',
    subPara1:
      'This section provides access to our comprehensive educational platform, the Indexx Academy. Here, Hive Captains can enhance their trading skills with specialized courses and e-books covering all levels of crypto, forex, and stock trading.',
    subHeading2: '2. Investment, Platinum Return',
    subPara2:
      'With the Power Pack Platinum , your investment is allocated towards our expertly managed trading algorithms, meticulously crafted to deliver high returns. We utilize cutting-edge AI technology and collaborate with renowned trading veterans like BlackRock for stock trading. The Platinum Return signifies the lucrative rewards you can expect after 2 years of investing.',
  },
  {
    id: 3,
    name: 'Gold',
    photo: power3,
    price: '$5,000',
    amount: '$9,600',
    percentage: '192%',
    type: 'Power Pack',
    heading:
      'The Power Pack Gold offers two major components for Hive Captains',
    subHeading1: '1. Academy, Power Gold',
    subPara1:
      'This section provides access to our comprehensive educational platform, the Indexx Academy. Here, Hive Captains can enhance their trading skills with specialized courses and e-books covering all levels of crypto, forex, and stock trading.',
    subHeading2: '2. Investment, Gold Return',
    subPara2:
      'With the Power Pack Gold , your investment is allocated towards our expertly managed trading algorithms, meticulously crafted to deliver high returns. We utilize cutting-edge AI technology and collaborate with renowned trading veterans like BlackRock for stock trading. The Gold Return signifies the lucrative rewards you can expect after 2 years of investing.',
  },
  {
    id: 4,
    name: 'Copper',
    photo: power4,
    price: '$2,000',
    amount: '$3,360',
    percentage: '168%',
    type: 'Power Pack',
    heading:
      'The Power Pack Copper offers two major components for Hive Captains',
    subHeading1: '1. Academy, Power Copper',
    subPara1:
      'This section provides access to our comprehensive educational platform, the Indexx Academy. Here, Hive Captains can enhance their trading skills with specialized courses and e-books covering all levels of crypto, forex, and stock trading.',
    subHeading2: '2. Investment, Copper Return',
    subPara2:
      'With the Power Pack Copper , your investment is allocated towards our expertly managed trading algorithms, meticulously crafted to deliver high returns. We utilize cutting-edge AI technology and collaborate with renowned trading veterans like BlackRock for stock trading. The Copper Return signifies the lucrative rewards you can expect after 2 years of investing.',
  },
  {
    id: 5,
    name: 'Captain',
    photo: power5,
    price: '$1,000',
    amount: '$1,440',
    percentage: '144%',
    type: 'Power Pack',
    heading:
      'The Power Pack Captain offers two major components for Hive Captains',
    subHeading1: '1. Academy, Power Captain',
    subPara1:
      'This section provides access to our comprehensive educational platform, the Indexx Academy. Here, Hive Captains can enhance their trading skills with specialized courses and e-books covering all levels of crypto, forex, and stock trading.',
    subHeading2: '2. Investment, Captain Return',
    subPara2:
      'With the Power Pack Captain , your investment is allocated towards our expertly managed trading algorithms, meticulously crafted to deliver high returns. We utilize cutting-edge AI technology and collaborate with renowned trading veterans like BlackRock for stock trading. The Captain Return signifies the lucrative rewards you can expect after 2 years of investing.',
  },
];
