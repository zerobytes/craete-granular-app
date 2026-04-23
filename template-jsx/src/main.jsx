import { setThemeMode } from '@granularjs/ui';
import { router } from './router.jsx';
import './styles.css';

setThemeMode('dark');

router.mount(document.getElementById('app'));
