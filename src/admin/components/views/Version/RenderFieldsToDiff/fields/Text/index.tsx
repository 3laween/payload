import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../../Label';
import { diffStyles } from '../styles';
import { Props } from '../types';
import { getTranslation } from '../../../../../../../utilities/getTranslation';

import './index.scss';

const baseClass = 'text-diff';

const Text: React.FC<Props> = ({ field, locale, version, comparison, isRichText = false }) => {
  let placeholder = '';
  const { t, i18n } = useTranslation('general');

  if (version === comparison) placeholder = `[${t('noValue')}]`;

  let versionToRender = version;
  let comparisonToRender = comparison;

  if (isRichText) {
    if (typeof version === 'object') versionToRender = JSON.stringify(version, null, 2);
    if (typeof comparison === 'object') comparisonToRender = JSON.stringify(comparison, null, 2);
  }

  return (
    <div className={baseClass}>
      <Label>
        {locale && (
          <span className={`${baseClass}__locale-label`}>{locale}</span>
        )}
        {getTranslation(field.label, i18n)}
      </Label>
    </div>
  );
};

export default Text;
