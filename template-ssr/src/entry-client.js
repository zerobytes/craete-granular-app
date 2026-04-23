import { installDevtoolsHook } from '@granularjs/core';
import { setThemeMode } from '@granularjs/ui';
import { router } from './router.js';
import './styles.css';

if (import.meta.env.DEV) installDevtoolsHook();

setThemeMode('dark');

router.mount(document.getElementById('app'));
