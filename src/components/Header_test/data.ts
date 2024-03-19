// import token from '../../assets/BSheader/tokens icon 1.svg';
// import token_white from '../../assets/BSheader/tokens icon  white (1).svg';

const header_data = [
  {
    mainTextDesktop: 'Exchange',
    mainTextMob: 'Exchange',
    active: true,
    href: '/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',

        mainList: true,
        links: [
          {
            name: 'Buy and Sell',
            href: '/indexx-exchange/buy-sell?type=buy',
          },
          {
            name: 'Convert',
            href: '/indexx-exchange/buy-sell?type=convert',
          },
          {
            name: 'Funding Wallet',
            href: '/indexx-exchange/buy-sell/wallet',
          },
          {
            name: 'Staking',
            href: '/indexx-exchange/buy-sell/staking',
          },
          {
            name: 'Tokens',
            href: '/',
          },
          {
            name: 'Wallstreet',
            href: '/',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Buy Indexx Tokens',
            href: '/',
          },
          {
            name: 'Earn Apr on all Tokens',
            href: '/indexx-exchange/buy-sell/staking',
          },
          {
            name: 'Invest in Stock Tokens',
            href: '/',
          },
        ],
      },
      {
        heading: 'Support',
        links: [
          {
            name: 'How to buy Tokens',
            href: 'https://indexx.ai/indexx-exchange/how-it-works/centralized',
          },
          {
            name: 'How does Staking work?',
            href: '/indexx-exchange/buy-sell/staking',
          },
          {
            name: 'Where are the token Whitepapers?',
            href: 'https://indexx.ai/indexx-exchange/token-details',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Lotto',
    mainTextMob: 'Lotto',
    active: false,
    href: '',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'About',
            href: 'https://lotto.indexx.ai/about',
          },
          {
            name: 'Buy Ticket',
            href: 'https://lotto.indexx.ai/contest',
          },
          {
            name: 'Contest',
            href: 'https://lotto.indexx.ai/contest',
          },
          {
            name: 'Grand Prize',
            href: 'https://lotto.indexx.ai/grand-prize',
          },
          {
            name: 'Winners',
            href: 'https://lotto.indexx.ai/winner',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Win a Ferrari',
            href: 'https://lotto.indexx.ai/grand-prize',
          },
          {
            name: 'Claim Rewards',
            href: 'https://lotto.indexx.ai/reward',
          },
          {
            name: 'See who won',
            href: 'https://lotto.indexx.ai/winner',
          },
        ],
      },
      {
        heading: 'Support',
        links: [
          {
            name: 'How does Fantasy Lotto work?',
            href: 'https://lotto.indexx.ai/how-work',
          },
          {
            name: 'Contact Support',
            href: 'https://lotto.indexx.ai/contact',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Shop',
    mainTextMob: 'Shop',
    active: false,
    href: '/discount-shop',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Bonus',
            href: '/discount-shop',
          },
          {
            name: 'Gifts',
            href: 'https://indexxgifts.com',
          },
          {
            name: 'Membership',
            href: 'https://indexxgifts.com/products/hive-membership-cards',
          },
          {
            name: 'XMarket',
            href: 'https://xnftmarketplace.indexx.ai/collections/bitcoin-xnft/1',
          },
        ],
      },
      {
        heading: 'Action',
        mainList: false,
        links: [
          {
            name: 'Redeem Gift Cards',
            href: '#',
          },
          {
            name: 'Be part of Elite Club',
            href: '/indexx-exchange/elite-club',
          },
        ],
      },
      {
        heading: 'Support',
        mainList: false,
        links: [
          {
            name: 'How to redeem discount?',
            href: '#',
          },
          {
            name: 'What are XNFTs?',
            href: 'https://xnft.indexx.ai/',
          },
          {
            name: 'Benefits of Membership',
            href: '/indexx-exchange/elite-club',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Swap',
    mainTextMob: 'Swap',
    active: false,
    href: 'https://dex.indexx.ai/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Staking',
            href: '/indexx-exchange/buy-sell/staking',
          },
          {
            name: 'Tokens',
            href: '/',
          },
          {
            name: 'Wallstreet',
            href: '/',
          },
          {
            name: 'Web3 Wallet',
            href: 'https://wallet.indexx.ai/login/sign-in',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Tokens',
    mainTextMob: 'Tokens',
    active: false,
    href: '',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Buy Token',
            href: 'https://cex.indexx.ai/',
          },
          {
            name: 'INEX',
            href: 'https://indexx.ai/indexx-exchange/token-details/inex',
          },
          {
            name: 'IN500',
            href: 'https://indexx.ai/indexx-exchange/token-details/in500',
          },
          {
            name: 'INXC',
            href: 'https://indexx.ai/indexx-exchange/token-details/crypto',
          },
          {
            name: 'INXP',
            href: 'https://indexx.ai/indexx-exchange/token-details/phoenix',
          },
          {
            name: 'IUSD+',
            href: 'https://indexx.ai/indexx-exchange/token-details/usd',
          },
          {
            name: 'SoRekt Token',
            href: 'https://sorekt.wtf/',
          },
          {
            name: 'Who is Satoshi',
            href: 'https://whoissatoshi.wtf',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Get discounts',
            href: 'https://indexx.ai/discount-shop',
          },
          {
            name: 'Get Gift Cards',
            href: 'https://indexxgifts.com/',
          },
          {
            name: 'Sign up on Exchange',
            href: '/indexx-exchange/buy-sell/get-started',
          },
        ],
      },
      {
        heading: 'Support',
        links: [
          {
            name: 'White Paper',
            href: 'https://indexx.ai/indexx-exchange/token-details',
          },
          {
            name: 'Legal Documents',
            href: 'https://indexx.ai/indexx-exchange/legal',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Hive',
    mainTextMob: 'Hive',
    active: false,
    href: 'https://hive.indexx.ai/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Captain Bee',
            href: 'https://hive.indexx.ai/bees',
          },
          {
            name: 'Honey Bee',
            href: 'https://hive.indexx.ai/honey-bees',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Register as Caption Bee',
            href: 'https://hive.indexx.ai/sign-up',
          },
          {
            name: 'Sign Up as Honey Bee',
            href: '/indexx-exchange/buy-sell/get-started-honeybee',
          },
        ],
      },
      {
        heading: 'Support',
        links: [
          {
            name: 'How does Hive work?',
            href: 'https://hive.indexx.ai/',
          },
          {
            name: 'Contact Support',
            href: 'https://indexx.ai/indexx-exchange/help/contact',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Academy',
    mainTextMob: 'Academy',
    active: false,
    href: 'https://academy.indexx.ai/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Become an Instructor',
            href: 'https://academy.indexx.ai/authentication/?next=%2Fbecome-an-instructor',
          },
          {
            name: 'Courses',
            href: 'https://academy.indexx.ai/courses/?short=',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Log in',
            href: 'https://academy.indexx.ai/authentication/',
          },
          {
            name: 'Register',
            href: 'https://academy.indexx.ai/authentication/',
          },
        ],
      },
      {
        heading: 'Support',
        links: [
          {
            name: 'How to become an instructor?',
            href: 'https://academy.indexx.ai/authentication/?next=%2Fbecome-an-instructor',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Affiliate',
    mainTextMob: 'Affiliate',
    active: false,
    href: '',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Become an Affiliate',
            href: 'https://register.affiliate.indexx.ai/',
          },
          {
            name: 'Trade to Earn',
            href: 'https://indexx.ai/indexx-exchange/trade-to-earn',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Become an affiliate',
            href: 'https://register.affiliate.indexx.ai/about',
          },
        ],
      },
      {
        heading: 'Support',
        links: [
          {
            name: 'How to get my earnings?',
            href: '#',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Elite Club',
    mainTextMob: 'Elite Club',
    active: false,
    href: '/indexx-exchange/elite-club',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Funding Wallet',
            href: '/indexx-exchange/buy-sell/wallet',
          },
          {
            name: 'Power Packs',
            href: '/indexx-exchange/power-pack',
          },
          {
            name: 'Staking',
            href: '/indexx-exchange/buy-sell/staking',
          },
          {
            name: 'Web3 Wallet',
            href: 'https://wallet.indexx.ai/login/sign-in',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Log in',
            href: '/',
          },
          {
            name: 'Register',
            href: '/indexx-exchange/buy-sell/get-started',
          },
        ],
      },
    ],
  },
];

