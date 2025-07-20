export function getCryptoIcon(symbol: string): string {
  // List of supported crypto icons
  const supportedIcons = [
    'btc', 'eth', 'usdt', 'usdc', 'bnb', 'sol', 
    'xrp', 'ada', 'dot', 'avax', 'matic', 
    'link', 'atom', 'bnx'
  ];
  
  const normalizedSymbol = symbol.toLowerCase();
  
  if (supportedIcons.includes(normalizedSymbol)) {
    return `/assets/crypto-icons/${normalizedSymbol}.svg`;
  }
  
  // Return a colored circle with the first letter of the symbol
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#6B7280"/>
      <text x="16" y="16" font-family="Inter" font-size="14" fill="white" text-anchor="middle" dy=".3em">
        ${symbol.charAt(0).toUpperCase()}
      </text>
    </svg>
  `)}`;
}
