import { creatorTags } from '../creatorTags.js';
import { FINAL_WINDOW } from '../constants.js';

export function createFinalWindow(win) {
  const finalContainer = creatorTags('div', ['settings']);
  const finalHeading = creatorTags(
    'h2',
    ['settings__heading'],
    null,
    win ? FINAL_WINDOW.winHead : FINAL_WINDOW.looseHead
  );
  const finalDescription = creatorTags(
    'p',
    ['settings__description'],
    null,
    FINAL_WINDOW.descr
  );
  const btnContainer = creatorTags('div', ['settings__container']);
  const replayBtn = creatorTags(
    'button',
    ['settings__button'],
    { type: 'button' },
    FINAL_WINDOW.buttons.new
  );
  const startWindowBtn = creatorTags(
    'button',
    ['settings__button'],
    { type: 'button' },
    FINAL_WINDOW.buttons.repeat
  );

  btnContainer.append(replayBtn, startWindowBtn);
  finalContainer.append(finalHeading, finalDescription, btnContainer);

  return { finalContainer, replayBtn, startWindowBtn };
}
