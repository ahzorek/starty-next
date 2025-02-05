import { betterFetch } from "@better-fetch/fetch";
import { auth, Session } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";


export default async function middleware(request: NextRequest) {
	//console.log('Running on Middleware :::  ', request)

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
	);

	if (!session) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"],
};