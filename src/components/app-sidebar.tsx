"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Search, FileText, Calendar, Settings, Scale } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Browse Claims", url: "/dashboard/claims", icon: Search },
  { title: "My Claims", url: "/dashboard/my-claims", icon: FileText },
  { title: "Deadlines", url: "/dashboard/calendar", icon: Calendar },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center p-4">
        <Scale className="mr-2 h-6 w-6 text-primary" />
        <span className="text-xl font-bold tracking-tight">ClaimWise</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} className="w-full">
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 flex items-center justify-between">
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
