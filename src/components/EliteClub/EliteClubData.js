import Bull from '../../assets/elite_club/bull_new.svg';
import Eagle from '../../assets/elite_club/Eagle_new.svg';
import Foxtail from '../../assets/elite_club/fox_new.svg';
import Lion from '../../assets/elite_club/lion_New.svg';

import Bull_gif from '../../assets/elite_club/bull_opt.gif';
import Eagle_gif from '../../assets/elite_club/eagle_opt.gif';
import Foxtail_gif from '../../assets/elite_club/fox_opt.gif';
import Lion_gif from '../../assets/elite_club/lion_opt.gif';

import Lion_back from '../../assets/elite_club/lion coin.svg';
import Bull_back from '../../assets/elite_club/bull_coin.svg';
import Eagle_back from '../../assets/elite_club/eagle coin.svg';
import Foxtail_back from '../../assets/elite_club/fox coin.svg';

import crown from '../../assets/elite_club/list_crown.svg';
import chest from '../../assets/elite_club/chest 1.svg';
import nft from '../../assets/elite_club/nft logo 1.svg';
import affiliate from '../../assets/elite_club/affiliate blue 1.svg';
import certificate from '../../assets/elite_club/certificate HD 1.svg';
import fortune_black from '../../assets/elite_club/fortune black 1.svg';
import fortune_white from '../../assets/elite_club/fortune white 1.svg';
import support from '../../assets/elite_club/support.svg';
import support_light from '../../assets/elite_club/support_light.svg';
import xacademy from '../../assets/elite_club/xacademy for LM 1.svg';
import INEX from '../../assets/elite_club/INEX 16.svg';
import staking from '../../assets/elite_club/staking pig_grey 1.svg';
import etf from "../../assets/elite_club/etf.svg";
import etf_light from "../../assets/elite_club/etf_dark.svg";



