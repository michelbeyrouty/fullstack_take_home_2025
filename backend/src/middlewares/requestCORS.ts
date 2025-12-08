import { Request, Response, NextFunction } from "express";
import StringUtils from "../utils/string";

export default function requestCORS(req: Request, res: Response, next: NextFunction) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://fullstacktakehome2025.netlify.app'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
      res.setHeader('Access-Control-Allow-Origin', origin as string);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    next();
}
