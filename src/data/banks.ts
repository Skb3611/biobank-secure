export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
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

export const bankImages = {
  axis: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Axis_Bank_logo.svg/200px-Axis_Bank_logo.svg.png",
  hdfc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png",
  icici: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png",
  sbi: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
}