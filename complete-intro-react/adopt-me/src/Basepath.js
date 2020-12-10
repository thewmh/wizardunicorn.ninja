import React, { createContext, useContext } from "react";

const BasepathContext = createContext("");

export function BaseRouter({ children, ...props }) {
  const [frag] = useState(document.createDocumentFragment());
  const [basepath, setBasepath] = useState("");

  useEffect(() => {
    // Get the base pathname from the href generated with @reach/router <Link/>
    const url = new URL(frag.firstChild.href);
    setBasepath(url.pathname);
  }, []);

  return (
    <>
      {createPortal(<Link to="" />, frag)}
      <BasepathContext.Provider value={basepath}>
        <Router {...props}>{children}</Router>
      </BasepathContext.Provider>
    </>
  );
}

export function useBasepath() {
  return useContext(BasepathContext) || "";
}
