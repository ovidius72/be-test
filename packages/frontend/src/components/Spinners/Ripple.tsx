import {keyframes} from "@emotion/core";
import styled from "@emotion/styled";
import React, {FC} from "react";

export type RippleProps = {
  color?: string;
  className?: string;
  size?: number;
  style?: React.CSSProperties;
};

const rippleMotion = () =>
  keyframes`
  0% {
    top: 45%;
    left: 45%;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 90%;
    height: 90%;
    opacity: 0;
  }
`;

const RippleDiv = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${() => rippleMotion()} 1.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-of-type(2) {
      animation-delay: -0.7s;
    }
  }
`;

const Ripple: FC<RippleProps> = ({
  color = "#7f58af",
  style,
  size = 80,
}) => {
  const circles = [...Array(2)].map((_, index) => (
    <div
      key={index}
      style={{
        borderColor: `${color}`,
        borderWidth: size * 0.05,
      }}
    />
  ));

  return (
    <RippleDiv
      /* className={classNames(styles["lds-ripple"], className)} */
      style={{ width: size, height: size, ...style }}
    >
      {circles}
    </RippleDiv>
  );
};

export {Ripple};
