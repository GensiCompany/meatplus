const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getImageLink=(link)=>{
    // return apiUrl + "/resource/" +link;
    // return link;
    return link ? link.replace('https://api.synck.io.vn/proxy/files/', 'https://firebasestorage.googleapis.com/v0/b/gensi-8df36.appspot.com/o/') : link || '';
}

export function createUrlFriendly(input) {
    const removeVietnameseTones = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D");
    };

    return removeVietnameseTones(input)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}