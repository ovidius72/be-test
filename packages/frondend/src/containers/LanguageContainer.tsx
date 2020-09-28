import { Trans } from "@lingui/macro";
import React, { ChangeEvent, useCallback } from "react";
import { shallowEqual } from "react-redux";
import { languageActions, selectedLanguage } from "src/features/language/language.slice";
import { useAppDispatch, userAppSelector } from "src/store/store";

const LanguageContainerApp = () => {
  const lang = userAppSelector(selectedLanguage, shallowEqual);
  const dispatch = useAppDispatch();

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const lang = e.target.value;
      dispatch(languageActions.loadLanguage(lang));
    },
    [lang]
  );

  return (
    <>
      <Trans render="span" css={{ padding: 7 }}>Current Language: {lang}</Trans>
      <select value={lang} onChange={handleOnChange}>
        <option value="en">EN</option>
        <option value="it">IT</option>
      </select>
    </>
  );
};

const LanguageContainer = React.memo(LanguageContainerApp);
export { LanguageContainer };
