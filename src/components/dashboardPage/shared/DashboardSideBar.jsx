import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import DashboardNavContent from "./DashboardNavContent";
import Link from "next/link";
import { RiArrowLeftLongLine } from "react-icons/ri";

export async function DashboardSideBar() {
  const backHomeBtn = (
    <Link href={"/"}>
      <Button
        className={
          "mb-3 mx-7 px-0 h-auto bg-transparent font-medium color-muted"
        }
      >
        <RiArrowLeftLongLine />
        Back Home
      </Button>
    </Link>
  );

  return (
    <>
      <aside className="hidden z-50 w-60 pt-5 shrink-0 border-r border-default lg:block bg-secondary">
        {backHomeBtn}
        <DashboardNavContent />
      </aside>

      <Drawer>
        <Button
          variant="secondary"
          className={
            "sticky top-1 z-50 lg:hidden ml-2  h-8 bg-[#0b0b3b]/95 rounded-sm text-white/90"
          }
        >
          <LayoutSideContentLeft />
          <span className="mb-0.5">Menu</span>
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className={"w-60 px-0 bg-secondary"}>
              <Drawer.CloseTrigger className="w-5 h-5" />
              <Drawer.Header>
                <Drawer.Heading>{backHomeBtn}</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                <DashboardNavContent />
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
