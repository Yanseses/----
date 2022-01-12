import { QUASTION } from '../constants.js';
import { creatorTags } from '../creatorTags.js';

export function createQuastionWindow() {
  const backBlock = creatorTags('div', ['question']);
  const block = creatorTags('div', ['question__container']);
  const headText = creatorTags('h3', ['question__heading'], null, QUASTION.heading);
  const wrapperBtn = creatorTags('div', ['quastion__btn-wrapper']);
  const moreTimeBtn = creatorTags('button', ['question__button'], {type: 'button'}, QUASTION.moreTime);
  const noMoreTimeBtn = creatorTags('button', ['question__button'], {type: 'button'}, QUASTION.noMoreTime);

  block.append(headText, moreTimeBtn, noMoreTimeBtn);
  backBlock.append(block);

  return { backBlock, noMoreTimeBtn, moreTimeBtn };
}
