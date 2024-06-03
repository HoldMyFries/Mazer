import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

import { routes } from '@/router/index';

// Using createMemoryHistory() here prevents an obnoxious (but probably harmless)
// warning from getting spat out every time the route changes in a test.
// This is likely due to not actually using a browser, and instead just using node.
export const buildRouter = async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: routes,
  });
  
  router.push('/');
  await router.isReady();

  return router;
};

export const wait = (time) => new Promise((resolve, _) => setTimeout(resolve, time));
export const wrapWithRouter = async (component, router) => mount(component, { global: { plugins: [router] }});
