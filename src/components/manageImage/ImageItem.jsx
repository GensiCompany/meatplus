import Image from "next/image";

const ImageItem = ({ file, selectedImage, setSelectedImage }) => {

    return (
        <div
            className="w-[100px] h-[100px] overflow-hidden flex items-center justify-center bg-gray-700"
            style={{
                backgroundColor: "#e9e9e9",
                border: selectedImage?._id === file?._id ? "2px solid var(--primary)" : "none"
            }}
            onClick={() => {
                setSelectedImage(file);
            }}
        >
            <Image
                src={file?.source}
                alt={"anh luu tru"}
                width={100}
                height={100}
                style={{
                    objectFit: 'contain',
                }}
            />
        </div>
    );
};

export default ImageItem;
