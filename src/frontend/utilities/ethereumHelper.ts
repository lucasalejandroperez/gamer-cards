import { ethers } from "ethers";

export const fromWei = (num:number) => ethers.utils.formatEther(num);

export const toWei = (num:number) => ethers.utils.parseEther(num.toString());