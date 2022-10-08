import { useState, useEffect, useMemo } from 'react';
import MnemonicList from 'mnemonic-words';
import { generateMnemonic } from 'bip39';

export const useMneumonicWords = (length: number) => {
  const mnemonic = generateMnemonic()

  const [mneumonicWords, setMneumonicWords] = useState<string[]>([]);

  useEffect(() => {
    setMneumonicWords([...mnemonic.split(" ")
]);
  }, [length]);
  return { mneumonicWords };
};
