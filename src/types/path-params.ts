export type PathParams = {
  "/api/[library]": {
    library: string;
  };
  "/api/[library]/class/[class]": {
    class: string;
  } & PathParams["/api/[library]"];
  "/api/[library]/constant/[constant]": {
    constant: string;
  } & PathParams["/api/[library]"];
  "/api/[library]/enum/[enum]": {
    enum: string;
  } & PathParams["/api/[library]"];
  "/api/[library]/event/[event]": {
    event: string;
  } & PathParams["/api/[library]"];
  "/api/[library]/function/[function]": {
    function: string;
  } & PathParams["/api/[library]"];
};
