// import token from '../../assets/BSheader/tokens icon 1.svg';
// import token_white from '../../assets/BSheader/tokens icon  white (1).svg';

import {
  baseCEXURL,
  baseURL,
  decodeJWT,
  getUserShortToken,
} from '../../services/api';

let authenticatedUrl: any = null; // Variable to store the authenticated URL

const getAuthenticatedUrl = async (url: any) => {
  const baseUrl = baseCEXURL; // Define your base URL here

  // Ensure the URL is absolute
  let absoluteUrl;
  try {
    absoluteUrl = new URL(url); // If url is already absolute, this will succeed
  } catch (e) {
    absoluteUrl = new URL(url, baseUrl); // If url is relative, construct an absolute URL
  }

  if (authenticatedUrl) {
    absoluteUrl.searchParams.set('signInToken', authenticatedUrl);
    return absoluteUrl.toString().replace('/?', '?');
  }

  const isAuthenticated = localStorage.getItem('access_token');
  const email = localStorage.getItem('email');
  let shortToken;

  if (email) {
    shortToken = await getUserShortToken(email);
  } else if (isAuthenticated) {
    let decodedValue = await decodeJWT(isAuthenticated);
    shortToken = await getUserShortToken(decodedValue?.email);
  }

  if (isAuthenticated) {
    authenticatedUrl = shortToken?.data;
    absoluteUrl.searchParams.set('signInToken', authenticatedUrl);
    return absoluteUrl.toString().replace('/?', '?');
  }

  return absoluteUrl.toString().replace('/?', '?');
};

const header_data = [
  {
    mainTextDesktop: 'Exchange / Buy Crypto',
    mainTextMob: 'Exchange / Buy Crypto',
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
            href: '/update/home?buyToken=INEX',
          },
          {
            name: 'Convert',
            href: '/convert',
          },
          {
            name: 'Asset Wallet',
            href: '/wallet/overview',
          },
          {
            name: 'Staking',
            href: '/indexx-exchange/buy-sell/staking',
          },
        ],
      },
      {
        heading: 'Buy,Trade & Earn',
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
        heading: 'How It Works',
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
    mainTextDesktop: 'Shop',
    mainTextMob: 'Shop',
    active: false,
    href: 'https://shop.indexx.ai/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Gifts',
            href: 'https://shop.indexx.ai/?category=gift',
          },
          {
            name: 'Greeting',
            href: 'https://shop.indexx.ai/?category=greeting',
          },
          {
            name: 'Hive Pack',
            href: 'https://shop.indexx.ai/?category=hive-pack',
          },
          {
            name: 'Create Gift',
            href: '/redeem/create-card',
          },
        ],
      },
      {
        heading: 'Redeem',
        mainList: false,
        links: [
          {
            name: 'Redeem Gift Cards',
            href: '/redeem',
          },
        ],
      },
      {
        heading: 'More on shop',
        mainList: false,
        links: [
          {
            name: 'How to redeem gifts?',
            href: '/redeem',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Lotto',
    mainTextMob: 'Lotto',
    active: false,
    href: 'https://lotto.indexx.ai',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore Lotto',
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
        heading: 'Rewards',
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
        heading: 'Learn More',
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
            name: 'Crypto Bee',
            href: 'https://hive.indexx.ai/honey-bees',
          },
        ],
      },
      {
        heading: 'Become a member',
        links: [
          {
            name: 'Register as Caption Bee',
            href: 'https://hive.indexx.ai/sign-up',
          },
          {
            name: 'Sign Up as Crypto Bee',
            href: '/indexx-exchange/buy-sell/get-started-honeybee',
          },
        ],
      },
      {
        heading: 'Learn The Hive',
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
    mainTextDesktop: 'xTokens',
    mainTextMob: 'xTokens',
    active: false,
    href: 'https://indexx.ai/indexx-exchange/token-details',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Buy Token',
            href: '/update/home',
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
            name: 'Who is bitcoin Satoshi',
            href: 'https://whoisbitcoinsatoshi.wtf/',
          },
        ],
      },
      {
        heading: 'Quick Links',
        links: [
          {
            name: 'Get Gift Cards',
            href: 'https://shop.indexx.ai/?category=gift',
          },
          {
            name: 'Sign up on Exchange',
            href: 'https://indexx.ai/auth/signup-email',
          },
        ],
      },
      {
        heading: 'Legalities',
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
            href: 'https://indexx.ai/auth/login',
          },
          {
            name: 'Register',
            href: 'https://indexx.ai/auth/signup-email',
          },
        ],
      },
      {
        heading: 'Opportunity',
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
    mainTextDesktop: 'Company',
    mainTextMob: 'Company',
    active: false,
    href: 'https://indexx.ai',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'About',
            href: 'https://indexx.ai/indexx-exchange/about',
          },
          {
            name: 'Blog',
            href: 'https://indexx.ai/indexx-exchange/blog',
          },
          {
            name: 'Careers',
            href: 'https://indexx.ai/indexx-exchange/careers',
          },
          {
            name: 'How it Works',
            href: 'https://indexx.ai/indexx-exchange/how-it-works',
          },
          {
            name: 'Vlog',
            href: 'https://indexx.ai/indexx-exchange/vlog',
          },
          {
            name: 'Document',
            href: 'https://indexx.ai/indexx-exchange/coming-soon',
          },
          {
            name: 'Whales Club',
            href: 'https://docs.google.com/presentation/d/1qfCXCVQUYmpz2hGEmqzqLxrspHe4tue3Tk8CwW8sFoU/edit#slide=id.g2c4d99d1558_0_70',
          },
          {
            name: 'Elite Club',
            href: 'https://docs.google.com/presentation/d/1KdEK2hYxPFRpqeavjd2iol4lCErRZq-_xbURg2bFnAg/edit#slide=id.g2a028cbc650_0_0',
          },
          {
            name: 'Back to Community',
            href: 'https://indexx.ai/back-to-community',
          },
          {
            name: 'Testimonials',
            href: 'https://www.youtube.com/watch?v=9ULdWShBz3k',
          },
        ],
      },
      {
        heading: 'More about Indexx',
        links: [
          {
            name: 'Know the company',
            href: 'https://indexx.ai/indexx-exchange/about',
          },
          {
            name: 'Read updates',
            href: 'https://indexx.ai/indexx-exchange/blog',
          },
          {
            name: 'Find opportunity',
            href: 'https://indexx.ai/indexx-exchange/careerst',
          },
          {
            name: 'Features',
            href: 'https://indexx.ai/indexx-exchange/how-it-works',
          },
          {
            name: 'Crypto trends',
            href: 'https://indexx.ai/indexx-exchange/markets',
          },
          {
            name: 'Watch videos',
            href: 'https://indexx.ai/indexx-exchange/vlog',
          },
        ],
      },
      {
        heading: 'Legalities',
        links: [
          {
            name: 'Government Certificates',
            href: 'https://cex.indexx.ai/indexx-exchange/coming-soon',
          },
          {
            name: 'Legal docs',
            href: 'https://indexx.ai/indexx-exchange/legal',
          },
          {
            name: 'Patent documents',
            href: 'https://cex.indexx.ai/indexx-exchange/coming-soon',
          },
          {
            name: 'Whitepapers',
            href: 'https://cex.indexx.ai/indexx-exchange/coming-soon',
          },
        ],
      },
    ],
  },
];

