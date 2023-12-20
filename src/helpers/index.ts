import moment from 'moment';

function getMoment(format: string, input?: Date | string | number) {
  const momentInput = input ? moment(input) : moment();
  const momentRu = momentInput.locale('ru');

  return momentRu.format(format);
}

// eslint-disable-next-line import/prefer-default-export
export { getMoment };
