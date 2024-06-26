import getTokenFromHeader from "../auth/getTokenFromHeader.mjs";
import { jsonResponse } from "../lib/jsonResponse.mjs";
import Token from "../models/token.mjs";
import {verifyRefreshToken} from "../auth/verifyToken.mjs";
import {generateAccessToken} from "../auth/generateTokens.mjs"



const postRefreToken= async(req, res)=>{

    const refreshToken = getTokenFromHeader(req.headers);

    if(refreshToken){
        try {
            const found = await Token.findOne({token: refreshToken})
            console.log('ESTE ES EL POST REFRESTOKEN');
            if(!found){
                return res.status(401).send(jsonResponse( {error: "Unauthorized"}))
            }

            const payload = verifyRefreshToken(found.token);
            console.log('veryficacionRefresToken',payload);

            if(payload){
               const accessToken = generateAccessToken(payload.use);
                console.log("este es generateaccesToken",accessToken);

               return res.status(200).json(jsonResponse({accessToken}))
            }else{
                return res.status(401).send(jsonResponse( {error: "Unauthorized"}))
            }
            
        } catch (error) {
            return res.status(401).send(jsonResponse( {error: "Unauthorized"}))
        }

    }else{
        res.status(401).send(jsonResponse( {error: "Unauthorized"}))
    }
    res.send("refresh-token");

}
export default postRefreToken