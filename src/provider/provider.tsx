import React, { createContext, useState, useEffect } from "react";

}
type TenantType = {
  tenant: string
}
type TenantProviderType = {
  children: React.ReactNode
  application: string
}

// create context
const TenantContext = createContext<TenantType>({ tenant: "", config: {env: {}} });

const TenantProvider = ( props: TenantProviderType ) => {
  const { children } = props;

  if (!props.application) {
    throw new Error("TenantProvider: application prop is required");
  }


  const [tenant, ] = useState(props.application);

  return (
    <TenantContext.Provider value={{tenant}}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantContext, TenantProvider };