export const auth_header_data = [
  {
    mainTextDesktop: 'Logout',
    mainTextMob: 'Logout',
    img: false,
    isAuth: true,
    active: false,
    href: '#',
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'How it Works',
    mainTextMob: 'How it Works',
    isAuth: false,
    active: false,
    href: `https://indexx.ai/how-master-login-works`,
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'Login',
    mainTextMob: 'Login',
    isAuth: false,
    active: false,
    href: `${baseURL}/auth/login?redirectWebsiteLink=exchange`,
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'Register',
    mainTextMob: 'Register',
    isAuth: false,
    active: false,
    href: `${baseURL}/auth/signup-email?redirectWebsiteLink=exchange`,
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
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Account & Settings',
            href: '/indexx-exchange/account',
          },
          // {
          //   name: 'Bridge',
          //   href: '/indexx-exchange/bridge',
          // },
          {
            name: 'Hive Dashboard',
            href: '/indexx-exchange/dashboard',
          },

          {
            name: 'Notification',
            href: '/indexx-exchange/notification',
          },

          {
            name: 'Reward Center',
            href: '/indexx-exchange/reward-center',
          },
          // {
          //   name: 'Trade to Earn',
          //   href: '/indexx-exchange/trade-to-earn',
          // },
          {
            name: 'Redeem Gift',
            href: '/redeem',
          },

          {
            name: 'Asset Wallet',
            href: '/indexx-exchange/buy-sell/wallet',
          },

          {
            btn: true,
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
            href: '/',
          },
          // {
          //   name: 'Trade and Earn',
          //   href: 'https://indexx.ai/indexx-exchange/token-details/in500',
          // },
          {
            name: 'Complete Tasks',
            href: '/indexx-exchange/reward-center',
          },
          {
            name: 'Recent Transaction',
            href: '/indexx-exchange/buy-sell/transaction-history',
          },
        ],
      },
      {
        heading: 'Support',
        mainList: false,
        links: [
          {
            name: 'How to deposit',
            href: 'https://indexx.ai/indexx-exchange/how-it-works/centralized',
          },
          {
            name: 'Know how to withdraw',
            href: 'https://indexx.ai/indexx-exchange/how-it-works/centralized',
          },
        ],
      },
    ],
  },
];
export const auth_header_data_asset_wallet = [
  {
    mainTextDesktop: 'Logout',
    mainTextMob: 'Logout',
    img: false,
    isAuth: true,
    active: false,
    href: '#',
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'How it Works',
    mainTextMob: 'How it Works',
    isAuth: false,
    active: false,
    href: `https://indexx.ai/how-master-login-works`,
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'Login',
    mainTextMob: 'Login',
    isAuth: false,
    active: false,
    href: `${baseURL}/auth/login?redirectWebsiteLink=exchange`,
    hasMegaDrop: false,
    dropDownContent: [],
  },
  {
    mainTextDesktop: 'Register',
    mainTextMob: 'Register',
    isAuth: false,
    active: false,
    href: `${baseURL}/auth/signup-email?redirectWebsiteLink=exchange`,
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
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Account & Settings',
            href: '/indexx-exchange/account',
          },
          // {
          //   name: 'Bridge',
          //   href: '/indexx-exchange/bridge',
          // },
          {
            name: 'Hive Dashboard',
            href: '/indexx-exchange/dashboard',
          },

          {
            name: 'Notification',
            href: '/indexx-exchange/notification',
          },

          {
            name: 'Reward Center',
            href: '/indexx-exchange/reward-center',
          },
          // {
          //   name: 'Trade to Earn',
          //   href: '/indexx-exchange/trade-to-earn',
          // },
          {
            name: 'Redeem Gift',
            href: '/redeem',
          },
          {
            name: 'Asset Wallet',
            href: '/indexx-exchange/buy-sell/wallet',
          },

          {
            btn: true,
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
            name: 'Overview',
            href: '/indexx-exchange/buy-sell/wallet',
          },
          {
            name: 'Deposit',
            href: '/deposit-crypto-select-coin',
          },
          {
            name: 'Withdraw',
            href: '/withdraw-crypto-select-coin',
          },
          {
            name: 'Order History',
            href: '/indexx-exchange/buy-sell/order-history',
          },
          {
            name: 'Staking History',
            href: '/indexx-exchange/buy-sell/staking-history',
          },
          {
            name: 'Transaction History',
            href: '/indexx-exchange/buy-sell/transaction-history',
          },
        ],
      },
      {
        heading: 'Support',
        mainList: false,
        links: [
          {
            name: 'How to deposit',
            href: 'https://indexx.ai/indexx-exchange/how-it-works/centralized',
          },
          {
            name: 'Know how to withdraw',
            href: 'https://indexx.ai/indexx-exchange/how-it-works/centralized',
          },
        ],
      },
    ],
  },
];
export default header_data;

