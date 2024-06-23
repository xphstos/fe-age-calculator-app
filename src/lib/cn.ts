import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': Object.keys({
				label: ['.875rem', { letterSpacing: '0.025em', fontWeight: '700', lineHeight: '1.5' }],
				error: ['.875rem', { lineHeight: '1.5' }],
				input: ['2rem', { fontWeight: '700', lineHeight: '1' }],
				output: ['6.25rem', { lineHeight: '1', fontWeight: '800' }]
			}).map((key) => `text-${key}`)
		}
	}
});
export const cn = (...args: ClassValue[]) => twMerge(clsx(...args));
