import { creatorTags } from '../creatorTags.js';

export function createMain(game) {
  const container = creatorTags('main', ['main'], { id: 'main' });
  const section = creatorTags(
    'section',
    game
      ? ['main__container', 'main__container--game']
      : ['main__container', 'main__container--settings'],
    { id: 'container' }
  );

  container.append(section);
  return { container, section };
}
