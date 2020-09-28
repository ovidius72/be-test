import {I18nProvider} from "@lingui/react";
import {ConnectedRouter} from "connected-react-router";
import "core-js";
import {ThemeProvider} from "emotion-theming";
import React, {useCallback, useEffect, useState} from "react";
import {shallowEqual} from "react-redux";
import {AppLoader} from "./components/AppLoader";
import {
  CatalogType,
  languageActions,
  loadLanguageCatalog,
  selectedLanguage
} from "./features/language/language.slice";
import {selectedLayoutTheme} from "./features/layout/layout.slice";
import {loginWithToken} from "./features/login/login.thunks";
import Routes from "./routes";
import {history} from "./store/rootReducer";
import {useAppDispatch, userAppSelector} from "./store/store";
import GlobalStyles from "./styles";
import {ITheme} from "./utils/styled";

const AppThemeProvider = (props: any) => ThemeProvider<ITheme>(props);

const App: React.FC = () => {
  const [catalog, setCatalog] = useState<CatalogType | undefined>();
  const lang = userAppSelector(selectedLanguage, shallowEqual);
  const theme = userAppSelector(selectedLayoutTheme, shallowEqual);
  const languageLoading = userAppSelector(
    (s) => s.language.loading,
    shallowEqual
  );
  const dispatch = useAppDispatch();

  const loadCatalog = useCallback(async () => {
    const cat = await loadLanguageCatalog(lang);
    if (cat) {
      setCatalog(cat);
      dispatch(languageActions.loadLanguageSuccess());
    } else {
      dispatch(
        languageActions.loadLanguageError(
          `Error loading the catalog for the selected language: ${lang}`
        )
      );
    }
  }, [lang]);

  const tokenLogin = async () => {
    dispatch(loginWithToken());
  };

  useEffect(() => {
    tokenLogin();
    loadCatalog();
  }, [lang]);

  return (
    <I18nProvider language={lang} catalogs={catalog}>
      <AppLoader loading={languageLoading}>
        <ConnectedRouter history={history}>
          <AppThemeProvider theme={theme}>
            <GlobalStyles />
            <Routes />
          </AppThemeProvider>
        </ConnectedRouter>
      </AppLoader>
    </I18nProvider>
  );
};

export default App;
