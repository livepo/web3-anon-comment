import { SiweMessage } from 'siwe';

export function createSiweMessage(
  address: string,
  statement: string
) {
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement,
    uri: window.location.origin,
    version: '1',
    chainId: 1,
  });
  return message.prepareMessage();
}
