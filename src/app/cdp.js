import { CDPReactProvider } from "@coinbase/cdp-react/components/CDPReactProvider";

export default function CDPProvider({children}) {
  const ethereumAccountType = "eoa";

  const CDP_CONFIG = {
    projectId: process.env.NEXT_PUBLIC_CDP_PROJECT_ID,
    ethereum: {
      createOnLogin: ethereumAccountType,
    },
    appName: "Hello World",
    appLogoUrl: "http://localhost:3000/logo.svg",
    authMethods: ["email", "sms"],
  };
  return (
    <>
      <CDPReactProvider config={CDP_CONFIG}>
        {children}
      </CDPReactProvider>
    </>
  );
}
