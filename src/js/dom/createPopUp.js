import { QUASTION } from '../constants.js';
import { creatorTags } from '../creatorTags.js';

export function createPopUp() {
  const backBlock = creatorTags('div', ['question']);
  const block = creatorTags('div', ['question__container']);
  const headText = creatorTags(
    'h3',
    ['question__heading'],
    null,
    QUASTION.heading
  );
  const wrapperBtn = creatorTags('div', ['question__btn-wrapper']);
  const moreTimeBtn = creatorTags(
    'button',
    ['question__button'],
    { type: 'button' },
    QUASTION.moreTime
  );
  const noMoreTimeBtn = creatorTags(
    'button',
    ['question__button'],
    { type: 'button' },
    QUASTION.noMoreTime
  );

  backBlock.addEventListener('click', function (e) {
    if (e.target == this) {
      this.remove();
    }
  });

  wrapperBtn.append(moreTimeBtn, noMoreTimeBtn);
  block.append(headText, wrapperBtn);
  backBlock.append(block);

  return { backBlock, noMoreTimeBtn, moreTimeBtn };
}
