import { creatorTags } from '../creatorTags.js';
import { START_WINDOW } from '../constants.js';

export function createStart(value = 4) {
  const form = creatorTags('div', ['settings']);
  const description = creatorTags(
    'p',
    ['settings__description'],
    null,
    START_WINDOW.description
  );
  const inputFieldset = creatorTags('div', ['settings__container']);
  const submitFieldset = creatorTags('div', ['settings__container']);
  const inputLabel = creatorTags('label', ['settings__label'], {
    for: 'maxСouple',
  });
  const input = creatorTags('input', ['settings__input'], {
    type: 'number',
    value: value,
    readonly: '',
    id: 'maxСouple',
  });
  const numberUp = creatorTags(
    'button',
    ['settings__calc-btn', 'settings__calc-btn--up'],
    null,
    START_WINDOW.buttons.up
  );
  const numberDown = creatorTags(
    'button',
    ['settings__calc-btn', 'settings__calc-btn--down'],
    null,
    START_WINDOW.buttons.down
  );
  const submitBtn = creatorTags('input', ['settings__button'], {
    type: 'submit',
    value: START_WINDOW.buttons.start,
  });

  inputFieldset.append(inputLabel);
  inputLabel.append(numberDown, input, numberUp);
  submitFieldset.append(submitBtn);

  form.append(description, inputFieldset, submitFieldset);

  numberDown.addEventListener('click', function (e) {
    e.preventDefault();

    let inputValue = input.value;
    if (inputValue == 2) {
      return (input.value = 2);
    }
    inputValue -= 2;
    input.value = inputValue;
  });

  numberUp.addEventListener('click', function (e) {
    e.preventDefault();

    let inputValue = Number(input.value);
    if (inputValue == 10) {
      return (input.value = 10);
    }
    inputValue += 2;
    input.value = inputValue;
  });

  return { form, submitBtn, input };
}
