import { LayoutSideContentLeft } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import DashboardNavContent from "./DashboardNavContent";
import Image from "next/image";
import { getUser } from "@/lib/helpers/get-user";

export async function DashboardSideBar() {
  const user = await getUser();

  const userSec = (
    <div className="mb-5 mx-3 flex gap-3 items-center">
      <Image
        src={user?.image}
        alt={user?.name}
        width={80}
        height={80}
        className="rounded-full border border-[#17a2b8]"
      />

      <div>
        <h3 className="text-white!">{user?.name}</h3>
        <p className="text-white opacity-90 text-sm">{user?.email}</p>
      </div>
    </div>
  );
  return (
    <>
      <aside className="hidden w-70 pt-5 shrink-0 border-r border-default lg:block bg-secondary">
        {userSec}
        <DashboardNavContent />
      </aside>

      <Drawer>
        <Button
          variant="secondary"
          className={"lg:hidden ml-2 px-0 h-auto bg-transparent"}
        >
          <LayoutSideContentLeft />
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog className={"bg-secondary"}>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>{userSec}</Drawer.Heading>
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
