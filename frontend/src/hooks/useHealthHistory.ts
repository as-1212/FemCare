import type { AnemiaHistoryItem } from "../types/anemia";
import { useLocalStorageState } from "./useLocalStorage";

const STORAGE_KEY = "FemCare.history.v1";

export function useHealthHistory() {
  const [history, setHistory] = useLocalStorageState<AnemiaHistoryItem[]>(
    STORAGE_KEY,
    [],
  );

  const add = (item: AnemiaHistoryItem) =>
    setHistory((prev) => [item, ...prev].slice(0, 30));

  const clear = () => setHistory([]);

  return { history, add, clear };
}

