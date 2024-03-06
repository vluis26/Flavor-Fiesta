import { NextFunction, Request, Response } from "express";
import { InferType } from "yup";

// Validate incoming data before processing the request
export const validate = 
// yup schema
(schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try{
        // from yup, validate method
        await schema.validate({
            ...(req?.body && { body: req.body }),
            ...(req?.query && { query: req.query }),
            ...(req?.params && { params: req.params }),
        });
        // From NextFunction, move on to nect middleware
        return next();
    } catch (err: any){
        return res.status(400).json({ error: err.message })
    }
}