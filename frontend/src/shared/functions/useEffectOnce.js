import React from "react";

export function useEffectOnce(callback, when) {
  const hasRunOnce = React.useRef(false);
  React.useEffect(() => {
    if (when && !hasRunOnce.current) {
      callback();
      hasRunOnce.current = true;
    }
  }, [when]);
};