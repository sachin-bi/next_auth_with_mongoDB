import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    // extract data from token
    const token = request.cookies.get("token")?.value || "";
    // ? -> fail safe
    // console.log("-----YO, token fetched here:", token);
    
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    // console.log("-------- and decodedToken is here:", decodedToken);
    

    // token as configured before
    return decodedToken.id;
  } catch (err: any) {
    // return NextResponse.json({ error: error.message }, { status: 500 });
    throw new Error(err.message);
  }
};
