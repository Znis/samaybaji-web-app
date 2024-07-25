import './style.css';
import './router.ts';
import AppLayout from './appLayout';
import { StateManagement } from './state-management/stateManagement.ts';

document.addEventListener('DOMContentLoaded', () => {
  StateManagement.loadStateFromSessionStorage();
  AppLayout.init();
});
