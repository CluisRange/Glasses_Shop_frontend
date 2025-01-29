import { LENSES_MOCK } from './Mock'
import {api_proxy_addr} from '../../target-config'

export interface LensInter {
    lens_id: number
    name: string
    description: string
    url: string
    price: number
}

export interface ActiveGlassesOrderInter {
    id: number
    count: number
}

export interface ResultInter {
    active_glasses_order: ActiveGlassesOrderInter
    lenses: LensInter[]
}

export const getLensesByName = async (lens_name = "", lens_MinPrice = 0, lens_MaxPrice = 0): Promise<ResultInter> => {
 
    try {
        const response = await fetch(api_proxy_addr + `/lenses/?search_lens=${lens_name}&search_price_min=${lens_MinPrice}&search_price_max=${lens_MaxPrice}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {

        let result: ResultInter = { active_glasses_order: LENSES_MOCK.active_glasses_order, lenses: [] };
        LENSES_MOCK.lenses.forEach((lens: LensInter) => {
            if (lens.name.includes(lens_name) && lens.price >= lens_MinPrice && lens.price <= lens_MaxPrice) {
                result.lenses.push(lens);
            }
        });
        return result;
    }
}

export const getLensById = async (id: number): Promise<LensInter | undefined> => {
    try {
        const response = await fetch(api_proxy_addr + `/lens/${id}/`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        return LENSES_MOCK.lenses.find((lens: LensInter) => lens.lens_id === id);
    }
}