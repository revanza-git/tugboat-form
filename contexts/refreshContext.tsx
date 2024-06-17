// RefreshContext.tsx
import React from "react";

const RefreshContext = React.createContext({
  refresh: false,
  setRefresh: (refresh: boolean) => {},
});

export const RefreshProvider = RefreshContext.Provider;
export const RefreshConsumer = RefreshContext.Consumer;

export default RefreshContext;
