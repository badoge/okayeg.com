export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/api": [3],
		"/bounty": [4],
		"/clips": [5],
		"/commands": [6],
		"/egdle": [7],
		"/leaderboard": [8],
		"/market": [9],
		"/mod": [10],
		"/profile": [11],
		"/recap": [12],
		"/stocks": [13],
		"/stream": [14],
		"/trivia": [15],
		"/twitch": [16],
		"/twitch/emotes": [18],
		"/twitch/emote": [17],
		"/twitch/global": [19],
		"/twitch/global/emotes": [20],
		"/twitch/stats": [21],
		"/twitch/subs": [22],
		"/twitch/time": [23],
		"/twitch/user": [24],
		"/[...path]": [25]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';