declare const YaGames: any;

declare type YandexPlayer = {
  signature: string;
  getUniqueID: () => string;
  getName: () => string;
  getPhoto: (size: 'small' | 'medium' | 'large') => string;
  setData: (data: Record<string, any>, flush?: boolean) => Promise<void>;
  getData: (keys: string[]) => Promise<Record<string, any>>;
  setStats: (stats: Record<string, number>) => Promise<void>;
  getStats: (keys: string[]) => Promise<Record<string, number>>;
  incrementStats: (stats: Record<string, number>) => Promise<Record<string, number>>;
};

declare type Purchase = {
  productID: string;
  purchaseToken: string;
  developerPayload: string;
  signature: string;
};
