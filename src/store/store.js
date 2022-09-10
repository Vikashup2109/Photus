import create from "zustand";

const ImageStore = () => ({
    images: [],
    addImages: (image) => {
        set((state) => ({
            images: [image, ...state.images],
        }))
    }
})