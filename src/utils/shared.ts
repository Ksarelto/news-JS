export const getHtmlElement = (parent: HTMLElement, className: string): HTMLElement => {
    return parent.querySelector(className) as HTMLElement;
};
