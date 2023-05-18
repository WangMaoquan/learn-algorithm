export class LinkNode<T = any> {
  next: LinkNode<T> | null = null;
  value: T;
  constructor(v: T) {
    this.value = v;
  }
}

export class LinkHead<T = any> {
  next: LinkNode<T> | null = null;
  constructor() {}
}

export function printLinkList<T>(
  linkList: LinkNode<T> | LinkHead<T>,
  separator = '->',
) {
  let current = 'value' in linkList ? linkList : linkList.next;
  const result: T[] = [];
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  return result.join(separator);
}

const linkList = new LinkNode(1);
linkList.next = new LinkNode(2);
