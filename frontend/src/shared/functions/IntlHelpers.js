import { useIntl } from 'react-intl';

export const GetTranslateText = (textId) => {
  const intl = useIntl();
  const plainText = intl.formatMessage({ id: textId });

  return plainText;
};