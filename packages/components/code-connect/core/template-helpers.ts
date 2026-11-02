import type { InstanceHandle } from 'figma';

export const renderAttribute = (name: string, value: unknown): string => {
  if (value === undefined || value === false) {
    return '';
  }
  if (value === true) {
    return name;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return `${name}="${String(value).replaceAll('\n', '\\n').replaceAll('"', '\\"')}"`;
  }
  throw new Error(`Unsupported HTML attribute value for ${name}`);
};

export const renderChildren = (instance: InstanceHandle, names: string | string[]) => {
  const selectors = Array.isArray(names) ? names : [names];
  return instance.findLayers(
    layer => layer.type === 'INSTANCE' && selectors.some(name => name === '*' || name === layer.name),
    { traverseInstances: true },
  ).flatMap(layer => (layer.type === 'TEXT' ? [] : layer.executeTemplate().example));
};

export const readNestedProps = <Props>(
  instance: InstanceHandle,
  name: string,
  read: (nestedInstance: InstanceHandle) => Props,
): Props => {
  const nestedInstance = instance.findInstance(name, { traverseInstances: true });
  if (nestedInstance.type === 'ERROR') {
    throw new Error(`Missing nested instance: ${name}`);
  }
  return read(nestedInstance);
};
