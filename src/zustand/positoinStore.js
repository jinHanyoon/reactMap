import { create } from 'zustand'

export const usePositionStore = create((set, get) => ({
    position: { x: 0, y: 0 },
    updatePosition: (newPos) => set((state) => ({
        position: { ...state.position, ...newPos }
    })),
}))