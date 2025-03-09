import { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextType {
  image: string;
  setImage: (image: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<string>("");

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  const context = useContext(ImageContext);

  if (!context) {
    throw new Error("useImage doesn't have any value");
  }

  return context;
}
