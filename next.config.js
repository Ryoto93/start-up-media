/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'readdy.ai' },
			{ protocol: 'https', hostname: 'lh3.googleusercontent.com' },
			{ protocol: 'https', hostname: 'lh4.googleusercontent.com' },
			{ protocol: 'https', hostname: 'lh5.googleusercontent.com' },
			{ protocol: 'https', hostname: 'lh6.googleusercontent.com' },
			{ protocol: 'https', hostname: 'placehold.co' },
			{ protocol: 'https', hostname: 'selnkvhmuevdnakyndup.supabase.co' },
		],
	},
};

export default nextConfig;
