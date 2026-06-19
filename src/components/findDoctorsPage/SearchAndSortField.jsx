"use client";

import { SearchField, Select, Label, ListBox, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";

const SearchAndSortField = ({ filters }) => {
  const [searchValue, setSearchValue] = useState(filters?.search || "");
  const [sortValue, setSortValue] = useState(filters?.sortBy || "");

  const router = useRouter();

  const sortItems = [
    {
      id: "fee",
      name: "Fee",
    },
    {
      id: "experience",
      name: "Experience",
    },
    {
      id: "rating",
      name: "Rating",
    },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (searchValue) {
      searchParams.set("search", searchValue);
    }

    if (sortValue) {
      searchParams.set("sortBy", sortValue);
    }

    const queryPath = `?${searchParams.toString()}`;
    router.push(queryPath);
  }, [searchValue, sortValue, router]);

  return (
    <div className="grid grid-cols lg:grid-row gap-7.5 lg:grid-cols-10">
      {/* search */}
      <SearchField
        name="search"
        value={searchValue}
        onChange={setSearchValue}
        className="w-full lg:col-span-6"
      >
        <SearchField.Group className={"px-2 h-15"}>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      {/* sort */}
      <div className="w-full lg:col-span-4 relative">
        <Select
          placeholder="Sorting"
          value={sortValue}
          onChange={(value) => setSortValue(value)}
        >
          <Select.Trigger className={"py-4.75 pr-10"}>
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
              {sortItems.map((item, index) => (
                <ListBox.Item key={index} id={item.id} textValue={item.name}>
                  {item.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* sort value clear button */}
        {sortValue && (
          <Button
            onClick={() => setSortValue("")}
            className="px-0 h-auto bg-transparent absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
          >
            <MdClear />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchAndSortField;