const processHeaderData = async (data: any) => {
  const promises = data.map(async (item: any) => {
    if (
      item.mainTextDesktop === 'Lotto' ||
      item.mainTextMob === 'Lotto' ||
      item.mainTextDesktop === 'WallStreet' ||
      item.mainTextMob === 'WallStreet' ||
      item.mainTextDesktop === 'Meme' ||
      item.mainTextMob === 'Meme' ||
      item.mainTextDesktop === 'Tokens' ||
      item.mainTextMob === 'Tokens' ||
      item.mainTextDesktop === 'Academy' ||
      item.mainTextMob === 'Academy' ||
      item.mainTextDesktop === 'Shop' ||
      item.mainTextMob === 'Shop'
    ) {
      console.log('item.href', item.href);
      item.href = await getAuthenticatedUrl(item.href);
      console.log('item.href after', item.href);
    }
    if (item.dropDownContent) {
      for (const content of item.dropDownContent) {
        for (const link of content.links) {
          link.href = await getAuthenticatedUrl(link.href);
        }
      }
    }
    return item;
  });

  return Promise.all(promises);
};

// Example usage
const updateHeaderData = async () => {
  const updatedHeaderData = await processHeaderData(header_data);
  console.log(updatedHeaderData);
};

updateHeaderData();
