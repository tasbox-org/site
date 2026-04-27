import type { FunctionType, PrimitiveType, Property, Type } from "@tasbox-org/docs";

const renderLuaLSParameterList = (parameters: Property[]) =>
  parameters.map((param) => `${param.name + (param.optional ? "?" : "")}: ${renderType(param.type)}`).join(", ");

const renderLuaLSReturnList = (returns: Property[]) =>
  returns.length > 0 ? `: ${returns.map((ret) => renderType(ret.type) + (ret.optional ? "?" : "")).join(", ")}` : "";

const isUnionType = (type: Type): type is PrimitiveType[] => Array.isArray(type);

const isFunctionType = (type: Type): type is FunctionType => {
  if (typeof type !== "object" || Array.isArray(type)) {
    return false;
  }

  return type.type === "function";
};

export const renderType = (type: Type | undefined): string => {
  if (type === undefined) {
    return "";
  }

  if (isUnionType(type)) {
    return type.map(renderType).join(" | ");
  }

  if (typeof type === "string") {
    return type;
  }

  if (type.type === "array") {
    return isFunctionType(type.items) || isUnionType(type.items)
      ? `(${renderType(type.items)})[]`
      : `${renderType(type.items)}[]`;
  }

  if (isFunctionType(type)) {
    return `fun(${renderLuaLSParameterList(type.parameters)})${renderLuaLSReturnList(type.returns)}`;
  }

  return "unknown";
};
