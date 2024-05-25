import { createPinia, setActivePinia } from 'pinia';

// TODO: Make sure doing this globally doesn't have some unintended side effects.
//       Ultimately, I just don't want to repeat this everywhere.
setActivePinia(createPinia())