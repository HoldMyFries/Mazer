import { enableAutoUnmount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

// TODO: Make sure doing this globally doesn't have some unintended side effects.
//       Ultimately, I just don't want to repeat this everywhere.
setActivePinia(createPinia());

// Important to ensure there isn't DOM bleed between tests.
// Ignore the red squiggle.  `globals: true` makes this available.
// Not sure why TS is complaining about it.
enableAutoUnmount(afterEach);