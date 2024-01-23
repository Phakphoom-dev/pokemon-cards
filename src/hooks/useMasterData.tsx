import { IMasterData } from "@/interfaces/masterData";
import instance from "@/utils/axios";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_POKEMON_API_URL;

export const useMasterData = () => {
  const [masterData, setMasterData] = useState<IMasterData>({} as IMasterData);

  useEffect(() => {
    const raritiesPromise = instance.get(`${API_URL}/rarities`);
    const setPromise = instance.get(`${API_URL}/sets`);

    Promise.all([raritiesPromise, setPromise]).then(
      axios.spread(({ data: { data: rarities } }, { data: { data: sets } }) => {
        setMasterData({
          rarities,
          sets,
        });
      })
    );
  }, []);

  return {
    masterData,
  };
};
