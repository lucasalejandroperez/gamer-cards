import { ethers } from "ethers";

export const fromWei = (num:number) => ethers.utils.formatEther(num);