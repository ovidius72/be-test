import {i18nMark} from "@lingui/react";
/* import Loadable from 'react-loadable'; */
import loadable from "@loadable/component";
import React from "react";
import {Route} from "react-router-dom";

/* const AsyncPage = (page: string) => */
/*   Loadable({ */
/*     loader: () => */
/*       import( */
/*         /1* webpackMode: "lazy", webpackChunkName: "page-[index]" *1/ `../pages/${page}` */
/*       ), */
/*     loading: (props) => */
/*       props.error ? ( */
/*         <div>{JSON.stringify(props.error)}</div> */
/*       ) : ( */
/*         <div>Loading....</div> */
/*       ), */
/*   }); */

const AsyncPage = loadable((props: any) => import(`../pages/${props.page}`), {
  cacheKey: props => props.page,
  fallback: <div>Page is loading...</div>
});

export const routes = [
  {
    menu: true,
    name: i18nMark("Home"),
    route: {
      component: <AsyncPage page="Home" />,
      element: Route,
      exact: true,
      path: "/",
    },
  },
  {
    menu: true,
    name: i18nMark("Language"),
    route: {
      component: <AsyncPage page="MultiLanguage" />,
      element: Route,
      path: "/lang",
    },
  },
];
