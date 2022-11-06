import create from 'zustand';
import { nanoid } from 'nanoid';

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value))

export const useStore = create((set) => ({
    texture: 'dirt',
    cubes: getLocalStorage('cubes') || [],
    addCube: (x, y, z) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes,
                {
                    key: nanoid(),
                    pos: [x, y, z],
                    texture: prev.texture,
                }
            ]
        }))
    },
    removeCube: (x, y, z) => {
        set((prev) => ({
            cubes: prev.cubes.filter((cube) => {
                return !(cube.pos[0] === x && cube.pos[1] === y && cube.pos[2] === z)
            })
        }))
    },
    setTexture: (texture) => {
		set(() => ({
			texture
		}))
	},
    saveWorld: () => {
        set((prev) => {
            setLocalStorage('cubes', prev.cubes);
        })
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))
    },
}));