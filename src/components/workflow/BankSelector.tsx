import { BankAccount, bankImages } from "@/data/banks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BankSelectorProps {
  accounts: BankAccount[];
  selectedAccount: BankAccount | null;
  onSelect: (account: BankAccount) => void;
  label?: string;
}

export const BankSelector = ({
  accounts,
  selectedAccount,
  onSelect,
  label = "Select Bank Account",
}: BankSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-muted-foreground block">{label}</label>
      <Select
        value={selectedAccount?.id || ""}
        onValueChange={(value) => {
          const account = accounts.find((acc) => acc.id === value);
          if (account) onSelect(account);
        }}
      >
        <SelectTrigger className="w-full h-auto py-3 bg-background">
          <SelectValue placeholder="Choose a bank account">
            {selectedAccount && (
              <div className="flex items-center gap-3">
                <img
                  src={bankImages[selectedAccount.bankName.toLowerCase()]}
                  alt={selectedAccount.bankName}
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="text-left">
                  <p className="font-medium text-sm">{selectedAccount.bankName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedAccount.accountNumber}
                  </p>
                </div>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-popover border border-border shadow-lg z-50">
          {accounts.map((account) => (
            <SelectItem
              key={account.id}
              value={account.id}
              className="cursor-pointer hover:bg-accent focus:bg-accent group group-hover:text-black"
            >
              <div className="flex items-center gap-3 py-1">
                <img
                  src={bankImages[account.bankName.toLowerCase()]}
                  alt={account.bankName}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div>
                  <p className="font-medium group-hover:text-black">{account.bankName}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-black">
                    {account.accountNumber} • ₹{account.balance.toLocaleString()}
                  </p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
