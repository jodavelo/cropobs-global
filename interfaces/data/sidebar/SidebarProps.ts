import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface SidebarProps {
    menuText: string;
    icon: string;
    subMenu?: [
        {
            subMenuText: string;
            subMenuIcon: string;
        }
    ]
}
