export function DevToolsAdd() {
  return function (target: any, propertyKey: string) {
    let value: any;

    // If __exportProps__ doesn't exist, create it
    if (!target.__exportProps__) {
      target.__exportProps__ = [];
    }

    // Add the property name to the __exportProps__ list
    target.__exportProps__.push(propertyKey);
    // Use Object.defineProperty to add getter and setter for the property
    Object.defineProperty(target, propertyKey, {
      get() {
        return value;
      },
      set(newVal: any) {
        value = newVal;
        // You can add any other logic here to track or notify about the change
      },
      enumerable: true,
      configurable: true,
    });
  };
}
