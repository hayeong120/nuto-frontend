import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ImageContextType {
  image: string;
  setImage: (image: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<string>(() => {
    const savedImage = sessionStorage.getItem("image");
    return savedImage ? JSON.parse(savedImage) : "";
  });

  useEffect(() => {
    if (image) {
      sessionStorage.setItem("image", JSON.stringify(image));
    }
  }, [image]);

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
