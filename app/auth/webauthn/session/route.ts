import { User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createClient } from '@/utils/supabase/server';

const jwtSecret = process.env.SUPABASE_AUTH_JWT_SECRET!;
const jwtIssuer = process.env.SUPABASE_AUTH_JWT_ISSUER;

export async function POST(request: NextRequest) {
	const userData = await request.json();
	function createWebAuthnAccessTokenForUser(user: User) {
		const issuedAt = Math.floor(Date.now() / 1000);
		const expirationTime = issuedAt + 3600; // 1 hour expiry
		const payload = {
			iss: jwtIssuer,
			sub: user.id,
			aud: 'authenticated',
			exp: expirationTime,
			iat: issuedAt,
			email: user.email,
			phone: user.phone,
			app_metadata: user.app_metadata,
			user_metadata: user.user_metadata,
			role: 'authenticated',
			is_anonymous: false,
		};

		return jwt.sign(payload, jwtSecret, {
			algorithm: 'HS256',
			header: {
				alg: 'HS256',
				typ: 'JWT',
			},
		});
	}

	const client = await createClient();
	const accessToken = createWebAuthnAccessTokenForUser(userData);
	const { error } = await client.auth.setSession({
		access_token: accessToken,
		refresh_token: accessToken,
	});
	if (error) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
	return NextResponse.json({ status: 200 });
}
