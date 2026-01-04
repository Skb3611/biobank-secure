import { useEffect, useState } from "react";
import {
  Wallet,
  Send,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  LogOut,
  User,
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  MoveRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { config } from "@/config";
import { USER } from "@/pages/Workflow";
import { toast } from "@/hooks/use-toast";
import { BankAccount, INDIAN_BANKS, bankImages } from "@/data/banks";
import { BankSelector } from "./BankSelector";
import { PinInput } from "./PinInput";
import { IconRight } from "react-day-picker";
import { Badge } from "../ui/badge";

interface ATMDashboardProps {
  onLogout: () => void;
  user: USER | null;
  setUser: (user: USER | null) => void;
}

type Transaction = {
  id: string;
  type: "deposit" | "withdraw" | "transfer";
  amount: number;
  createdAt: string;
  fromAccountNumber: string;
  toAccountNumber: string;
};

type DashboardView =
  | "main"
  | "balance"
  | "send"
  | "withdraw"
  | "deposit"
  | "statements";

export const ATMDashboard = ({
  onLogout,
  user,
  setUser,
}: ATMDashboardProps) => {
  const [currentView, setCurrentView] = useState<DashboardView>("main");
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [senderAccNo, setSetsenderAccNo] = useState("");
  const [amt, setAmt] = useState(0);

  // Bank account states
  const [userBankAccounts, setUserBankAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<"send" | "withdraw" | "deposit" | null>(null);
  const [pinError, setPinError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load user bank accounts
  useEffect(() => {
    updateData()
    if (user) {
      const accounts = user.accounts || [];
      setUserBankAccounts(accounts);
      console.log(user.transactions);
      setTransactions(user.transactions || []);
    }
  }, []);

  const getTransactions = async (accountNo: string) => {
    const res = await fetch(
      `${config.apiBaseUrl}/dashboard/account/statement/${accountNo}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          fingerprintid: user?.fingerprintId || "",
        },
      }
    );
    setTransactions((await res.json()).transactions || []);
  };

  const updateData = async () => {
    const res = await fetch(`${config.apiBaseUrl}/dashboard/account-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        fingerprintid: user?.fingerprintId || "",
      },
    });
    setUser((await res.json()).user || null);
    setTransactions((await res.json()).user?.transactions || []);
  };

  useEffect(() => {
    switch (currentView) {
      case "main":
        updateData();
        break;
        case "statements":
          updateData();
          setTransactions(user?.transactions || []);
          break;
    }
  }, [currentView]);


  const menuItems = [
    {
      id: "balance" as const,
      icon: Wallet,
      label: "Check Balance",
      color: "text-primary",
    },
    {
      id: "send" as const,
      icon: Send,
      label: "Send Money",
      color: "text-blue-400",
    },
    {
      id: "withdraw" as const,
      icon: ArrowUpFromLine,
      label: "Withdraw",
      color: "text-orange-400",
    },
    {
      id: "deposit" as const,
      icon: ArrowDownToLine,
      label: "Deposit",
      color: "text-accent",
    },
    {
      id: "statements" as const,
      icon: FileText,
      label: "Statements",
      color: "text-purple-400",
    },
  ];

  const initiateTransaction = (type: "send" | "withdraw" | "deposit") => {
    // Validate account selection
    if (!selectedAccount) {
      toast({
        title: "Select Bank Account",
        description: "Please select a bank account to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Validate amount
    if (amt <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      });
      return;
    }

    // For send, validate recipient
    if (type === "send" && !senderAccNo) {
      toast({
        title: "Missing Information",
        description: "Please enter recipient account number.",
        variant: "destructive",
      });
      return;
    }

    // Check balance for send and withdraw
    if ((type === "send" || type === "withdraw") && amt > selectedAccount.balance) {
      toast({
        title: "Insufficient Balance",
        description: `You cannot ${type === "send" ? "send" : "withdraw"} ₹${amt}. Your balance in ${selectedAccount.bankName} is ₹${selectedAccount.balance.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    // Show PIN input
    setPendingTransaction(type);
    setShowPinInput(true);
    setPinError("");
  };

  const handlePinSubmit = async (pin: string) => {
    if (!selectedAccount || !pendingTransaction) return;

    // Process transaction
    await handleTransaction(pendingTransaction, pin);
    setShowPinInput(false);
    setPendingTransaction(null);
    setIsProcessing(false);
  };

  const handlePinCancel = () => {
    setShowPinInput(false);
    setPendingTransaction(null);
    setPinError("");
  };

  const handleTransaction = async (type: "send" | "withdraw" | "deposit", pin: string) => {
    switch (type) {
      case "send":
        const res = await fetch(
          `${config.apiBaseUrl}/dashboard/account/transfer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              fingerprintid: user?.fingerprintId || "",
            },
            body: JSON.stringify({
              senderAccountNO: selectedAccount.accountNumber,
              receiverAccountNO: senderAccNo,
              amt: amt,
              pin: Number(pin),
            }),
          }
        );
        if (res.status !== 200) {
          const msg = (await res.json()).error;
          toast({
            title: "Transfer Failed",
            description: `Unable to complete the transfer. ${msg}`,
            variant: "destructive",
          });
          return;
        }
        // Update local balance
        setUserBankAccounts((prev) =>
          prev.map((acc) =>
            acc.id === selectedAccount?.id
              ? { ...acc, balance: acc.balance - amt }
              : acc
          )
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentView("main");
          resetTransactionState();
        }, 3000);
        break;

      case "withdraw":
        const resWithdraw = await fetch(
          `${config.apiBaseUrl}/dashboard/account/withdraw`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              fingerprintid: user?.fingerprintId || "",
            },
            body: JSON.stringify({
              amt: amt,
              bankName: selectedAccount.bankName,
              pin: Number(pin),
            }),
          }
        );
        if (resWithdraw.status !== 200) {
          toast({
            title: "Withdrawal Failed",
            description: "Unable to complete the withdrawal. Please try again.",
            variant: "destructive",
          });
          return;
        }
        // Update local balance
        setUserBankAccounts((prev) =>
          prev.map((acc) =>
            acc.id === selectedAccount?.id
              ? { ...acc, balance: acc.balance - amt }
              : acc
          )
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentView("main");
          resetTransactionState();
        }, 3000);
        break;

      case "deposit":
        const resDeposit = await fetch(
          `${config.apiBaseUrl}/dashboard/account/deposit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              fingerprintid: user?.fingerprintId || "",
            },
            body: JSON.stringify({
              amt: amt,
              bankName: selectedAccount.bankName,
            }),
          }
        );
        if (resDeposit.status !== 200) {
          toast({
            title: "Deposit Failed",
            description: "Unable to complete the deposit. Please try again.",
            variant: "destructive",
          });
          return;
        }
        // Update local balance
        setUserBankAccounts((prev) =>
          prev.map((acc) =>
            acc.id === selectedAccount?.id
              ? { ...acc, balance: acc.balance + amt }
              : acc
          )
        );
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentView("main");
          resetTransactionState();
        }, 3000);
        break;
    }
  };

  const resetTransactionState = () => {
    setSelectedAccount(null);
    setAmt(0);
    setSetsenderAccNo("");
  };

  const renderContent = () => {
    if (showSuccess) {
      return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-up">
          <CardContent className="py-12 md:py-16 text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-accent" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-accent mb-2">
              Transaction Successful!
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </CardContent>
        </Card>
      );
    }

    switch (currentView) {
      case "balance":
        return (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-up">
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("main")}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Account Balances</CardTitle>
              <CardDescription>Your linked bank accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userBankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50"
                >

                  <img
                    src={bankImages[account.bankName.toLowerCase()] || "/placeholder.svg"}
                    alt={account.bankName}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{account.bankName}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.accountNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ₹{account.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case "send":
        return (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-up">
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentView("main");
                  resetTransactionState();
                }}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Send Money</CardTitle>
              <CardDescription>
                Transfer funds to another account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showPinInput ? (
                <PinInput
                  onSubmit={handlePinSubmit}
                  onCancel={handlePinCancel}
                  isLoading={isProcessing}
                  error={pinError}
                />
              ) : (
                <>
                  <BankSelector
                    accounts={userBankAccounts}
                    selectedAccount={selectedAccount}
                    onSelect={setSelectedAccount}
                    label="From Account"
                  />
                  {selectedAccount && (
                    <p className="text-sm text-muted-foreground">
                      Available: ₹{selectedAccount.balance.toLocaleString()}
                    </p>
                  )}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Recipient Account
                    </label>
                    <Input
                      placeholder="Enter account number"
                      value={senderAccNo}
                      onChange={(e) => setSetsenderAccNo(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Amount (₹)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={amt || ""}
                      onChange={(e) => setAmt(Number(e.target.value))}
                    />
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => initiateTransaction("send")}
                  >
                    Send Money
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );

      case "withdraw":
        return (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-up">
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentView("main");
                  resetTransactionState();
                }}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Withdraw Cash</CardTitle>
              <CardDescription>
                Select account and enter withdrawal amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showPinInput ? (
                <PinInput
                  onSubmit={handlePinSubmit}
                  onCancel={handlePinCancel}
                  isLoading={isProcessing}
                  error={pinError}
                />
              ) : (
                <>
                  <BankSelector
                    accounts={userBankAccounts}
                    selectedAccount={selectedAccount}
                    onSelect={setSelectedAccount}
                    label="From Account"
                  />
                  {selectedAccount && (
                    <p className="text-sm text-muted-foreground">
                      Available: ₹{selectedAccount.balance.toLocaleString()}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    {[500, 1000, 2000, 5000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className={`h-12 md:h-14 text-base md:text-lg ${amt === amount ? "border-primary bg-primary/10" : ""}`}
                        onClick={() => setAmt(amount)}
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        or enter amount
                      </span>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter custom amount"
                    value={amt || ""}
                    onChange={(e) => setAmt(Number(e.target.value))}
                  />
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => initiateTransaction("withdraw")}
                  >
                    Withdraw
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );

      case "deposit":
        return (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-up">
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentView("main");
                  resetTransactionState();
                }}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Deposit Cash</CardTitle>
              <CardDescription>Select account and enter deposit amount</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showPinInput ? (
                <PinInput
                  onSubmit={handlePinSubmit}
                  onCancel={handlePinCancel}
                  isLoading={isProcessing}
                  error={pinError}
                />
              ) : (
                <>
                  <BankSelector
                    accounts={userBankAccounts}
                    selectedAccount={selectedAccount}
                    onSelect={setSelectedAccount}
                    label="To Account"
                  />
                  {selectedAccount && (
                    <p className="text-sm text-muted-foreground">
                      Current Balance: ₹{selectedAccount.balance.toLocaleString()}
                    </p>
                  )}
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Amount (₹)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter deposit amount"
                      value={amt || ""}
                      onChange={(e) => setAmt(Number(e.target.value))}
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-muted-foreground">
                      Please insert cash into the ATM slot after confirming the
                      deposit.
                    </p>
                  </div>
                  <Button
                    variant="hero"
                    className="w-full"
                    onClick={() => initiateTransaction("deposit")}
                  >
                    Confirm Deposit
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );

      case "statements":
        return (
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-fade-up">
            <CardHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("main")}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Account Statements</CardTitle>
              <CardDescription>Recent transaction history</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((txn) => {
                    return (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${txn.type === "deposit"
                              ? "bg-accent/20 text-accent"
                              : "bg-orange-400/20 text-orange-400"
                              }`}
                          >
                            {txn.type === "deposit" ? (
                              <ArrowDownToLine className="w-4 h-4" />
                            ) : (
                              <ArrowUpFromLine className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                          <p className="flex text-sm gap-2 items-center">
                            {txn.fromAccountNumber || "self"} <MoveRight /> {txn.toAccountNumber}
                            <Badge variant="outline">
                            {txn.type.toUpperCase()}
                            </Badge>
                          </p>
                          
                            <p className="text-xs text-muted-foreground">
                              {new Date(txn.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`font-semibold text-sm md:text-base ${txn.type === "deposit"
                            ? "text-accent"
                            : "text-orange-400"
                            }`}
                        >
                          {txn.type === "deposit" ? "+" : ""}₹
                          {Math.abs(txn.amount).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-sm text-muted-foreground">
                  No transactions found.
                </p>
              )}
            </CardContent>
          </Card>
        );

      default:
        return (
          <div className="space-y-6 animate-fade-up">
            {/* User Info */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="py-4 md:py-6">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <div className="text-center sm:text-left flex-1">
                    <h2 className="text-lg md:text-xl font-bold">
                      Welcome, {user?.name}
                    </h2>
                    {/* <p className="text-sm text-muted-foreground">
                      Account: {user?.accountNumber}
                    </p> */}
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-xs text-muted-foreground">
                      Linked Accounts
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-primary">
                      {userBankAccounts.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Linked Bank Accounts Preview */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {userBankAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/50 border border-border/50 flex-shrink-0"
                >
                  <img
                    src={bankImages[account.bankName.toLowerCase()]}
                    alt={account.bankName}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <span className="text-sm font-medium">{account.accountNumber}</span>
                </div>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {menuItems.map((item) => (
                <Card
                  key={item.id}
                  className="border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer hover:bg-card/80 hover:border-primary/50 transition-all group"
                  onClick={() => setCurrentView(item.id)}
                >
                  <CardContent className="py-6 md:py-8 text-center">
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform ${item.color}`}
                    >
                      <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <p className="font-medium text-sm md:text-base">
                      {item.label}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {/* Logout */}
              <Card
                className="border-destructive/30 bg-card/50 backdrop-blur-sm cursor-pointer hover:bg-destructive/10 hover:border-destructive/50 transition-all group"
                onClick={onLogout}
              >
                <CardContent className="py-6 md:py-8 text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 rounded-full bg-destructive/20 flex items-center justify-center group-hover:scale-110 transition-transform text-destructive">
                    <LogOut className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <p className="font-medium text-sm md:text-base text-destructive">
                    Logout
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps - only show on main dashboard */}
      {currentView === "main" && (
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {["Upload", "Verify", "Result", "Dashboard"].map((step, index) => (
            <div key={step} className="flex items-center gap-1 md:gap-2">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium bg-primary text-primary-foreground">
                {index + 1}
              </div>
              <span className="text-xs md:text-sm hidden sm:block text-foreground">
                {step}
              </span>
              {index < 3 && <div className="w-4 md:w-8 h-0.5 bg-primary" />}
            </div>
          ))}
        </div>
      )}

      {renderContent()}
    </div>
  );
};
