"use client";

import React, { act, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  VerticalDotsIcon,
} from "@/utils/icon";
import { messengers, types } from "@/config/constants";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import { RiSlideshow2Fill, RiSlideshow2Line } from "react-icons/ri";
import toast from "react-hot-toast";

export const columns = [
  //   { name: "registerId", uid: "registerId", sortable: true },
  //   { name: "ownerIdCard", uid: "ownerIdCard", sortable: true },
  // { name: "EMAIL", uid: "profile" },
  { name: "شماره تماس مالک آیدی", uid: "ownerIdPhone", sortable: true },
  { name: "مالک آیدی؟", uid: "isOwnerId", sortable: true },
  { name: "کد آگهی", uid: "code" },
  { name: "استان", uid: "province", sortable: true },
  { name: "شهر", uid: "city" },
  { name: "عنوان", uid: "title" },
  { name: "آیدی", uid: "id" },
  { name: "پیام رسان", uid: "messenger" },
  { name: "نوع", uid: "type" },
  { name: "موضوع", uid: "subject" },
  { name: "توضیحات", uid: "description" },
  { name: "تعداد اعضا", uid: "members", sortable: true },
  { name: "قیمت توافقی", uid: "agreedPrice" },
  { name: "قیمت", uid: "price", sortable: true },
  { name: "تخفیف", uid: "discount", sortable: true },
  { name: "تعداد بازدید", uid: "views", sortable: true },
  { name: "تعداد نشان", uid: "bookmarks", sortable: true },

  { name: "سال ساخت", uid: "createDate", sortable: true },
  { name: "شماره تماس نشان داده شود؟", uid: "isShowPhoneOwnerIdCard" },
  { name: "شماره تماس", uid: "contactWithPhone" },
  { name: "ارتباط از طریق آیدی؟", uid: "isContactWithId" },
  { name: "آیدی پشتیبان؟", uid: "contactWithId" },
  { name: "نوع پیام رسان", uid: "contactTypeMessenger" },
  { name: "ثبت کننده آگهی", uid: "registerAdsWith" },
  { name: "وضعیت", uid: "status" },
  { name: "حذف شده", uid: "isRemoved" },
  { name: "نمایش", uid: "isShow" },
  { name: "تایید شده", uid: "isConfirm" },
  { name: "تاریخ ایجاد", uid: "createdAt", sortable: true },
  { name: "تاریخ بروزرسانی", uid: "updatedAt", sortable: true },
  { name: "عملیات", uid: "actions" },
];

export const statusOptions = [
  { name: "فعال", uid: "active" },
  { name: "غیرفعال", uid: "paused" },
  { name: "حذف شده", uid: "removed" },
];
export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "title",
  "messenger",
  "type",
  "views",
  "bookmarks",
  "updatedAt",
  "actions",
];
function MyBookmarks({ ownerIdCard, goToAds }) {
  //? action 1: my Ads   2: get bookmarks ads
  const [ads, setAds] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(`/api/ads/bookmark/get/${ownerIdCard}`);

        const data = await response.json();

        if (data?.status == 200) {
          const { idsCard } = data;
          const newAds = idsCard.map((prev) => {
            return {
              ...prev,
              updatedAt: new Date(prev?.updatedAt).toLocaleString("fa-IR"),
            };
          });
          setAds(newAds);
        } else {
          toast.error(data?.message);
        }

        // console.log(data);
      } catch (error) {
        console.log("Error from get ads >", error);
      }
    };
    fetchAds();
  }, [refresh]);

  // useEffect(() => {}, [refresh]);
  const deletedBookmark = async (adsId) => {
    try {
      const response = await fetch(
        `/api/ads/bookmark/delete/${ownerIdCard}/${adsId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.status == 201) {
        toast.success(data.message);

        setRefresh((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error from remove my bookmark --->", error);
    }
  };

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "updatedAt",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredAds = [...ads];

    if (hasSearchFilter) {
      filteredAds = filteredAds.filter((ad) =>
        ads.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      filteredAds = filteredAds.filter(
        (ad) =>
          ad?.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          ad?.id.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredAds = filteredAds.filter((ad) =>
        Array.from(statusFilter).includes(ad.status)
      );
    }

    return filteredAds;
  }, [ads, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((ad, columnKey) => {
    const cellValue = ad[columnKey];

    switch (columnKey) {
      case "messenger":
        return (
          <div className="flex flex-col">
            {/* <p className="text-bold text-small capitalize">{cellValue}</p> */}
            <p className="text-bold text-tiny capitalize text-default-400">
              {messengers[cellValue - 1].title}
            </p>
          </div>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">
              {types[cellValue - 1].title}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[ad?.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="لغو نشان">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deletedBookmark(ad._id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
            <Tooltip color="primary" content="نمایش آگهی">
              <span
                className="text-lg text-primary cursor-pointer active:opacity-50"
                onClick={() => goToAds(ad?._id, ad?.title)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="جستجو براساس عنوان یا آیدی "
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  وضعیت
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  ستون ها
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {/* <Button color="primary" endContent={<PlusIcon />}>
              آگهی جدید
            </Button> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">{ads.length} آگهی</span>
          <label className="flex items-center text-default-400 text-small">
            تعداد آیتم در صفحه:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    ads.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div dir="rtl" className="py-2 px-2 flex justify-between items-center">
        {/* <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} از ${filteredItems.length} انتخاب شده`}
        </span> */}
        <Pagination
          dir="rtl"
          isCompact
          // showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            قبلی
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            بعدی
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      isStriped
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[450px]",
      }}
      selectedKeys={selectedKeys}
      //   selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"آگهی نشان شده ای یافت نشد"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default MyBookmarks;
