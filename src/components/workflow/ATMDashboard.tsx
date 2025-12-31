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
  from: string;
  to: string;
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

  const getTransactions = async () => {
    const res = await fetch(
      `${config.apiBaseUrl}/dashboard/account/statement`,
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
  };

  useEffect(() => {
    switch (currentView) {
      case "main":
        updateData();
        break;
      case "statements":
        getTransactions();
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

  const handleTransaction = async (type: "send" | "withdraw" | "deposit") => {
    const balance = Number(user?.balance) || 0;

    // Validate negative or zero amount
    if (amt <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount.",
        variant: "destructive",
      });
      return;
    }

    switch (type) {
      case "send":
        if (!senderAccNo) {
          toast({
            title: "Missing Information",
            description: "Please enter recipient account number.",
            variant: "destructive",
          });
          return;
        }
        if (amt > balance) {
          toast({
            title: "Insufficient Balance",
            description: `You cannot send ₹${amt}. Your balance is ₹${balance}.`,
            variant: "destructive",
          });
          return;
        }
        const res = await fetch(
          `${config.apiBaseUrl}/dashboard/account/transfer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              fingerprintid: user?.fingerprintId || "",
            },
            body: JSON.stringify({
              receiverAccountNO: senderAccNo,
              amt: amt,
            }),
          }
        );
        if (res.status !== 200) {
          toast({
            title: "Transfer Failed",
            description: "Unable to complete the transfer. check the account number.",
            variant: "destructive",
          });
          return;
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentView("main");
        }, 3000);
        break;
      case "withdraw":
        if (amt > balance) {
          toast({
            title: "Insufficient Balance",
            description: `You cannot withdraw ₹${amt}. Your balance is ₹${balance}.`,
            variant: "destructive",
          });
          return;
        }
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
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentView("main");
        }, 3000);
        break;
      case "deposit":
        if (!amt) {
          return;
        }
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
            }),
          }
        );
        if (resDeposit.status !== 200) {
          return;
        }
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setCurrentView("main");
        }, 3000);
        break;
    }
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
              <CardTitle>Account Balance</CardTitle>
              <CardDescription>Your current available balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 md:py-8">
                <p className="text-muted-foreground text-sm mb-2">
                  Available Balance
                </p>
                <p className="text-4xl md:text-5xl font-bold text-primary">
                  ₹{user?.balance?.toLocaleString() || "0"}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Last updated: Just now
                </p>
              </div>
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
                onClick={() => setCurrentView("main")}
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
                  value={amt}
                  onChange={(e) => setAmt(Number(e.target.value))}
                />
              </div>
              <Button
                variant="hero"
                className="w-full"
                onClick={() => handleTransaction("send")}
              >
                Send Money
              </Button>
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
                onClick={() => setCurrentView("main")}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Withdraw Cash</CardTitle>
              <CardDescription>
                Select or enter withdrawal amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="h-12 md:h-14 text-base md:text-lg"
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
                value={amt}
                onChange={(e) => setAmt(Number(e.target.value))}
              />
              <Button
                variant="hero"
                className="w-full"
                onClick={() => handleTransaction("withdraw")}
              >
                Withdraw
              </Button>
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
                onClick={() => setCurrentView("main")}
                className="w-fit gap-2 mb-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <CardTitle>Deposit Cash</CardTitle>
              <CardDescription>Enter the amount to deposit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Amount (₹)
                </label>
                <Input
                  type="number"
                  placeholder="Enter deposit amount"
                  value={amt}
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
                onClick={() => handleTransaction("deposit")}
              >
                Confirm Deposit
              </Button>
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
                    console.log(txn);
                    return (
                      <div
                        key={txn.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                              txn.type === "deposit"
                                ? "bg-accent/20 text-accent"
                                : "bg-orange-400/20 text-orange-400"
                            }`}
                          >
                            {txn.type === "deposit" ? (
                              <ArrowUpFromLine className="w-4 h-4" />
                            ) : (
                              <ArrowDownToLine className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              {new Date(txn.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`font-semibold text-sm md:text-base ${
                            txn.type === "deposit"
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
                      Welcome, {user.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Account: {user.accountNumber}
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-xs text-muted-foreground">
                      Available Balance
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-primary">
                      ₹
                      {Array(user.balance.toLocaleString().length)
                        .fill("X")
                        .join("")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
