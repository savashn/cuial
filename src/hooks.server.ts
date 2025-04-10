import * as amp from '@sveltejs/amp';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    let buffer = '';
    return await resolve(event, {
        transformPageChunk: ({ html, done }) => {
            buffer += html;
            if (done) return amp.transform(buffer);
        }
    });
};