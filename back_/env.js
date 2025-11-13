import dotenv from 'dotenv';
dotenv.config();

export const env = {
  accessSecret: process.env.ACCESS_TOKEN_SECRET ?? "Ma=A9h@!n5eCretK3y",
  refreshSecret: process.env.REFRESH_TOKEN_SECRET ?? "FDQ@r3fresH$eCr3t", 
  accessTtl: process.env.JWT_ACCESS_EXPIRES_IN ?? 900000,
  refreshTtl: process.env.JWT_REFRESH_EXPIRES_IN ?? 28800000,
};