export const EliteClubData = [
  {
    id: '1',
    name: 'Lion Crown',
    price:'500,000',
    photo: Lion,
    gif: Lion_gif,
    back_photo: Lion_back,
    desc: 'Roar into Prosperity: Indexx Elite Lion Crown Club, Where Lions Inspire Financial Excellence!',
    clr:'#53005B',
    perks: [
      {
        id: 1,
        title: 'Royal Investment Insights:',
        text: 'Unlock exclusive access to market insights and trends reserved for Lion Crown Club members.',
      },
      {
        id: 2,
        title: 'Majestic Investment Opportunities:',
        text: 'Reign supreme with early access and priority status to lucrative investment opportunities.',
      },
      {
        id: 3,
        title: 'Personalized Majesty Guidance:',
        text: 'Receive personalized financial advice and guidance tailored to your majestic investment goals.',
      },
      {
        id: 4,
        title: 'Crown Customer Support:',
        text: 'Enjoy dedicated and expedited customer support services for any inquiries or assistance.',
      },
    ],
    why_invest:
      'Ascend to unparalleled financial heights with Lion Crown! Claim a majestic 250,000 INEX token bonus, exclusive insights, and personalized guidance. Be the first to experience cutting-edge features, enjoying the best rates—your royal path to financial greatness awaits.',
    package:[
      {
        id:1,
        title:"Elite Club Lion Crown Membership",
        image:crown,
        list:[]
      },
      {
        id:2,
        title:"INEX Tokens: 500, 000 USD",
        image:INEX,
        list:['  250,000 INEX tokens as a sign-up bonus.',
          '7% additional INEX tokens on all transactions.']
      },
      {
        id:3,
        title:"ETF Package Value: 250,000 USD",
        image:etf,
        lightimg:etf_light,
        list:['EqStocks ETF (EQSTK): 37,500 USD',
        'CryptoCap 10 ETF (CRYC10): 37,500 USD',
        'AlphaCrypto ETF (ALCRYP): 37,500 USD',
        'Indexx Focus ETF (INDXXF): 62,500 USD',
        'Token Blend ETF (TOB): 250,000 USD']
      },
      {
        id:4,
        title:"Stock Certificate of Indexx",
        image:certificate,
        list:[]
      },
      {
        id:5,
        title:"Staking (Yearly APY):",
        image:staking,
        list:['INEX tokens: 50%',
        'Other tokens: 15%']
      },
      {
        id:6,
        title:"Access:",
        image:chest,
        list:['Full access to the Indexx Hive Powerpack at the Diamond level.',
              'Personal account manager for dedicated support.']
      },
      {
        id:7,
        title:"Education:",
        image:xacademy,
        list:[' Unlimited free courses from the Indexx Academy.']
      },
      {
        id:8,
        title:"Affiliate System:",
        image:affiliate,
        list:['1st level referral bonus: 20% on all transactions.',
        '2nd level referral bonus: 12% on all transactions.']
      },
      {
        id:9,
        title:"Lottery:",
        image:fortune_white,
        lightimg:fortune_black,
        list:['30 free lottery tickets per month.']
      },
      {
        id:10,
        title:"Exclusive NFTs:",
        image:nft,
        list:['Limited edition Elite Lion NFTs with unique benefits.']
      },
      {
        id:11,
        title:"24/7 Executive Assistance:",
        image:support,
        lightimg:support_light,
        list:['  Club members will get 24 hours assistance throughout the ecosystem']
      },
    ]
  },
  {
    id: '2',
    name: 'Bull Run',
    price:'300,000',
    photo: Bull,
    gif: Bull_gif,
    back_photo: Bull_back,
    desc: 'Gallop to Glory with Indexx Elite Bull Run Club: Where Bulls Define Excellence!',
    clr:'#FF0000',
    perks: [
      {
        id: 1,
        title: 'Bull Run Investment Intel:',
        text: 'Secure access to exclusive market insights and trends tailored for Bull Run Club members.',
      },
      {
        id: 2,
        title: 'Triumphant Investment Opportunities:',
        text: 'Stay ahead with early access and priority status to lucrative investment opportunities.',
      },
      {
        id: 3,
        title: 'Personalized Triumph Guidance:',
        text: 'Receive personalized financial advice and guidance aligned with your investment triumph.',
      },
      {
        id: 4,
        title: 'Elite Customer Support:',
        text: 'Enjoy dedicated and expedited customer support services for any inquiries or assistance.',
      },
    ],
    why_invest:
    'Unleash financial triumph with Bull Run! Revel in a lavish 150,000 INEX token bonus, exclusive insights, and personalized guidance. As a pioneer in our groundbreaking features, secure the best rates—because your journey to financial opulence begins now.',
    package:[
      {
        id:1,
        title:"Elite Club Bull Run Membership",
        image:crown,
        list:[]
      },
      {
        id:2,
        title:"INEX Tokens: 300,000 USD",
        image:INEX,
        list:['150,000 INEX tokens as a sign-up bonus.',
          '5% additional INEX tokens on all transactions.']
      },
      {
        id:3,
        title:"ETF Package Value: 150,000 USD",
        image:etf,
        lightimg:etf_light,
        list:['EqStocks ETF (EQSTK): 30,000 USD',
        'CryptoCap 10 ETF (CRYC10): 30,000 USD',
        'AlphaCrypto ETF (ALCRYP): 30,000 USD',
        'Indexx Focus ETF (INDXXF): 30,000 USD',
        'Token Blend ETF (TOB): 150,000 USD']
      },
      {
        id:4,
        title:"Stock Certificate of Indexx",
        image:certificate,
        list:[]
      },
      {
        id:5,
        title:"Staking (Yearly APY):",
        image:staking,
        list:['INEX tokens: 30%',
        'Other tokens: 10%']
      },
      {
        id:6,
        title:"Access:",
        image:chest,
        list:['Full access to the Indexx Hive Powerpack at the Platinum level.',
        'Exclusive access to closed-door events and partnerships.']
      },
      {
        id:7,
        title:"Education:",
        image:xacademy,
        list:[' Unlimited free courses from the Indexx Academy.']
      },
      {
        id:8,
        title:"Affiliate System:",
        image:affiliate,
        list:['1st level referral bonus: 15% on all transactions.',
        '2nd level referral bonus: 8% on all transactions.']
      },
      {
        id:9,
        title:"Lottery:",
        image:fortune_white,
        lightimg:fortune_black,
        list:['20 free lottery tickets per month.']
      },
      {
        id:10,
        title:"24/7 Executive Assistance:",
        image:support,
        lightimg:support_light,
        list:['  Club members will get 24 hours assistance throughout the ecosystem']
      },
    ]
  },
  {
    id: '3',
    name: 'Eagle Eye',
    price:'100,000',
    photo: Eagle,
    gif: Eagle_gif,
    back_photo: Eagle_back,
    desc: 'Soar to Financial Heights: Indexx Elite Eagle Eye Club, Where Eagles Inspire Prosperity!',
    clr:'#FF7A08',
    perks: [
      {
        id: 1,
        title: 'Eagle-Eye Investment Insights:',
        text: 'Gain exclusive access to market insights and trends reserved for Eagle Club members.',
      },
      {
        id: 2,
        title: 'Forefront Investment Opportunities:',
        text: 'Be a frontrunner with early access and priority status to lucrative investment opportunities.',
      },
      {
        id: 3,
        title: 'Tailored Financial Advisory:',
        text: 'Receive personalized financial advice and guidance tailored to your unique goals.',
      },
      {
        id: 4,
        title: 'Priority Customer Support:',
        text: 'Enjoy dedicated and expedited customer support for any inquiries or assistance.',
      },
    ],
    why_invest:
    'Invest like royalty and lead the charge with Eagle Club! Enjoy a regal 50,000 INEX token bonus, exclusive insights, and personalized guidance. Dive into our latest features first, securing unbeatable rates—your pathway to financial majesty starts here.',
    package:[
      {
        id:1,
        title:"Elite Club Eagle Eye Membership",
        image:crown,
        list:[]
      },
      {
        id:2,
        title:"INEX Tokens: 100,000 USD",
        image:INEX,
        list:['50,000 INEX tokens as a sign-up bonus.',
          '3% additional INEX tokens on all transactions.']
      },
      {
        id:3,
        title:"ETF Package Value: 50,000 USD",
        image:etf,
        lightimg:etf_light,
        list:['EqStocks ETF (EQSTK): 12,500 USD',
        'CryptoCap 10 ETF (CRYC10): 12,500 USD',
        'AlphaCrypto ETF (ALCRYP): 10,000 USD',
        'Indexx Focus ETF (INDXXF): 7,500 USD',
        'Token Blend ETF (TOB): 50,000 USD']
      },
      {
        id:4,
        title:"Stock Certificate of Indexx",
        image:certificate,
        list:[]
      },
      {
        id:5,
        title:"Staking (Yearly APY):",
        image:staking,
        list:['INEX tokens: 20%',
        'Other tokens: 8%']
      },
      {
        id:6,
        title:"Access:",
        image:chest,
        list:['Full access to the Indexx Hive Powerpack at the Gold level.',
        'Priority access to new features and beta programs']
      },
      {
        id:7,
        title:"Education:",
        image:xacademy,
        list:['6 free courses from the Indexx Academy.']
      },
      {
        id:8,
        title:"Affiliate System:",
        image:affiliate,
        list:['1st level referral bonus: 12% on all transactions.',
        '2nd level referral bonus: 4% on all transactions.']
      },
      {
        id:9,
        title:"Lottery:",
        image:fortune_white,
        lightimg:fortune_black,
        list:['10 free lottery tickets per month.']
      },
      {
        id:10,
        title:"24/7 Executive Assistance:",
        image:support,
        lightimg:support_light,
        list:['  Club members will get 24 hours assistance throughout the ecosystem']
      },
    ]
  },
  {
    id: '4',
    name: 'Foxtail',
    price:'50,000',
    photo: Foxtail,
    gif: Foxtail_gif,
    back_photo: Foxtail_back,
    desc: 'Unleashing Prosperity, Tailored for Success: Indexx Elite Club Foxtail – Where Visionaries Thrive!',
    clr:'#FF7A08',
    perks: [
      {
        id: 1,
        title: 'Tailored Investment Intel:',
        text: 'Access unique market insights and trends exclusive to Foxtail Club members.',
      },
      {
        id: 2,
        title: 'Premier Investment Access:',
        text: 'Lead the pack with early access and priority status to lucrative investment opportunities.',
      },
      {
        id: 3,
        title: 'Personalized Financial Coaching:',
        text: 'Receive tailored financial advice and guidance aligned with your investment objectives.',
      },
      {
        id: 4,
        title: 'Top-Tier Customer Support:',
        text: 'Enjoy dedicated and swift customer support services for any inquiries or assistance.',
      },
    ],
    why_invest:
    'Embark on a journey of financial prosperity with Foxtail! Your gateway to exclusive insights, a 25,000 INEX token bonus, and personalized guidance. Be the first to experience groundbreaking features, securing the best rates—because your investment deserves nothing less.',
    package:[
      {
        id:1,
        title:"Elite Club Foxtail Membership",
        image:crown,
        list:[]
      },
      {
        id:2,
        title:"INEX Tokens: 50,000 USD",
        image:INEX,
        list:['25,000 INEX tokens as a sign-up bonus.',
          '1% additional INEX tokens on all transactions.']
      },
      {
        id:3,
        title:"ETF Package Value: 25,000 USD",
        image:etf,
        lightimg:etf_light,
        list:['EqStocks ETF (EQSTK): 7,500 USD',
        'CryptoCap 10 ETF (CRYC10): 7,500 USD',
        'AlphaCrypto ETF (ALCRYP): 5,000 USD',
        'Indexx Focus ETF (INDXXF): 2,500 USD',
        'Token Blend ETF (TOB): 25,000 USD']
      },
      {
        id:4,
        title:"Stock Certificate of Indexx",
        image:certificate,
        list:[]
      },
      {
        id:5,
        title:"Staking (Yearly APY):",
        image:staking,
        list:['INEX tokens: 17%',
        'Other tokens: 7%']
      },
      {
        id:6,
        title:"Access:",
        image:chest,
        list:['Full access to the Indexx Hive Powerpack at the Silver level.',
        'Access to exclusive early updates and features.']
      },
      {
        id:7,
        title:"Education:",
        image:xacademy,
        list:['3 free courses from the Indexx Academy.']
      },
      {
        id:8,
        title:"Affiliate System:",
        image:affiliate,
        list:['1st level referral bonus: 8% on all transactions.',]
      },
      {
        id:9,
        title:"Lottery:",
        image:fortune_white,
        lightimg:fortune_black,
        list:['5 free lottery tickets per month.']
      },
      {
        id:10,
        title:"24/7 Executive Assistance:",
        image:support,
        lightimg:support_light,
        list:['  Club members will get 24 hours assistance throughout the ecosystem']
      },
    ]
  },
];
