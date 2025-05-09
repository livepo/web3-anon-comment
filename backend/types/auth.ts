export interface WalletLoginBody {
  walletAddress: string;
}

export interface VerifyBody {
  walletAddress: string;
  signature: string;
}
