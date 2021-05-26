import { useMemo } from "react";
import defaultConfig from "./configuration.json";

export const useInitConfig = () => {
	const initConfig = useMemo(() => {
		if (localStorage.getItem('config')) {
			return JSON.parse(localStorage.getItem('config'));
		}
		return defaultConfig;
	}, []);

	return initConfig;
}