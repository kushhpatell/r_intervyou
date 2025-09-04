import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes.js';
import { config } from './config.js';

async function start() {
	const app = express();
	app.use(cors({ origin: config.corsOrigin }));
	app.use(express.json({ limit: '1mb' }));

	app.get('/', (_req, res) => res.send('IntervYou API is running. See /health and /api.'));
	app.get('/health', (_req, res) => res.json({ ok: true }));
	app.use('/api', routes);

	await mongoose.connect(config.mongoUri);
	console.log('Connected to MongoDB');

	// Listen on all interfaces so the dev server is reachable from other devices on the LAN
	const host = '0.0.0.0';
	app.listen(config.port, host, () => {
		console.log(`API listening on http://${host}:${config.port} (accessible on your LAN)`);
	});
}

start().catch((err) => {
	console.error('Fatal startup error', err);
	process.exit(1);
});
