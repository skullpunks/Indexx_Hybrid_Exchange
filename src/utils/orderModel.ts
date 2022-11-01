export interface OrderLite {
    orderId: string;
    currency: Currency;
    amount: number;
    status: OrderStatus;
}

export enum OrderType {
    Buy = 'Buy',
    Sell = 'Sell',
    Convert = 'Convert'
}

export enum OrderStatus {
    //Cancel = "Cancel",
    Quoted = "Quoted",
    //Paying = "Paying",
    Paid = "Paid",
    Pending = "Pending",
    // KYCApprovalPending = "KYCApprovalPending",
    // KYCApproved = "KYCApproved",
    // KYCDeclined = "KYCDeclined",
    // AMLApprovalPending = "AMLApprovalPending",
    // AMLApproved = "AMLApproved",
    // AMLDeclined = "AMLDeclined",
    // Sending = "Sending",
    // PayoutAwaitsapproval = "PayoutAwaitsapproval",
    // SendingAborted = "SendingAborted",
    //Sent = "Sent",
    // Releasingpayment = "Releasingpayment",
    // ReleasingpaymentAborted = "ReleasingpaymentAborted",
    // Releasedpayment = "Releasedpayment",
    Completed = "Completed",
    // PayoutApproved = "PayoutApproved",
    // PaymentAborted = "PaymentAborted",
    // CaptureErrored = "CaptureErrored",
    // ComplianceOfficerApproval = "ComplianceOfficerApproval",
    // CustomerResponsePending = "CustomerResponsePending",
    OrderCancelled = "OrderCancelled",
    // KYCDecline = "KYCDecline",
    ReleaseErrored = "ReleaseErrored"
}

export interface Rates {
    rate: number;
    currency: string;
}

export interface Order {
    orderId: string;
    status: OrderStatus;
    orderType: OrderType;
    merchantStatus?: string; // Order status provided by merchant and merchant name "{MerchantName} {OrderStatus updated by Merchant}"
    merchantReferenceId?: string; //OrderId of merchant for example stripe orderId
    merchantName?: string;
    orderRate: Rates; //Latest rate at which the order is received 
    merchantRateStr?: string; // Merchant rate with currency
    merchantRate?: number;
    receiverAccount: TransactionAccount;
    paymentType: PaymentTypes,
    breakdown: OrderBreakdown,
    user: UserLite,
    transactions?: OrderTransaction[],
    created: Date,
    comments?: string, // new variable to save comments while donating
    modified?: Date,
    isLocked?: boolean,
    LockedUntil?: Date,
    LockedBy?: string,
    merchantMinersFees?: number,
    exchangeFees?: number,
    orderCompletedOn: Date
}

export interface OrderTransaction {
    currency: Currency;
    amount: number;
    trnReference: string;
    trnHash: string;
    walletAddress: string;
    created: Date;
    status: string;
}

export enum UserRoleTypes {
    Standard = 'Standard',
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin',
    CustomerSupport = 'CustomerSupport'
}

export interface UserLite {
    userId: string;
    email: string; 
    firstName: string;
    lastName: string;
    role: UserRoleTypes;
    isVerified: boolean;
    language: string;
}

export interface OrderBreakdown {
    inCurrenyName: string;
    inAmount: number;
    outCurrencyName: string;
    outAmount: number;
}


export enum AuthProviders {
    Local = 'Local',
    Facebook = 'Facebook',
    Google = 'Google'
}

export enum Languages {
    US = 'en-us', // version1 language
}

export enum Currency {
    BTC = 'BTC',
    LTC = 'LTC',
    USD = 'USD',
    ETH = 'ETH',
    IN500 = 'IN500',
    INXC = 'INXC',
    IUSDP = 'IUSD+',
    BNB = 'BNB',
    BUSD = 'BUSD',
    INEX = 'INEX'
}

export enum ContactTypes {
    Default,
    Business,
    Permanent,
    Residant
}

export enum FileTypes {
    ImagePng = 'image/png',
    ImageJpg = 'image/jpg',
    VideoUrl = 'video/url'
}

export interface Contact {
    contactType: ContactTypes;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export interface Address {
    // contactType: ContactTypes;
    language: Languages;
    country: string;
    state: string;
    city: string;
    place: string;
    addressLine1: string;
    addressLine2: string;
    pincode: string;
}

export enum PaymentTypes {
    // BTC = 'BTC',
    // LTC = 'LTC',
    DirectCrypto = 'DirectCrypto',
    CC = 'CC',
    BankDirect = 'BankDirect'
}

export interface IAccountDetails {
    accountType: PaymentTypes;
    accountId: string;
    currency: string;
}

export interface AccountLite extends IAccountDetails {
    referenceName: string;
    accountHoldername: string;
    accountType: PaymentTypes;
    kycId: string; // kyc refernece
    accountId: string;
}

export interface TransactionAccount extends AccountLite, IAccountDetails {
    referenceName: string; // 
    accountHoldername: string;
    accountType: PaymentTypes;
    kycId: string; // kyc refernece
    accountId: string;
}

export interface CryptoAccount extends IAccountDetails {
    accountType: PaymentTypes;
    accountId: string;
}

export interface CreditCardAccount extends IAccountDetails {
    accountType: PaymentTypes;
    accountId: string;
    cardType: string;
}

export enum CurrencyType {
    Fiat = 'Fiat',
    Crypto = 'Crypto'
}

export interface BankAccount extends IAccountDetails {
    accountType: PaymentTypes;
    accountNumber: string;
    swift: string;
    iban: string;
    bic: string;
    ukSortCode: string;
    bsbCode: string;
    regNumber: string;
    currency: string;
    bankName: string;
    bankAddress: string;
}

export interface ResponseData<T> {
    status: number;
    data: T;
}

export interface PagedMetaData {
    next: string;
    prev: string;
    totalItems: number;
}

export interface ErrorData {
    message: string;
    error: string;
}
export interface ErrorResponse {
    status: number;
    data: ErrorData;
    // meta: PagedMetaData;
}

export interface TransactionList {
    amount: number;
    currency: string;
    orderId: string;
    blockchainHash?: string;
    userId: string;
    name: string;
    baseCurrency: string;
    orderStatus: string;
}

export interface SMTPData {
    host: string,
    port: number,
    secure: boolean,
    auth: Credentials,
    tls: TLSData
    defaultFrom: string,
    defaultTo: string,
}

export interface Credentials {
    user: string,
    pass: string
}

export interface TLSData {
    rejectUnauthorized: boolean
}

export enum TransactionType {
    BUY = 'BUY',
    SELL = 'SELL',
    DEPOSIT_FIAT = 'DEPOSIT_FIAT',
    WITHDRAW_FIAT = 'WITHDRAW_FIAT',
    DEPOSIT_CRYPTO = 'DEPOSIT_CRYPTO',
    WITHDRAW_CYRPTO = 'WITHDRAW_CRYPTO',
    CONVERT = 'CONVERT',
}

export enum WalletType {
    FundingWallet = 'FundingWallet',
    SpotWallet = 'SpotWallet',
}

export enum CurrencyAcceptance {
    None = 0,
    BUY = 1,
    SELL = 2,
    CONVERT = 3,
    DEPOSIT_FIAT = 4,
    WITHDRAW_FIAT = 5,
    DEPOSIT_CRYPTO = 6,
    WITHDRAW_CRYPTO = 7,
    ALL = 8
}