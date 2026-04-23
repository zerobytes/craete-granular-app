import { createRouter } from '@granularjs/core';
import { AppLayout } from './layouts/app.layout.jsx';
import { Home } from './pages/home.page.jsx';
import { About } from './pages/about.page.jsx';

export const router = createRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      layout: AppLayout,
      children: [
        { path: '', page: Home },
        { path: 'about', page: About },
      ],
    },
  ],
});
