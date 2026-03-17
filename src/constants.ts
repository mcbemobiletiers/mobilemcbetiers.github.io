import { Category, Player } from './types';

export const CATEGORIES: Category[] = [
  { id: 'overall', name: 'Overall' },
  { id: 'ltm', name: 'LTMs' },
  { id: 'vanilla', name: 'Vanilla' },
  { id: 'uhc', name: 'UHC' },
  { id: 'pot', name: 'Pot' },
  { id: 'nethop', name: 'NethOP' },
  { id: 'smp', name: 'SMP' },
  { id: 'sword', name: 'Sword' },
  { id: 'axe', name: 'Axe' },
  { id: 'mace', name: 'Mace' },
];

export const MOCK_PLAYERS: Player[] = [
  { id: '1', name: 'Dream', uuid: 'ec70bc63-0063-4485-a6b5-53160c35d375', tier: 'S+', rank: 1, category: 'overall', winRate: 98, matches: 1200, lastActive: '2h ago' },
  { id: '2', name: 'Technoblade', uuid: 'b8766990-04d3-4970-abe9-77d959d85d6d', tier: 'S+', rank: 2, category: 'overall', winRate: 99, matches: 1500, lastActive: 'Legacy' },
  { id: '3', name: 'Fruitberries', uuid: '56860012-7935-430c-8060-19349896796c', tier: 'S', rank: 3, category: 'overall', winRate: 95, matches: 800, lastActive: '1d ago' },
  { id: '4', name: 'Illumina', uuid: '685d564b-8575-4340-9f17-5e6e3c545396', tier: 'S', rank: 4, category: 'overall', winRate: 94, matches: 750, lastActive: '3h ago' },
  { id: '5', name: 'Sapnap', uuid: '1060993c-64c0-4902-9092-200330fa3122', tier: 'A', rank: 5, category: 'overall', winRate: 92, matches: 1100, lastActive: '5h ago' },
  { id: '6', name: 'Purpled', uuid: '9785834d-888e-473d-82d2-888497672223', tier: 'A', rank: 6, category: 'overall', winRate: 91, matches: 900, lastActive: '12h ago' },
  { id: '7', name: 'Punz', uuid: '7927702a-9e6b-4e68-9f17-5e6e3c545396', tier: 'B', rank: 7, category: 'overall', winRate: 88, matches: 1000, lastActive: '1d ago' },
  { id: '8', name: 'Quig', uuid: '12345678-1234-1234-1234-123456789012', tier: 'B', rank: 8, category: 'overall', winRate: 87, matches: 850, lastActive: '2d ago' },
  { id: '9', name: 'PeteZahHutt', uuid: '22345678-1234-1234-1234-123456789012', tier: 'C', rank: 9, category: 'overall', winRate: 85, matches: 950, lastActive: '3d ago' },
  { id: '10', name: 'Vikkstar123', uuid: '32345678-1234-1234-1234-123456789012', tier: 'D', rank: 10, category: 'overall', winRate: 80, matches: 700, lastActive: '1w ago' },
];
