
import dotenv from 'dotenv';

dotenv.config();

function parseCorsOrigin(raw?: string) {
	if (!raw) return undefined;
	// allow comma-separated list of origins
	const parts = raw.split(',').map((p) => p.trim()).filter(Boolean);
	return parts.length === 1 ? parts[0] : parts;
}

export const config = {
	nodeEnv: process.env.NODE_ENV || 'development',
	port: parseInt(process.env.PORT || '4000', 10),
	mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/intervyou',
	jwtSecret: process.env.JWT_SECRET || 'change-me-in-env',
	// In development allow any origin by default so LAN-hosted frontend can connect.
	// In production, set CORS_ORIGIN to the allowed origin(s) (comma-separated).
	corsOrigin: parseCorsOrigin(process.env.CORS_ORIGIN) ?? (process.env.NODE_ENV === 'production' ? 'http://localhost:5173' : '*'),
};

