import './style.css';
import './router.ts';
import AppLayout from './appLayout';
import { StateManager } from './state-management/stateManager.ts';

document.addEventListener('DOMContentLoaded', () => {
  StateManager.loadStateFromSessionStorage();
  AppLayout.init();
});
