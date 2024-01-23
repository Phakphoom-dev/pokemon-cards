export interface IPokemonCardQuery {
  queryObject: Record<string, string>;
  q?: string;
  page: number;
  pageSize: number;
}

export interface IPokemonAttack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface IPokemonWeakness {
  type: string;
  value: string;
}

export interface IPokemonResistance {
  type: string;
  value: string;
}

export interface IPokemonSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export interface IPokemonImages {
  small: string;
  large: string;
}

export interface IPokemonTcgPlayerPrices {
  holofoil: {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: null;
  };
  reverseHolofoil: {
    low: number;
    mid: number;
    high: number;
    market: number;
    directLow: number;
  };
}

export interface IPokemonCardMarketPrices {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

export interface IPokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp: string;
  types: string[];
  evolvesFrom: string;
  attacks: IPokemonAttack[];
  weaknesses: IPokemonWeakness[];
  resistances: IPokemonResistance[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: IPokemonSet;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: {
    unlimited: string;
  };
  images: IPokemonImages;
  tcgplayer: {
    url: string;
    updatedAt: string;
    prices: IPokemonTcgPlayerPrices;
  };
  cardmarket: {
    url: string;
    updatedAt: string;
    prices: IPokemonCardMarketPrices;
  };
}

export interface IViewer {
  url: string;
  onClose: () => void;
}

export interface IPokemonCardResponse {
  data: IPokemonCard[];
  page: number;
  pageSize: number;
  totalCount: number;
  count: number;
}
