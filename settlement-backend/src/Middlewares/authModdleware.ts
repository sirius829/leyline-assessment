import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: { userId: number; type: number }; // Define the user property
}

export const authenticateMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "secret");
        req.user = decoded as { userId: number; type: number; }; // Update the type of req.user
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
};

export const authorizeMiddleware = (requiredRole: number) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.user?.type !== requiredRole) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
};