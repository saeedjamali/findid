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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CircularProgress,
  Skeleton,
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
import { messengers, status, types } from "@/config/constants";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { IoChevronUpCircleOutline } from "react-icons/io5";
import { RiSlideshow2Fill, RiSlideshow2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useAppProvider } from "@/app/context/AppProvider";
import { useRouter } from "next/navigation";

export const columns = [
  //   { name: "registerId", uid: "registerId", sortable: true },
  //   { name: "ownerIdCard", uid: "ownerIdCard", sortable: true },
  // { name: "EMAIL", uid: "profile" },
  { name: "شماره تماس مالک آگهی", uid: "phone", sortable: true },
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
  { name: "حذف شده", uid: "isRemoved", sortable: true },
  { name: "نمایش", uid: "isShow", sortable: true },
  { name: "تایید شده", uid: "isConfirm" },
  { name: "تاریخ ایجاد", uid: "createdAt", sortable: true },
  { name: "تاریخ بروزرسانی", uid: "updatedAt", sortable: true },
  { name: "عملیات", uid: "actions" },
];

export const statusOptions = [
  { name: "نمایش", uid: "active" },
  { name: "عدم نمایش", uid: "paused" },
  // { name: "حذف شده", uid: "removed" },
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
  "isRemoved",
  "status",
  "isShow",
  "actions",
];
function MyAds({ ownerIdCard, goToAds }) {
  //? action 1: my Ads   2: get bookmarks ads
  const router = useRouter();
  const [ads, setAds] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthUser, setCurrentAd } = useAppProvider();
  const [currentAds, setCurrentAds] = useState({});
  const { phone, _id, role } = isAuthUser;
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingShow, setIsLoadingShow] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    // let url =
    //   views == 1
    //     ? "/api/ads/get/userid"
    //     : views == 2
    //     ? "/api/ads/bookmark/get/"
    //     : "";
    const fetchAds = async () => {
      try {
        const response = await fetch(`/api/ads/get/userid/${ownerIdCard}`);

        const data = await response.json();

        if (data?.status == 200) {
          const { idsCard } = data;

          const newAds = idsCard.map((prev) => {
            return {
              ...prev,
              updatedAt: new Date(prev?.updatedAt).toLocaleString("fa-IR"),
              phone: prev?.ownerIdCard?.phone,
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

  const deleteMyAds = async () => {
    console.log("ownerIdCard:", ownerIdCard);
    onClose();
    setIsLoadingDelete(true);
    try {
      const response = await fetch(`/api/ads/deleteads`, {
        method: "PUT",
        body: JSON.stringify({
          ownerIdCard,
          adsId: currentAds._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status == 200) {
        setRefresh((prev) => !prev);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      setIsLoadingDelete(false);
    } catch (error) {
      console.log(error);
      setIsLoadingDelete(false);
    }
  };

  const handleShowAds = async (ads) => {
    // console.log(ads)
    setIsLoadingShow(true);
    try {
      const response = await fetch(`/api/ads/show`, {
        method: "PUT",
        body: JSON.stringify({
          ownerIdCard,
          adsId: ads._id,
          isShowFromUser: ads.isShow,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status == 200) {
        setRefresh((prev) => !prev);

        if (ads.isShow) {
          toast.success("آگهی پنهان شد");
        } else {
          toast.success("آگهی در وضعیت نمایش قرار گرفت");
        }
      } else {
        toast.error(data.message);
      }
      setIsLoadingShow(false);
    } catch (error) {
      console.log(error);
      setIsLoadingShow(false);
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
    column: "createdAt",
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
      filteredAds = filteredAds.filter(
        (ad) =>
          ad?.title.toLowerCase().includes(filterValue.toLowerCase()) ||
          ad?.id.toLowerCase().includes(filterValue.toLowerCase()) ||
          ad?.phone.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredAds = filteredAds.filter((ad) => {
        if (Array.from(statusFilter).includes("active"))
          return ad?.isShow == true;
        if (Array.from(statusFilter).includes("paused"))
          return ad?.isShow == false;
      });
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

  const renderCell = React.useCallback((ads, columnKey) => {
    const cellValue = ads[columnKey];

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
            color={statusColorMap[ads?.status]}
            size="sm"
            variant="flat"
          >
            {status[cellValue].title}
          </Chip>
        );

      case "isRemoved":
        return (
          <Chip
            className="capitalize"
            color={ads?.isRemoved ? "danger" : "success"}
            size="sm"
            variant="flat"
          >
            {cellValue ? "حذف شده" : "موجود"}
          </Chip>
        );
      case "isShow":
        return (
          <Chip
            className="capitalize"
            // color={ads?.isShow ? "danger" : "success"}
            size="sm"
            variant="flat"
          >
            <div
              className="relative flex items-center gap-2"
              onClick={() => {
                if (ads?.isRemoved) {
                  toast.error("امکان نمایش آگهی حذف شده وجود ندارد");
                  return;
                }
                setCurrentAds(ads);
                handleShowAds(ads);
              }}
            >
              <Tooltip color="secondary" content={cellValue ? "نمایش" : "مخفی"}>
                <span className="text-lg text-secondary-400 cursor-pointer active:opacity-50">
                  {cellValue ? <RiSlideshow2Fill /> : <RiSlideshow2Line />}
                </span>
              </Tooltip>
            </div>
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {/* <Tooltip color="secondary" content="فعال/غیرفعال">
              <span className="text-lg text-secondary-400 cursor-pointer active:opacity-50">
                <RiSlideshow2Fill />
                <RiSlideshow2Line />
              </span>
            </Tooltip> */}
            {!ads?.isRemoved && (
              <Tooltip color="success" className="text-white" content="ویرایش">
                <span
                  className="text-lg text-green-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    setCurrentAds(ads);
                    setCurrentAd(ads); //? in App Provider
                    router.push(`/edit/${ads?.title}?id=${ads?._id}`);
                  }}
                >
                  <EditIcon />
                </span>
              </Tooltip>
            )}
            {!ads?.isRemoved && (
              <Tooltip color="danger" content="حذف آگهی">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    setCurrentAds(ads);
                    // console.log("Delete ....");
                    onOpen();
                  }}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            )}
            <Tooltip color="primary" content="نمایش آگهی">
              <span
                className="text-lg text-primary cursor-pointer active:opacity-50"
                onClick={() => goToAds(ads?._id, ads?.title)}
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
            placeholder="جستجو براساس عنوان،آیدی یا تلفن "
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
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
            </Dropdown>
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
    <>
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
        <TableBody emptyContent={"آگهی یافت نشد"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6 bg-white",
          backdrop: "bg-header/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-header text-black",
          header: " border-[#292f46] text-white  bg-danger ",
          footer: " border-[#292f46] bg-white",
          closeButton: "hover:bg-white/5 active:bg-white/10 ",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col justify-between items-start ">
                حذف آگهی
              </ModalHeader>
              <ModalBody>
                <p>آیا نسبت به حذف آگهی اطمینان دارید؟</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="shadow"
                  isLoading={isLoadingDelete}
                  onPress={deleteMyAds}
                >
                  حذف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default MyAds;
