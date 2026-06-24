import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-background p-6">
        <SidebarTrigger className="mb-4 lg:hidden" />
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
