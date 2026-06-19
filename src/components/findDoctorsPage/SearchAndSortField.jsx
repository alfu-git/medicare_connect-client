"use client";

import { SearchField, Select, ListBox, Button } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import { MdClear } from "react-icons/md";
import { motion } from "framer-motion";

const SearchAndSortField = ({ params }) => {
  const [searchValue, setSearchValue] = useState(params?.search || "");
  const [sortValue, setSortValue] = useState(params?.sortBy || "");

  const searchParams = useSearchParams();
  const router = useRouter();
  const timerRef = useRef(null);

  const sortItems = [
    { id: "fee", name: "Fee" },
    { id: "experience", name: "Experience" },
    { id: "rating", name: "Rating" },
  ];

  // 🔥 Common function for updating URL
  const updateQuery = (newSearch, newSort) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newSearch) {
      params.set("search", newSearch);
    } else {
      params.delete("search");
    }

    if (newSort) {
      params.set("sortBy", newSort);
    } else {
      params.delete("sortBy");
    }

    router.push(`/find-doctors?${params.toString()}`);
  };

  // 🔍 Search handler (with debounce)
  const handleSearchValue = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      updateQuery(value, sortValue);
    }, 800);
  };

  // sort handler
  const handleSortChange = (value) => {
    setSortValue(value);
    updateQuery(searchValue, value);
  };

  return (
    <div className="grid grid-cols lg:grid-row gap-7.5 lg:grid-cols-10">
      {/* search */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        viewport={{ once: true }}
        className="w-full lg:col-span-6 overflow-hidden"
      >
        <SearchField>
          <SearchField.Group className={"px-2 h-15 hover:bg-white"}>
            <SearchField.SearchIcon />
            <SearchField.Input
              placeholder="Search..."
              name="search"
              value={searchValue}
              onChange={handleSearchValue}
            />
            <SearchField.ClearButton
              onClick={() => {
                setSearchValue("");
                updateQuery("", sortValue);
              }}
            />
          </SearchField.Group>
        </SearchField>
      </motion.div>

      {/* sort */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
        viewport={{ once: true }}
        className="w-full lg:col-span-4 relative"
      >
        <Select
          placeholder="Sorting"
          value={sortValue}
          onChange={handleSortChange}
        >
          <Select.Trigger className={"py-4.75 pr-10 hover:bg-white"}>
            <Select.Value />
            <Select.Indicator
              className={
                sortValue
                  ? "mr-5 transition-all duration-500"
                  : "transition-all duration-500"
              }
            />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              {sortItems.map((item) => (
                <ListBox.Item key={item.id} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* clear Sort */}
        {sortValue && (
          <Button
            onClick={() => {
              setSortValue("");
              updateQuery(searchValue, "");
            }}
            className="px-0 h-auto bg-transparent absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <MdClear />
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default SearchAndSortField;
