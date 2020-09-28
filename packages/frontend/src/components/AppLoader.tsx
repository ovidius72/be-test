import React, { FC } from "react";
import {Ripple} from "./Spinners/Ripple";

export type AppLoaderProps = {
  loading: boolean;
  children: React.ReactElement;
};

const AppLoader: FC<AppLoaderProps> = ({ children, loading = false }) => {
  return (
    <div style={{ position: "relative" }} className="appLoader">
      {loading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              flexDirection: 'column',
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              position: "fixed",
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
              /* background: */
              /*   "radial-gradient(circle at center,rgba(30, 139, 195, .7) 60%, rgba(77, 5,232, .7))", */
              /* background: */
              /*   "linear-gradient(90deg, rgba(131,58,180,0.7) 0%, rgba(253,29,29,0.5) 50%, rgba(252,176,69,0.7) 100%)", */
              background: "radial-gradient(ellipse at top right, rgba(242, 111, 67, 0.5), transparent), radial-gradient(ellipse at bottom left, rgba(30,70,108, 0.5), transparent), linear-gradient(to bottom right, rgba(72,154,191, 0.5), rgba(72,120,191, 0.5), rgba(30,70,108, 0.5)"
            }}
          >
            <div>
              <Ripple size={256} />
            </div>
            <div style={{ color: 'peachpuff'}}>Loading...</div>
          </div>
          <div
            style={{
              filter: "blur(4px)",
            }}
          >
            {children}
          </div>
        </>
      ) : (
        children
      )}
    </div>
  );
};

export { AppLoader };
