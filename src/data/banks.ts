export interface BankAccount {
  id: string;
  bankName: string;
  bankLogo: string;
  accountNumber: string;
  ifscCode: string;
  balance: number;
}

export const INDIAN_BANKS = [
  {
    id: "sbi",
    name: "State Bank of India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
    color: "bg-blue-600",
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png",
    color: "bg-red-600",
  },
  {
    id: "icici",
    name: "ICICI Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png",
    color: "bg-orange-600",
  },
  {
    id: "axis",
    name: "Axis Bank",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/200px-Axis_Bank_logo.svg.png",
    color: "bg-purple-700",
  },
];

// Simulated user bank accounts - each user can have multiple accounts
export const getUserBankAccounts = (userId: string): BankAccount[] => {
  return [
    {
      id: "acc1",
      bankName: "State Bank of India",
      bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
      accountNumber: "XXXX1234",
      ifscCode: "SBIN0001234",
      balance: 50000,
    },
    {
      id: "acc2",
      bankName: "HDFC Bank",
      bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png",
      accountNumber: "XXXX5678",
      ifscCode: "HDFC0001234",
      balance: 125000,
    },
    {
      id: "acc3",
      bankName: "ICICI Bank",
      bankLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png",
      accountNumber: "XXXX9012",
      ifscCode: "ICIC0001234",
      balance: 75000,
    },
  ];
};

// Simulated PIN verification (in real app, this would be server-side)
export const verifyPin = (accountId: string, pin: string): boolean => {
  // For demo purposes, valid PIN is "1234" for all accounts
  return pin === "1234";
};
