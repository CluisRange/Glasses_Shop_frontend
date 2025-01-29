import { LENSES_MOCK } from './Mock'
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
    return fetch(`/api/lenses/?search_lens=${lens_name}&search_price_min=${lens_MinPrice}&search_price_max=${lens_MaxPrice}`).then(
        (response) => response.json()
    ).catch(() => {
        let result: ResultInter = { active_glasses_order: LENSES_MOCK.active_glasses_order, lenses: [] }
        LENSES_MOCK.lenses.forEach((lens: LensInter) => {
            if (lens.name.includes(lens_name))
                result.lenses.push(lens)
        })
        return result
    })
}

export const getLensById = async (id: number): Promise<LensInter> => {
    return fetch(`/api/lens/${id}/`).then(
        (response) => response.json()
    ).catch(() => {
        let lens_
        LENSES_MOCK.lenses.forEach((lens: LensInter) => {
            if (lens.lens_id === id)
                lens_ = lens
                
        })
        return lens_
        
    })
}