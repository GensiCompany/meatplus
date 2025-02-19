'use client';

import { Input } from "antd";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

const SearchBox = () => {
    const [keyword, setKeyword] = useState("");

    const handleSearch = () => {
        window.location.href = 'tin-tuc?search=' + keyword?.trim();
    };

    return (
        <div className={'flex h-[35px]'}>
            <Input
                className={'h-full mb-0'}
                style={{ marginBottom: 0, height: '100%', borderRadius: 0 }}
                placeholder={"Tìm kiếm..."}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            <div
                className={'px-[10px] bg-[var(--primary)] text-white h-full flex items-center justify-center'}
                onClick={handleSearch}
            >
                <IoSearch size={22} />
            </div>
        </div>
    );
};

export default SearchBox;