export const auth_header_data = [
  {
    mainTextDesktop: 'Login',
    mainTextMob: 'Login',
    isAuth: false,
    active: false,
    href: '/',
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'Register',
    mainTextMob: 'Register',
    isAuth: false,
    active: false,
    href: '/',
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'profile',
    mainTextMob: 'profile',
    img: true,
    isAuth: true,
    active: false,
    href: '#',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore Hive Profile',
        mainList: true,
        links: [
          {
            name: 'Account & Settings',
            href: '/',
          },
          {
            name: 'Bridge',
            href: '/',
          },
          {
            name: 'Waggle Dance/ Dashboard',
            href: '/',
          },
          {
            name: 'Deposit',
            href: '/',
          },
          {
            name: 'Notification',
            href: '/',
          },
          {
            name: 'Order History',
            href: '/',
          },
          {
            name: 'Reward Center',
            href: '/',
          },
          {
            name: 'Trade to Earn',
            href: '/',
          },
          {
            name: 'Staking History',
            href: '/',
          },
          {
            name: 'Transaction History',
            href: '/',
          },
          {
            name: 'Wallet',
            href: '/',
          },
          {
            name: 'Withdraw',
            href: '/',
          },
          {
            name: 'Logout',
            href: '/',
          },
        ],
      },
      {
        heading: 'Action',
        mainList: false,
        links: [
          {
            name: 'Sales',
            href: '#',
          },
          {
            name: 'Trade and Earn',
            href: '/',
          },
          {
            name: 'Reward Center',
            href: '#',
          },
          {
            name: 'Recent Transaction',
            href: '/',
          },
        ],
      },
      {
        heading: 'Support',
        mainList: false,
        links: [
          {
            name: 'How to deposit',
            href: '#',
          },
          {
            name: 'Know how to withdraw',
            href: '/',
          },
        ],
      },
    ],
  },
];
export default header_data;
