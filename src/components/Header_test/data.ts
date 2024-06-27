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
            href: '/update/home?buyToken=INEX',
          },
          {
            name: 'Convert',
            href: '/indexx-exchange/buy-sell?type=convert',
          },
          {
            name: 'Asset Wallet',
            href: '/wallet/overview',
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
    mainTextDesktop: 'Meme',
    mainTextMob: 'Meme',
    active: false,
    href: 'https://indexx.ai/meme-details',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Meme Coins',
            href: 'https://indexx.ai/meme-details/meme-coin',
          },
          {
            name: 'Ordinals',
            href: 'https://indexx.ai/meme-details/ordinal-coin',
          },
          {
            name: 'NFTs',
            href: 'https://indexx.ai/meme-details/nft',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Buy WIBS meme coins',
            href: 'https://whoisbitcoinsatoshi.wtf/coin',
          },
          {
            name: 'Buy Ordinals',
            href: 'https://indexx.ai/indexx-exchange/coming-soon',
          },
          {
            name: 'Buy NFTs',
            href: 'https://indexx.ai/meme-details/nft',
          },
        ],
      },
      {
        heading: 'Learn More',
        links: [
          {
            name: 'WIBS Whitepaper',
            href: 'https://smallpdf.com/file#s=b3cde823-96de-4a01-b35f-5fc7b06c72e1',
          },
          {
            name: 'WIBS Audit Report',
            href: 'https://smallpdf.com/file#s=94f05479-8ca5-4236-a44c-a977bd34230b',
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
    mainTextDesktop: 'Shop',
    mainTextMob: 'Shop',
    active: false,
    href: 'https://indexx.ai/discount-shop',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Bonus',
            href: 'https://indexx.ai/discount-shop',
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
        heading: 'Redeem',
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
        heading: 'More on shop',
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
    href: 'https://swap.indexx.ai/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Staking',
            href: 'https://cex.indexx.ai/indexx-exchange/buy-sell/staking',
          },
          {
            name: 'Tokens',
            href: 'https://indexx.ai/indexx-exchange/token-details',
          },
          {
            name: 'Wallstreet',
            href: 'https://wallstreet.indexx.ai/',
          },
          {
            name: 'Web3 Wallet',
            href: 'https://wallet.indexx.ai/',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Register on Exchange',
            href: 'https://cex.indexx.ai/indexx-exchange/buy-sell/get-started/',
          },
          {
            name: 'Play Crypto Lottery',
            href: 'https://lotto.indexx.ai',
          },
          {
            name: 'Buy Indexx Tokens',
            href: 'https://cex.indexx.ai/',
          },
        ],
      },
      {
        heading: 'More on Indexx',
        links: [
          {
            name: 'White Paper',
            href: '/indexx-exchange/token-details',
          },
          {
            name: 'Legal Documents',
            href: '/indexx-exchange/legal',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Tokens',
    mainTextMob: 'Tokens',
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
            href: 'https://cex.indexx.ai/update/home',
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
        heading: 'Quick Links',
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
        heading: 'Become a member',
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
    mainTextDesktop: 'WallStreet',
    mainTextMob: 'WallStreet',
    active: false,
    href: 'https://wallstreet.indexx.ai/',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore',
        mainList: true,
        links: [
          {
            name: 'Stock Tokens',
            href: 'https://wallstreet.indexx.ai/details?type=all',
          },
          {
            name: 'Stock Certificates',
            href: 'https://wallstreet.indexx.ai/certificates?type=all',
          },
          {
            name: 'ETFs',
            href: 'https://wallstreet.indexx.ai/etf',
          },
        ],
      },
      {
        heading: 'Action',
        links: [
          {
            name: 'Buy Stock Tokens',
            href: '/update/home/stock-token?buyToken=AMZN',
          },
          {
            name: 'Buy Stock Certificates',
            href: ' ',
          },
          {
            name: 'Buy ETFs',
            href: '/update/home/etf-tokens?buyToken=ALCRYP',
          },
        ],
      },
      {
        heading: 'Learn more',
        links: [
          {
            name: 'Learn about Stock Tokens',
            href: 'https://wallstreet.indexx.ai/learn-tokens',
          },
          {
            name: 'Learn about Stock Certificates',
            href: 'https://wallstreet.indexx.ai/learn-certificates',
          },
          {
            name: 'Learn about ETFs',
            href: 'https://wallstreet.indexx.ai/learn-etfs',
          },
        ],
      },
    ],
  },
  {
    mainTextDesktop: 'Affiliate',
    mainTextMob: 'Affiliate',
    active: false,
    href: 'https://register.affiliate.indexx.ai/',
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
    href: 'https://cex.indexx.ai/indexx-exchange/elite-club',
    hasMegaDrop: true,
    dropDownContent: [
      {
        heading: 'Explore Club',
        mainList: true,
        links: [
          {
            name: 'Asset Wallet',
            href: 'https://cex.indexx.ai/indexx-exchange/buy-sell/wallet',
          },
          {
            name: 'Power Packs',
            href: 'https://cex.indexx.ai/indexx-exchange/power-pack',
          },
          {
            name: 'Staking',
            href: 'https://cex.indexx.ai/indexx-exchange/buy-sell/staking',
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
            href: 'https://cex.indexx.ai/',
          },
          {
            name: 'Register',
            href: 'https://cex.indexx.ai/indexx-exchange/buy-sell/get-started',
          },
        ],
      },
      {
        heading: 'Perks',
        links: [
          {
            name: 'Benefits of elite club',
            href: 'https://cex.indexx.ai/indexx-exchange/elite-club',
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
            name: 'Markets',
            href: 'https://indexx.ai/indexx-exchange/markets',
          },
          {
            name: 'Vlog',
            href: 'https://indexx.ai/indexx-exchange/vlog',
          },
          {
            name: 'Document',
            href: 'https://indexx.ai/indexx-exchange/coming-soon',
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
        heading: 'Explore Hive Profile',
        mainList: true,
        links: [
          {
            name: 'Account & Settings',
            href: '/indexx-exchange/account',
          },
          {
            name: 'Bridge',
            href: '/indexx-exchange/bridge',
          },
          {
            name: 'Hive Dashboard',
            href: '/indexx-exchange/dashboard',
          },
          {
            name: 'Deposit',
            href: '/indexx-exchange/buy-sell/deposit-crypto',
          },
          {
            name: 'Notification',
            href: '/indexx-exchange/notification',
          },
          {
            name: 'Order History',
            href: '/indexx-exchange/buy-sell/order-history',
          },
          {
            name: 'Reward Center',
            href: '/indexx-exchange/reward-center',
          },
          {
            name: 'Trade to Earn',
            href: '/indexx-exchange/trade-to-earn',
          },
          {
            name: 'Staking History',
            href: '/indexx-exchange/buy-sell/staking-history',
          },
          {
            name: 'Transaction History',
            href: '/indexx-exchange/buy-sell/transaction-history',
          },
          {
            name: 'Wallet',
            href: '/indexx-exchange/buy-sell/wallet',
          },
          {
            name: 'Withdraw',
            href: '/indexx-exchange/buy-sell/withdraw-crypto',
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
            href: '/indexx-exchange/buy-sell',
          },
          {
            name: 'Trade and Earn',
            href: 'https://indexx.ai/indexx-exchange/token-details/in500',
          },
          {
            name: 'Complete Tasks',
            href: 'https://shop.indexx.ai/',
          },
          {
            name: 'Recent Transaction',
            href: 'https://shop.indexx.ai/collections/greeting-cards',
          },
        ],
      },
      {
        heading: 'Support',
        mainList: false,
        links: [
          {
            name: 'How to deposit',
            href: 'https://indexx.ai/indexx-exchange/coming-soon?page=$1%20Bitcoin',
          },
          {
            name: 'Know how to withdraw',
            href: 'https://indexx.ai/indexx-exchange/coming-soon?page=Document',
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
      item.mainTextMob === 'Tokens'
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
